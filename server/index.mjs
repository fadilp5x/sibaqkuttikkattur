// SIBAQ KUTTIKKATTUR — API + production static server.
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, todayLocal } from './db.mjs';
import { runSeed } from './seed.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// --- env bootstrap -----------------------------------------------------------
const envPath = path.join(ROOT, '.env');
if (!fs.existsSync(envPath)) {
  const secret = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(
    envPath,
    `PORT=3001\nADMIN_USERNAME=admin\nADMIN_PASSWORD=sibaq-admin-2026\nSESSION_SECRET=${secret}\n`
  );
  console.log('[env] .env created with a generated session secret');
}
import dotenv from 'dotenv';
dotenv.config({ path: envPath });

const PORT = Number(process.env.PORT || 3001);
const SECRET = process.env.SESSION_SECRET || 'insecure-dev-secret';

runSeed();

// --- helpers -----------------------------------------------------------------
const isProd = process.env.NODE_ENV === 'production';
const secureFlag = isProd ? '; Secure' : '';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

const parseCookies = (req) => {
  const out = {};
  (req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
};

const sign = (payload) => {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
};

const verifyToken = (token) => {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expect = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
};

const ADMIN_COOKIE = 'sibaq_admin';
function requireAdmin(req, res, next) {
  const auth = verifyToken(parseCookies(req)[ADMIN_COOKIE]);
  if (!auth) return res.status(401).json({ error: 'Authentication required' });
  req.admin = auth;
  next();
}

const h = (fn) => (req, res) => {
  Promise.resolve(fn(req, res)).catch((e) => {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  });
};

const pub = (row) => ({ ...row, published: !!row.published });

// --- public content API ------------------------------------------------------
app.get('/api/site', h((req, res) => {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('site');
  res.json(row ? JSON.parse(row.value) : {});
}));

const publicList = (table, order = 'sort, id') =>
  h((req, res) => {
    const rows = db.prepare(`SELECT * FROM ${table} WHERE published = 1 ORDER BY ${order}`).all();
    res.json(rows.map(pub));
  });

app.get('/api/stats', publicList('stats'));
app.get('/api/partners', publicList('partners'));
app.get('/api/team', publicList('team_members'));
app.get('/api/media', publicList('media_items'));
app.get('/api/vouchers', publicList('vouchers'));
app.get('/api/faqs', publicList('faqs'));

app.get('/api/sponsors', h((req, res) => {
  const rows = db
    .prepare('SELECT * FROM sponsor_packages WHERE published = 1 ORDER BY sort, id')
    .all()
    .map((r) => ({
      ...pub(r),
      benefits: JSON.parse(r.benefits || '[]'),
      // Prices stay hidden until the organiser explicitly confirms them.
      price: r.price_confirmed ? r.price : null,
    }));
  res.json(rows);
}));

// --- quiz --------------------------------------------------------------------
// Test questions are playable (clearly labelled) but never reach the leaderboard.
const getQuestionFor = (date) =>
  db
    .prepare('SELECT * FROM quiz_questions WHERE date = ? AND published = 1 ORDER BY id LIMIT 1')
    .get(date);

app.get('/api/quiz/today', h((req, res) => {
  const q = getQuestionFor(todayLocal());
  if (!q) return res.json({ none: true, date: todayLocal() });
  const participant = String(req.query.participant || '');
  const answered = participant
    ? db.prepare('SELECT id, correct, option_index FROM quiz_submissions WHERE question_id = ? AND participant = ?').get(q.id, participant)
    : null;
  res.json({
    none: false,
    id: q.id,
    date: q.date,
    question: q.question,
    options: JSON.parse(q.options),
    is_test: !!q.is_test,
    answered: !!answered,
    was_correct: answered ? !!answered.correct : null,
  });
}));

// light in-memory rate limit for submissions
const submitLog = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (submitLog.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  submitLog.set(ip, arr);
  if (submitLog.size > 500) submitLog.clear();
  return arr.length > 12;
}

app.post('/api/quiz/submit', h((req, res) => {
  const { questionId, optionIndex, name, participant } = req.body || {};
  if (rateLimited(req.ip)) return res.status(429).json({ error: 'Too many attempts, try again in a minute.' });
  if (!Number.isInteger(questionId) || !Number.isInteger(optionIndex))
    return res.status(400).json({ error: 'Invalid submission' });
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 40)
    return res.status(400).json({ error: 'Please provide your name (max 40 characters)' });
  if (typeof participant !== 'string' || participant.length < 8 || participant.length > 64)
    return res.status(400).json({ error: 'Invalid participant id' });

  const q = db.prepare('SELECT * FROM quiz_questions WHERE id = ? AND published = 1').get(questionId);
  if (!q || q.date !== todayLocal()) return res.status(404).json({ error: 'No live question right now' });

  const dup = db
    .prepare('SELECT id FROM quiz_submissions WHERE question_id = ? AND participant = ?')
    .get(q.id, participant);
  if (dup) return res.status(409).json({ error: 'You have already played today' });

  const correct = optionIndex === q.correct_index ? 1 : 0;
  db.prepare(
    'INSERT INTO quiz_submissions (question_id, participant, name, option_index, correct, is_test) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(q.id, participant, name.trim(), optionIndex, correct, q.is_test);

  res.json({ correct: !!correct, correctIndex: q.correct_index, date: q.date, is_test: !!q.is_test });
}));

app.get('/api/leaderboard', h((req, res) => {
  const date = typeof req.query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(req.query.date) ? req.query.date : todayLocal();
  const q = getQuestionFor(date);
  if (!q) return res.json({ date, none: true, entries: [] });
  // Test questions never appear on the public leaderboard.
  if (q.is_test) return res.json({ date, none: false, is_test: true, entries: [] });
  const rows = db
    .prepare(
      "SELECT name, submitted_at FROM quiz_submissions WHERE question_id = ? AND correct = 1 ORDER BY submitted_at, id"
    )
    .all(q.id)
    .map((r, i) => ({ rank: i + 1, name: r.name, time: r.submitted_at ? r.submitted_at.slice(11, 19) : '' }));
  res.json({ date, none: false, is_test: false, winner_confirmed: !!q.winner_confirmed, entries: rows });
}));

app.get('/api/leaderboard/dates', h((req, res) => {
  const rows = db
    .prepare("SELECT date, is_test FROM quiz_questions WHERE published = 1 ORDER BY date DESC LIMIT 14")
    .all()
    .filter((r) => !r.is_test)
    .map((r) => r.date);
  res.json([...new Set(rows)]);
}));

// --- enquiries ----------------------------------------------------------------
app.post('/api/enquiries', h((req, res) => {
  const { kind, name, contact, pkg, message } = req.body || {};
  if (!['promote', 'sponsor'].includes(kind)) return res.status(400).json({ error: 'Invalid enquiry type' });
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 80)
    return res.status(400).json({ error: 'Please provide a name' });
  if (typeof contact !== 'string' || !contact.trim() || contact.trim().length > 80)
    return res.status(400).json({ error: 'Please provide contact details' });
  if (typeof message !== 'string' || message.length > 1000)
    return res.status(400).json({ error: 'Message too long' });
  db.prepare('INSERT INTO enquiries (kind, name, contact, package, message) VALUES (?, ?, ?, ?, ?)').run(
    kind,
    name.trim(),
    contact.trim(),
    typeof pkg === 'string' ? pkg.slice(0, 80) : '',
    typeof message === 'string' ? message.trim().slice(0, 1000) : ''
  );
  res.json({ ok: true });
}));

