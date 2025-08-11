export type Category =
  | 'Plumber'
  | 'Gardener'
  | 'Electrician'
  | 'Cleaner'
  | 'Painter'
  | 'Handyman';

export interface Provider {
  id: string;
  name: string;
  categories: Category[];
  city: string;
  rating: number; // 0-5
  numReviews: number;
  hourlyRate: number; // in local currency
  bio?: string;
  avatarUrl?: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  providerId: string;
  providerName: string;
  category: Category;
  createdAt: string; // ISO string
  scheduledFor?: string; // ISO string
  description: string;
  address: string;
  contactName: string;
  contactPhone: string;
  status: RequestStatus;
}