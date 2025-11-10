import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

// Small file-based JSON store for demo purposes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, "db.json");

async function readDB() {
  try {
    const exists = await fs.pathExists(DB_PATH);
    if (!exists) {
      const init = { users: [], courses: [], seq: 1 };
      await fs.writeJson(DB_PATH, init, { spaces: 2 });
      return init;
    }
    return fs.readJson(DB_PATH);
  } catch (err) {
    console.error("Error leyendo DB:", err);
    return { users: [], courses: [], seq: 1 };
  }
}

async function writeDB(data) {
  await fs.writeJson(DB_PATH, data, { spaces: 2 });
}

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get("/", (req, res) => res.json({ ok: true, message: "Aplicatto API" }));

/* Users endpoints */
app.get("/users", async (req, res) => {
  const db = await readDB();
  res.json(db.users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const db = await readDB();
  const user = db.users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const payload = req.body;
  const db = await readDB();
  const id = db.seq++;
  const user = { id, ...payload };
  db.users.push(user);
  await writeDB(db);
  res.status(201).json(user);
});

app.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const payload = req.body;
  const db = await readDB();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  db.users[idx] = { id, ...payload };
  await writeDB(db);
  res.json(db.users[idx]);
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const db = await readDB();
  db.users = db.users.filter((u) => u.id !== id);
  await writeDB(db);
  res.status(204).send();
});

/* Courses endpoints */
app.get("/courses", async (req, res) => {
  const db = await readDB();
  res.json(db.courses);
});

app.post("/courses", async (req, res) => {
  const payload = req.body;
  const db = await readDB();
  const id = db.seq++;
  const course = { id, ...payload };
  db.courses.push(course);
  await writeDB(db);
  res.status(201).json(course);
});

app.delete("/courses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const db = await readDB();
  db.courses = db.courses.filter((c) => c.id !== id);
  await writeDB(db);
  res.status(204).send();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
