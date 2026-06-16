export interface NearbyPlace {
  name: string;
  slug: string;
  city?: string;
}

export interface NearbyPlaceApiItem {
  id: string;
  city: string;
  locality: string;
  display_name: string;
  category: string;
  primary_type: string;
  slug: string;
}

export interface NearbyPlacesApiResponse {
  success: boolean;
  data: Record<string, NearbyPlaceApiItem[]>;
}

export interface LandmarkPlaceApi {
  id: string;
  city: string;
  locality: string;
  category: string;
  google_place_id: string;
  display_name: string;
  primary_type: string;
  types: string[];
  latitude: number;
  longitude: number;
  formatted_address: string;
  rating: string;
  user_rating_count: number;
  distance_meters: number;
  website_uri: string | null;
  phone_number: string | null;
  price_level: string | null;
  nearby_description: string | null;
  source: string;
  landmark_description: string | null;
  createdAt: string;
  updatedAt: string;
}
