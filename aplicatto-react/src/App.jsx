import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import UsersList from "./features/users/UsersList.jsx";
import UserForm from "./features/users/UserForm.jsx";
import { api } from "./services.js";

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

  // Load the users from the API when the component mounts
  useEffect(() => {
    setUsers(api.listUsers());
  }, []);

  /**
   * Handles the deletion of a user.
   * @param {number} id The id of the user to delete.
   */
  const handleDeleteUser = id => {
    api.deleteUser(id);
    setUsers(api.listUsers());
  };

  /**
   * Handles saving a user (creating or updating).
   * @param {object} user The user to save.
   */
  const handleSaveUser = user => {
    if (user.id) {
      api.updateUser(user);
    } else {
      api.createUser(user);
    }
    setUsers(api.listUsers());
    setIsFormVisible(false);
    setUserToEdit(null);
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
