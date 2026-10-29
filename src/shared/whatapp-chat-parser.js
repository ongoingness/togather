import JSZip from 'jszip';

export const LIMITS = Object.freeze({ inputBytes: 100 * 1024 ** 2, expandedBytes: 150 * 1024 ** 2,
    fileBytes: 25 * 1024 ** 2, entries: 500, messages: 50000, imagePixels: 24_000_000 });
export class ImportError extends Error {
    constructor(code) { super(code); this.name = 'ImportError'; this.code = code; }
}
const types = { txt: 'text/plain', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp', gif: 'image/gif', mp4: 'video/mp4', mov: 'video/quicktime', webm: 'video/webm' };
const extension = name => name.split('.').pop().toLowerCase();
export const basename = name => name.replaceAll('\\', '/').split('/').pop();
export function hashCode(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = Math.imul(31, hash) + text.charCodeAt(i) | 0;
    return hash;
}
// Anchoring and explicit AM/PM handling prevent timestamps becoming part of a name.
const startPattern = /^\[?(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2}|\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?\]?\s*(?:-\s*)?([^:\n]+):\s?(.*)$/i;
const clean = line => line.replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g, '').replace(/[\u00a0\u202f]/g, ' ');

export function parseMessages(text, files = new Map(), { dateOrder = 'auto' } = {}) {
    const lines = text.split(/\r?\n/).map(clean);
    const starts = lines.map(line => startPattern.exec(line)).filter(Boolean);
    if (!starts.length) throw new ImportError('no-chat');
    if (starts.length > LIMITS.messages) throw new ImportError('too-many-messages');
    if (!['auto', 'dmy', 'mdy'].includes(dateOrder)) throw new ImportError('invalid-date');
    if (dateOrder === 'auto') {
        const dmy = starts.some(m => Number(m[1]) > 12);
        const mdy = starts.some(m => Number(m[2]) > 12);
        if (dmy && mdy) throw new ImportError('invalid-date');
        if (!dmy && !mdy) throw new ImportError('ambiguous-date');
        dateOrder = mdy ? 'mdy' : 'dmy';
    }
    const byName = new Map();
    for (const [key, file] of files) {
        if (byName.has(file.name)) throw new ImportError('duplicate-name');
        byName.set(file.name, key);
    }
    const names = [...byName.keys()].sort((a, b) => b.length - a.length);
    const users = { numbers: [] };
    const messageMap = new Map();
    let current;
    const addBody = body => {
        current.rawText.push(body);
        let remaining = body;
        for (const name of names) {
            if (!remaining.includes(name)) continue;
            current.files.push(byName.get(name));
            remaining = remaining.replace(name, '').replace(/<[^:<>]+:\s*>/g, '').replace(/\s*\([^)]*\)\s*$/, '').trim();
        }
        if (remaining) current.text.push(remaining);
        current.links.push(...(body.match(/https?:\/\/[^\s<>]+/g) || []));
        const mentions = body.match(/@\d+/g) || [];
        current.atUser.push(...mentions);
        for (const mention of mentions) if (!users.numbers.includes(mention)) users.numbers.push(mention);
    };
    for (const [index, line] of lines.entries()) {
        const match = startPattern.exec(line);
        if (!match) { if (current && line) addBody(line); continue; }
        const [, first, second, year, hour, minute, seconds = '0', meridiem, name, body] = match;
        const day = Number(dateOrder === 'dmy' ? first : second);
        const month = Number(dateOrder === 'dmy' ? second : first);
        const fullYear = Number(year.length === 2 ? '20' + year : year);
        let hours = Number(hour);
        if (meridiem) {
            if (hours < 1 || hours > 12) throw new ImportError('invalid-date');
            hours = hours % 12 + (meridiem.toUpperCase() === 'PM' ? 12 : 0);
        }
        const date = new Date(fullYear, month - 1, day, hours, Number(minute), Number(seconds));
        if (hours > 23 || Number(minute) > 59 || Number(seconds) > 59 || date.getFullYear() !== fullYear ||
            date.getMonth() !== month - 1 || date.getDate() !== day) throw new ImportError('invalid-date');
        let user = hashCode(name);
        while (users[user] && users[user].name !== name) user++;
        users[user] = { name };
        // Preserve repeated messages, including identical text in the same minute.
        let hash = hashCode(`${index}:${line}`);
        while (messageMap.has(hash)) hash++;
        current = { index, hash, fulltimestamp: date.getTime(), user, rawText: [], text: [], files: [], links: [], atUser: [] };
        messageMap.set(hash, current);
        addBody(body);
    }
    return { messageMap, users };
}

