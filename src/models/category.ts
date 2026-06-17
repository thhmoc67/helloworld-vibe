export interface CategoryProps {
  id: number;
  name: string;
  display_name: string;
  key_feature: string[];
  inventory_type: string;
  rent: number;
  offer_rent: null | number;
  private_rent: number;
  private_offer_rent: null | number;
  beds_per_room: number;
  maximum_occupancy: number;
  amenities: string[];
  image_url: string;
  show_to_ui: boolean;
  is_removed: boolean;
  plan_id: string;
  private_plan_id: string;
  status: string;
  room_ids: number[];
  apartment_ids: number[];
  gender: string;
  sold_out: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  PropertyId: number;
}
