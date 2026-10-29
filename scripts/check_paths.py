#!/usr/bin/env python3
"""Check the published static files at their GitHub Pages project URL."""
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://ongoingness.github.io/togather/'
errors = set()
checked = 0

def check(source, value):
    global checked
    value = value.strip()
    if not value or value.startswith(('#', 'data:', 'javascript:', 'mailto:', 'tel:')):
        return
    url = urlsplit(urljoin(BASE + source.relative_to(ROOT).as_posix(), value))
    if url.netloc != 'ongoingness.github.io':
        return
    checked += 1
    if not url.path.startswith('/togather/'):
        errors.add(f'{source.relative_to(ROOT)}: outside project: {value}')
        return
    target = ROOT / unquote(url.path[len('/togather/'):])
    if not target.is_file() and not (target / 'index.html').is_file():
        errors.add(f'{source.relative_to(ROOT)}: missing: {value}')

class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ('href', 'src', 'poster') and value:
                check(self.source, value)

def published(directory):
    # Historical nested build copies are not part of the maintained site.
    for path in sorted(directory.iterdir()):
        if path.name.startswith('.') or path.name in ('build', 'scripts'):
            continue
        if path.is_dir():
            yield from published(path)
        else:
            yield path

pages = 0
for source in published(ROOT):
    if source.suffix not in ('.html', '.css', '.js', '.webmanifest', '.xml'):
        continue
    if source.suffix == '.js' and source.name != 'bundle.js':
        continue
    text = source.read_text()
    if source.suffix == '.html':
        pages += 1
        parser = Links()
        parser.source = source
        parser.feed(text)
    if source.suffix == '.css':
        for value in re.findall(r'url\([\"\']?([^\)\"\']+)', text):
            check(source, value)
    # Include inline redirects, generated booklet UI and PDF worker URLs.
    for value in re.findall(r'''["'`](/togather/[^\s"'`<>\\)]*)''', text):
        if '${topic}' in value:
            for topic in range(1, 31):
                check(source, value.replace('${topic}', str(topic)))
        else:
            check(source, value)
    for value in re.findall(r"""["'`(](/(?:(?:el|es|nl|pt)/)?assets/[^\s"'`<>\\)]*)""", text):
        check(source, value)
    if 'https://togather.me' in text or 'http://togather.me' in text:
        errors.add(f'{source.relative_to(ROOT)}: obsolete domain URL')

if errors:
    print('\n'.join(sorted(errors)))
    raise SystemExit(1)
print(f'Checked {pages} pages and {checked} local URL references: all resolve.')
