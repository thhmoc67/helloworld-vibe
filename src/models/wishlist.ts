import type { Property } from "@/src/models/property";

export interface WishlistApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type WishlistPropertyId = number;

export type WishlistPropertyCard = Pick<
  Property,
  | "id"
  | "image"
  | "name"
  | "address"
  | "min_rent"
  | "available_beds"
  | "gender"
  | "locality"
  | "display_name"
  | "city"
  | "sold_out"
  | "lightning_deal"
  | "free_rent"
>;
