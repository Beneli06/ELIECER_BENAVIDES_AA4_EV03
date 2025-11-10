import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import UsersList from "./features/users/UsersList.jsx";
import UserForm from "./features/users/UserForm.jsx";
import { api } from "./services.js";
import { toast } from "sonner";

/**
 * The main component of the application.
 * It manages the state of the users and renders the appropriate components.
 * @returns {JSX.Element} The App component.
 */
export default function App() {
  // State for the list of users
  const [users, setUsers] = useState([]);
  // State for the user being edited
  const [userToEdit, setUserToEdit] = useState(null);
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load users from API when component mounts
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listUsers();
        setUsers(data);
      } catch (e) {
        toast.error("No se pudieron cargar los usuarios");
      }
    })();
  }, []);

  /**
   * Handles the deletion of a user.
   * @param {number} id The id of the user to delete.
   */
  const handleDeleteUser = async (id) => {
    const prev = users;
    setUsers(prev.filter(u => u.id !== id)); // Optimistic UI
    try {
      await api.deleteUser(id);
      toast.success("Usuario eliminado");
    } catch (e) {
      toast.error("Error eliminando usuario");
      // Revertir
      setUsers(prev);
    } finally {
      const fresh = await api.listUsers();
      setUsers(fresh);
    }
  };

  /**
   * Handles saving a user (creating or updating).
   * @param {object} user The user to save.
   */
  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        await api.updateUser(user);
        toast.success("Usuario actualizado");
      } else {
        await api.createUser(user);
        toast.success("Usuario creado");
      }
      const data = await api.listUsers();
      setUsers(data);
      setIsFormVisible(false);
      setUserToEdit(null);
    } catch (e) {
      toast.error("No se pudo guardar el usuario");
    }
  };

  /**
   * Handles the start of editing a user.
   * @param {object} user The user to edit.
   */
  const handleEditUser = user => {
    setUserToEdit(user);
    setIsFormVisible(true);
  };

  /**
   * Handles the cancellation of the form.
   */
  const handleCancel = () => {
    setIsFormVisible(false);
    setUserToEdit(null);
  };

  /**
   * Handles the creation of a new user.
   */
  const handleNewUser = () => {
    setUserToEdit(null);
    setIsFormVisible(true);
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="actions">
          <h1 style={{ marginRight: "auto" }}>Gestión de Usuarios</h1>
          <button onClick={handleNewUser}>Nuevo Usuario</button>
        </div>

        {isFormVisible ? (
          <UserForm
            onSave={handleSaveUser}
            userToEdit={userToEdit}
            onCancel={handleCancel}
          />
        ) : (
          <UsersList
            users={users}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
          />
        )}

        <footer className="footer">
          <small>© 2025 Semillero Aplicatto — AA4-EV03</small>
        </footer>
      </main>
    </>
  );
}
