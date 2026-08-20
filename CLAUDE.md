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
`package-lock.json`, `CLAUDE.md`, `test.html`) — there's no separate build output to be
selective about instead. If you add a new *tooling* file to the repo root (not a docs content
folder), add it to that `rm -rf` list too, or it'll be served publicly.

**`README.md` is deliberately NOT in that cleanup list**, even though it looks like a
repo-tooling file — it isn't excluded. `index.html`'s `$docsify` config has no `homepage:`
override, so docsify defaults to fetching `/README.md` as the actual homepage content for the
`/` route. This was caught live: an earlier version of this Dockerfile deleted `README.md`,
which made the homepage (and, cascading from it, effectively the whole page) show docsify's
generic "404 - Not found" instead of real content, after an actual Coolify deploy — not
something `curl`/local `docker run` testing caught, since curl only confirms *a* 200 response
for `/`, not that docsify's client-side JS successfully fetched what it needed.

`nginx.conf`: docsify here uses **hash-based routing** (`#/page`, no `routerMode: 'history'`
in `index.html`) — every real HTTP request already maps to an actual file docsify fetches by
relative path (e.g. `#/intro/identifications` → `GET /intro/identifications.md`), so unlike
`Website`'s Angular setup, **no SPA fallback rewrite is needed or used**. `index.html`/
`_sidebar.md`/`_coverpage.md` are served no-cache (docs edits should show up immediately);
`.md`/`.css`/`.js`/other assets get a short (10 min) cache — content here isn't filename-hashed
the way a compiled JS bundle is, so long/aggressive caching would hide edits.

**`security-headers.conf` intentionally has no Content-Security-Policy.** A CSP scoped to the
CDN origins visible in `index.html` (`cdn.jsdelivr.net`, `unpkg.com`) was tried and broke the
live site twice after real Coolify deploys — `docsify-drawio`'s viewer loads MathJax from
`app.diagrams.net` and (from that same plugin) a Google Fonts stylesheet from
`fonts.googleapis.com`, neither visible from a static read of `index.html` since they're
fetched dynamically by the plugin's own JS, not declared as `<script>`/`<link>` tags. A CSP
fails *silently* (blank content, broken plugin, no build/deploy-time error) — see
`security-headers.conf`'s comment for the full reasoning before re-adding one. The other
three headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) stayed; they
can't break page functionality the way a CSP can.

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
  `Dockerfile`'s `rm -rf` cleanup list, or it gets served publicly at the site root — except
  `README.md`, which must stay (see "Deployment": it's docsify's actual homepage content,
  not a tooling file, even though it looks like one).
- Don't add a `Content-Security-Policy` back to `security-headers.conf` without testing
  every plugin (drawio, tabs, search, emoji) in a real browser console first — see that
  file's comment; it broke the live site twice already for exactly this reason.
- A cache-header or nginx routing change can still silently break docsify (blank page,
  stale content, missing homepage) without any build/deploy-time error — `curl` only proves
  *a* response came back, not that docsify's client-side JS got what it needed. Spot-check
  in an actual browser after any `Dockerfile`/`nginx.conf` change.

## Instructions for Claude

When an `IPSP-Api` contract or `sdk` API changes, update the corresponding docs here. Add new
pages to `_sidebar.md`. Do not document endpoints/behaviour that don't exist in the code.
Production deployment is Docker (nginx, no build step) + Coolify — GitHub Actions is CI
validation only (`docker build .`) and must not become a deployment pipeline again (no
registry push, no re-adding the old Jenkins clean-up job). If you touch `Dockerfile`/
`nginx.conf`/`security-headers.conf`/`index.html`'s script tags, rebuild and run the image
locally, then check a **real browser's console** (not just `curl`) before considering the
change done — this repo has already broken twice in ways `curl`/local `docker run` testing
did not catch (a deleted `README.md` breaking the homepage; a CSP blocking a plugin's
dynamically-loaded resources), both only visible with actual browser dev tools.
