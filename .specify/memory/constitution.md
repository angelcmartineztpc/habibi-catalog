<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Added principles:
  0. Mandato Universal para Agentes de IA: Flujo Obligatorio Spec Kit (NON-NEGOTIABLE)
- Modified sections: Core Principles, Development Workflow, Governance
-->

# Habibi Catalog Constitution

## Mandato Universal para Agentes de IA (NON-NEGOTIABLE)

> **REGLA GLOBAL AUTOMÁTICA**: Cualquier agente de IA que opere en este repositorio (Antigravity, Gemini, Claude Code, Cursor, Copilot, Codex, etc.) **DEBE** pasar obligatoriamente por el flujo de **Spec Kit** (`.specify/` y `specs/`) de manera automática en cada solicitud de nueva funcionalidad, pantalla, cambio arquitectónico o refactorización, **sin necesidad de que el usuario lo pida explícitamente**.

1. **Lectura previa obligatoria**: Antes de escribir o modificar código, el agente DEBE leer `.specify/memory/constitution.md`, `DESIGN.md` y la especificación activa en `specs/<feature>/` (`spec.md`, `plan.md`, `tasks.md`).
2. **Actualización automática de artefactos Spec Kit**:
   - Si el usuario pide una funcionalidad, pantalla o ajuste nuevo, el agente DEBE crear o actualizar primero `spec.md` (`speckit-specify`), `plan.md` (`speckit-plan`) y `tasks.md` (`speckit-tasks`) antes o durante la ejecución (`speckit-implement`).
   - Al concluir cualquier tarea de código, el agente DEBE marcar su estado en `tasks.md` y verificar consistencia (`speckit-analyze` / `speckit-converge`).
3. **Uso automático de las skills del proyecto**:
   - Diseño y tokens: `design-system` y `awesome-design-md` (`DESIGN.md` + `src/styles/tokens.css`).
   - Figma a código: `figma-design-to-code`.
   - Construcción y acabado UI/UX: `frontend-ui-engineering`, `design-taste-frontend`, `impeccable` y `ui-ux-pro-max`.
   - Auditoría de calidad y accesibilidad: `web-design-guidelines`.

---

## Core Principles

### I. Stack & Zero-Tailwind CSS Modules (NON-NEGOTIABLE)

All styling MUST use **CSS Modules** (`*.module.css`) combined with **CSS Custom Properties** (`src/styles/tokens.css`). Tailwind CSS utility classes are strictly prohibited in application markup; `tailwind-merge` (alongside `clsx` and `class-variance-authority`) is used exclusively inside `src/lib/utils.ts` (`cn()`) for deterministic class composition.

### II. Design Token & Figma Fidelity

Every screen, drawer, and interactive control MUST match the **Habibi Figma Main** specification (`1194×834` iPad Pro 11" horizontal canvas and responsive viewports) using the three-layer token architecture (Primitive → Semantic → Component). Static assets exported from Figma MUST be stored locally under `public/assets/` with zero runtime dependencies on temporary Figma asset URLs.

### III. Component Architecture & Radix Primitives

Interactive overlays, dialogs, dialogs/drawers, dropdowns, and command palettes MUST be built on **Radix UI** (`@radix-ui/react-*`), `vaul`, `cmdk`, and `sonner` for WCAG 2.1 AA keyboard navigation, focus trapping, and ARIA compliance. Components must remain focused, colocated with their CSS Module, and typed strictly with TypeScript.

### IV. Internationalization (es/en) & Multi-Currency

All user-facing copy MUST be externalized through **i18next** and **react-i18next**, with Spanish (`es`) as the default locale and English (`en`) as the secondary locale. Prices MUST dynamically format and convert according to the active currency (`MXN`, `USD`, `EUR`).

### V. Quality Gates (Vitest 5, Testing Library & ESLint 10)

Every feature route and core interactive flow (category switching, search & origin filtering, Grid/Map view toggle, Product Detail drawer, and Shopping Cart drawer) MUST be verified with **Vitest**, **@testing-library/react**, **TypeScript**, and **ESLint** before completion.

## Technology Stack Constraints

| Layer                       | Mandatory Package / Standard                                                                    |
| :-------------------------- | :---------------------------------------------------------------------------------------------- |
| **Framework**               | React 19 + TypeScript ~6                                                                        |
| **Build / Dev**             | Vite 8 (Rolldown), `@vitejs/plugin-react`                                                       |
| **Routing**                 | `react-router-dom` 7 (`BrowserRouter`, routes loaded with `React.lazy`)                         |
| **Styling**                 | CSS Modules + CSS variables (`tokens.css`) — no Tailwind CSS (`tailwind-merge` only in `cn()`)  |
| **UI Primitives**           | `@radix-ui/react-*` + `class-variance-authority` + `cmdk` + `vaul` + `sonner`                   |
| **Icons**                   | `@tabler/icons-react` + official Figma SVG icons                                                |
| **Forms & Validation**      | `react-hook-form` + `zod` `4.6.7` (pinned version)                                              |
| **i18n**                    | `i18next` + `react-i18next` (`es` default, `en`)                                                |
| **Dates**                   | `date-fns`, `moment` (legacy compatibility); helpers in `src/lib/utils.ts`                      |
| **Charts / Calendar / DnD** | `recharts`, `react-big-calendar`, `@dnd-kit/*`, `@hello-pangea/dnd`                             |
| **Documents**               | `exceljs`, `xlsx` (SheetJS official CDN), `jspdf`, `pdf-lib`, `pdfjs-dist`, `jszip`             |
| **Testing**                 | `vitest` 5 + `@testing-library/*` + `jsdom`                                                     |
| **Linting**                 | `eslint` 10 + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |

## Development Workflow

1. **Automatic Spec Kit Gate**: On every feature or change request, the agent automatically updates `specs/<feature>/spec.md`, `plan.md`, and `tasks.md` without waiting for the user to invoke `/speckit-*` manually.
1. **Asset & Token Sync**: Download all required Figma SVGs and PNGs into `public/assets/figma/` and bind colors, typography, and shadows in `src/styles/tokens.css`.
1. **Implementation & Verification**: Build components with CSS Modules, verify visual fidelity against Figma screenshots, and run `npm run test`, `npm run lint`, and `npm run build`.

## Governance

This constitution and its Universal AI Agent Mandate supersede all ad-hoc workflows. Every AI agent session starts by enforcing `.specify/memory/constitution.md`, `AGENTS.md`, and `GEMINI.md`.

**Version**: 1.1.0 | **Ratified**: 2026-11-17 | **Last Amended**: 2026-11-17
