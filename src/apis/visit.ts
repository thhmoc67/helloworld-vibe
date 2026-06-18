import { createHttpClient } from "@/src/apis/http";
import type { PostCreateVisitPayload } from "@/src/models/visit";
import type {
  UserVisitApiItem,
  VisitApiResponse,
} from "@/src/models/user-visit";

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

export async function fetchUserVisits(): Promise<UserVisitApiItem[]> {
  try {
    const { data } = await createHttpClient(true).get<
      VisitApiResponse<UserVisitApiItem[]>
    >("user/visits");

    if (!data?.success || !Array.isArray(data.data)) return [];
    return data.data;
  } catch {
    return [];
  }
}

export async function submitVisitRating(payload: {
  visitId: string;
  propertyRating: number;
  managerRating: number;
}): Promise<VisitApiResponse<unknown>> {
  try {
    const { data } = await createHttpClient(true).post<VisitApiResponse<unknown>>(
      `user/visits/${payload.visitId}/rating`,
      {
        property_rating: payload.propertyRating,
        manager_rating: payload.managerRating,
      },
    );
    return data ?? { success: false };
  } catch {
    return { success: false };
  }
}
