# GA7-220501096-AA4-EV03 — Frontend con React

Aplicación SPA construida con React + Vite. Implementa el módulo de gestión de usuarios y cursos usando formularios con validación, listas y persistencia en `localStorage`.

## Tecnologías
- React 18, React Router 6
- Vite 5
- React Hook Form + Zod (validación)
- ESLint (estándares de codificación)

## Estructura
```
src/
	components/Header.jsx
	features/
		users/{UsersList.jsx, UserForm.jsx}
		courses/{CoursesList.jsx, CourseForm.jsx}
	services.js         # API mock en localStorage
	styles.css          # Variables, tablas, botones, responsive
	App.jsx, main.jsx
```

## Ejecutar en desarrollo
```bash
npm install
npm run dev
```
Abrir la URL que imprime Vite (por defecto http://localhost:5173).

## Compilar para producción
```bash
npm run build
npm run preview
```

## Estándares de codificación
- ESLint Flat Config (`eslint.config.js`) con reglas: `semi`, `quotes`, `no-unused-vars`, reglas básicas de React.
- `.editorconfig` para indentación consistente (2 espacios, LF, UTF-8).
- Comentarios JSDoc en servicios y componentes clave.

Para revisar y corregir automáticamente:
```bash
npm run lint
npm run lint:fix
```

## Versionamiento (Git)
Ejemplo de inicialización y primer commit:
```bash
git init
git add .
git commit -m "feat: módulo usuarios y cursos con validación; estilos y ESLint"
```
Para conectar un repositorio remoto:
```bash
git remote add origin <URL_REPO>
git branch -M main
git push -u origin main
```

## Evidencias y artefactos
- Diagramas, historias y checklists: `docs/CHECKLISTS.md`
- Informe técnico y plan de trabajo (según entregables previos)

Fecha: 2025-11-09
