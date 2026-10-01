# Search follow-up — local review, 2026-10-01

## Scope and operating state

Local branch: `codex/search-followup-tax-2026`, based on production
`d3a31b9bfb4fca6da789c4e647daf068f542b14e`. No push, PR, merge or deployment is
authorized for this stage. The original D: checkout remains on main with its
existing untracked instructions and reports preserved. Existing authenticated
GitHub reads confirmed the same main SHA and all ten workflows
`disabled_manually` during this task.

The home reference-information commit `5641010` and API diagnostics commit
`93487b` remain on separate local branches and are excluded from this branch.
No public-data synchronization, automatic publication, account setup, secret
access or ad-setting changes were performed.

## Evidence used to choose pages

Existing GSC export: original checkout `.claude/reports/gsc-latest.json`, fetched
2026-09-30T01:50:39.486Z, **2026-08-31 through 2026-09-28, inclusive 29 days**.
The export's `days: 28` is a date-difference field; it is not the inclusive
report duration. Its page rows total 3,125 impressions and 14 clicks. This is a
saved baseline, not a new live report or evidence of improvement.

| Existing page | Impressions | Clicks | CTR | Average position | Concrete issue |
| --- | ---: | ---: | ---: | ---: | --- |
| `/calculator/property-tax/` | 53 | 0 | 0% | 9.60 | Description promoted absent ratio input/annual-payment discount; HowTo described absent inputs. |
| `/calculator/broker-fee/` | 52 | 0 | 0% | 8.77 | Title incorrectly claimed a 5억원 sale's limit was 720만원; VAT and monthly-rent explanations conflicted with actual controls. |
| `/calculator/salary/` | 56 | 0 | 0% | 14.91 | Repetitive year wording and definitive OG description omitted the income-tax approximation caveat. |

The higher-impression inflation page (626 impressions/1 click) and freelancer
comparison guide (64/3) were already improved in production and were not changed
again. Page and query exports are separate; no page-specific query attribution
was inferred. Small samples and zero clicks do not establish causation.

## Changes

- Tax category's 1세대1주택 FAQ, visible glossary and DefinedTerm share the same
  explanation: actual transfer price, 12억원 high-value threshold, income-tax
  article 89, and applicable holding/residence conditions. This replaces the
  incorrect 공시가격 9억원/article 94 claim. Temporary-two-house guidance asks
  users to check acquisition date, area and applicable deadline instead of
  promising a blanket two- or three-year rule.
- Property and broker metadata, OG/Twitter and JSON-LD descriptions describe
  supported inputs and exclusions. HowTo steps match actual controls. Salary
  metadata and JSON-LD explain estimated income tax and the fact that the NTS
  withholding table is not directly queried.
- Broker wording treats qualifying officetel rates as upper limits, corrects
  the 15억원 boundary and the monthly-rent 100/70 conversion rule, and removes
  the false assertion that VAT disappears without a tax invoice. The optional
  10% VAT calculation remains an estimate; actual business taxation must be
  checked. Calculator functions and defaults are unchanged.
- Each property/broker calculator has one explicit native link, after the
  result and outside advertisements/collapsed evidence, to the existing
  `/guide/category/tax-real-estate/` purpose hub. It sends no financial values,
  query parameters or new analytics events.
- Guide index now says “주제별 계산 안내”; its first six cards use category labels
  and practical purpose descriptions rather than an unsupported current-search
  popularity claim and July seasonal promotion. Titles, ordering and URLs are
  preserved.
- Only the five substantially edited routes receive new manifest lastmod dates.
  Existing sitemap/robots implementations are retained for verification.

## Official grounds and search-policy limits

