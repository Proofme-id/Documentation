# Documentation

> Repo-specific guide. System-wide context: `../CLAUDE.md`.

## Purpose

The public **developer documentation** site (deployed at `docs.test.proofme.nl` via Coolify;
`docs.proofme.id` per the root `CLAUDE.md`'s original description — confirm which is current
production vs. test). Documents the Proofme API, the SDK, DID concepts, encryption, and the
MyPage/identification integration options for third-party integrators. This is the
human-readable contract layer for the platform.

## Tech stack

**docsify** (`docsify-cli`) — Markdown rendered **client-side in the browser**; there is no
build step, the checked-out repo *is* the served output (no `dist/`-equivalent). Production
serving is **nginx** (see "Deployment"); `docsify-cli` is a local dev-server convenience only
and is not present in the production image at all.

## Structure

Markdown organised by `_sidebar.md`:
- `intro/` — identifications, hosted / BYO / on-premise MyPage.
- `custom_identification_page*.md` — hosting your own identification page.
- `sdk/` — SDK overview, `reader` (Android/iOS install + usage), `qr`.
- `api/` — overview, security, authentication, errors, webhooks, and versioned endpoints under
  `api/v1/{identification,document}/…`.
- `did/`, `encryption/`, `components/`, `diagrams/`, `examples.md`.
- `index.html` (docsify config — `$docsify` options, and the `<script>`/`<link>` tags that
  pull docsify core + plugins from `cdn.jsdelivr.net`/`unpkg.com` CDNs at runtime), `_sidebar.md`
  (nav), `_coverpage.md`, `styles.css`, `media/` (images, `favicon.ico`, `version.json`),
  `plugins/`.
- `Dockerfile`, `nginx.conf`, `security-headers.conf` — production deployment (see below).
- `test.html` — a stray IDE live-template file (`$Title$`/`$END$` placeholders), not real
  content; harmless, excluded from the production image, not otherwise touched.

## Deployment (Docker + Coolify)

Plain **Dockerfile** Coolify resource (like `Website`), not Docker Compose — this is a
standard HTTP static site, routed through Coolify's Traefik/domain layer normally. Container
port **80**, domain `docs.test.proofme.nl`.

Since there's no `dist/` build output to copy from, the `Dockerfile` copies the **whole repo**
into the nginx image and then explicitly removes the files that aren't documentation content
(`.git`, `.github`, `Dockerfile`, `nginx.conf`, `security-headers.conf`, `package.json`/
`package-lock.json`, `CLAUDE.md`, `README.md`, `test.html`) — there's no separate build
output to be selective about instead. If you add a new *tooling* file to the repo root (not
a docs content folder), add it to that `rm -rf` list too, or it'll be served publicly.

`nginx.conf`: docsify here uses **hash-based routing** (`#/page`, no `routerMode: 'history'`
in `index.html`) — every real HTTP request already maps to an actual file docsify fetches by
relative path (e.g. `#/intro/identifications` → `GET /intro/identifications.md`), so unlike
`Website`'s Angular setup, **no SPA fallback rewrite is needed or used**. `index.html`/
`_sidebar.md`/`_coverpage.md` are served no-cache (docs edits should show up immediately);
`.md`/`.css`/`.js`/other assets get a short (10 min) cache — content here isn't filename-hashed
the way a compiled JS bundle is, so long/aggressive caching would hide edits.

`security-headers.conf`'s CSP is scoped to the actual CDN origins `index.html` loads from
(`cdn.jsdelivr.net`, `unpkg.com`) — **verify in an actual browser console** after changing
`index.html`'s script/link tags or adding a docsify plugin from a new CDN; a CSP mismatch
fails silently (blank page / broken plugin), not as a build or curl-visible error. This
wasn't fully verified in a real browser during this setup, only via `curl` (headers, status
codes, served content) — do a quick visual check after the first Coolify deploy.

`.github/workflows/build.yml` is CI-only: `npm ci` (installs `docsify-cli`, mainly as a
sanity check — not used by the production image) → `docker build .` (build-check) → Slack
status. No longer pushes to AWS ECR; the old `clean.yml` (Jenkins feature-branch cleanup) was
removed. `media/version.json`'s committed placeholder (`{"VERSION":"DEVELOPMENT"}`) is no
longer overwritten by CI (that was tied to the removed ECR branch-tagging step) — it'll stay
static unless someone edits it directly.

## External dependencies

Documents (but does not run) `IPSP-Api`, the `sdk`, and the identity flows. Content should
track those repos' actual behaviour. At runtime, the page itself loads docsify core and
plugins from `cdn.jsdelivr.net`/`unpkg.com` — the site won't render correctly without
outbound access to those CDNs from the visitor's browser (not from the server).

## Development commands

- Serve locally (dev only, not representative of production): `npm run start` (`docsify
  serve`).
- Production image, local check: `docker build -t proofme-docs .` then `docker run --rm -p
  8080:80 proofme-docs`.
- No lint/test — it's static Markdown; CI's only real check is that the Docker image builds.

## Configuration

docsify configuration lives in `index.html`; navigation in `_sidebar.md`. No environment
variables / runtime config — everything here is static content, unlike the platform's usual
`window["env"]` convention (see root `CLAUDE.md`).

## Common change patterns

- New API endpoint documented: add a Markdown page under `api/v1/<domain>/` and link it in
  `_sidebar.md`.
- Keep the documented API contract in sync with `IPSP-Api` (`routes/v1`) and SDK changes in
  `sdk`.

## Important constraints / pitfalls

- This is **public**, integrator-facing documentation — accuracy against the real API/SDK
  matters more than anything.
- New pages must be added to `_sidebar.md` or they won't appear.
- Don't use `docsify serve`/the `node:*` image for production — it's a dev convenience
  server, not hardened/optimized for serving traffic (see "Deployment"); production is
  nginx, no Node.js runtime in the image at all.
- Any new repo-root **tooling** file (not a docs content folder) needs adding to the
  `Dockerfile`'s `rm -rf` cleanup list, or it gets served publicly at the site root
  (verified during this setup: without that list, `package.json`, `README.md`, etc. would
  otherwise be reachable — there's no separate build output to be selective about instead).
- A CSP or cache-header change in `nginx.conf`/`security-headers.conf` can silently break
  docsify (blank page, plugin not loading) without any build/deploy-time error — spot-check
  in an actual browser, not just `curl`.

## Instructions for Claude

When an `IPSP-Api` contract or `sdk` API changes, update the corresponding docs here. Add new
pages to `_sidebar.md`. Do not document endpoints/behaviour that don't exist in the code.
Production deployment is Docker (nginx, no build step) + Coolify — GitHub Actions is CI
validation only (`docker build .`) and must not become a deployment pipeline again (no
registry push, no re-adding the old Jenkins clean-up job). If you touch `Dockerfile`/
`nginx.conf`/`security-headers.conf`/`index.html`'s script tags, rebuild and run the image
locally, and check a real browser's console for CSP/script-loading errors before considering
the change done — `curl` alone won't catch a broken docsify page.