async function dataURL(bytes, type) {
    // FileReader propagates failures; no async Promise executor that can hang.
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new ImportError('unreadable-file'));
        reader.onabort = () => reject(new ImportError('unreadable-file'));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(new Blob([bytes], { type }));
    });
}
export async function validateImage(bytes, type) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let width, height;
    if (type === 'image/png' && bytes.length >= 24 && view.getUint32(0) === 0x89504e47) {
        width = view.getUint32(16); height = view.getUint32(20);
    } else if (type === 'image/gif' && bytes.length >= 10 && String.fromCharCode(...bytes.slice(0, 3)) === 'GIF') {
        width = view.getUint16(6, true); height = view.getUint16(8, true);
    } else if (type === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216) {
        let offset = 2;
        while (offset + 8 < bytes.length) {
            if (bytes[offset] !== 255) break;
            const marker = bytes[offset + 1];
            if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
                height = view.getUint16(offset + 5); width = view.getUint16(offset + 7); break;
            }
            const length = view.getUint16(offset + 2);
            if (length < 2) break;
            offset += length + 2;
        }
    } else if (type === 'image/webp' && bytes.length >= 30 && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') {
        const format = String.fromCharCode(...bytes.slice(12, 16));
        if (format === 'VP8X') { width = 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16); height = 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16); }
        else if (format === 'VP8 ') { width = view.getUint16(26, true) & 0x3fff; height = view.getUint16(28, true) & 0x3fff; }
        else if (format === 'VP8L' && bytes[20] === 0x2f) { const bits = view.getUint32(21, true); width = 1 + (bits & 0x3fff); height = 1 + ((bits >>> 14) & 0x3fff); }
    }
    if (!width || !height) throw new ImportError('unsupported-image');
    if (width * height > LIMITS.imagePixels) throw new ImportError('image-too-large');
}
// Bound actual decompressed bytes as well as directory metadata: ZIP headers can lie.
export function readZipEntry(entry, expectedSize) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        let length = 0;
        const stream = entry.internalStream('uint8array');
        stream.on('data', chunk => {
            length += chunk.byteLength;
            if (length > expectedSize || length > LIMITS.fileBytes) {
                stream.pause(); chunks.length = 0; reject(new ImportError('file-too-large')); return;
            }
            chunks.push(chunk);
        });
        stream.on('error', () => reject(new ImportError('unreadable-file')));
        stream.on('end', () => {
            if (length !== expectedSize) { reject(new ImportError('unreadable-file')); return; }
            const bytes = new Uint8Array(length);
            let offset = 0;
            for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
            resolve(bytes);
        });
        stream.resume();
    });
}
export async function readFiles(input, onProgress = () => {}) {
    const selected = [...input];
    if (!selected.length) throw new ImportError('no-chat');
    if (selected.length > LIMITS.entries || selected.reduce((n, f) => n + f.size, 0) > LIMITS.inputBytes) throw new ImportError('input-too-large');
    const result = [];
    let expanded = 0, count = 0;
    const add = async (name, size, getBytes) => {
        const type = types[extension(name)];
        if (!type) return;
        if (size > LIMITS.fileBytes || size < 0) throw new ImportError('file-too-large');
        expanded += size;
        if (++count > LIMITS.entries || expanded > LIMITS.expandedBytes) throw new ImportError('input-too-large');
        const bytes = await getBytes();
        if (bytes.byteLength !== size) throw new ImportError('unreadable-file');
        if (type.startsWith('image/')) await validateImage(bytes, type);
        const fileContent = type === 'text/plain' ? new TextDecoder().decode(bytes) : await dataURL(bytes, type);
        result.push({ file: { name: basename(name), type, size }, fileContent });
        onProgress(count);
    };
    try {
        for (const file of selected) {
            if (extension(file.name) === 'zip') {
                const archive = await JSZip.loadAsync(await file.arrayBuffer());
                const entries = Object.values(archive.files).filter(e => !e.dir && !e.name.includes('__MACOSX/'));
                if (entries.length > LIMITS.entries) throw new ImportError('input-too-large');
                // Check sizes of every entry before decompressing any, including unsupported files.
                const total = entries.reduce((n, e) => n + e._data.uncompressedSize, 0);
                if (!Number.isFinite(total) || total + expanded > LIMITS.expandedBytes) throw new ImportError('input-too-large');
                for (const entry of entries) await add(entry.name, entry._data.uncompressedSize, () => readZipEntry(entry, entry._data.uncompressedSize));
            } else {
                await add(file.name, file.size, async () => new Uint8Array(await file.arrayBuffer()));
            }
        }
    } catch (error) {
        if (error instanceof ImportError) throw error;
        throw new ImportError('unreadable-file');
    }
    return result;
}
export default function WhatsAppChatParser() {
    return { async start(input, options = {}) {
        const entries = await readFiles(input, options.onProgress);
        const files = new Map();
        for (const { file, fileContent } of entries) if (file.type !== 'text/plain') {
            let key = hashCode(fileContent);
            while (files.has(key)) key++;
            files.set(key, { name: file.name, type: file.type, data: fileContent });
        }
        const textFiles = entries.filter(e => e.file.type === 'text/plain');
        if (!textFiles.length) throw new ImportError('no-chat');
        const messageMap = new Map(), users = { numbers: [] };
        for (const entry of textFiles) {
            let parsed;
            try { parsed = parseMessages(entry.fileContent, files, options); }
            catch (error) { if (error.code === 'no-chat') continue; throw error; }
            for (const message of parsed.messageMap.values()) {
                while (messageMap.has(message.hash)) message.hash++;
                messageMap.set(message.hash, message);
            }
            for (const [key, user] of Object.entries(parsed.users)) if (key !== 'numbers') {
                if (users[key] && users[key].name !== user.name) throw new ImportError('duplicate-name');
                users[key] = user;
            }
            users.numbers = [...new Set([...users.numbers, ...parsed.users.numbers])];
        }
        if (!messageMap.size) throw new ImportError('no-chat');
        if (messageMap.size > LIMITS.messages) throw new ImportError('too-many-messages');
        return { messageMap, files, users };
    } };
}
