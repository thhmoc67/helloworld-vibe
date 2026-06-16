import { createHttpClient } from "@/src/apis/http";
import type { UploadContactLeadPayload } from "@/src/models/contact";

export async function uploadContactLead(payload: UploadContactLeadPayload) {
  try {
    const { data } = await createHttpClient().post("/hello/callback", payload);
    return data;
  } catch {
    return { success: false };
  }
}
