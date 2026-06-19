import { createHttpClient } from "@/src/apis/http";
import type { PostSendOtpPayload } from "@/src/models/user";
import { sendLoginOtp, verifyLoginOtp } from "@/src/apis/login";

export { sendLoginOtp as postSendOtp, verifyLoginOtp as postVerifyOtp };

export async function postSendOtpLeads(payload: PostSendOtpPayload) {
  try {
    const { data } = await createHttpClient().post(
      "/hello/send/sms_mobile",
      payload,
    );
    return data;
  } catch {
    return { success: false };
  }
}
