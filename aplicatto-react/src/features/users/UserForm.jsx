import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// Zod schema for form validation
const schema = z.object({
  nombre: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Correo inválido"),
  rol: z.enum(["ADMINISTRADOR", "DOCENTE", "ESTUDIANTE"], {
    required_error: "Seleccione un rol",
  }),
});

/**
 * Renders a form for creating or editing a user.
 * @param {object} props - The component's props.
 * @param {Function} props.onSave - The function to call when the form is saved.
 * @param {object} props.userToEdit - The user to edit, or null to create a new user.
 * @param {Function} props.onCancel - The function to call when the form is cancelled.
 * @returns {JSX.Element} The UserForm component.
 */
export default function UserForm({ onSave, userToEdit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: userToEdit || {},
  });

  useEffect(() => {
    // Reset the form when the user to edit changes
    reset(userToEdit || {});
  }, [userToEdit, reset]);

  const onSubmit = data => {
    onSave(data);
  };

  return (
    <section className="card" aria-labelledby="userFormTitle">
      <h2 id="userFormTitle">{userToEdit ? "Editar usuario" : "Nuevo usuario"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          {...register("nombre")}
          placeholder="Nombre completo"
          aria-invalid={!!errors.nombre}
        />
        {errors.nombre && <small className="error">{errors.nombre.message}</small>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="correo@dominio.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <small className="error">{errors.email.message}</small>}

        <label htmlFor="rol">Rol</label>
        <select id="rol" {...register("rol")} aria-invalid={!!errors.rol}>
          <option value="">Seleccione…</option>
          <option>ADMINISTRADOR</option>
          <option>DOCENTE</option>
          <option>ESTUDIANTE</option>
        </select>
        {errors.rol && <small className="error">{errors.rol.message}</small>}

        <div className="actions">
          <button disabled={isSubmitting}>Guardar</button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
