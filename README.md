# Togather

A private, browser-based WhatsApp booklet assembler and multilingual static website
for https://ongoingness.github.io/togather/.

English, Portuguese, Dutch, Greek and Spanish are supported throughout import,
selection, preview and download. The closed research study and survey invitation
have been removed. Downloads do not require a participation choice.

## Develop and verify

Use Node.js 22 or later (CI uses Node.js 24) and Python 3.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:8765/togather/. Preview serves **only `dist/`**, mounted at
`/togather/` to match GitHub Pages. Serving the checkout directly uses historical
JavaScript and bypasses the current build; it is not a supported preview.

`npm test` covers chat date formats, AM/PM, ambiguous and invalid dates, multiline
attachments, repeated messages, Unicode names, nested and corrupt ZIPs, resource
limits, current topic URLs, and PDF generation in all five languages.
`npm run check` validates the built pages and their asset URLs.

## Source layout

- The root HTML and `pt/`, `nl/`, `el/`, `es/` HTML are the maintained page content.
- `src/en/`, `src/pt/`, `src/nl/`, `src/el/`, `src/es/` contain translated assembler
  controllers, UI and PDF templates. They were recovered from the previously
  published webpack modules; original author attribution is retained.
- `src/shared/` contains the importer, media validation, PDF font loading,
  new interface translations and accessibility behavior.
- `assets/fonts/` contains the existing embedded PDF fonts extracted into shared
  files. The build also uses them for the website, without third-party font requests.
- `scripts/build.mjs` creates the production site: minified JavaScript, shared
  assets, language declarations, metadata and Content Security Policy.

When changing assembler text or behavior, check **all five language modules**.
New shared messages belong in `src/shared/import-controls.js`.
The existing HTML still contains the previous script references: the build replaces
those with the current production entry points. Edit source, then build; do not
edit generated `dist/` files or the old compiled bundles.

Nested `build/` directories, language-specific asset copies and old compiled
scripts are historical output. The explicit publishing allowlist excludes them.
They remain in Git for recovery; no repository history has been rewritten.
Unused videos are also excluded from the production artifact.

## Privacy and limits

The assembler loads only same-origin assets. It sends no chat content or analytics
requests and does not store progress in browser storage. Keep the tab open to
preserve progress. Public informational pages retain the existing Fathom analytics.
YouTube embeds on informational pages use the privacy-enhanced embed domain.

Supported inputs: WhatsApp TXT exports, ZIP exports, JPG/JPEG, PNG, WebP, GIF,
MP4, MOV and WebM. PDF/SVG/HTML imports are not supported. Browser-native PDF
preview replaces the unused legacy PDF.js integration. HTML-to-PDF plugins are
intentionally disabled; booklets use text and validated media directly.

Limits: 100 MiB selected input, 150 MiB expanded ZIP content, 25 MiB per extracted
file, 500 files per import, 50,000 messages, and 24 megapixels per image. Supported
video codecs depend on the browser. Media decoding times out rather than hanging.
Limits and error messages are centralized in `src/shared/`.

Dates are inferred only when unambiguous; otherwise the user must choose
day/month/year or month/day/year. This avoids silently interpreting dates wrongly.
Historical `togather.me` topic links in existing chats are recognized as imported
text; the website never sends requests to that retired domain.

## Publish to GitHub Pages

The workflow in `.github/workflows/pages.yml` builds, tests and uploads **`dist/`
only**. It runs on pushes to `gh-pages`, pull requests targeting `gh-pages`, and
manual dispatch. Only pushes and manual runs deploy. The artifact has a 100 MiB
build budget and currently occupies about 40 MiB.

For the first deployment:

1. In GitHub **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Leave **Custom domain** empty.
3. Push these changes to `gh-pages`, or run the workflow manually on that branch.
4. Confirm the Pages deployment succeeds and check the public URL.

Do not publish the repository root: it contains historical output and bypasses
all packaging and security improvements. The old `master` branch contains the
original Jekyll publisher; avoid running that legacy publisher over this branch.
No personal access token is required by the new workflow.
