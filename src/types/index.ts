export type Currency = 'USD' | 'EUR' | 'GBP';

export interface MenuItem {
  id: string;
  name: string;
  category: 'cuts' | 'starters' | 'sauces' | 'sides' | 'cellar';
  description: string;
  priceUSD: number;
  weight?: string;
  agingDays?: number;
  origin?: string;
  marbleScore?: string;
  recommendedDoneness?: string;
  winePairing?: string;
  dietary?: ('gluten-free' | 'dairy-free' | 'chef-choice')[];
  image?: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'hearth' | 'ember-counter' | 'cellar-vault' | 'terrace';
  occasion: string;
  specialRequests?: string;
  meatPreference?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface PrepMethod {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  scientificDetail: string;
  temperature?: string;
  duration?: string;
  chefQuote: string;
  keyAspects: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cuts' | 'hearth' | 'cocktails' | 'ambience';
  image: string;
  caption: string;
  tagline: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  source: string;
  rating: number;
  comment: string;
  date: string;
  dishOrdered: string;
  verified: boolean;
  avatarText: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  handle: string;
  timestamp: string;
  caption: string;
  likes: number;
  commentsCount: number;
  image: string;
  tags: string[];
  comments: { user: string; text: string }[];
}
