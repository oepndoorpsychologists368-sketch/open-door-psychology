export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'core' | 'specialized';
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  idealFor: string[];
  sessionStructure: {
    duration: string;
    cadence: string;
    focus: string;
  };
  keyPillars: {
    title: string;
    description: string;
  }[];
  whatToExpect: string[];
  recommendedPsychologists: string[]; // slugs
}

export interface Psychologist {
  id: string;
  slug: string;
  name: string;
  title: string;
  licensePlaceholder: string;
  experienceYears: number;
  languages: string[];
  focusAreas: string[];
  bio: string;
  approach: string;
  qualifications: string[];
  philosophicalNote: string;
  avatarSeed: string; // for consistent stylized portrait visual
  genderTheme: 'female' | 'male' | 'neutral';
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Reflection' | 'Anxiety & Calm' | 'Relationships' | 'Mindfulness' | 'Foundations';
  readingTimeMinutes: number;
  publishDate: string;
  authorSlug: string;
  summary: string;
  sections: {
    heading: string;
    body: string[];
  }[];
  keyTakeaways: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Starting Out' | 'Sessions & Approach' | 'Fees & Admin' | 'Privacy & Rights';
}

export interface BookingState {
  serviceId: string;
  serviceName: string;
  psychologistSlug: string;
  psychologistName: string;
  date: string;
  timeSlot: string;
  modality: 'in-person' | 'telehealth';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referralSource: string;
  notes: string;
  consentAgreed: boolean;
  demoAcknowledged: boolean;
}

export interface StoredBooking extends BookingState {
  referenceNumber: string;
  createdAt: string;
}
