# Tasks: Habibi Digital Catalog (`Main` Flow)

**Input**: Design documents from `/specs/001-habibi-catalog/` and Figma `AKYrZy4qmkFvLONvT7AFPR`

## Phase 1: Setup & Asset Synchronization

- [x] T001 Initialize Spec Kit constitution (`.specify/memory/constitution.md`) and `DESIGN.md`
- [x] T002 Create `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, and install stack dependencies (React 19, TS ~6, Vite 8, Radix UI, `zod@4.6.7`, `i18next`, Vitest 5, etc.)
- [x] T003 Download all Figma static assets (logo, category SVGs, UI icons, bottle renders, cellar hero, world map, country flags) into `public/assets/figma/`

## Phase 2: Foundational Infrastructure

- [x] T004 Create `src/styles/tokens.css` and `src/styles/global.css` with Figma color, shadow, and typography tokens
- [x] T005 Implement `src/lib/utils.ts` (`cn()`, currency formatting, date helpers) and `src/lib/i18n.ts` (`es`/`en` translations)
- [x] T006 Create `src/data/catalog.ts` and `src/context/CatalogContext.tsx` with all Figma wines, categories, countries, and cart state

## Phase 3: Core UI Components & Views

- [x] T007 [US1/US2] Build `Menu` header component (`195:103054`) with logo, 5 categories, `ENG`/`ES` switch, and `MXN` currency selector
- [x] T008 [US2] Build `HomePage` (`6:114`) with cellar hero (`THG_Wine_Advisor 1`) and 5 category cards (`20 resultados`)
- [x] T009 [US1/US3] Build `ProductCard` (`21:89`) and `CatalogPage` Grid view with origin heading (`175:96343`) and empty state (`175:96840`)
- [x] T010 [US1] Build `WorldMapView` (`195:103052`) with interactive country markers, floating country badge (`Francia`), `+`/`-` zoom control (`195:103077`), and close button (`195:103100`)
- [x] T011 [US1/US3] Build `BottomBar` (`195:103085` / `212:111128`) with search input, country origin dropdown, Grid/Map toggle switch, and Cart button (`Total: $0.00` / `Ver carrito · N`)
- [x] T012 [US3] Build `ProductDetailDrawer` (`26:540`) and `CartDrawer` (`212:111524`) using Radix Dialog

## Phase 4: Verification & Quality Audit

- [x] T013 Write and run Vitest 5 + Testing Library test suite (`src/test/App.test.tsx`), run ESLint 10 and production build
- [x] T014 Verify rendered application against Figma screenshots and audit with `web-design-guidelines`

## Phase 5: Propuesta de Diseño en Figma — Wine Selection Cards (Figma-First)

- [x] T015 [US4] Inspect existing nodes, fonts, variables, and bottle `imageHash` assets in Figma `Main` (`0:1`) via `create_session` and read-only `use_figma`
- [x] T016 [US4] Build initial `Propuesta A`, `Propuesta B · Modal Selecciones Editoriales` (`235:87359`), and `Propuesta C · Kit de Cards al Seleccionar Vinos` (`235:87424`) in Figma `Main`
- [x] T017 [US4] Capture screenshots of initial Figma proposals and review UX density with user
- [x] T018 [US4] Build non-intrusive `Propuesta A1 (Limpia 1 · Solo Dock Inferior)` (`238:80372`) and `Propuesta A2 (Limpia 2 · Solo Panel Lateral)` (`238:87313`) in Figma `Main` and capture screenshots
- [x] T019 [US4] Export exact country SVG/PNG silhouettes from Figma `World Map` into `public/assets/figma/countries/` and add luminous country glow to `238:87313` in Figma
- [x] T020 [US4] Implement approved `238:87313` Map view (`WorldMapView.tsx` + `WorldMapView.module.css`) with glowing country silhouettes and Sleek Right Liquid Glass Wine Selection Panel
- [x] T021 [US4] Update Vitest tests (`src/test/App.test.tsx`), run `npm run test`, `npm run lint`, and `npm run build`

## Phase 6: Publicación en Cloudflare

- [x] T022 Configure `public/_redirects` for SPA routing and publish/expose the application via Cloudflare HTTPS URL so it can be viewed from anywhere without `localhost`
- [x] T023 Deploy production `dist/` bundle to Cloudflare Pages (`*.pages.dev`) — `https://habibi-catalog.pages.dev` (`https://d4c4a704.habibi-catalog.pages.dev`)

## Phase 7: Sincronización de Contenido y Flujo Actualizado de Figma (`Main`)

- [x] T024 [US3/US5] Download new Figma SVG assets (`flag-usa.svg`, `flag-spain.svg`, `flag-france.svg`, `radial-selected.svg`, `minus.svg`) into `public/assets/figma/`
- [x] T025 [US3] Update `CartDrawer` (`212:111524`, nodes `262:101081`–`266:101106`) with the `Quitar` button stacked above the `[ 🗑 1 + ]` / `[ − N + ]` stepper pill, and update `ProductCard` (`137:79876`) & `ProductDetailDrawer` (`26:540` / `175:96966`) stepper controls
- [x] T026 [US5] Update `BottomBar` & `CatalogContext` with the Figma `Selector` popover (`146:62675` / `146:62891`: `Todos los vinos` & `Seleccionados` radio filter, divider, `País de origen` search input `Buscar`, and country checkboxes with flags)
- [x] T027 [US5] Update `CatalogPage` and `Menu` to support the `Seleccionados` grid view (`146:62675`), `Home Visual / Selección de vinos Vista 1` (`11:69`), and full navigation flow between `Home` (`6:114`), `Grid` (`21:89`), `Selector` (`146:62675`), `Lugar de origen` (`175:96343`), `Sin resultados` (`175:96840`), `Detalles` (`26:540`/`175:96966`), `Carrito` (`212:111524`), and `Mapa` (`238:87313`)
- [x] T028 [US3/US5] Update Vitest test suite (`src/test/App.test.tsx`), run `npm run test`, `npm run lint`, `npm run build`, and redeploy to `https://habibi-catalog.pages.dev`
- [x] T029 [US3] Align `ProductDetailDrawer` layout to Figma `Detalles #2` (`175:96966`: `566px` drawer width, side-by-side bottle inside right column, bottom price + `[ − 1 + ]` stepper + CTA), re-verify tests/lint/build, push to GitHub, and redeploy to Cloudflare Pages
- [x] T030 [US2] Set `HomePage` (`6:114`) as the default initial landing route at `/` (with `/catalogo` for `CatalogPage`), verify tests/lint/build, push to GitHub, and redeploy to `https://habibi-catalog.pages.dev`
- [x] T031 [US2] Replace `public/assets/figma/hero-cellar.png` with the updated Figma `THG_Wine_Advisor 1` (`6:115`) asset showing `WINE | VINO — HABIBI` (instead of `THE PALACE COMPANY®`), rebuild, push to GitHub, and redeploy to Cloudflare Pages
