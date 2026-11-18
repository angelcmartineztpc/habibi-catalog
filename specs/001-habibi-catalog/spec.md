# Feature Specification: Habibi Digital Catalog (`Main` Flow)

**Feature Branch**: `001-habibi-catalog`  
**Created**: 2026-11-17  
**Status**: Approved  
**Figma Source**: `https://www.figma.com/design/AKYrZy4qmkFvLONvT7AFPR/Habibi?node-id=195-103052` (Page `0:1` `Main`)

## User Scenarios & Testing

### User Story 1 - Explore Interactive World Map & Origin Filtering (Priority: P1)

As a guest or sommelier using the iPad Pro 11" catalog, I want to switch between the **World Map** (`195:103052`) and the **Product Grid** (`21:89`), zoom into wine-producing regions, select a country (e.g., `Francia` or `México` `175:96343`), and filter the catalog by origin or search query (`175:96840`).

**Independent Test**: Render the Catalog route in Map and Grid modes, verify clicking country pins/pills or the origin selector filters the displayed bottles, and verify non-matching search terms show the empty state (`No se han encontrado resultados`).

**Acceptance Scenarios**:

1. **Given** the user is on the Catalog screen in Map view (`195:103052`), **When** they click a country pin (e.g., `Francia` or `México`) or use the `+`/`-` zoom controls, **Then** the floating country badge updates and the user can filter bottles from that country.
2. **Given** the user is on the Catalog Grid (`21:89`), **When** they select `México` from the origin selector in the bottom search bar (`175:96343`), **Then** the heading `México` appears in Cormorant Garamond and only Mexican bottles are displayed.
3. **Given** the user types a search query with no matches, **When** the list updates (`175:96840`), **Then** the empty state title `No se han encontrado resultados` and helper text are shown.

---

### User Story 2 - Browse Categories & Home Landing Experience (Priority: P1)

As a guest, I want to start from the **Home** cellar hero screen (`6:114` / `11:69`) featuring the `HABIBI` brand header, language/currency switches, and the 5 category cards (`Vinos`, `Cervezas`, `Sakes`, `Licores`, `Cortes`), and navigate directly into any category.

**Independent Test**: Render the Home view and top Menu bar, switch categories (`Vinos`, `Cervezas`, `Sakes`, `Licores`, `Cortes`), toggle language (`ES` / `ENG`), and change currency (`MXN`, `USD`, `EUR`).

**Acceptance Scenarios**:

1. **Given** the user opens the Home landing view (`6:114`), **When** they tap any of the 5 category cards (`Vinos`, `Cervezas`, `Sakes`, `Licores`, `Cortes`), **Then** they transition to the Catalog view with that category active.
2. **Given** the user toggles `ENG` / `ES` or changes currency (`MXN`), **When** the selection changes, **Then** all UI labels and product prices update immediately.

---

### User Story 3 - Inspect Product Details & Manage Shopping Cart (Priority: P1)

As a guest, I want to tap any bottle card to open the **Product Detail Drawer** (`26:540` / `175:96966` — e.g., `Champagne Krug`, `Grande Cuvée`, producer, grapes, price with IVA, and quantity selector `[ − 1 + ]`) and add, adjust quantities (`[ 🗑 1 + ]` / `[ − N + ]`), or explicitly remove items via the **`Quitar`** action (`262:101081`) in the **Shopping Cart Drawer** (`212:111524`) or directly from the product card stepper (`137:79876`).

**Independent Test**: Click a product card to open the detail drawer, adjust quantity or click `Agregar al carrito`, verify the bottom cart button updates (`Ver carrito · N` / `Total: $...`), and open the Cart drawer to increment, decrement, or click `Quitar` (`262:101083`) to remove items.

**Acceptance Scenarios**:

1. **Given** the Catalog Grid or Visual Showcase (`11:69`) is displayed, **When** the user clicks a bottle card, **Then** the slide-over Detail Drawer (`26:540` / `175:96966`) opens showing the bottle render, title, subtitle, price with `IVA incluido`, quantity stepper (`[ − 1 + ]`), description, `Productor`, `Uvas`, and `Agregar al carrito` CTA.
2. **Given** items are in the cart, **When** the user clicks the bottom Cart button, **Then** the `Tu carrito` drawer (`212:111524`) opens displaying each item card with its right-side action stack: a **`Quitar`** button (`#8c8c8c`, `14px`) above the `[ 🗑 1 + ]` / `[ − N + ]` quantity stepper pill (`#19160f`).

---

### User Story 5 - Complete Figma `Main` Flow: Home, Visual Showcase (`11:69`), Collection & Origin Popover (`146:62675`), and Origin Grid (`175:96343`) (Priority: P1)

As a guest navigating the full Figma `Main` flow, I want to move seamlessly between **Home** (`6:114`), **Home Visual / Selección de vinos Vista 1** (`11:69`), **Home Grid** (`21:89`), **Home Grid - Seleccionados & Dropdown Selector** (`146:62675`), **Lugar de origen** (`175:96343`), **Sin resultados** (`175:96840`), and **World Map** (`195:103052` / `238:87313`).

