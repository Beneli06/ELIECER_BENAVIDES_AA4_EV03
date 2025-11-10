# Documentación de API — Aplicatto

Base URL: http://localhost:4000

---

## Health

- GET / 
  - Respuesta 200
  - Body: { ok: true, message: "Aplicatto API" }

## Users

- GET /users
  - Descripción: Obtiene la lista de usuarios.
  - Respuesta: 200, array de usuarios.

- GET /users/:id
  - Descripción: Obtiene un usuario por id.
  - Respuesta: 200 con objeto usuario o 404 si no existe.

- POST /users
  - Descripción: Crea un usuario nuevo.
  - Body (JSON): { nombre:string, email:string, rol:string }
  - Respuesta: 201 con el usuario creado (incluye id).

- PUT /users/:id
  - Descripción: Actualiza un usuario.
  - Body (JSON): { nombre, email, rol }
  - Respuesta: 200 con el usuario actualizado o 404.

- DELETE /users/:id
  - Descripción: Elimina un usuario.
  - Respuesta: 204 No Content.

## Courses

- GET /courses
  - Descripción: Lista de cursos.

- POST /courses
  - Body: { nombre:string, descripcion?:string, docenteNombre:string }
  - Respuesta: 201 con curso creado.

- DELETE /courses/:id
  - Respuesta: 204 No Content.

---

Notas:
- Esta API es una implementación demo que persiste datos en `server/db.json`.
- Para producción usar una base de datos real y control de errores más robusto.
