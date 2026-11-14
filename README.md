# Fusion Finance Reference

A static reference site that maps a cruise-line finance function onto **Oracle Fusion Cloud** (Financials, Procurement, Project Management, EPM, Risk Management and integration). It documents **98 finance processes** with **815 L4 steps**, a fit-gap position for each process, and a **Design Decisions Register** of **26** decisions that a cruise Fusion programme has to make. The site is titled "NCLH Finance Process Map" / "NCLH - Fusion Finance Model General Arrangement"; the GitHub description calls it a "Finance process reference model - working draft".

**Live site:** https://ghatk047.github.io/fusion-finance-reference/ (GitHub Pages, branch `main`, folder `/`)

It is meant for finance transformation consultants, solution architects and proposal teams who need a structured starting point for scoping a cruise-industry Oracle Fusion Finance implementation, and a list of the design questions to settle early.

> **Disclaimer.** This is an independent reference model prepared for proposal purposes. It is **not affiliated with, endorsed by, or derived from confidential information of Norwegian Cruise Line Holdings Ltd.** Every process, verdict and recommendation is a hypothesis built from publicly available information and cruise-industry practice; it is meant to be validated or corrected and does not represent NCLH's actual processes, systems or decisions. Oracle, Fusion, PeopleSoft and related marks belong to Oracle Corporation.

> **Indexing.** The site carries `<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">` on every HTML page and a `robots.txt` with `Disallow: /`, so search engines are asked not to index it. The repository itself is public, so anyone can still read the files.

## What is in the site

| Page | What it is |
|------|------------|
| `index.html` | Landing page ("General Arrangement" design, framed as a ship's longitudinal section); links to the overview and the decisions register |
| `overview.html` | Finance Process Map: all 98 processes grouped by pillar and process group, with a quick search ("Press / to search") |
| `decisions.html` | Cruise Finance Design Decisions Register: 26 decisions (DD-01 to DD-26) in 9 categories, with options, a recommendation, reversibility, decide-by point and owner. The page header counts 3 irreversible and 3 very hard to undo |
| `<pillar>.html` (`fin`, `prc`, `ppm`, `epm`, `grc`, `xtn`) | One page per pillar listing its process groups and processes |
| `<pid>.html` (98 pages, e.g. `fin-gl-03.html`) | One page per process (see below) |
| `concepts/` | Seven landing-page design concepts A-G (plus matching interior pages `d-process.html` to `g-process.html`) and a comparison index. These are visual design explorations, driven by the same numbers |

### Pillars, groups and process counts

| Pillar | Name | Process groups (ID prefix: count) | Total |
|--------|------|-----------------------------------|-------|
| FIN | Core Financials | `fin-gl` General Ledger, Close & Intercompany: 9; `fin-ap` Payables & Expenses: 8; `fin-ar` Receivables & Revenue: 9; `fin-am` Assets, Leases, Cash & Tax: 8 | 34 |
| PRC | Procurement & Supply | `prc-sr` Sourcing & Supplier Management: 8; `prc-pp` Purchase to Receipt: 8 | 16 |
| PPM | Project & Capital | `ppm-cp` Capital Projects & Fleet Investment: 6; `ppm-pc` Project Control & Governance: 6 | 12 |
| EPM | Planning, Close & Reporting | `epm-pc` Consolidation, Close & Disclosure: 7; `epm-pl` Planning, Forecasting & Analytics: 7 | 14 |
| GRC | Risk, Controls & Compliance | `grc-ac` Access & Segregation of Duties: 4; `grc-cc` Controls, Audit & Financial Compliance: 4 | 8 |
| XTN | Integration, Data & Sustaining | `xtn-in` Integration Architecture: 7; `xtn-dm` Data Migration & Sustaining: 7 | 14 |
| | | | **98** |

Process IDs are `<PILLAR>-<GROUP>-<NN>` (for example `FIN-GL-03`, "Voyage & Vessel Cost Dimension Design"); the page and its diagram use the lower-cased ID.

### Anatomy of a process page

Each `<pid>.html` has: a description; a **fit / gap position** (one of Fit, Config, Extension or Integration, with a rationale and an "open question for validation"); a process-flow diagram (`img/<pid>.png`, click to enlarge); the **L4 process steps** table (step, name, role, system, input, output, KPI, decision flag, exception flag, pain point); and a "Systems, measures and risks" section. Across the 98 processes the fit-gap positions are: Config 63, Fit 15, Integration 11, Extension 9.

## Repository layout

```
.
├── index.html            Landing page
├── overview.html         Process map of all 98 processes
├── decisions.html        Design Decisions Register (26 decisions)
├── fin.html prc.html ppm.html epm.html grc.html xtn.html    Pillar pages
├── fin-gl-01.html ... xtn-dm-07.html                        98 process pages
├── concepts/             Design concepts a-g (+ d/e/f/g-process interiors) and index.html
├── img/                  98 process-flow PNGs, one per process page (<pid>.png)
├── assets/
│   ├── css/site.css      Styles
│   └── js/site.js        Resizable sidebar (width saved in localStorage), search box behaviour
├── robots.txt            Disallow: /
└── .nojekyll
```

## Viewing and building

There is **no build step and no generator in this repository**. It contains only static HTML, CSS, one small JS file and PNGs; GitHub Pages serves the `main` branch root directly (legacy branch-based Pages, no Actions workflow). The repo has a single commit.

To view locally, open `index.html` in a browser, or serve the folder with any static file server (for example `python3 -m http.server` from the repo root; this is a generic approach, not a script from the repo). There are no validators, tests or package files to run.

## Current status

**Done**

- 98 of 98 process pages with description, fit-gap position, flow diagram and L4 steps (815 steps in total).
- 6 pillar pages, the process map, the 26-item decisions register and 7 landing-page concepts.
- Resizable sidebar and search on the content pages.

**Not done / open**

- Everything is labelled a **hypothesis**. The pages carry "open question for validation" items that nobody has validated against the real organisation.
- It is not recorded in the repo how the process pages and the 98 diagrams were produced, and no source data (spreadsheet, JSON) is checked in. The HTML is therefore the only source of truth.
- The concepts directory contains design explorations (A-G) rather than a chosen design; the repo does not say which concept, if any, is final. The root landing page is titled "General Arrangement", which is also the name of Concept B.

## Contributing and conventions

- Keep the **disclaimer** on the landing, overview and concept pages, and keep content phrased as hypothesis from public information. Do not add anything confidential or client-specific.
- Keep `noindex` and `robots.txt` as they are unless you have decided the site should be indexable.
- The full process list is repeated in the sidebar of every page (the page text of `fin-gl-03.html`, for instance, contains all 98 entries). Adding, renaming or removing a process means updating the sidebar in every page, plus `overview.html`, the pillar page, and the counts quoted on the landing page, overview and `concepts/index.html` ("98 processes, 815 L4 steps, 26 design decisions").
- New process pages should follow an existing page's structure and add a matching `img/<pid>.png`.
- Decisions use IDs `DD-01` to `DD-26`, defined only in `decisions.html`; keep IDs stable.
- The repository is public: do not commit credentials or private client material.
