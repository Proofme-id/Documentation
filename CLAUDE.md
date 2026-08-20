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
  pull docsify core + most plugins from `cdn.jsdelivr.net`/`unpkg.com` CDNs at runtime),
  `_sidebar.md` (nav), `_coverpage.md`, `styles.css`, `media/` (images, `favicon.ico`,
  `version.json`), `plugins/` (markdown content *about* Proofme's own webrtc plugins — not
  docsify plugin code, despite the name).
- `vendor/` — a **vendored, patched** copy of the `websequencediagrams-docsify` plugin,
  served locally instead of loaded from unpkg. See "Deployment" and the file's own header
  comment for why.
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
static unless someone edits it directly. Uses `actions/checkout@v7`, `actions/setup-node@v7`,
Node 24 (current Active LTS as of this writing) — kept current, bump again as newer LTS
releases land.

**`docsify-cli` is pinned to `5.0.0`** (local `npm run start` dev server only — not present
in the production image, so this version is fully decoupled from what actually renders the
live site; see "Configuration" below for that). Confirmed working locally
(`npx docsify-cli --version` → `5.0.0`, `npm run start` serves on `:3000`).

**The live site itself loads docsify v5 from CDN** (`index.html`'s
`//cdn.jsdelivr.net/npm/docsify@5` + matching `lib/themes/vue.css`) — bumped from v4
deliberately, as an explicit, flagged decision (not a silent bump), because of a real risk:
docsify v5 was released 2026-07-23 (a few weeks old at the time), and at least one of the
four CDN-loaded plugins this site depends on (`docsify-tabs`) hadn't been updated in a year
at that point — i.e. predates v5 entirely, with no *confirmed* compatibility from its own
maintainer. This repo had already broken twice in production from docsify-config issues that
only surfaced in a real browser (see git history — deleted `README.md`; an over-strict CSP),
and there's no browser-testing tool available here to fully verify a v5 bump before deploying.

What *was* verified without a browser, before shipping this bump: the CSS theme path
(`lib/themes/vue.css`), core script path, and the unpinned emoji plugin path
(`lib/plugins/emoji.min.js`) all still resolve at v5 (same layout as v4, checked via `curl`
against the actual CDN URLs); the compiled v5 bundle still contains an `.origin` fallback
assignment on its renderer object, matching the pattern this site's custom
`markdown.renderer.code` override in `index.html` depends on
(`this.origin.code.apply(this, arguments)`, used for the drawio code-block handling).

**Confirmed outcome (from an actual post-deploy browser check):** `docsify-tabs` works
correctly under v5. Two real issues surfaced, both fixed:

1. **`$docsify.themeColor` is deprecated in v5** (console warning, not an error) — replaced
   with the v5-supported `--theme-color` CSS custom property, set in a small inline
   `<style>` block in `index.html`'s `<head>`. No visual change intended.
2. **`websequencediagrams-docsify@2.0.1` broke outright**: `TypeError: Cannot read
   properties of null (reading 'textContent')`. Root-caused by diffing the compiled
   docsify@4 vs docsify@5 CDN bundles: v4 rendered a fenced code block's `<code>` element as
   `class="lang-websequencediagrams"` (one class); v5 renders it as
   `class="lang-websequencediagrams language-websequencediagrams"` (two classes, presumably
   for Prism/highlight.js ecosystem compatibility). The plugin looked up that element with
   an **exact-match** attribute selector (`code[class=lang-websequencediagrams]`), which
   only matches when the class attribute is *precisely* that string — so it silently
   returned `null` under v5's two-class output, for every sequence-diagram code block across
   the site (`examples.md`, `intro/identifications.md`, `diagrams/*.md`,
   `components/signalling.md`). Fixed by **vendoring a patched copy** at
   `vendor/docsify-websequencediagrams.js` (loaded from `/vendor/...` instead of unpkg) —
   the only change from upstream 2.0.1 is that one selector, changed to the class selector
   `code.lang-websequencediagrams`, which matches regardless of any additional classes and
   so is correct under both v4's and v5's output. The plugin has had no release since 2.0.1
   and is effectively unmaintained, hence vendoring a fix rather than waiting for/expecting
   an upstream update.

A second round of console findings after that fix (both harmless, both cleaned up):

3. **"Docsify emoji plugin has been deprecated as of v4.13"** — emoji rendering has been
   built into docsify core since that release (confirmed present in the v5 bundle's compiled
   output). The separate `//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js` script tag
   was removed from `index.html`; nothing else changed, emoji rendering still works via core.
4. **`GET /<nested-path>/_sidebar.md` 404s on every non-root page** — expected docsify
   behaviour, not a bug: with `loadSidebar: true` and no per-directory `_sidebar.md` files
   (this site only has the one at the root), docsify tries a directory-relative sidebar
   first on every nested page and falls back to the root one after that request 404s.
   Functionally harmless (the correct sidebar always ends up showing) but noisy. Suppressed
   with an `alias` config
   (`alias: { '/.*/_sidebar\\.md': '/_sidebar.md' }`) that redirects
   any nested sidebar lookup straight to the root file before a request is even made — the
   `alias` config option was confirmed still supported in v5 by inspecting the compiled
   bundle (`t.alias?this.#n(e,t.alias):e` in the path-resolution code) before relying on it.
   If a per-directory sidebar is ever genuinely wanted for some section, this alias would
   need to be scoped (e.g. to a regex excluding that section) or removed.

If another docsify-plugin error shows up in the console after a future change here, the
same pattern (v5 changed some generated-HTML detail; an old, unmaintained CDN plugin's
selector/assumption was too strict for it) is the first thing to check — inspect the actual
compiled bundle output (`curl` the CDN URL, `grep` for the relevant template string) rather
than guessing, the way the `websequencediagrams-docsify` fix above was diagnosed.

## External dependencies

Documents (but does not run) `IPSP-Api`, the `sdk`, and the identity flows. Content should
track those repos' actual behaviour. At runtime, the page itself loads docsify core and most
plugins from `cdn.jsdelivr.net`/`unpkg.com` — the site won't render correctly without
outbound access to those CDNs from the visitor's browser (not from the server). One plugin
(`websequencediagrams-docsify`) is the exception — vendored locally at `vendor/`, see
"Deployment", so it doesn't depend on unpkg being reachable or unchanged.

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
