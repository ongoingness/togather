import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import parser, { parseMessages, readFiles, basename, LIMITS, validateImage } from '../src/shared/whatapp-chat-parser.js';
const parse = (text, dateOrder = 'dmy', files) => [...parseMessages(text, files, { dateOrder }).messageMap.values()];
const file = (name, text) => new File([text], name, { type: name.endsWith('.txt') ? 'text/plain' : 'application/zip' });

test('Android and iPhone exports support one-digit dates and seconds', () => {
    for (const text of ['1/2/26, 9:30 - Alex: Hello', '[1/2/2026, 9:30:45] Alex: Hello', '\u200e[1.2.2026, 9:30:45] Alex: Hello']) {
        const [message] = parse(text);
        assert.equal(new Date(message.fulltimestamp).getMonth(), 1);
        assert.deepEqual(message.text, ['Hello']);
    }
});
test('AM/PM and US date inference are correct', () => {
    const [message] = parse('02/13/2026, 9:30 PM - Alex: Hello', 'auto');
    assert.equal(new Date(message.fulltimestamp).getHours(), 21);
    assert.equal(new Date(message.fulltimestamp).getDate(), 13);
    const [midnight] = parse('13/02/2026, 12:00 AM - Alex: Hello', 'auto');
    assert.equal(new Date(midnight.fulltimestamp).getHours(), 0);
});
test('ambiguous or impossible dates require explicit correction', () => {
    assert.throws(() => parse('1/2/26, 9:30 - Alex: Hello', 'auto'), { code: 'ambiguous-date' });
    for (const date of ['31/2/2026, 09:30', '13/2/2026, 25:00', '13/2/2026, 13:00 PM']) {
        assert.throws(() => parse(date + ' - Alex: Hello'), { code: 'invalid-date' });
    }
});
test('continuation-line attachments and repeated messages are preserved', () => {
    const files = new Map([[123, { name: 'IMG-20260201-WA0001.jpg' }]]);
    const messages = parse('13/02/2026, 09:30 - Alex: Photo follows\nIMG-20260201-WA0001.jpg (file attached)\n13/02/2026, 09:30 - Alex: Photo follows', 'dmy', files);
    assert.equal(messages.length, 2);
    assert.deepEqual(messages[0].files, [123]);
    assert.notEqual(messages[0].hash, messages[1].hash);
});
test('all five scripts and Unicode names stay text', () => {
    for (const name of ['Alice', 'João', 'Zoë', 'Ελένη', 'María']) {
        const result = parseMessages(`13/2/26, 9:30 - ${name}: <img src=x onerror=alert(1)>`, new Map());
        assert.equal(Object.values(result.users).find(u => u.name)?.name, name);
        assert.equal([...result.messageMap.values()][0].text[0], '<img src=x onerror=alert(1)>');
    }
});
test('nested ZIP names, valid TXT import and progress', async () => {
    assert.equal(basename('WhatsApp Chat/media/photo.jpg'), 'photo.jpg');
    const zip = new JSZip(); zip.file('WhatsApp Chat/_chat.txt', '13/2/26, 9:30 - Alex: Hello');
    const progress = [];
    const result = await parser().start([file('chat.zip', await zip.generateAsync({ type: 'uint8array' }))], { onProgress: n => progress.push(n) });
    assert.equal(result.messageMap.size, 1);
    assert.deepEqual(progress, [1]);
});
test('damaged ZIP rejects rather than hanging', async () => {
    await assert.rejects(readFiles([file('broken.zip', 'not a ZIP')]), { code: 'unreadable-file' });
});
test('limits reject large inputs and expanded ZIPs before allocation', async () => {
    await assert.rejects(readFiles([{ name: 'huge.txt', size: LIMITS.inputBytes + 1 }]), { code: 'input-too-large' });
    const zip = new JSZip();
    for (let i = 0; i <= LIMITS.entries; i++) zip.file(`${i}.txt`, 'small');
    await assert.rejects(readFiles([file('many.zip', await zip.generateAsync({ type: 'uint8array' }))]), { code: 'input-too-large' });
});
test('unsafe image dimensions and unsupported image content are rejected', async () => {
    const bytes = new Uint8Array(24); const view = new DataView(bytes.buffer);
    view.setUint32(0, 0x89504e47); view.setUint32(16, 100000); view.setUint32(20, 100000);
    await assert.rejects(validateImage(bytes, 'image/png'), { code: 'image-too-large' });
    await assert.rejects(validateImage(new Uint8Array(24), 'image/png'), { code: 'unsupported-image' });
});

test('model discovers current and historical topic links in all languages', async () => {
    const { default: createModel } = await import('../src/shared/diary-model.js');
    for (const language of ['', 'pt/', 'nl/', 'el/', 'es/']) {
        const model = createModel();
        const parsed = parseMessages(`13/2/26, 9:30 - Alex: https://ongoingness.github.io/togather/${language}topics/1.html\nTopic: A favourite memory\n13/2/26, 9:31 - Zoë: The sea`, new Map());
        model.setWhatsAppChat({ ...parsed, files: new Map() });
        model.findTopics();
        assert.equal(model.getTopics().length, 1);
        assert.equal(model.getTopics()[0].day, 1);
        model.deleteAll();
    }
});

test('oversized expanded ZIP is rejected from its directory before decompression', async () => {
    const zip = new JSZip(); zip.file('oversized.txt', 'x');
    const bytes = await zip.generateAsync({ type: 'uint8array' });
    const view = new DataView(bytes.buffer);
    for (let i = 0; i < bytes.length - 28; i++) if (view.getUint32(i, true) === 0x02014b50) {
        view.setUint32(i + 24, LIMITS.expandedBytes + 1, true); break;
    }
    await assert.rejects(readFiles([file('oversized.zip', bytes)]), { code: 'input-too-large' });
});

test('decompression stream rejects understated ZIP sizes', async () => {
    const { readZipEntry } = await import('../src/shared/whatapp-chat-parser.js');
    const zip = new JSZip(); zip.file('chat.txt', 'a'.repeat(100000));
    const loaded = await JSZip.loadAsync(await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' }));
    await assert.rejects(readZipEntry(loaded.file('chat.txt'), 8), { code: 'file-too-large' });
});
