# Togather

Static website published at https://ongoingness.github.io/togather/.

## Project structure

The repository root contains the English website. `el/`, `es/`, `nl/`, and
`pt/` contain the translated pages. Each language has a `topics/` directory
and a `diary/` booklet assembler. CSS, images, and the compiled booklet
JavaScript are checked in under `assets/`.

The nested `build/` directories are historical generated copies, not the
maintained pages. Do not publish one of those directories as the site root.
The original generator and unbundled JavaScript sources are not in this checkout.

## Paths

GitHub Pages serves this project under `/togather/`. Local navigation,
stylesheets, images, PDF workers, and generated booklet controls must keep
that prefix. Link directly to `.html` files, or use trailing slashes for
folders containing `index.html`. The retired `togather.me` domain must not
be used for site links or asset URLs.

## Preview locally

From the directory **containing** this checkout, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/togather/ to reproduce the published path layout.

From this repository, check maintained page links and asset references with:

```sh
python3 scripts/check_paths.py
```

## Deploy to GitHub Pages

Push the changes to the branch configured for GitHub Pages. In the repository's
**Settings → Pages**, use the repository root (`/`) as the publishing folder
and leave **Custom domain** empty. No application build is needed; `.nojekyll`
keeps the checked-in HTML, CSS, and JavaScript served as static files.

After GitHub finishes deploying, open https://ongoingness.github.io/togather/.
