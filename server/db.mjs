// Database layer — MongoDB Atlas with Mongoose
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://sibaqadmin:Energysaving@sibaqkuttikattur.uvzaglv.mongodb.net/sibaq?retryWrites=true&w=majority&appName=sibaqkuttikattur';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGODB_URI);
  console.log('[mongodb] Connected to MongoDB Atlas successfully');
  return mongoose.connection;
}

const transform = (doc, ret) => {
  ret.id = ret._id.toString();
  delete ret.__v;
  return ret;
};

const baseOptions = {
  toJSON: { virtuals: true, transform },
  toObject: { virtuals: true, transform },
  timestamps: false,
};

// --- Models ---
export const Admin = mongoose.models.Admin || mongoose.model(
  'Admin',
  new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password_hash: { type: String, required: true },
    },
    baseOptions
  )
);

export const Setting = mongoose.models.Setting || mongoose.model(
  'Setting',
  new mongoose.Schema(
    {
      key: { type: String, required: true, unique: true },
      value: { type: String, required: true },
    },
    baseOptions
  )
);

export const Stat = mongoose.models.Stat || mongoose.model(
  'Stat',
  new mongoose.Schema(
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
      note: { type: String, default: '' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: true },
    },
    baseOptions
  )
);

export const Partner = mongoose.models.Partner || mongoose.model(
  'Partner',
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      logo: { type: String, default: '' },
      url: { type: String, default: '' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: false },
    },
    baseOptions
  )
);

export const TeamMember = mongoose.models.TeamMember || mongoose.model(
  'TeamMember',
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      role: { type: String, default: '' },
      category: { type: String, default: '' },
      photo: { type: String, default: '' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: true },
    },
    baseOptions
  )
);

export const MediaItem = mongoose.models.MediaItem || mongoose.model(
  'MediaItem',
  new mongoose.Schema(
    {
      type: { type: String, default: 'image' },
      title: { type: String, required: true },
      src: { type: String, required: true },
      poster: { type: String, default: '' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: true },
    },
    baseOptions
  )
);

export const Voucher = mongoose.models.Voucher || mongoose.model(
  'Voucher',
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      brand: { type: String, default: '' },
      description: { type: String, default: '' },
      instructions: { type: String, default: '' },
      expiry: { type: String, default: '' },
      image: { type: String, default: '' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: false },
    },
    baseOptions
  )
);

export const SponsorPackage = mongoose.models.SponsorPackage || mongoose.model(
  'SponsorPackage',
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      tagline: { type: String, default: '' },
      slots: { type: String, default: '' },
      price: { type: String, default: '' },
      price_confirmed: { type: Boolean, default: false },
      benefits: { type: String, default: '[]' },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: true },
    },
    baseOptions
  )
);

export const Faq = mongoose.models.Faq || mongoose.model(
  'Faq',
  new mongoose.Schema(
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      sort: { type: Number, default: 0 },
      published: { type: Boolean, default: true },
    },
    baseOptions
  )
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model(
  'Enquiry',
  new mongoose.Schema(
    {
      kind: { type: String, default: 'promote' },
      name: { type: String, required: true },
      contact: { type: String, required: true },
      package: { type: String, default: '' },
      message: { type: String, default: '' },
      created_at: { type: Date, default: Date.now },
      handled: { type: Boolean, default: false },
    },
    baseOptions
  )
);

export const QuizQuestion = mongoose.models.QuizQuestion || mongoose.model(
  'QuizQuestion',
  new mongoose.Schema(
    {
      date: { type: String, required: true },
      question: { type: String, required: true },
      options: { type: String, required: true },
      correct_index: { type: Number, required: true },
      published: { type: Boolean, default: false },
      is_test: { type: Boolean, default: false },
      winner_confirmed: { type: Boolean, default: false },
    },
    baseOptions
  )
);

export const QuizSubmission = mongoose.models.QuizSubmission || mongoose.model(
  'QuizSubmission',
  new mongoose.Schema(
    {
      question_id: { type: String, required: true },
      participant: { type: String, required: true },
      name: { type: String, required: true },
      option_index: { type: Number, required: true },
      correct: { type: Boolean, required: true },
      is_test: { type: Boolean, default: false },
      submitted_at: { type: Date, default: Date.now },
    },
    baseOptions
  )
);

export function toCleanDoc(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  if (obj._id) obj.id = obj._id.toString();
  return obj;
}

export function todayLocal() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