// --- uploads ------------------------------------------------------------------
const uploadDir = path.join(ROOT, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = (path.extname(file.originalname) || '').toLowerCase().slice(0, 10);
      cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^(image\/(png|jpe?g|gif|webp|svg\+xml)|video\/mp4|video\/webm)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images and MP4/WebM videos are allowed'));
  },
});

app.post('/api/admin/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// --- admin auth ----------------------------------------------------------------
app.post('/api/admin/login', h((req, res) => {
  const { username, password } = req.body || {};
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(String(username || ''));
  if (!admin || !bcrypt.compareSync(String(password || ''), admin.password_hash))
    return res.status(401).json({ error: 'Wrong username or password' });
  const token = sign({ id: admin.id, exp: Date.now() + 12 * 3600 * 1000 });
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax${secureFlag}`);
  res.json({ ok: true });
}));

app.post('/api/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`);
  res.json({ ok: true });
});

app.get('/api/admin/overview', requireAdmin, (req, res) => {
  const publishedQuestions = db.prepare('SELECT count(*) as count FROM quiz_questions WHERE published = 1').get().count;
  const draftQuestions = db.prepare('SELECT count(*) as count FROM quiz_questions WHERE published = 0').get().count;
  const activePartners = db.prepare('SELECT count(*) as count FROM partners WHERE published = 1').get().count;
  const leaderboardEntries = db.prepare('SELECT count(*) as count FROM quiz_submissions WHERE correct = 1').get().count;
  
  res.json({ publishedQuestions, draftQuestions, activePartners, leaderboardEntries });
});

app.get('/api/admin/me', (req, res) => {
  const auth = verifyToken(parseCookies(req)[ADMIN_COOKIE]);
  if (!auth) return res.json({ authed: false });
  res.json({ authed: true, id: auth.id });
});

// --- admin settings -------------------------------------------------------------
app.get('/api/admin/settings', requireAdmin, h((req, res) => {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('site');
  res.json(row ? JSON.parse(row.value) : {});
}));

app.put('/api/admin/settings', requireAdmin, h((req, res) => {
  if (typeof req.body !== 'object' || req.body === null) return res.status(400).json({ error: 'Invalid settings' });
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(
    'site',
    JSON.stringify(req.body)
  );
  res.json({ ok: true });
}));

// --- admin collections ------------------------------------------------------------
const COLLECTIONS = {
  stats: { table: 'stats', fields: ['value', 'label', 'note', 'sort', 'published'] },
  partners: { table: 'partners', fields: ['name', 'logo', 'url', 'sort', 'published'] },
  team: { table: 'team_members', fields: ['name', 'role', 'category', 'photo', 'sort', 'published'] },
  media: { table: 'media_items', fields: ['type', 'title', 'src', 'poster', 'sort', 'published'] },
  vouchers: { table: 'vouchers', fields: ['title', 'brand', 'description', 'instructions', 'expiry', 'image', 'sort', 'published'] },
  sponsors: { table: 'sponsor_packages', fields: ['name', 'tagline', 'slots', 'price', 'price_confirmed', 'benefits', 'sort', 'published'] },
  faqs: { table: 'faqs', fields: ['question', 'answer', 'sort', 'published'] },
  questions: { table: 'quiz_questions', fields: ['date', 'question', 'options', 'correct_index', 'published', 'is_test'] },
};

app.get('/api/admin/collections/:name', requireAdmin, h((req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const orderBy = c.fields.includes('sort') ? 'sort, id' : 'id DESC';
  const rows = db.prepare(`SELECT * FROM ${c.table} ORDER BY ${orderBy}`).all();
  res.json(rows.map((r) => ({ ...r, published: !!r.published, is_test: r.is_test === undefined ? undefined : !!r.is_test, price_confirmed: r.price_confirmed === undefined ? undefined : !!r.price_confirmed })));
}));

const sanitize = (c, body) => {
  const out = {};
  for (const f of c.fields) {
    if (!(f in body)) continue;
    let v = body[f];
    if (f === 'published' || f === 'is_test' || f === 'price_confirmed') v = v ? 1 : 0;
    else if (f === 'sort' || f === 'correct_index') v = Number(v) || 0;
    else if (typeof v === 'string') v = v.slice(0, 4000);
    out[f] = v;
  }
  return out;
};

app.post('/api/admin/collections/:name', requireAdmin, h((req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const data = sanitize(c, req.body || {});
  const keys = Object.keys(data);
  if (!keys.length) return res.status(400).json({ error: 'Empty record' });
  const info = db
    .prepare(`INSERT INTO ${c.table} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`)
    .run(...keys.map((k) => data[k]));
  res.json({ ok: true, id: Number(info.lastInsertRowid) });
}));

app.put('/api/admin/collections/:name/:id', requireAdmin, h((req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const data = sanitize(c, req.body || {});
  const keys = Object.keys(data);
  if (!keys.length) return res.status(400).json({ error: 'Nothing to update' });
  db.prepare(`UPDATE ${c.table} SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`).run(
    ...keys.map((k) => data[k]),
    Number(req.params.id)
  );
  res.json({ ok: true });
}));

app.delete('/api/admin/collections/:name/:id', requireAdmin, h((req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  db.prepare(`DELETE FROM ${c.table} WHERE id = ?`).run(Number(req.params.id));
  res.json({ ok: true });
}));

// --- admin submissions / leaderboard review ---------------------------------------
app.get('/api/admin/submissions', requireAdmin, h((req, res) => {
  const date = typeof req.query.date === 'string' ? req.query.date : todayLocal();
  const rows = db
    .prepare(
      `SELECT s.*, q.question, q.date, q.is_test FROM quiz_submissions s
       JOIN quiz_questions q ON q.id = s.question_id
       WHERE q.date = ? ORDER BY s.submitted_at`
    )
    .all(date);
  res.json(rows.map((r) => ({ ...r, correct: !!r.correct, is_test: !!r.is_test })));
}));

app.delete('/api/admin/submissions/:id', requireAdmin, h((req, res) => {
  db.prepare('DELETE FROM quiz_submissions WHERE id = ?').run(Number(req.params.id));
  res.json({ ok: true });
}));

app.post('/api/admin/questions/:id/confirm-winner', requireAdmin, h((req, res) => {
  db.prepare('UPDATE quiz_questions SET winner_confirmed = 1 WHERE id = ?').run(Number(req.params.id));
  res.json({ ok: true });
}));

app.get('/api/admin/enquiries', requireAdmin, h((req, res) => {
  const rows = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
  res.json(rows.map((r) => ({ ...r, handled: !!r.handled })));
}));

app.put('/api/admin/enquiries/:id', requireAdmin, h((req, res) => {
  db.prepare('UPDATE enquiries SET handled = ? WHERE id = ?').run(req.body?.handled ? 1 : 0, Number(req.params.id));
  res.json({ ok: true });
}));

app.delete('/api/admin/enquiries/:id', requireAdmin, h((req, res) => {
  db.prepare('DELETE FROM enquiries WHERE id = ?').run(Number(req.params.id));
  res.json({ ok: true });
}));

// --- static serving ----------------------------------------------------------------
app.use('/uploads', express.static(uploadDir, { maxAge: '1d' }));

const distDir = path.join(ROOT, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { maxAge: '1h', index: false }));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('/', (req, res) =>
    res
      .status(200)
      .send('SIBAQ API server is running. In development, open the Vite dev server at http://localhost:5173')
  );
}

app.listen(PORT, () => {
  console.log(`[server] SIBAQ server listening on http://localhost:${PORT}`);
});
