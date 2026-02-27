export interface Artwork {
  id: string;
  title: string;
  year: number;
  technique: string;
  dimensions: string;
  imageUrl: string;
  description?: string;
  category?: string;
}

export interface Exhibition {
  id: string;
  title: string;
  type: 'individual' | 'colectiva';
  venue: string;
  city: string;
  country: string;
  year: number;
  startDate?: string;
  endDate?: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Award {
  id: string;
  title: string;
  institution: string;
  year: number;
  description?: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  institution?: string;
  year: number;
  duration?: string;
}

export interface PressItem {
  id: string;
  title: string;
  publication: string;
  date: string;
  url?: string;
  excerpt?: string;
  imageUrl?: string;
}
