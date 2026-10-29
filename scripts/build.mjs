import { build } from 'esbuild';
import { cp, mkdir, readdir, readFile, writeFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = process.cwd(), out = path.join(root, 'dist');
const languages = ['en', 'pt', 'nl', 'el', 'es'];
const labels = {
 en: ['Home', 'Introduction', 'Instructions', 'Assemble Booklet', 'About', 'Contact', 'Topic', 'Page not found'],
 pt: ['Início', 'Introdução', 'Instruções', 'Montar o livro', 'Sobre', 'Contacto', 'Tema', 'Página não encontrada'],
 nl: ['Home', 'Inleiding', 'Instructies', 'Boekje samenstellen', 'Over ons', 'Contact', 'Onderwerp', 'Pagina niet gevonden'],
 el: ['Αρχική', 'Εισαγωγή', 'Οδηγίες', 'Δημιουργία βιβλίου', 'Σχετικά', 'Επικοινωνία', 'Θέμα', 'Η σελίδα δεν βρέθηκε'],
 es: ['Inicio', 'Introducción', 'Instrucciones', 'Crear libro', 'Acerca de', 'Contacto', 'Tema', 'Página no encontrada']
};
const descriptions = {
 en: 'Create a personal booklet from your WhatsApp conversations. Your chat stays on your device.',
 pt: 'Crie um livro pessoal com as suas conversas do WhatsApp. A conversa fica no seu dispositivo.',
 nl: 'Maak een persoonlijk boekje van je WhatsApp-gesprekken. Je chat blijft op je apparaat.',
 el: 'Δημιουργήστε ένα προσωπικό βιβλίο από συνομιλίες WhatsApp. Η συνομιλία παραμένει στη συσκευή σας.',
 es: 'Crea un libro personal con tus conversaciones de WhatsApp. La conversación permanece en tu dispositivo.'
};
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await writeFile(path.join(out, '.nojekyll'), '');
// Explicit publishing allowlist: nested build copies, old scripts, and source files never enter the artifact.
for (const folder of ['images', 'favicon', 'css', 'fonts']) await cp(path.join(root, 'assets', folder), path.join(out, 'assets', folder), { recursive: true });
await build({ entryPoints: Object.fromEntries([...languages.map(lang => [lang, `src/${lang}/entry.js`]), ['site-ui', 'src/shared/site-ui.js']]),
 outdir: path.join(out, 'assets/scripts'), bundle: true, splitting: true, format: 'esm', minify: true,
 target: ['es2022'], platform: 'browser', legalComments: 'linked', chunkNames: 'chunks/[name]-[hash]',
 metafile: false, logLevel: 'info', alias: { 'dompurify': './src/shared/unused-html.js', 'html2canvas': './src/shared/unused-html.js', 'canvg': './src/shared/unused-html.js' } });
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
let pages = 0;
async function renderDirectory(relative, lang) {
    const entries = await readdir(path.join(root, relative), { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (['topics', 'diary'].includes(entry.name)) await renderDirectory(path.join(relative, entry.name), lang);
            continue;
        }
        if (!entry.name.endsWith('.html') && entry.name !== 'feed.xml') continue;
        const rel = path.join(relative, entry.name), dest = path.join(out, rel);
        await mkdir(path.dirname(dest), { recursive: true });
        let html = await readFile(path.join(root, rel), 'utf8');
        html = html.replaceAll('https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/');
        html = html.replaceAll(/\/togather\/(?:pt|nl|el|es)\/assets\//g, '/togather/assets/');
        if (entry.name === 'feed.xml') {
            html = html.replace(/<subtitle>[\s\S]*?<\/subtitle>/, `<subtitle>${descriptions[lang]}</subtitle>`).replace('xml:lang="en"', `xml:lang="${lang}"`).replace(/<id>[^<]*<\/id>/, `<id>https://ongoingness.github.io/togather/${lang === 'en' ? '' : lang + '/'}feed.xml</id>`);
            await writeFile(dest, html); continue;
        }
        pages++;
        html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, script => script.includes('.register("/togather/serviceworker.js")') ? '' : script);
        const local = rel.replace(/^(pt|nl|el|es)\//, '');
        const section = local.split('/')[0].replace('.html', '');
        const index = ({ index: 0, explained: 1, instructions: 2, diary: 3, about: 4, contact: 5, topics: 6, 404: 7 })[section] ?? 0;
        const number = local.match(/^topics\/(\d+)\.html$/)?.[1];
        const title = `Togather · ${labels[lang][index]}${number ? ' ' + number : ''}`;
        const route = rel.replace(/index\.html$/, '');
        const canonical = `https://ongoingness.github.io/togather/${route}`;
        html = html.replace(/<html lang="[^"]+"/, `<html lang="${lang}"`);
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
        html = html.replace(/<meta name="(?:title|description)"[^>]*>/g, '');
        html = html.replace(/<meta property="(?:og|twitter):(?:url|title|description)"[^>]*>/g, '');
        html = html.replace(/<link rel="canonical"[^>]*>/g, '');
        html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
        html = html.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/g, '');
        if (section === 'diary') {
            html = html.replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/g, '');
            html = html.replace('</head>', `<script type="module" src="/togather/assets/scripts/${lang}.js"></script>\n</head>`);
        }
        const alternates = languages.map(l => {
            const alternate = (l === 'en' ? '' : l + '/') + local.replace(/index\.html$/, '');
            return `<link rel="alternate" hreflang="${l}" href="https://ongoingness.github.io/togather/${alternate}">`;
        }).join('\n');
        html = html.replace('</head>', `<meta name="description" content="${escape(descriptions[lang])}">
<meta property="og:url" content="${canonical}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(descriptions[lang])}">
<meta property="twitter:url" content="${canonical}"><meta property="twitter:title" content="${escape(title)}"><meta property="twitter:description" content="${escape(descriptions[lang])}">
<link rel="canonical" href="${canonical}">${alternates}
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:title,description:descriptions[lang],url:canonical,inLanguage:lang})}</script>
<link rel="stylesheet" href="/togather/assets/css/improvements.css">
<script type="module" src="/togather/assets/scripts/site-ui.js"></script></head>`);
        // Preserve the existing heading's appearance while giving each content page an h1.
        if (!/<h1\b/i.test(html)) html = html.replace(/(<main\b[^>]*>[\s\S]*?)<h([2-6])([^>]*)>([\s\S]*?)<\/h\2>/, '$1<h1 class="page-title"$3>$4</h1>');
        if (!/<h1\b/i.test(html)) html = html.replace(/(<body[^>]*>)/, `$1<h1 class="visually-hidden">${title}</h1>`);
        html = html.replace(/<img\b([^>]*)>/g, (whole, attrs) => `<img${attrs}${/\balt=/.test(attrs) ? '' : ' alt=""'}${/loading=/.test(attrs) ? '' : ' loading="lazy" decoding="async"'}>`);
        // Header logo is immediately visible and should not wait for lazy loading.
        html = html.replace(/(<img[^>]*TOGATHER_LOGO@2x\.png[^>]*) loading="lazy"/, '$1 loading="eager"');
        const hash = script => `'sha256-${createHash('sha256').update(script).digest('base64')}'`;
        const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => hash(m[1]));
        const handlers = [...html.matchAll(/\bon\w+\s*=\s*(["'])(.*?)\1/g)].map(m => hash(m[2].replaceAll('&amp;', '&')));
        const policy = `default-src 'self'; script-src 'self' https://cdn.usefathom.com 'unsafe-hashes' ${[...new Set([...scripts, ...handlers])].join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://cdn.usefathom.com https://api.usefathom.com; frame-src 'self' blob: data: https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'none'`;
        html = html.replace(/(<meta charset="UTF-8">|<meta charset="utf-8">)/i, `$1\n<meta http-equiv="Content-Security-Policy" content="${escape(policy)}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`);
        await writeFile(dest, html);
    }
}
await renderDirectory('', 'en');
for (const lang of languages.slice(1)) await renderDirectory(lang, lang);
// Retire the old no-op worker; it unregisters itself on existing installations.
await cp('serviceworker.js', path.join(out, 'serviceworker.js'));
let bytes = 0;
async function total(dir) { for (const item of await readdir(dir, { withFileTypes: true })) { const p = path.join(dir, item.name); if (item.isDirectory()) await total(p); else bytes += (await stat(p)).size; } }
await total(out);
if (bytes > 100 * 1024 ** 2) throw new Error('Publishing artifact exceeds the 100 MB budget');
console.log(`Built ${pages} pages in all five languages; artifact ${(bytes / 1024 ** 2).toFixed(1)} MiB.`);
