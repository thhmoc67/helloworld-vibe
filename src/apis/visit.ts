import { createHttpClient } from "@/src/apis/http";
import type { PostCreateVisitPayload } from "@/src/models/visit";

export async function postCreateVisit(payload: PostCreateVisitPayload) {
  try {
    const { data } = await createHttpClient(true).post(
      "v2/visit/create",
      payload,
    );
    if (data.success && typeof window !== "undefined") {
      window.localStorage.setItem("visit_successfull", payload.slotId);
    }
    return data;
  } catch {
    return { success: false };
  }
}

export async function getPropertyVisitSlots(propertyId: number) {
  try {
    const { data } = await createHttpClient().get("api/hello/visit/slots", {
      params: { property_id: propertyId },
    });
    return data;
  } catch {
    return { success: false };
  }
}
