import { createHttpClient } from "@/src/apis/http";

export const SIMILAR_PROPERTIES_LIMIT = 12;

export async function fetchProperty(name: string) {
  try {
    const nameForApi = (name || "").replace(/-/g, " ");
    const { data } = await createHttpClient().get("v2/hello/house", {
      params: { name: nameForApi },
    });
    return data;
  } catch {
    return { success: false };
  }
}

export async function fetchPropertyCategories(propertyId: number) {
  try {
    const { data } = await createHttpClient().get("v2/category/list", {
      params: { property_id: propertyId },
    });
    return data;
  } catch {
    return { success: false };
  }
}

export async function fetchSimilarProperties(propertyId: number) {
  try {
    const { data } = await createHttpClient().get("v2/property/similar", {
      params: { id: propertyId, limit: SIMILAR_PROPERTIES_LIMIT },
    });
    if (!data?.success || !Array.isArray(data.data)) return data;
    return {
      ...data,
      data: data.data.slice(0, SIMILAR_PROPERTIES_LIMIT),
    };
  } catch {
    return { success: false };
  }
}

export async function fetchPropertiesList() {
  try {
    const { data } = await createHttpClient().get("property/all");
    return data;
  } catch {
    return { success: false, data: [] };
  }
}
