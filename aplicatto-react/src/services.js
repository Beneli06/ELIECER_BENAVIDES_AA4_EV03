const LS_KEY = "aplicatto-data-v1";
/**
 * Load the database from localStorage.
 * @returns {object} The database object.
 */
function load() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || { users: [], courses: [], seq: 1 };
  } catch {
    return { users: [], courses: [], seq: 1 };
  }
}
/**
 * Save the database to localStorage.
 * @param {object} db The database object.
 */
function save(db) { localStorage.setItem(LS_KEY, JSON.stringify(db)); }
export const api = {
  /**
   * Get the list of users.
   * @returns {Array} The list of users.
   */
  listUsers() { return load().users; },
  /**
   * Create a new user.
   * @param {object} user The user to create.
   * @returns {object} The created user.
   */
  createUser(user) { const db = load(); user.id = db.seq++; db.users.push(user); save(db); return user; },
  /**
   * Update a user.
   * @param {object} user The user to update.
   * @returns {object} The updated user.
   */
  updateUser(user) {
    const db = load();
    const index = db.users.findIndex(u => u.id === user.id);
    if (index > -1) {
      db.users[index] = user;
      save(db);
      return user;
    }
    return null;
  },
  /**
   * Delete a user.
   * @param {number} id The id of the user to delete.
   */
  deleteUser(id) { const db = load(); db.users = db.users.filter(u => u.id !== id); save(db); },
  /**
   * Get the list of courses.
   * @returns {Array} The list of courses.
   */
  listCourses() { return load().courses; },
  /**
   * Create a new course.
   * @param {object} course The course to create.
   * @returns {object} The created course.
   */
  createCourse(course) { const db = load(); course.id = db.seq++; db.courses.push(course); save(db); return course; },
  /**
   * Delete a course.
   * @param {number} id The id of the course to delete.
   */
  deleteCourse(id) { const db = load(); db.courses = db.courses.filter(c => c.id !== id); save(db); },
};
