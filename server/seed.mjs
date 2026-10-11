// Idempotent seed — creates the admin user and fills default content on first run.
// Run manually with `npm run seed`; the server also runs it automatically at boot.
import bcrypt from 'bcryptjs';
import { db, todayLocal } from './db.mjs';

const SETTINGS = {
  site: {
    name: 'SIBAQ',
    fullName: 'SIBAQ KUTTIKKATTUR',
    tagline: "Darul Huda National Arts Fest '26",
    edition: '11th Biennial Edition',
    dates: 'November 20–22, 2026',
    venue: 'First Plot, Mavoor–Kozhikode Road, Kuttikattoor, Kozhikode, Kerala 673008',
    venueShort: 'Kuttikattoor · Kozhikode',
    host: 'Shamsul Huda Islamic Academy, Kuttikattoor',
    committee: 'Kuttikkattoor Muslim Jamaath Committee',
    university: 'Darul Huda Islamic University',
    phone: '+91 95620 08296',
    phoneRaw: '+919562008296',
    whatsapp: '919562008296',
    email: 'sibaqkuttikatoor@gmail.com',
    youtube: 'https://www.youtube.com',
    logo: '/media/brand-lockup.jpg',
    logotype: '/media/brand-logotype.png',
  },
  hero: {
    kicker: 'SIBAQ 2K26',
    title: 'What is SIBAQ?',
    line: 'The National Arts Fest of Darul Huda Islamic University — a celebration of art, literature, oratory and ideas.',
    collage: '/media/collage-icons.jpg',
  },
  ribbon: {
    text: 'SIBAQ 2K26 ◆ TALENT ◆ ART ◆ CULTURE ◆ KNOWLEDGE ◆ ',
  },
  about: {
    lead: 'A national stage where talent meets tradition.',
    body: [
      'SIBAQ is the National Arts Fest of Darul Huda Islamic University, hosted at Kuttikattoor by Shamsul Huda Islamic Academy under the Kuttikkattoor Muslim Jamaath Committee.',
      'Held biennially, it brings together young talent from campuses across India for three days of art, literature, oratory, debate and ideas — where heritage and creativity share one stage.',
    ],
    disciplines: [
      'Arabic Calligraphy',
      'Multilingual Debates',
      'Islamic Studies',
      'Visual Arts',
      'Poetry & Literature',
      'Media Production',
      'Public Speaking',
      'Performing Arts',
    ],
    campusImage: '/media/campus.jpg',
    stageImages: ['/media/stage-01.jpg', '/media/stage-02.jpg', '/media/stage-03.jpg', '/media/stage-04.jpg'],
  },
  donation: {
    title: 'Support the Academy',
    description:
      'Every contribution funds student scholarships, library facilities and cultural arts infrastructure at Kuttikattoor.',
    upi: 'shamsulhuda@upi',
    account: 'Shamsul Huda Islamic Academy · Kuttikattoor Branch',
    qr: '/media/donation-qr.png',
    tiers: ['₹250', '₹500', '₹1,000', '₹2,500', '₹5,000'],
  },
  bookfest: {
    title: "Edumart Book Fest '26",
    dates: 'November 20–22, 2026',
    blurb:
      'A reader-first space beside the main fest — scholastic publishers, translations, children’s literature and academic texts.',
    features: ['100+ leading publishers', 'Flat 20–40% fest discounts', 'Author & scholar signings', 'Reading pavilions'],
    image: '/media/campus.jpg',
  },
  game: {
    voucherLine: 'Winners earn vouchers redeemable at Edumart Book Fest stalls.',
  },
  footer: {
    note: 'Hosted by Shamsul Huda Islamic Academy · Supervised by Kuttikkattoor Muslim Jamaath Committee.',
    credit: '2026 SIBAQ National Arts Fest Organizing Committee',
  },
};

function seedSettings() {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('site');
  if (row) return;
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('site', JSON.stringify(SETTINGS));
  console.log('[seed] default site settings inserted');
}

