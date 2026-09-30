# Cloudflare build lifecycle review — 2026-09-30

Production and preview settings were read by the parent from user-supplied Cloudflare screenshots: `npm run build`, output `out`, root repository, production `main`, all non-production branches as previews, automatic deployment enabled. GitHub Actions being OFF does not disable Cloudflare Git integration. No Cloudflare settings or financial data were changed in this review.

## Previous prebuild side effects (source inspection; not executed)

| Step | Reads / writes | Failure behavior |
|---|---|---|
| generate-llms-txt | Local guide index and calculator directories; replaces public LLM counts/list | Missing markers fail |
| generate-og-images | Local page/asset generation using sharp | Existing assets normally skipped; generation errors generally warn |
| convert-images-to-avif | Local PNG → AVIF | Per-image errors warn |
| sync-public-data | Implicit `.my` loader; ECOS, EXIM, FSS, KOSIS GETs when keys exist; overwrites cached JSON and timestamp/status metadata | Missing keys skip; API failure generally keeps cached values and changes status; unexpected fatal error can fail |
| generate-network-mirror | Local page metadata; writes public mirror | Previously fabricated unknown publication dates from checkout mtime and lastUpdated from build clock |
| check-state | Public-site HEAD and read-only GitHub workflow query; rewrites `.claude/STATE.md` | Missing STATE exits 2; network failures generally recorded as unknown/error |
| generate-date-modified-manifest | Local git history; rewrites reviewed page dates | Shallow-history fallback supported; caught errors generally warn |

No step above creates articles, pushes Git, enables Actions, or explicitly publishes. Cloudflare uploads the resulting `out` after successful build. The previous chain could change financial input data simply because a branch was built, independently of the 10 disabled workflows. FSS/KOSIS fallback values could be marked live; cached dates are April/May 2026. This review does not refresh or certify those values.

## Local correction

Build validates six committed JSON snapshot objects and all 435 committed page dates, then generates local LLM/image/mirror artifacts. Synchronization, account/state querying and date-manifest regeneration remain separate manual maintenance commands and are absent from `prebuild`. Next config no longer implicitly loads private `.my`. Host-provided environment variables remain supported.

Missing/malformed files or missing/invalid page dates fail validation before export; no keys or external data API availability are required. Validation establishes structural availability and date consistency, not financial freshness. Mirror lastUpdated is derived from committed content dates; unknown publication dates remain null. Existing DTI is included in the calculator mirror. LLM generated list uses the existing guide index; no new articles are created.

## Executed validation

- Actual `npm run build` including prebuild and postbuild: exit 0, 503 generated routes. Run with dummy public-data keys, external networking blocked and `.my` reads blocked: nine Node guard reports, zero external attempts and zero private reads. A first verification invocation failed before npm startup due to Windows NODE_OPTIONS path quoting; corrected to forward slashes before the successful run.
- SHA-256 comparison: all six financial/status snapshots, committed date manifest and `.claude/STATE.md` unchanged.
- Full Vitest: **1187/1187 across 65 files**, including 23 new build/date/preview regressions. Initial sandbox startup failed because esbuild could not inspect a parent directory; authorized local test rerun succeeded. Typecheck and lint passed.
- Source-derived LLM and mirror hashes unchanged on a second prebuild. Existing guide index has 383 entries. Mirror includes 31 calculators, 18 selected guides and the existing 30 extracted glossary entries; lastUpdated `2026-09-30T12:18:44.000Z` comes from the reviewed manifest, not current build time.
- All **444 exported HTML** documents have preview noindex, no external ad preconnect. Non-main Cloudflare builds receive HTTP X-Robots-Tag, restrictive same-origin CSP and disallow-all preview robots. Production `main` export skips hardening and retains existing crawler behavior. Root public services and WebVitals components are omitted from Cloudflare previews; existing hostname guards provide additional runtime protection.
- Pages middleware also sets preview noindex/CSP on Pages aliases, because Functions can bypass static `_headers`. Preview API handlers return 503 before making external data requests; production API behavior remains unchanged. Chrome headless smoke of home/salary/loan/acquisition after calculation: HTTP 200, zero page errors, zero external requests/scripts, original canonical preserved. Next hydration can append the original index meta; the persistent noindex meta and HTTP X-Robots-Tag remain the restrictive indexing directives. Actual public headers must be verified before sharing the preview.
- Prior finance/UI evidence remains applicable: 31 calculators/74 UI E2E, latest acquisition 16 E2E and 1164 earlier units. This build change does not rewrite finance logic. Actual public Cloudflare build and HTTP headers must still be verified after the approved separate-branch push.

Evidence is retained outside the repository under `../preview-evidence/`: `npm-build-lifecycle.log`, `build-lifecycle-unit-results.json`, `build-lifecycle-verification.json`, `build-input-hashes-before.json`, `build-preview-runtime.json`. No account revenue/baseline report is committed.

Source-derived artifact repeatability is checked; byte-identical Next builds across operating systems/build IDs are not claimed. Generated default OG PNG/AVIF changed when checked out source SVG was newer and regenerated locally; no financial data changed.

Official behavior: [npm script lifecycle](https://docs.npmjs.com/cli/v11/using-npm/scripts/), [Cloudflare build variables](https://developers.cloudflare.com/pages/configuration/build-configuration/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

Residual scope: historical mirror glossary extraction/anchors need a separate focused correction; the full legal-reference registry remains incomplete as documented in the release content gate. No registry entries were fabricated, no automation enabled, no financial snapshots refreshed.
