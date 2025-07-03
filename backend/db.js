import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './leads.db',
    driver: sqlite3.Database,
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      FirstName TEXT,
      MobileNo TEXT,
      Email TEXT,
      Preferences TEXT,
      Remark TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}
