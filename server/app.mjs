// SIBAQ KUTTIKKATTUR — Express App with MongoDB Atlas
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import {
  connectDB,
  Admin,
  Setting,
  Stat,
  Partner,
  TeamMember,
  MediaItem,
  Voucher,
  SponsorPackage,
  Faq,
  Enquiry,
  QuizQuestion,
  QuizSubmission,
  toCleanDoc,
  todayLocal,
} from './db.mjs';
import { runSeed } from './seed.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Load .env if present
const envPath = path.join(ROOT, '.env');
dotenv.config({ path: envPath });

const SECRET = process.env.SESSION_SECRET || 'insecure-dev-secret';

// Singleton DB connection and seed
let dbPromise = null;
export async function ensureDB() {
  if (!dbPromise) {
    dbPromise = (async () => {
      await connectDB();
      await runSeed();
    })().catch((err) => {
      console.error('[mongodb] Startup connection error:', err);
      dbPromise = null; // retry on next call if it failed
      throw err;
    });
  }
  return dbPromise;
}

// Kick off connection eagerly
ensureDB().catch(() => {});

// Helpers
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

// Serverless DB readiness middleware for API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await ensureDB();
    } catch {
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }
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

// --- public content API ------------------------------------------------------
app.get('/api/site', h(async (req, res) => {
  const row = await Setting.findOne({ key: 'site' }).lean();
  res.json(row ? JSON.parse(row.value) : {});
}));

const publicList = (Model, orderField = 'sort') =>
  h(async (req, res) => {
    const rows = await Model.find({ published: true }).sort({ [orderField]: 1, _id: 1 }).lean();
    res.json(rows.map(toCleanDoc));
  });

app.get('/api/stats', publicList(Stat));
app.get('/api/partners', publicList(Partner));
app.get('/api/team', publicList(TeamMember));
app.get('/api/media', publicList(MediaItem));
app.get('/api/vouchers', publicList(Voucher));
app.get('/api/faqs', publicList(Faq));

app.get('/api/sponsors', h(async (req, res) => {
  const rows = await SponsorPackage.find({ published: true }).sort({ sort: 1, _id: 1 }).lean();
  res.json(
    rows.map((r) => ({
      ...toCleanDoc(r),
      benefits: JSON.parse(r.benefits || '[]'),
      price: r.price_confirmed ? r.price : null,
    }))
  );
}));

// --- game & quiz public API ---------------------------------------------------
app.get('/api/quiz/today', h(async (req, res) => {
  const today = todayLocal();
  const participantId = typeof req.query.participant === 'string' ? req.query.participant : '';

  let q = await QuizQuestion.findOne({ date: today, published: true }).lean();
  if (!q) {
    q = await QuizQuestion.findOne({ published: true }).sort({ date: -1, _id: -1 }).lean();
  }

  if (!q) return res.json({ none: true });

  let answered = false;
  let was_correct = null;
  if (participantId) {
    const prev = await QuizSubmission.findOne({
      question_id: q._id.toString(),
      participant_id: participantId,
    }).lean();
    if (prev) {
      answered = true;
      was_correct = !!prev.correct;
    }
  }

  let options = [];
  try {
    options = JSON.parse(q.options || '[]');
  } catch {
    options = [];
  }

  res.json({
    id: q._id.toString(),
    date: q.date,
    question: q.question,
    options,
    is_test: !!q.is_test,
    answered,
    was_correct,
  });
}));

app.post('/api/quiz/submit', h(async (req, res) => {
  const { questionId, participantId, name, phone, chosenIndex, timeMs } = req.body || {};
  if (!questionId || !participantId || !name || !phone || chosenIndex === undefined) {
    return res.status(400).json({ error: 'Missing required submission fields' });
  }

  const q = await QuizQuestion.findById(questionId).lean();
  if (!q || !q.published) return res.status(404).json({ error: 'Question not found' });

  const existing = await QuizSubmission.findOne({
    question_id: questionId,
    participant_id: participantId,
  }).lean();
  if (existing) {
    return res.status(409).json({ error: 'You have already submitted an answer today' });
  }

  const chosen = Number(chosenIndex);
  const isCorrect = chosen === Number(q.correct_index);
  const elapsed = Math.max(0, Math.min(Number(timeMs) || 0, 60000));

  await QuizSubmission.create({
    question_id: questionId,
    participant_id: String(participantId).slice(0, 80),
    name: String(name).trim().slice(0, 80),
    phone: String(phone).trim().slice(0, 30),
    chosen_index: chosen,
    correct: isCorrect,
    time_ms: elapsed,
  });

  res.json({ correct: isCorrect });
}));

