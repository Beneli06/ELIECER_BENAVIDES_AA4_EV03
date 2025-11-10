/**
 * Renders a list of users and provides options to edit or delete them.
 * @param {object} props - The component's props.
 * @param {Array} props.users - The list of users to display.
 * @param {Function} props.onDelete - The function to call when a user is deleted.
 * @param {Function} props.onEdit - The function to call to start editing a user.
 * @returns {JSX.Element} The UsersList component.
 */
export default function UsersList({ users, onDelete, onEdit }) {
  return (
    <section className="card" aria-labelledby="usersTitle">
      <h2 id="usersTitle">Usuarios</h2>
      {users.length === 0 ? (
        <p className="muted">No hay usuarios registrados.</p>
      ) : (
        <div className="table-wrap" role="region" aria-label="Listado de usuarios">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge" aria-label={`Rol ${user.rol}`}>{user.rol}</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button onClick={() => onEdit(user)}>Editar</button>
                      <button className="btn-danger" onClick={() => onDelete(user.id)}>Eliminar</button>
                    </div>
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