function seedAdmin() {
  const existing = db.prepare('SELECT id FROM admins LIMIT 1').get();
  if (existing) return;
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'sibaq-admin-2026';
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`[seed] admin user created: ${username}`);
}

function seedRows() {
  const count = (t) => db.prepare(`SELECT COUNT(*) AS c FROM ${t}`).get().c;

  if (count('stats') === 0) {
    const ins = db.prepare('INSERT INTO stats (value, label, note, sort) VALUES (?, ?, ?, ?)');
    ins.run('10,000+', 'Students', 'Youth network across India', 1);
    ins.run('4,000+', 'Candidates', 'Competing on national stages', 2);
    ins.run('400+', 'Programs', 'Literary & artistic categories', 3);
    ins.run('35+', 'Campuses', 'Pan-India collegiate network', 4);
  }

  if (count('partners') === 0) {
    const ins = db.prepare('INSERT INTO partners (name, logo, url, sort, published) VALUES (?, ?, ?, ?, ?)');
    ins.run('Darul Huda Islamic University', 'https://www.dhiu.in/resources/img/uni-logo.png', 'https://www.dhiu.in', 1, 1);
    ins.run('Shamsul Huda Islamic Academy', 'https://www.shamsulhuda.in/assets/shia-logo-j%20(1)-BLNbhxve.png', 'https://www.shamsulhuda.in', 2, 1);
    ins.run('Edumart', 'https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg', '#', 3, 1);
  }

  if (count('team_members') === 0) {
    const ins = db.prepare('INSERT INTO team_members (name, role, category, photo, sort) VALUES (?, ?, ?, ?, ?)');
    ins.run('Fadhil', 'Project Head', 'Leadership', '/media/team-fadhil.jpg', 1);
    ins.run('Sinan P', 'Marketing Manager', 'Partnerships & Outreach', '/media/team-sinan.jpg', 2);
    ins.run('Aslah', 'Creative Content Strategist', 'Creative Direction', '/media/team-aslah.jpg', 3);
    ins.run('Luqman', 'Visual Design Lead', 'Brand Identity', '/media/team-luqman.jpg', 4);
    ins.run('Sadhath', 'Video Production Specialist', 'Cinematography', '/media/team-sadhath.jpg', 5);
    ins.run('Nishad', 'Video Editor & Motion Designer', 'Motion & VFX', '/media/team-nishad.jpg', 6);
    ins.run('Zidhan', 'Brand & Graphic Designer', 'Graphic Arts', '/media/team-zidhan.jpg', 7);
    ins.run('Shahid', 'Content & Copy Specialist', 'Editorial & Media', '/media/team-shahid.jpg', 8);
  }

  if (count('media_items') === 0) {
    const ins = db.prepare('INSERT INTO media_items (type, title, src, sort) VALUES (?, ?, ?, ?)');
    ins.run('image', 'Festival moments', '/media/collage-icons.jpg', 1);
    ins.run('image', 'On stage — past editions', '/media/stage-01.jpg', 2);
    ins.run('image', 'Scholarly sessions', '/media/stage-02.jpg', 3);
    ins.run('image', 'Guests of honour', '/media/stage-03.jpg', 4);
    ins.run('image', 'Grand finale', '/media/stage-04.jpg', 5);
  }

  if (count('sponsor_packages') === 0) {
    const ins = db.prepare(
      'INSERT INTO sponsor_packages (name, tagline, slots, price, price_confirmed, benefits, sort) VALUES (?, ?, ?, ?, 0, ?, ?)'
    );
    ins.run('Title Sponsor', 'Exclusive', '1 slot', '₹3,00,000', JSON.stringify([
      'Official title partnership across all assets',
      'Main stage backdrop & LED wall branding',
      'Highway billboard & mobile LED coverage',
      'YouTube livestream overlay & MC mentions',
      'Dedicated stall & brand film broadcast',
    ]), 1);
    ins.run('Co-Title Sponsor', 'High profile', '2 slots', '₹1,50,000', JSON.stringify([
      'Co-title partnership recognition',
      'Main stage LED — all 3 days',
      'Main entrance arch & billboard space',
      'Dedicated brand film & reel campaign',
    ]), 2);
    ins.run('Gold Partner', 'Featured', '3 slots', '₹50,000', JSON.stringify([
      'Stage LED rotation on all days',
      'Brand promo video showcase',
      'Promotional reels & feed stories',
      'On-ground brand activation desk',
    ]), 3);
    ins.run('Silver Partner', 'Growth', '5 slots', '₹30,000', JSON.stringify([
      'On-ground venue banners',
      'Shared highway billboard presence',
      'Social media brand feature',
      'Livestream lower-third credit',
    ]), 4);
    ins.run('Associate Partner', 'Community', '8 slots', '₹20,000', JSON.stringify([
      'Promotional reel & story inclusion',
      'Official website partner listing',
      'Shared on-ground signage',
    ]), 5);
    ins.run('Food Support Sponsor', 'Flexible contribution', 'Custom', '', JSON.stringify([
      'Brand QR code printed on food packages',
      'Direct touchpoint to 4,000+ candidates',
      'Dining hall banner recognition',
    ]), 6);
  }

  if (count('faqs') === 0) {
    const ins = db.prepare('INSERT INTO faqs (question, answer, sort) VALUES (?, ?, ?)');
    ins.run('What is SIBAQ?', "SIBAQ is the National Arts Fest of Darul Huda Islamic University — three days of art, literature, oratory and ideas at Kuttikattoor, Kozhikode.", 1);
    ins.run('When and where is the fest?', 'November 20–22, 2026, at the fest ground on Mavoor–Kozhikode Road, Kuttikattoor, Kozhikode.', 2);
    ins.run('How does the daily quiz work?', 'One question goes live every day. Answer it correctly as fast as you can — earliest correct answers lead the daily leaderboard and can earn vouchers.', 3);
    ins.run('How can my brand partner with SIBAQ?', 'Sponsorship tiers from Associate to Title are open. Send an enquiry on the Sponsors page and our marketing team will reach out.', 4);
    ins.run('Can I support the academy?', 'Yes — the Donation page carries the official QR and UPI details of Shamsul Huda Islamic Academy.', 5);
    ins.run('How do I reach the committee?', 'Call or WhatsApp +91 95620 08296, or email sibaqkuttikatoor@gmail.com.', 6);
  }

  if (count('quiz_questions') === 0) {
    const today = todayLocal();
    const ins = db.prepare(
      'INSERT INTO quiz_questions (date, question, options, correct_index, published, is_test) VALUES (?, ?, ?, ?, ?, ?)'
    );
    // Clearly-labelled TEST content — excluded from the live leaderboard.
    ins.run(today, 'Which city hosts SIBAQ 2K26?', JSON.stringify(['Kozhikode', 'Kochi', 'Kannur', 'Thrissur']), 0, 1, 1);
    ins.run(today, "What is the hosting institution for SIBAQ '26 at Kuttikattoor?", JSON.stringify(['Shamsul Huda Islamic Academy', 'Cheruvadi Huda Academy', 'Darul Huda Chemmad Campus', 'Markazu Ssaqafathi Sunniyya']), 0, 0, 1);
    ins.run(today, 'How many days does the festival run?', JSON.stringify(['Two', 'Three', 'Four', 'Five']), 1, 0, 1);
    console.log('[seed] test quiz questions inserted (first one published as today\'s demo)');
  }
}

export function runSeed() {
  seedSettings();
  seedAdmin();
  seedRows();
}

if (process.argv[1] && process.argv[1].endsWith('seed.mjs')) {
  runSeed();
  console.log('[seed] done');
}
