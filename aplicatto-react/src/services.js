import axios from "axios";

// Base URL de la API (puede variarse segun entorno)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Clave para fallback local (si el backend no responde)
const LS_KEY = "aplicatto-data-v1";

// Utilidades de fallback localStorage (solo se usan ante fallo de red)
function loadFallback() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || { users: [], courses: [], seq: 1 };
  } catch {
    return { users: [], courses: [], seq: 1 };
  }
}
function saveFallback(db) { localStorage.setItem(LS_KEY, JSON.stringify(db)); }

/**
 * Normaliza errores de axios lanzando objetos con message y status.
 * @param {any} err
 */
function normalizeError(err) {
  if (err?.response) {
    const { status, data } = err.response;
    return { message: data?.error || data?.message || err.message, status };
  }
  return { message: err.message || "Error de red", status: 0 };
}

/**
 * API facade: mantiene misma interfaz, ahora asíncrona (promesas) usando el backend.
 * En caso de fallo de red usa fallback localStorage para no bloquear la UI.
 */
export const api = {
  /**
   * Lista usuarios.
   * @returns {Promise<Array>} usuarios
   */
  async listUsers() {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      return data;
    } catch (err) {
      console.warn("Fallo listUsers, usando fallback", err);
      return loadFallback().users;
    }
  },
  /**
   * Crea usuario.
   * @param {object} user
   * @returns {Promise<object>}
   */
  async createUser(user) {
    try {
      const { data } = await axios.post(`${BASE_URL}/users`, user);
      return data;
    } catch (_err) {
      const db = loadFallback();
      user.id = db.seq++;
      db.users.push(user);
      saveFallback(db);
      return user;
    }
  },
  /**
   * Actualiza usuario.
   * @param {object} user
   */
  async updateUser(user) {
    if (!user.id) throw new Error("User id requerido para update");
    try {
      const { data } = await axios.put(`${BASE_URL}/users/${user.id}`, user);
      return data;
    } catch (_err) {
      // Sincroniza fallback
      const db = loadFallback();
      const idx = db.users.findIndex(u => u.id === user.id);
      if (idx > -1) {
        db.users[idx] = user;
        saveFallback(db);
        return user;
      }
      throw normalizeError(_err);
    }
  },
  /**
   * Elimina usuario.
   * @param {number} id
   */
  async deleteUser(id) {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
    } catch (_err) {
      const db = loadFallback();
      db.users = db.users.filter(u => u.id !== id);
      saveFallback(db);
    }
  },
  /**
   * Lista cursos.
   */
  async listCourses() {
    try {
      const { data } = await axios.get(`${BASE_URL}/courses`);
      return data;
    } catch (err) {
      console.warn("Fallo listCourses, usando fallback", err);
      return loadFallback().courses;
    }
  },
  /**
   * Crea curso.
   */
  async createCourse(course) {
    try {
      const { data } = await axios.post(`${BASE_URL}/courses`, course);
      return data;
    } catch (_err) {
      const db = loadFallback();
      course.id = db.seq++;
      db.courses.push(course);
      saveFallback(db);
      return course;
    }
  },
  /**
   * Elimina curso.
   */
  async deleteCourse(id) {
    try {
      await axios.delete(`${BASE_URL}/courses/${id}`);
    } catch (_err) {
      const db = loadFallback();
      db.courses = db.courses.filter(c => c.id !== id);
      saveFallback(db);
    }
  },
};
