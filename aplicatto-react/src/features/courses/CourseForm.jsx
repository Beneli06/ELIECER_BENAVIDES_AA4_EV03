import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services";

const schema = z.object({
  nombre: z.string().min(3, "Mínimo 3 caracteres"),
  descripcion: z.string().optional(),
  docenteNombre: z.string().min(3, "Indique el nombre del docente"),
});

export default function CourseForm() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    api.createCourse(data);
    nav("/courses");
  };

  return (
    <section className="card" aria-labelledby="courseFormTitle">
      <h2 id="courseFormTitle">Nuevo curso</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text" {...register("nombre")} placeholder="Nombre del curso" />
        {errors.nombre && <small className="error">{errors.nombre.message}</small>}

        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" rows="4" {...register("descripcion")} placeholder="Descripción breve" />

        <label htmlFor="docenteNombre">Docente</label>
        <input id="docenteNombre" type="text" {...register("docenteNombre")} placeholder="Nombre del docente" />
        {errors.docenteNombre && <small className="error">{errors.docenteNombre.message}</small>}

        <div className="actions">
          <button disabled={isSubmitting}>Guardar</button>
          <Link className="btn-secondary" to="/courses">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
