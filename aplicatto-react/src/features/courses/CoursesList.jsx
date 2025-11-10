import { Link } from "react-router-dom";
import { api } from "../../services";

export default function CoursesList() {
  const courses = api.listCourses();

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este curso?")) {
      api.deleteCourse(id);
      // Mantener comportamiento simple basado en almacenamiento local
      location.reload();
    }
  };

  return (
    <section className="card">
      <div className="actions">
        <h2 style={{ marginRight: "auto" }}>Cursos</h2>
        <Link className="btn" to="/courses/new">Nuevo</Link>
      </div>
      {courses.length === 0 ? (
        <p className="muted">No hay cursos registrados.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Docente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{c.docenteNombre}</td>
                  <td>
                    <button className="btn-danger" aria-label={`Eliminar curso ${c.nombre}`} onClick={() => handleDelete(c.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
