---
trigger: always_on
description: Obliga a cualquier agente de IA a usar Spec Kit (.specify/ y specs/) y las skills de diseño/frontend del proyecto automáticamente en cada tarea sin que el usuario tenga que pedirlo.
---

# Flujo Obligatorio Spec Kit + Skills del Proyecto

1. **Spec Kit por defecto**: En toda solicitud de creación, modificación o corrección de pantallas/funcionalidades, pasa siempre por los artefactos de Spec Kit (`.specify/memory/constitution.md`, `specs/<feature>/spec.md`, `plan.md`, `tasks.md`) de manera proactiva sin esperar a que el usuario invoque comandos `/speckit-*`.
2. **Sincronización continua**:
   - Antes de codificar: registra o actualiza el requerimiento en `spec.md`, el diseño técnico en `plan.md` y las tareas en `tasks.md`.
   - Al terminar de codificar: marca las tareas completadas (`[x]`) en `tasks.md` y ejecuta `npm run test`, `npm run lint` y `npm run build`.
3. **Skills activas siempre en UI**: Usa `figma-design-to-code`, `design-system`, `awesome-design-md`, `frontend-ui-engineering`, `design-taste-frontend`, `impeccable`, `ui-ux-pro-max` y `web-design-guidelines` respetando estrictamente CSS Modules + variables CSS (cero Tailwind en componentes).
