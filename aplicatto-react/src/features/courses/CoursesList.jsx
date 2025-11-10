import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services";
import { toast } from "sonner";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.listCourses();
        setCourses(data);
      } catch (e) {
        toast.error("No se pudieron cargar los cursos");
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este curso?")) return;
    const prev = courses;
    setCourses(prev.filter(c => c.id !== id));
    try {
      await api.deleteCourse(id);
      toast.success("Curso eliminado");
    } catch (e) {
      toast.error("Error eliminando curso");
      setCourses(prev);
    } finally {
      const fresh = await api.listCourses();
      setCourses(fresh);
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