**Independent Test**: Open the bottom bar selector (`Todos los vinos ▼`), verify the popover (`146:62891`) shows radio options (`Todos los vinos`, `Seleccionados`), divider, `País de origen` search input (`Buscar`), and country checkboxes with flags (`México`, `Estados Unidos`, `España`, `Francia`, etc.); verify selecting `Seleccionados` filters the grid with the `Seleccionados` heading (`146:62885`).

---

### User Story 4 - Editorial Wine Selection Cards & Liquid Glass Map Curations (Priority: P1)

As a guest selecting wines by occasion or region on the iPad Pro 11" catalog, I want **Editorial Selection Cards** (`Selecciones editoriales: Una selección para cada ocasión` — `Todos los vinos`, `Francia`, `Incluidos`, `México`) and **Liquid Glass Floating Wine Selection Cards** over the World Map and Catalog Grid, combining Habibi's warm cellar palette (`#363021`, `#302b22`, `#d3cdbc`, `#b18e5e`) with translucent frosted glass cards, bottle trios, terroir indicators, and active selection states.

**Independent Test**: Inspect the proposed Figma frames in page `Main` (`0:1`) for visual hierarchy, token bindings, bottle imagery, and interactive selection states; once approved by the user in Figma, implement the approved components in React + CSS Modules.

**Acceptance Scenarios**:

1. **Given** the user opens Editorial Selections in Figma (`Main`), **When** viewing the modal and cards, **Then** each card displays either the minimalist bottle icon (`Todos los vinos`) or a curated trio of wine bottles (`Francia`, `Incluidos`, `México`), serif title (`Cormorant Garamond`), subtitle, wine count, and active gold border (`#b18e5e`).
2. **Given** the user selects a country or wine on the World Map (`195:103052` / approved design `238:87313`), **When** a country is selected on the map, **Then**:
   - The selected country's geographic silhouette on the World Map illuminates in warm sand (`#d3cdbc`) with a soft radial glow (`drop-shadow`), while unselected countries remain in dark stone (`#363021`).
   - The floating country pill (`Francia`, `México`, `España`, etc.) positions next to the glowing country.
   - The approved **Sleek Right-Side Liquid Glass Wine Selection Panel (`238:87313`)** displays the region header (`FRANCIA · 96+ PTS SOMMELIER`, `4 Vinos`, `Viñedos de Francia`), segmented filter tabs (`Todos`, `Seleccionados`, `Incluidos`), interactive wine selection cards with gold active borders (`#d4af37`) and `[ − 1 + ]` steppers, and the bottom CTA (`Ver cuadrícula de Francia · Explorar →`).

## Requirements

### Functional Requirements

- **FR-001**: System MUST implement the top `Menu` bar (`195:103054`) with the `HABIBI` logo, 5 category buttons (`Vinos`, `Cervezas`, `Sakes`, `Licores`, `Cortes`), `ENG`/`ES` language toggle, and `MXN` currency selector.
- **FR-002**: System MUST implement the `Home` hero screen (`6:114`) with the stone cellar wine background (`THG_Wine_Advisor 1`) and 5 category cards (`20 resultados`).
- **FR-003**: System MUST implement the `Home Grid` catalog (`21:89`) with a 5-column responsive product grid, bottle photography, price, varietal/name, and interactive top-right cart stepper (`+`, count badge, or `[trash qty +]`).
- **FR-004**: System MUST implement the `World Map` view (`195:103052`) with zoom controls (`195:103077`), interactive country pins and floating country pill (`195:103101`), and close/reset button (`195:103100`).
- **FR-005**: System MUST implement the sticky bottom search & view bar (`195:103085` / `212:111128`) with live search input, country of origin filter dropdown (`Todos los vinos` / `México` / `Francia` / etc.), view mode switch (`Grid` / `Map`), and Cart summary pill.
- **FR-006**: System MUST implement the `Detalles` slide-over drawer (`26:540`) and `Tu carrito` slide-over drawer (`212:111524`) using accessible Radix Dialog primitives.

## Success Criteria

- **SC-001**: 100% of Figma static assets (logo, category SVG icons, UI icons, bottle renders, cellar hero, world map, flags) are downloaded locally under `public/assets/figma/` and verified non-empty.
- **SC-002**: Zero Tailwind CSS utility classes in component markup; all styles authored in CSS Modules (`*.module.css`) consuming `src/styles/tokens.css`.
- **SC-003**: All unit/integration tests pass in Vitest 5 (`npm run test`), ESLint 10 reports 0 errors (`npm run lint`), and Vite 8 production build succeeds (`npm run build`).
- **SC-004**: Application is published and accessible via a public **Cloudflare** HTTPS URL (`*.pages.dev` or `*.trycloudflare.com`) with SPA routing fallback (`public/_redirects`) so external reviewers can open `/` and `/home` from any device without `localhost`.
