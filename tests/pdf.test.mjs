import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { jsPDF } from 'jspdf';
import loadPdfFonts from '../src/shared/pdfFontsLoader.js';

test('all language templates produce valid multi-page PDFs with shared fonts', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async url => new Response(await readFile(new URL('../assets/fonts/' + url.split('/').pop(), import.meta.url)));
    try { await loadPdfFonts(jsPDF); } finally { globalThis.fetch = originalFetch; }
    for (const language of ['en', 'pt', 'nl', 'el', 'es']) {
        const { default: templates } = await import(`../src/${language}/diary-templates.js`);
        const doc = await templates().generatePDF({ startDate: new Date(2026, 1, 13).getTime(), endDate: new Date(2026, 1, 13).getTime(), title: 'Our memories', who: 'Ελένη', users: { 1: { name: 'João', visible: true } }, topics: [{ day: 1, part: 0, text: ['A lovely day'], timestamp: new Date(2026, 1, 13).getTime(), files: [], color: '#007a7d', selectedMessages: [{ user: 'Zoë', color: '#007a7d', text: ['A walk by the sea'], fulltimestamp: new Date(2026, 1, 13, 12).getTime(), files: [] }] }] });
        assert.ok(doc.getNumberOfPages() >= 3, language);
        assert.ok(doc.output().startsWith('%PDF-'), language);
    }
});
