// Typed API client for the public endpoints.
export interface SiteSettings {
  site: {
    name: string;
    fullName: string;
    tagline: string;
    edition: string;
    dates: string;
    venue: string;
    venueShort: string;
    host: string;
    committee: string;
    university: string;
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    email: string;
    youtube: string;
    logo: string;
    logotype: string;
  };
  hero: { kicker: string; title: string; line: string; collage: string };
  ribbon: { text: string };
  about: {
    lead: string;
    body: string[];
    disciplines: string[];
    campusImage: string;
    stageImages: string[];
  };
  donation: {
    title: string;
    description: string;
    upi: string;
    account: string;
    qr: string;
    tiers: string[];
  };
  bookfest: { title: string; dates: string; blurb: string; features: string[]; image: string };
  game: { voucherLine: string };
  footer: { note: string; credit: string };
}

export interface Stat {
  id: number;
  value: string;
  label: string;
  note: string;
}
export interface Partner {
  id: number;
  name: string;
  logo: string;
  url: string;
}
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  photo: string;
}
export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  src: string;
  poster: string;
}
export interface Voucher {
  id: number;
  title: string;
  brand: string;
  description: string;
  instructions: string;
  expiry: string;
  image: string;
}
export interface SponsorPackage {
  id: number;
  name: string;
  tagline: string;
  slots: string;
  price: string | null;
  benefits: string[];
}
export interface Faq {
  id: number;
  question: string;
  answer: string;
}
export interface QuizState {
  none: boolean;
  id?: number;
  date?: string;
  question?: string;
  options?: string[];
  is_test?: boolean;
  answered?: boolean;
  was_correct?: boolean | null;
}
export interface LeaderboardData {
  date: string;
  none?: boolean;
  is_test?: boolean;
  winner_confirmed?: boolean;
  entries: { rank: number; name: string; time: string }[];
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${url}`);
  return res.json();
}

export const api = {
  site: () => getJson<SiteSettings>('/api/site'),
  stats: () => getJson<Stat[]>('/api/stats'),
  partners: () => getJson<Partner[]>('/api/partners'),
  team: () => getJson<TeamMember[]>('/api/team'),
  media: () => getJson<MediaItem[]>('/api/media'),
  vouchers: () => getJson<Voucher[]>('/api/vouchers'),
  sponsors: () => getJson<SponsorPackage[]>('/api/sponsors'),
  faqs: () => getJson<Faq[]>('/api/faqs'),
  quizToday: (participant: string) => getJson<QuizState>(`/api/quiz/today?participant=${encodeURIComponent(participant)}`),
  leaderboard: (date?: string) => getJson<LeaderboardData>(`/api/leaderboard${date ? `?date=${date}` : ''}`),
  leaderboardDates: () => getJson<string[]>('/api/leaderboard/dates'),
  submitQuiz: (body: { questionId: number; optionIndex: number; name: string; participant: string }) =>
    fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  sendEnquiry: (body: { kind: string; name: string; contact: string; pkg?: string; message?: string }) =>
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};

export function participantId(): string {
  const KEY = 'sibaq_pid';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
