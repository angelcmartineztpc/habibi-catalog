# Implementation Plan: Habibi Digital Catalog (`Main` Flow)

**Branch**: `001-habibi-catalog` | **Date**: 2026-11-17 | **Spec**: [spec.md](file:///Users/administrador/habibi-catalog/specs/001-habibi-catalog/spec.md)

## Summary

Build the production **Habibi Wine & Gastronomy Catalog** web application from the Figma `Main` page (`AKYrZy4qmkFvLONvT7AFPR`) targeting the exact project stack: **React 19 + TypeScript ~6, Vite 8 (Rolldown), `react-router-dom` 7 (`BrowserRouter` + `React.lazy`), CSS Modules + CSS variables (`tokens.css`), Radix UI primitives, `@tabler/icons-react`, `react-hook-form` + `zod` `4.6.7`, `i18next` (`es`/`en`), Vitest 5 + Testing Library, and ESLint 10**.

## Technical Context

- **Language/Version**: TypeScript ~6 + React 19
- **Bundler**: Vite 8 (Rolldown) + `@vitejs/plugin-react`
- **Styling**: CSS Modules (`*.module.css`) + Three-layer CSS custom properties (`src/styles/tokens.css`) + `cn()` helper in `src/lib/utils.ts` (`clsx` + `tailwind-merge` + `class-variance-authority`)
- **State & Routing**: `react-router-dom` 7 (`BrowserRouter` + `React.lazy`), Context/URL state for category, view mode (`grid` | `map`), origin filter, search query, active product detail, and shopping cart
- **i18n**: `i18next` + `react-i18next` (`es` default, `en`)
- **Testing**: `vitest` 5 + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`

## Project Structure

```text
habibi-catalog/
├── DESIGN.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── index.html
├── public/
│   └── assets/
│       └── figma/               # Local PNG & SVG assets downloaded from Figma MCP
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles/
    │   ├── tokens.css           # Primitive -> Semantic -> Component CSS variables
    │   └── global.css           # Font faces, reset, base canvas styles
    ├── lib/
    │   ├── utils.ts             # cn(), formatCurrency(), date helpers (date-fns/moment)
    │   └── i18n.ts              # i18next configuration (es default, en)
    ├── data/
    │   └── catalog.ts           # Wine, Beer, Sake, Liquor & Cut catalog items + countries
    ├── context/
    │   └── CatalogContext.tsx   # Cart, category, viewMode, search, origin, currency, detail
    ├── components/
    │   ├── Menu/                # Top navigation bar (195:103054)
    │   ├── BottomBar/           # Search, origin filter, Grid/Map switch, Cart pill (195:103085 / 212:111128)
    │   ├── ProductCard/         # Bottle card with interactive stepper (21:89)
    │   ├── WorldMapView/        # Interactive map, country pins, zoom controls (195:103052)
    │   ├── ProductDetailDrawer/ # Slide-over bottle detail sheet (26:540)
    │   └── CartDrawer/          # Slide-over shopping cart sheet (212:111524)
    ├── pages/
    │   ├── HomePage/            # Cellar hero + 5 category cards (6:114)
    │   └── CatalogPage/         # Grid + Map + Origin filter + Empty state (21:89, 195:103052, 175:96343, 175:96840)
    └── test/
        ├── setup.ts
        └── App.test.tsx
```

## Phase 5 Approved Design Implementation (`238:87313` — Map + Sleek Right Liquid Glass Panel & Glowing Country Silhouettes)

The user approved **`238:87313` (`Propuesta A2 (Limpia 2) · Mapa + Panel Lateral Esbelto Liquid Glass`)** with dynamic country silhouette illumination:
1. **Country Silhouette SVGs (`public/assets/figma/countries/*.svg`)**: Export exact geographic vector silhouettes from Figma `World Map` (`France`, `Mexico`, `Spain`, `Italy`, `Germany`, `Argentina`, `Chile`, `United States`, `Japan`) with their exact bounding coordinates on the `1194×606` map canvas.
2. **Dynamic Map Glow (`WorldMapView.tsx` + `WorldMapView.module.css`)**: Render a dark-fill mask over hardcoded France when another country is selected, and render the active country's SVG silhouette in `#d3cdbc` (`var(--fondo-arena)`) with a luminous warm glow (`drop-shadow(0 0 18px rgba(211, 205, 188, 0.75))`).
3. **Sleek Right-Side Liquid Glass Wine Panel (`238:87313`)**: Floating panel (`364px` wide, `right: 78px`, `top: 14px` inside map section) with region terroir badge, `N Vinos` pill, `Viñedos de {País}` title, regional appellation subtitle, filter tabs (`Todos`, `Seleccionados`, `Incluidos`), wine cards with gold selected state (`#d4af37`) and `[ − qty + ]` steppers, and footer CTA (`Ver cuadrícula de {País} · Explorar →`).
4. **Cloudflare Public Deployment**: Configure `public/_redirects` (`/* /index.html 200`) and deploy to Cloudflare Pages (`https://habibi-catalog.pages.dev`).

## Phase 7: Figma Content & Flow Synchronization (`212:111524`, `146:62675`, `175:96966`, `11:69`, `137:79876`)

1. **Updated Shopping Cart Drawer (`212:111524` — nodes `262:101081`..`266:101106`)**:
   - Add the right-aligned vertical action stack (`flex-col gap-2 items-end`) inside each cart item card with the **`Quitar`** button (`#8c8c8c`, `14px`, `h-[32px]`) stacked above the `[ 🗑 1 + ]` / `[ − N + ]` stepper pill (`#19160f`).
2. **Selector Popover (`146:62675` — `Dropdown List` `146:62891`)**:
   - Build the exact `#49463e` (`239×385px`, `rounded-[16px]`) selector popover with radio options (`Todos los vinos`, `Seleccionados`), horizontal divider, `País de origen` label, internal country search input (`Buscar`, `168:96041`), and scrollable country checkbox list with official Figma flag SVGs (`flag-mexico.svg`, `flag-usa.svg`, `flag-spain.svg`, `flag-france.svg`).
   - Support the **`Seleccionados`** collection view (`146:62675`) with centered `32px` Cormorant Garamond heading `Seleccionados` (`146:62885`).
3. **Cart Button Variants (`137:79876`) & Detail Drawer Stepper (`175:96966`)**:
   - Use `trash.svg` when `quantity === 1` (`Status="1"`) and `minus.svg` when `quantity >= 2` (`Status="2"`).
   - Add quantity selector `[ − qty + ]` (`175:97200`) in `ProductDetailDrawer.tsx`.
4. **Home Visual Showcase (`11:69` — `Selección de vinos / Vista 1`) & Full Navigation Flow**:
   - Connect `Home` (`6:114` — accessible via logo click or `/home`), `Vista 1 / Showcase` (`11:69`), `Grid` (`21:89`), and `Mapa` (`238:87313` / `195:103052`).
