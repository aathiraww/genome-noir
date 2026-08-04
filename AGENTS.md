# GENOME NOIR

A fully static, client-side website (the "Synthetic Pet Lab"). It consists of `index.html`, `styles.css`, `app.js`, and image `assets/`. There is **no** package manager, build step, backend, lint config, or test framework — the app is plain HTML/CSS/vanilla JS and persists created creatures in the browser's `localStorage` (key `genomeNoir.archive.v1`).

## Cursor Cloud specific instructions

- Run/dev: this is a static site with no build. Serve it with a static file server from the repo root, e.g. `python3 -m http.server 8080`, then open `http://localhost:8080`. See `README.md` ("Local preview").
- No dependencies to install — `python3` (preinstalled) is the only requirement for local serving. There is nothing to `npm install`/`pip install`.
- No lint or automated tests exist in this repo. "Testing" means loading the site in a browser and exercising the flow manually.
- Deployment is handled by `.github/workflows/deploy-pages.yml` (GitHub Pages), which just copies the static files into `_site/`. Do not treat it as a local build step.
- Fonts load from Google Fonts over the network; if offline, text falls back to system fonts but the site still works.
- Core end-to-end flow to sanity-check changes: Genome Lab → "BEGIN INCUBATION" → adoption/naming dialog → the creature is saved and appears in the "LIVING ARCHIVE" section (persisted in `localStorage`).
