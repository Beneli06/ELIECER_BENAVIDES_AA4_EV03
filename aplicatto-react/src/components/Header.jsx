import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="topbar" role="banner">
      <h1>
        <Link to="/">Aplicatto · Frontend</Link>
      </h1>
      <nav aria-label="Principal">
        <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Usuarios
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Cursos
        </NavLink>
      </nav>
    </header>
  );
}