- [NTS capital-gains overview](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308): holding/residence and actual-price high-value exclusion.
- [Current income-tax decree article 155](https://www.law.go.kr/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1001061953): temporary-two-house conditions and exceptions.
- [Seoul official brokerage fee schedule](https://land.seoul.go.kr/land/broker/brokerageCommission.do): 2억원–under 9억원 sale upper rate 0.4%, hence 5억원 upper fee 200만원 before VAT.
- [NTS VAT overview](https://d.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272): general/simplified taxation differs; invoice issuance alone is not a tax-exemption rule.
- [Naver content markup](https://searchadvisor.naver.com/guide/markup-content), [Google snippets](https://developers.google.com/search/docs/appearance/snippet), [Google crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): accurate page-specific descriptions and crawlable descriptive anchors. Engines may select different snippets; title/OG differences alone are not failures. No ranking or revenue guarantee is made.

## Verification

Final source checks: TypeScript PASS, ESLint PASS, Vitest **67 files/1,219 tests
PASS**. Production-mode **npm run build**, including prebuild and postbuild,
PASS: 503 static route jobs. Six committed data snapshots and 435 dates were
validated without synchronization or account access. The build's network guard
recorded zero external attempts and zero private-file reads.

Offline Chrome QA **20/20 PASS** at 390px mobile and 1440px desktop: the three
calculators' metadata/OG/Twitter/canonicals, mobile width, broker 5억원/200만원
and selected VAT/220만원, changed-input/back-navigation retention, property
controls and exclusions, tax exemption FAQ/definition, guide index wording and
two JavaScript-disabled native guidance links. No selected-flow runtime or
hydration errors were found. Export checks cover 444 HTML files, the unchanged
435 sitemap URLs/self-canonicals, verified manifest dates and all rendered Next
CSS/JS assets allowed to Googlebot/Yeti. Public visitor-copy audit: 444 HTML
files, zero prohibited AI mentions in body, metadata, attributes and JSON-LD.

The first browser run was 15/20 because the new harness parsed only the first
inline category slug, filled a currency control before its focus transition,
and counted a display-unit selector as a fourth tax condition. Read-only DOM
and source inspection isolated these harness mistakes. Only the external QA
helper was corrected; the second run passed 20/20 with unchanged source/build.
Local evidence is in the parent task workspace `preview-evidence/`:
`search-followup-tests.log`, `search-followup-typecheck.log`,
`search-followup-lint.log`, `search-followup-production-build.log`,
`search-followup-browser.log`, `search-followup-browser-recheck.log`,
`search-followup-public-copy.json`, and `search-followup-*.png`.

Existing test success is a regression check, not certification of all existing
tax rules. No live-site change, search-engine recrawl, online Rich Results Test,
field Core Web Vitals or advertising-revenue effect was measured here.

## Separate read-only accuracy findings — not modified here

### Severance

The supplied 300만원, zero extras, 2025-01-01 to 2026-01-01 case was reproduced
by the current pure function: service 366 days, averaging period 93 days,
average daily wage 96,774원 (UI 96,770원 because of money formatting), gross
2,911,170원. The code does not compare average daily wage with ordinary daily
wage. Both period calculations include `+1` while the UI does not clearly
define the departure date.

[MOEL's calculator](https://www.moel.go.kr/retirementpayCal.do) defines retirement
date as the day after the last workday and applies ordinary wage when higher.
With that date meaning and **explicit assumptions** of 40 hours/week,
8 hours/day, 209 hours/month, independent calculation gives service 365 days,
averaging 92 days, ordinary daily wage about 114,832.54원, gross about
3,444,976원. This is conditional undercalculation, not a claim that every case
is wrong. Follow-up should define dates, separate actual averaging wages from
ordinary wages, expose required work-hours assumptions and test both sides of
the average/ordinary comparison. No severance source was changed.

### Property tax

Existing examples and the pure function agree: 6억원/1세대1주택 gives
1,260,000원 with urban-area tax, 756,000원 without it. However, both use a fixed
60% assessment ratio. [Current local-tax decree article 109](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0109&lsiSeq=290815&urlMode=lsScJoRltInfoR)
specifies 43%/44%/45% for qualifying one-household-one-house properties across
published-price bands. For 6억원 at 44%, independent simplified calculation is
787,200원 with urban-area tax and 417,600원 without it, excluding caps and
regional resource tax. The current ratio is an existing formula defect,
not introduced by these search-copy edits. Property accuracy must be corrected
and boundary-tested before promoting it as a current-year accurate calculation.
No formula correction or deployment is included in this task.

## Measurement and next gate

After a separately approved deployment and recrawl, compare the three page
URLs' impressions, clicks, CTR and position over comparable 28-day windows;
also inspect actual shown snippets and existing calculator completion events.
Record deployment time and seasonality. No financial input or query term should
be added to events or URLs. The new plain guidance links have no dedicated
click event; current navigation alone cannot prove conversion lift.

Full law-reference validation and live Naver/GSC recrawl are outside this local
verification. Outstanding API work remains separate. Proposed representative
home/salary/loan UI work is a subsequent local stage and is not included here.