app.get('/api/leaderboard', h(async (req, res) => {
  const today = todayLocal();
  let q = await QuizQuestion.findOne({ date: today, published: true }).lean();
  if (!q) {
    q = await QuizQuestion.findOne({ published: true }).sort({ date: -1, _id: -1 }).lean();
  }

  if (!q) return res.json({ date: today, none: true, entries: [] });

  const rows = await QuizSubmission.find({ question_id: q._id.toString(), correct: true })
    .sort({ time_ms: 1, created_at: 1 })
    .limit(20)
    .lean();

  const entries = rows.map((r, i) => {
    const raw = (r.name || 'Anonymous').trim();
    const masked = raw.length <= 2 ? raw : `${raw.slice(0, 2)}***${raw.slice(-1)}`;
    const sec = ((r.time_ms || 0) / 1000).toFixed(1);
    return {
      rank: i + 1,
      name: masked,
      time: `${sec}s`,
    };
  });

  res.json({
    date: q.date,
    questionId: q._id.toString(),
    is_test: !!q.is_test,
    winner_confirmed: !!q.winner_confirmed,
    entries,
  });
}));

// --- enquiries (sponsorship / general) ---------------------------------------
app.post('/api/enquiry', h(async (req, res) => {
  const { name, organization, contact, package: pkg, message } = req.body || {};
  if (!name || !contact) return res.status(400).json({ error: 'Name and contact are required' });

  await Enquiry.create({
    name: name.trim().slice(0, 80),
    organization: typeof organization === 'string' ? organization.trim().slice(0, 80) : '',
    contact: contact.trim(),
    package: typeof pkg === 'string' ? pkg.slice(0, 80) : '',
    message: typeof message === 'string' ? message.trim().slice(0, 1000) : '',
  });
  res.json({ ok: true });
}));

// --- uploads ------------------------------------------------------------------
const uploadDir = process.env.VERCEL ? path.join('/tmp', 'uploads') : path.join(ROOT, 'uploads');
try {
  fs.mkdirSync(uploadDir, { recursive: true });
} catch {
  // Ignore in read-only environment
}

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
app.post('/api/admin/login', h(async (req, res) => {
  const { username, password } = req.body || {};
  const admin = await Admin.findOne({ username: String(username || '') });
  if (!admin || !bcrypt.compareSync(String(password || ''), admin.password_hash))
    return res.status(401).json({ error: 'Wrong username or password' });
  const token = sign({ id: admin._id.toString(), exp: Date.now() + 12 * 3600 * 1000 });
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax${secureFlag}`);
  res.json({ ok: true });
}));

app.post('/api/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`);
  res.json({ ok: true });
});

app.get('/api/admin/overview', requireAdmin, h(async (req, res) => {
  const [publishedQuestions, draftQuestions, activePartners, leaderboardEntries] = await Promise.all([
    QuizQuestion.countDocuments({ published: true }),
    QuizQuestion.countDocuments({ published: false }),
    Partner.countDocuments({ published: true }),
    QuizSubmission.countDocuments({ correct: true }),
  ]);
  res.json({ publishedQuestions, draftQuestions, activePartners, leaderboardEntries });
}));

app.get('/api/admin/me', (req, res) => {
  const auth = verifyToken(parseCookies(req)[ADMIN_COOKIE]);
  if (!auth) return res.json({ authed: false });
  res.json({ authed: true, id: auth.id });
});

// --- admin settings -------------------------------------------------------------
app.get('/api/admin/settings', requireAdmin, h(async (req, res) => {
  const row = await Setting.findOne({ key: 'site' }).lean();
  res.json(row ? JSON.parse(row.value) : {});
}));

