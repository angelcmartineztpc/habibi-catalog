# Reglas Globales para Agentes de IA — Habibi Catalog

## 1. Uso Obligatorio y Automático de Spec Kit (NON-NEGOTIABLE)

Cualquier agente de IA que trabaje en este proyecto **DEBE** ejecutar y mantener el flujo de **Spec Kit** de forma automática en cada petición del usuario, **sin que el usuario tenga que pedirlo explícitamente**:

1. **Antes de implementar o modificar cualquier funcionalidad**:
   - Consultar [constitution.md](file:///Users/administrador/habibi-catalog/.specify/memory/constitution.md) y [DESIGN.md](file:///Users/administrador/habibi-catalog/DESIGN.md).
   - Revisar y actualizar los artefactos en `specs/` (`spec.md`, `plan.md`, `tasks.md`) siguiendo las skills `speckit-specify`, `speckit-plan` y `speckit-tasks`.
2. **Durante la implementación**:
   - Ejecutar las tareas conforme a `speckit-implement`.
   - Aplicar automáticamente las skills del proyecto en `.agents/skills/`:
     - `figma-design-to-code` para cualquier nodo o pantalla de Figma.
     - `design-system` y `awesome-design-md` para mantener `DESIGN.md` y `src/styles/tokens.css`.
     - `frontend-ui-engineering`, `design-taste-frontend`, `impeccable` y `ui-ux-pro-max` para arquitectura de componentes y acabado visual.
     - `web-design-guidelines` para auditar accesibilidad y UX.
3. **Al finalizar cada cambio**:
   - Actualizar el estado de las tareas en `specs/<feature>/tasks.md`.
   - Ejecutar `npm run test`, `npm run lint` y `npm run build`.

---

## 2. Restricciones Técnicas Inquebrantables

- **Stack**: React 19 + TypeScript ~6, Vite 8 (Rolldown), `react-router-dom` 7 (`BrowserRouter` + `React.lazy`).
- **Estilos**: **CSS Modules** (`*.module.css`) + variables CSS (`src/styles/tokens.css`). Prohibido usar clases utilitarias de Tailwind CSS (`tailwind-merge` solo se permite dentro de `cn()` en `src/lib/utils.ts`).
- **Primitivas UI e Iconos**: Radix UI (`@radix-ui/react-*`), `class-variance-authority`, `cmdk`, `vaul`, `sonner`, `@tabler/icons-react`.
- **Formularios e i18n**: `react-hook-form` + `zod` `4.6.7` (versión fija); `i18next` + `react-i18next` (`es` por defecto, `en`).
- **Assets de Figma**: Todos los recursos estáticos deben descargarse en `public/assets/figma/`; nunca dejar URLs temporales del MCP de Figma en el código.
