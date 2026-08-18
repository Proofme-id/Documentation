# Documentation

> Repo-specific guide. System-wide context: `../CLAUDE.md`.

## Purpose

The public **developer documentation** site (docs.proofme.id). Documents the Proofme API, the
SDK, DID concepts, encryption, and the MyPage/identification integration options for
third-party integrators. This is the human-readable contract layer for the platform.

## Tech stack

**docsify** (`docsify-cli`) — Markdown rendered client-side; no build step. Served as static
content (Dockerfile present).

## Structure

Markdown organised by `_sidebar.md`:
- `intro/` — identifications, hosted / BYO / on-premise MyPage.
- `custom_identification_page*.md` — hosting your own identification page.
- `sdk/` — SDK overview, `reader` (Android/iOS install + usage), `qr`.
- `api/` — overview, security, authentication, errors, webhooks, and versioned endpoints under
  `api/v1/{identification,document}/…`.
- `did/`, `encryption/`, `components/`, `diagrams/`, `examples.md`.
- `index.html` (docsify config), `_coverpage.md`, `styles.css`, `media/`, `plugins/`.

## External dependencies

Documents (but does not run) `IPSP-Api`, the `sdk`, and the identity flows. Content should
track those repos' actual behaviour.

## Development commands

- Serve locally: `npm run start` (`docsify serve`).
- No build/lint/test — it's static Markdown.

## Configuration

docsify configuration lives in `index.html`; navigation in `_sidebar.md`.

## Common change patterns

- New API endpoint documented: add a Markdown page under `api/v1/<domain>/` and link it in
  `_sidebar.md`.
- Keep the documented API contract in sync with `IPSP-Api` (`routes/v1`) and SDK changes in
  `sdk`.

## Important constraints / pitfalls

- This is **public**, integrator-facing documentation — accuracy against the real API/SDK
  matters more than anything.
- New pages must be added to `_sidebar.md` or they won't appear.

## Instructions for Claude

When an `IPSP-Api` contract or `sdk` API changes, update the corresponding docs here. Add new
pages to `_sidebar.md`. Do not document endpoints/behaviour that don't exist in the code.