app.put('/api/admin/settings', requireAdmin, h(async (req, res) => {
  if (typeof req.body !== 'object' || req.body === null) return res.status(400).json({ error: 'Invalid settings' });
  await Setting.findOneAndUpdate(
    { key: 'site' },
    { $set: { value: JSON.stringify(req.body) } },
    { upsert: true }
  );
  res.json({ ok: true });
}));

// --- generic admin CRUD for collections ----------------------------------------
const COLLECTIONS = {
  stats: { Model: Stat, fields: ['value', 'label', 'note', 'sort', 'published'] },
  partners: { Model: Partner, fields: ['name', 'category', 'logo_url', 'website', 'sort', 'published'] },
  team: { Model: TeamMember, fields: ['name', 'role', 'phone', 'image_url', 'sort', 'published'] },
  media: { Model: MediaItem, fields: ['title', 'category', 'url', 'sort', 'published'] },
  vouchers: { Model: Voucher, fields: ['title', 'brand', 'description', 'instructions', 'expiry', 'sort', 'published'] },
  sponsors: { Model: SponsorPackage, fields: ['name', 'tagline', 'slots', 'price', 'price_confirmed', 'benefits', 'sort', 'published'] },
  faqs: { Model: Faq, fields: ['question', 'answer', 'sort', 'published'] },
  questions: { Model: QuizQuestion, fields: ['date', 'question', 'options', 'correct_index', 'is_test', 'published'] },
};

app.get('/api/admin/collections/:name', requireAdmin, h(async (req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const rows = await c.Model.find({}).sort({ sort: 1, _id: 1 }).lean();
  res.json(
    rows.map((r) => ({
      ...toCleanDoc(r),
      published: !!r.published,
      is_test: r.is_test === undefined ? undefined : !!r.is_test,
      price_confirmed: r.price_confirmed === undefined ? undefined : !!r.price_confirmed,
    }))
  );
}));

const sanitize = (c, body) => {
  const out = {};
  for (const f of c.fields) {
    if (!(f in body)) continue;
    let v = body[f];
    if (f === 'published' || f === 'is_test' || f === 'price_confirmed') v = !!v;
    else if (f === 'sort' || f === 'correct_index') v = Number(v) || 0;
    else if (typeof v === 'string') v = v.slice(0, 4000);
    out[f] = v;
  }
  return out;
};

app.post('/api/admin/collections/:name', requireAdmin, h(async (req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const data = sanitize(c, req.body || {});
  if (!Object.keys(data).length) return res.status(400).json({ error: 'Empty record' });
  const doc = await c.Model.create(data);
  res.json({ ok: true, id: doc._id.toString() });
}));

app.put('/api/admin/collections/:name/:id', requireAdmin, h(async (req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  const data = sanitize(c, req.body || {});
  await c.Model.findByIdAndUpdate(req.params.id, { $set: data });
  res.json({ ok: true });
}));

app.delete('/api/admin/collections/:name/:id', requireAdmin, h(async (req, res) => {
  const c = COLLECTIONS[req.params.name];
  if (!c) return res.status(404).json({ error: 'Unknown collection' });
  await c.Model.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

app.get('/api/admin/questions/:id/submissions', requireAdmin, h(async (req, res) => {
  const rows = await QuizSubmission.find({ question_id: req.params.id }).sort({ time_ms: 1 }).lean();
  res.json(rows);
}));

app.delete('/api/admin/submissions/:id', requireAdmin, h(async (req, res) => {
  await QuizSubmission.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

app.post('/api/admin/questions/:id/confirm-winner', requireAdmin, h(async (req, res) => {
  await QuizQuestion.findByIdAndUpdate(req.params.id, { $set: { winner_confirmed: true } });
  res.json({ ok: true });
}));

app.get('/api/admin/enquiries', requireAdmin, h(async (req, res) => {
  const rows = await Enquiry.find({}).sort({ created_at: -1 }).lean();
  res.json(rows.map((r) => ({ ...toCleanDoc(r), handled: !!r.handled })));
}));

app.put('/api/admin/enquiries/:id', requireAdmin, h(async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, { $set: { handled: !!req.body?.handled } });
  res.json({ ok: true });
}));

app.delete('/api/admin/enquiries/:id', requireAdmin, h(async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

// --- static serving (for standalone / local express) --------------------------
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

export default app;
