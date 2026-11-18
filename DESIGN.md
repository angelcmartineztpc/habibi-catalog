# DESIGN.md — Habibi Wine & Gastronomy Catalog (`The Palace Company®`)

## 1. Visual Direction & Brand Essence
**Habibi** is a luxury hospitality digital sommelier and gastronomy catalog designed primarily for **iPad Pro 11" Landscape (`1194×834`)** and responsive desktop/tablet surfaces.
- **Atmosphere**: Warm subterranean stone wine cellar, tactile dark bronze and sand surfaces, editorial serif titles (`Cormorant Garamond`) paired with clean geometric sans UI (`Gotham` / `Montserrat` fallback).
- **Anti-Slop Guardrails**: No generic SaaS gradients, no bright white cards, no default browser inputs. Every surface uses warm dark stone/espresso tones with subtle glass blur (`backdrop-filter: blur(10px)`) over cellar photography.

---

## 2. Three-Layer Token Architecture

### Layer 1: Primitive Tokens (`tokens.css`)
| Token | Value | Figma Source |
| :--- | :--- | :--- |
| `--primitive-sand-200` | `#d3cdbc` | `fondo/arena` |
| `--primitive-sand-100` | `#fcf8e8` | `light/fill` |
| `--primitive-stone-400` | `#bdb5a5` | Menu inactive text |
| `--primitive-stone-500` | `#b8b8b8` | Search placeholder / filter text |
| `--primitive-gold-400` | `#d4af37` | Language switch active ES text |
| `--primitive-gold-500` | `#b18e5e` | Display titles (`Champagne Krug`, `Tu carrito`), active borders |
| `--primitive-gold-600` | `#7e6e50` | Cart button pill background |
| `--primitive-burgundy-600` | `#81342c` | Primary CTA (`Agregar al carrito`) |
| `--primitive-espresso-700` | `#363021` | `texto/oscuro`, Drawer surface & search border |
| `--primitive-espresso-800` | `#302b22` | Top `Menu` bar background & Map search bar |
| `--primitive-espresso-850` | `#292014` | Home active category card fill |
| `--primitive-espresso-900` | `#211009` | `fondo/profundo` |
| `--primitive-espresso-920` | `#1e1a10` | Catalog bottom bar background |
| `--primitive-espresso-950` | `#19160f` | Product card `+` / stepper pill background |
| `--primitive-obsidian-950` | `#120e0c` | Home category card fill |
| `--primitive-charcoal-900` | `#242424` | Top bar Language & Currency pill background |

### Layer 2: Semantic Tokens
| Token | Reference | Usage |
| :--- | :--- | :--- |
| `--bg-canvas` | `#14110b` | Root viewport canvas background |
| `--bg-menu` | `var(--primitive-espresso-800)` | Top navigation bar (`#302b22`) |
| `--bg-bottom-bar` | `var(--primitive-espresso-920)` | Sticky bottom search & view bar (`#1e1a10`) |
| `--bg-card` | `rgba(53, 49, 40, 0.75)` | Product card translucent surface |
| `--bg-drawer` | `var(--primitive-espresso-700)` | Slide-over Detail & Cart drawers (`#363021`) |
| `--bg-pill-control` | `var(--primitive-charcoal-900)` | Language & Currency switches (`#242424`) |
| `--bg-cart-trigger` | `var(--primitive-gold-600)` | Bottom bar Cart button (`#7e6e50`) |
| `--bg-cta-primary` | `var(--primitive-burgundy-600)` | Primary action button (`#81342c`) |
| `--text-primary` | `#ffffff` | Primary high-contrast text |
| `--text-sand` | `var(--primitive-sand-200)` | Active menu tab, drawer body copy (`#d3cdbc`) |
| `--text-gold` | `var(--primitive-gold-500)` | Serif headings & cart item titles (`#b18e5e`) |
| `--text-muted` | `rgba(255, 255, 255, 0.5)` | Subtitles, wine varietals, inactive controls |

