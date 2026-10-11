// Database layer — Node's built-in SQLite (node:sqlite), no native deps.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(join(dataDir, 'sibaq.db'));
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  note TEXT DEFAULT '',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  category TEXT DEFAULT '',
  photo TEXT DEFAULT '',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS media_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT DEFAULT 'image',
  title TEXT NOT NULL,
  src TEXT NOT NULL,
  poster TEXT DEFAULT '',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS vouchers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  brand TEXT DEFAULT '',
  description TEXT DEFAULT '',
  instructions TEXT DEFAULT '',
  expiry TEXT DEFAULT '',
  image TEXT DEFAULT '',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sponsor_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  slots TEXT DEFAULT '',
  price TEXT DEFAULT '',
  price_confirmed INTEGER DEFAULT 0,
  benefits TEXT DEFAULT '[]',
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT DEFAULT 'promote',
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  package TEXT DEFAULT '',
  message TEXT DEFAULT '',
  created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
  handled INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  correct_index INTEGER NOT NULL,
  published INTEGER DEFAULT 0,
  is_test INTEGER DEFAULT 0,
  winner_confirmed INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  participant TEXT NOT NULL,
  name TEXT NOT NULL,
  option_index INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  is_test INTEGER DEFAULT 0,
  submitted_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now'))
);
CREATE INDEX IF NOT EXISTS idx_sub_q ON quiz_submissions(question_id, correct, submitted_at);
`);

export function todayLocal() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
