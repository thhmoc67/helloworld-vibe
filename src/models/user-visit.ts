export interface UserVisitAddress {
  line1?: string;
  line2?: string;
}

export interface UserVisitManager {
  name?: string;
  phone?: string;
}

export interface UserVisitRating {
  property?: number;
  manager?: number;
}

export interface UserVisitApiItem {
  id?: number | string;
  visit_id?: number | string;
  property_id?: number;
  property_name?: string;
  display_name?: string;
  name?: string;
  locality?: string;
  city?: string;
  address?: string | UserVisitAddress;
  images?: string[];
  image?: string;
  property_image?: string[];
  hdp_image?: string;
  visit_date?: string;
  date?: string;
  time?: string;
  time_slot?: string;
  start_time?: string;
  end_time?: string;
  property_manager?: UserVisitManager;
  manager_name?: string;
  manager_phone?: string;
  map_url?: string;
  directions_url?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  rating?: UserVisitRating;
  property_url?: string;
  href?: string;
}

export interface MyVisitItem {
  id: string;
  propertyId: number;
  propertyName: string;
  subtitle: string;
  addressLabel: string;
  images: string[];
  visitDate: Date;
  timeLabel: string;
  dayLabel: string;
  propertyManagerName: string;
  propertyManagerPhone?: string;
  mapUrl?: string;
  propertyUrl?: string;
  isPast: boolean;
  daysUntilLabel: string | null;
  canRate: boolean;
  propertyRating?: number;
  managerRating?: number;
}

export type MyVisitsTab = "upcoming" | "past";

export interface VisitApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
