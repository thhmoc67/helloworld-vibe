import { createHttpClient } from "@/src/apis/http";
import type {
  WishlistApiResponse,
  WishlistPropertyCard,
  WishlistPropertyId,
} from "@/src/models/wishlist";

function parseWishlistIds(data: unknown): WishlistPropertyId[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => Number(item))
    .filter((id) => Number.isFinite(id) && id > 0);
}

export async function fetchWishlistPropertyIds(): Promise<WishlistPropertyId[]> {
  try {
    const { data } = await createHttpClient(true).get<
      WishlistApiResponse<WishlistPropertyId[]>
    >("user/wishlist", { params: { srp: true } });

    if (!data?.success) return [];
    return parseWishlistIds(data.data);
  } catch {
    return [];
  }
}

export async function fetchWishlistPropertyCards(): Promise<WishlistPropertyCard[]> {
  try {
    const { data } = await createHttpClient(true).get<
      WishlistApiResponse<WishlistPropertyCard[]>
    >("user/wishlist", { params: { srp: false } });

    if (!data?.success || !Array.isArray(data.data)) return [];
    return data.data;
  } catch {
    return [];
  }
}

export async function addWishlistProperty(
  propertyId: WishlistPropertyId,
): Promise<WishlistApiResponse<unknown>> {
  try {
    const { data } = await createHttpClient(true).post<
      WishlistApiResponse<unknown>
    >(`user/wishlist/${propertyId}`);
    return data ?? { success: false };
  } catch {
    return { success: false };
  }
}

export async function removeWishlistProperty(
  propertyId: WishlistPropertyId,
): Promise<WishlistApiResponse<unknown>> {
  try {
    const { data } = await createHttpClient(true).delete<
      WishlistApiResponse<unknown>
    >(`user/wishlist/${propertyId}`);
    return data ?? { success: false };
  } catch {
    return { success: false };
  }
}
