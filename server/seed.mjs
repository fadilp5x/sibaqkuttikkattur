// Idempotent seed for MongoDB Atlas — creates default content on first run.
import bcrypt from 'bcryptjs';
import {
  connectDB,
  Admin,
  Setting,
  Stat,
  Partner,
  TeamMember,
  MediaItem,
  SponsorPackage,
  Faq,
  QuizQuestion,
  todayLocal,
} from './db.mjs';

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

async function seedSettings() {
  const row = await Setting.findOne({ key: 'site' });
  if (row) return;
  await Setting.create({ key: 'site', value: JSON.stringify(SETTINGS) });
  console.log('[seed] default site settings inserted');
}

async function seedAdmin() {
  const count = await Admin.countDocuments();
  if (count > 0) return;
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'sibaq-admin-2026';
  const hash = bcrypt.hashSync(password, 10);
  await Admin.create({ username, password_hash: hash });
  console.log(`[seed] admin user created: ${username}`);
}

async function seedRows() {
  if ((await Stat.countDocuments()) === 0) {
    await Stat.insertMany([
      { value: '10,000+', label: 'Students', note: 'Youth network across India', sort: 1, published: true },
      { value: '4,000+', label: 'Candidates', note: 'Competing on national stages', sort: 2, published: true },
      { value: '400+', label: 'Programs', note: 'Literary & artistic categories', sort: 3, published: true },
      { value: '35+', label: 'Campuses', note: 'Pan-India collegiate network', sort: 4, published: true },
    ]);
  }

  if ((await Partner.countDocuments()) === 0) {
    await Partner.insertMany([
      { name: 'Darul Huda Islamic University', logo: 'https://www.dhiu.in/resources/img/uni-logo.png', url: 'https://www.dhiu.in', sort: 1, published: true },
      { name: 'Shamsul Huda Islamic Academy', logo: 'https://www.shamsulhuda.in/assets/shia-logo-j%20(1)-BLNbhxve.png', url: 'https://www.shamsulhuda.in', sort: 2, published: true },
      { name: 'Edumart', logo: 'https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg', url: '#', sort: 3, published: true },
    ]);
  }

  if ((await TeamMember.countDocuments()) === 0) {
    await TeamMember.insertMany([
      { name: 'Fadhil', role: 'Project Head', category: 'Leadership', photo: '/media/team-fadhil.jpg', sort: 1, published: true },
      { name: 'Sinan P', role: 'Marketing Manager', category: 'Partnerships & Outreach', photo: '/media/team-sinan.jpg', sort: 2, published: true },
      { name: 'Aslah', role: 'Creative Content Strategist', category: 'Creative Direction', photo: '/media/team-aslah.jpg', sort: 3, published: true },
      { name: 'Luqman', role: 'Visual Design Lead', category: 'Brand Identity', photo: '/media/team-luqman.jpg', sort: 4, published: true },
      { name: 'Sadhath', role: 'Video Production Specialist', category: 'Cinematography', photo: '/media/team-sadhath.jpg', sort: 5, published: true },
      { name: 'Nishad', role: 'Video Editor & Motion Designer', category: 'Motion & VFX', photo: '/media/team-nishad.jpg', sort: 6, published: true },
      { name: 'Zidhan', role: 'Brand & Graphic Designer', category: 'Graphic Arts', photo: '/media/team-zidhan.jpg', sort: 7, published: true },
      { name: 'Shahid', role: 'Content & Copy Specialist', category: 'Editorial & Media', photo: '/media/team-shahid.jpg', sort: 8, published: true },
    ]);
  }

  if ((await MediaItem.countDocuments()) === 0) {
    await MediaItem.insertMany([
      { type: 'image', title: 'Festival moments', src: '/media/collage-icons.jpg', sort: 1, published: true },
      { type: 'image', title: 'On stage — past editions', src: '/media/stage-01.jpg', sort: 2, published: true },
      { type: 'image', title: 'Scholarly sessions', src: '/media/stage-02.jpg', sort: 3, published: true },
      { type: 'image', title: 'Guests of honour', src: '/media/stage-03.jpg', sort: 4, published: true },
      { type: 'image', title: 'Grand finale', src: '/media/stage-04.jpg', sort: 5, published: true },
    ]);
  }

  if ((await SponsorPackage.countDocuments()) === 0) {
    await SponsorPackage.insertMany([
      {
        name: 'Title Sponsor',
        tagline: 'Exclusive',
        slots: '1 slot',
        price: '₹3,00,000',
        price_confirmed: false,
        benefits: JSON.stringify([
          'Official title partnership across all assets',
          'Main stage backdrop & LED wall branding',
          'Highway billboard & mobile LED coverage',
          'YouTube livestream overlay & MC mentions',
          'Dedicated stall & brand film broadcast',
        ]),
        sort: 1,
        published: true,
      },
      {
        name: 'Co-Title Sponsor',
        tagline: 'High profile',
        slots: '2 slots',
        price: '₹1,50,000',
        price_confirmed: false,
        benefits: JSON.stringify([
          'Co-title partnership recognition',
          'Main stage LED — all 3 days',
          'Main entrance arch & billboard space',
          'Dedicated brand film & reel campaign',
        ]),
        sort: 2,
        published: true,
      },
      {
        name: 'Gold Partner',
        tagline: 'Featured',
        slots: '3 slots',
        price: '₹50,000',
        price_confirmed: false,
        benefits: JSON.stringify([
          'Stage LED rotation on all days',
          'Brand promo video showcase',
          'Promotional reels & feed stories',
          'On-ground brand activation desk',
        ]),
        sort: 3,
        published: true,
      },
      {
        name: 'Silver Partner',
        tagline: 'Growth',
        slots: '5 slots',
        price: '₹30,000',
        price_confirmed: false,
        benefits: JSON.stringify([
          'On-ground venue banners',
          'Shared highway billboard presence',
          'Social media brand feature',
          'Livestream lower-third credit',
        ]),
        sort: 4,
        published: true,
      },
      {
        name: 'Associate Partner',
        tagline: 'Community',
        slots: '8 slots',
        price: '₹20,000',
        price_confirmed: false,
        benefits: JSON.stringify([
          'Promotional reel & story inclusion',
          'Official website partner listing',
          'Shared on-ground signage',
        ]),
        sort: 5,
        published: true,
      },
      {
        name: 'Food Support Sponsor',
        tagline: 'Flexible contribution',
        slots: 'Custom',
        price: '',
        price_confirmed: false,
        benefits: JSON.stringify([
          'Brand QR code printed on food packages',
          'Direct touchpoint to 4,000+ candidates',
          'Dining hall banner recognition',
        ]),
        sort: 6,
        published: true,
      },
    ]);
  }

  if ((await Faq.countDocuments()) === 0) {
    await Faq.insertMany([
      { question: 'What is SIBAQ?', answer: 'SIBAQ is the National Arts Fest of Darul Huda Islamic University — three days of art, literature, oratory and ideas at Kuttikattoor, Kozhikode.', sort: 1, published: true },
      { question: 'When and where is the fest?', answer: 'November 20–22, 2026, at the fest ground on Mavoor–Kozhikode Road, Kuttikattoor, Kozhikode.', sort: 2, published: true },
      { question: 'How does the daily quiz work?', answer: 'One question goes live every day. Answer it correctly as fast as you can — earliest correct answers lead the daily leaderboard and can earn vouchers.', sort: 3, published: true },
      { question: 'How can my brand partner with SIBAQ?', answer: 'Sponsorship tiers from Associate to Title are open. Send an enquiry on the Sponsors page and our marketing team will reach out.', sort: 4, published: true },
      { question: 'Can I support the academy?', answer: 'Yes — the Donation page carries the official QR and UPI details of Shamsul Huda Islamic Academy.', sort: 5, published: true },
      { question: 'How do I reach the committee?', answer: 'Call or WhatsApp +91 95620 08296, or email sibaqkuttikatoor@gmail.com.', sort: 6, published: true },
    ]);
  }

  if ((await QuizQuestion.countDocuments()) === 0) {
    const today = todayLocal();
    await QuizQuestion.insertMany([
      { date: today, question: 'Which city hosts SIBAQ 2K26?', options: JSON.stringify(['Kozhikode', 'Kochi', 'Kannur', 'Thrissur']), correct_index: 0, published: true, is_test: true },
      { date: today, question: "What is the hosting institution for SIBAQ '26 at Kuttikattoor?", options: JSON.stringify(['Shamsul Huda Islamic Academy', 'Cheruvadi Huda Academy', 'Darul Huda Chemmad Campus', 'Markazu Ssaqafathi Sunniyya']), correct_index: 0, published: false, is_test: true },
      { date: today, question: 'How many days does the festival run?', options: JSON.stringify(['Two', 'Three', 'Four', 'Five']), correct_index: 1, published: false, is_test: true },
    ]);
    console.log("[seed] test quiz questions inserted (first one published as today's demo)");
  }
}

export async function runSeed() {
  await connectDB();
  await seedSettings();
  await seedAdmin();
  await seedRows();
}

if (process.argv[1] && process.argv[1].endsWith('seed.mjs')) {
  runSeed().then(() => {
    console.log('[seed] done');
    process.exit(0);
  }).catch((err) => {
    console.error('[seed] error:', err);
    process.exit(1);
  });
}