### Layer 3: Typography Scale
| Role | Font Family | Size / Line Height | Weight |
| :--- | :--- | :--- | :--- |
| **Display H1** (`Habibi/Tipografia/H1`) | `'Cormorant Garamond', Georgia, serif` | `48px / 56px` | `400` (Regular) |
| **Display H2** (`Habibi/Tipografia/H2`) | `'Cormorant Garamond', Georgia, serif` | `40px / 48px` | `400` (Regular) |
| **Display H3** (`Habibi/Tipografia/H3`) | `'Cormorant Garamond', Georgia, serif` | `32px / 40px` | `400` (Regular) |
| **Price Large** | `'Gotham', 'Montserrat', sans-serif` | `24px / 32px` | `500` (Medium) |
| **Card Price / Section Title** | `'Gotham', 'Montserrat', sans-serif` | `20px / 24px` | `500` / `700` |
| **Body Regular** | `'Gotham', 'Montserrat', sans-serif` | `16px / 24px` | `400` (Book) |
| **UI Control / Label** | `'Gotham', 'Montserrat', sans-serif` | `14px / 20px` | `400` / `500` |

---

## 3. Core Screen Specifications (Figma `Main`)

1. **Home Hero (`6:114` / `11:69`)**:
   - Full-bleed stone cellar & wine bottle hero (`THG_Wine_Advisor 1`) with `WINE | VINO — HABIBI` branding.
   - Top bar with `HABIBI` logo, `ENG / ES` switch, and `MXN` currency selector.
   - 5 bottom category cards (`198×150px`, `border-radius: 24px`): `Vinos`, `Cervezas`, `Sakes`, `Licores`, `Cortes` (`20 resultados`).
2. **Catalog Grid (`21:89`, `146:62675`)**:
   - Blurred cellar backdrop (`backdrop-filter: blur(10px)` + `rgba(0,0,0,0.65)` overlay).
   - 5-column grid (`1082px` width, `8px` gap) of `ProductCard`s (`rgba(53,49,40,0.75)`, `rounded-[24px]`, `200×200px` bottle image container, `$690.00 MXN`, `Reserva Malbec`, top-right `+` / badge / `[trash 1 +]` stepper).
   - Sticky bottom bar (`88px` height, `#1e1a10`) with Search input (`560px` wide) + Origin filter dropdown (`Todos los vinos` / `México`), View mode switch (`Grid` / `Map`), and Cart button (`Ver carrito · 3` / `Total: $0.00`).
3. **Interactive World Map (`195:103052`)**:
   - Full world map (`1194×606px`) with interactive country pins (France, Mexico, Italy, Spain, Argentina, Chile, USA, Japan, etc.), floating country pill (`Francia`, `#d3cdbc` bg, `#363021` text), top-right `X` button, and bottom-right `+ / -` zoom control (`46×92px`, `#d3cdbc` bg).
4. **Origin & Collection Selector (`146:62675`) + Filtered Grid (`175:96343`) & Empty State (`175:96840`)**:
   - Selector popover (`239×385px`, `#49463e`, `rounded-[16px]`, `shadow-[0px_4px_10px_rgba(1,1,1,0.25)]`) with radio buttons (`Todos los vinos`, `Seleccionados`), divider, `País de origen` search input (`Buscar`), and country checkbox list with circular flags (`México`, `Estados Unidos`, `España`, `Francia`).
   - Displays `Seleccionados` (`146:62885`) or country heading (`México` `175:96350`) in `32px` Cormorant Garamond above the filtered grid, or centered empty state (`No se han encontrado resultados` / `Intenta con otras palabras clave o modifica los términos de búsqueda.`).
5. **Product Detail Drawer (`175:96966` — `Detalles #2`)**:
   - Right sheet (`566px` wide, `#363021` background) with two-column top row (`Description` on the left + `Image Wrapper` bottle inside the drawer on the right), `Champagne Krug` (`40px` Cormorant Garamond `#b18e5e`), `Grande Cuvée`, description (`14px`), divider, `Productor: Maison Krug`, `Uvas: Pinot Noir, Chardonnay y Meunier`, bottom price row (`$410.00 MXN IVA incluido` + `[ − 1 + ]` quantity selector `175:97200`), and full-width `#81342c` pill button `Agregar al carrito`.
6. **Shopping Cart Drawer (`212:111524`)**:
   - Right sheet (`566px` wide, `#363021` background) with `Tu carrito` (`40px` Cormorant Garamond `#b18e5e`), item cards (`rgba(255,255,255,0.05)`, `rounded-[24px]`) with bottle thumbnail, title (`#b18e5e`), price (`#ffffff`), and right-side action stack (`262:101085`) containing the `Quitar` button (`#8c8c8c`, `14px`) above the `[ 🗑 1 + ]` / `[ − N + ]` quantity stepper pill (`#19160f`).
