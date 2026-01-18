const Database = require('better-sqlite3');

const db = new Database(process.env.DB_PATH);

// таблица привычек
db.prepare(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    streak INTEGER DEFAULT 0,
    last_done TEXT,
    created_at TEXT
  )
`).run();

module.exports = db;
