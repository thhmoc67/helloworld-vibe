import { createHttpClient } from "@/src/apis/http";
import type {
  PostSendOtpPayload,
  PostVerifyOtpPayload,
} from "@/src/models/user";
import { setStoredMobile, setStoredToken } from "@/src/lib/auth-storage";

export async function postSendOtp(payload: PostSendOtpPayload) {
  try {
    setStoredMobile(payload.mobile);
    const { data } = await createHttpClient().post("hello/send/sms", payload);
    return data;
  } catch {
    return { success: false };
  }
}

export async function postVerifyOtp(payload: PostVerifyOtpPayload) {
  try {
    const { data } = await createHttpClient(true).post(
      "hello/verify/sms",
      payload,
    );

    if (
      data.success &&
      data.data?.Status?.toLowerCase() === "success" &&
      data.data?.Details?.toLowerCase() === "otp matched" &&
      data.data?.token
    ) {
      setStoredToken(data.data.token);
    }

    return data;
  } catch {
    return { success: false };
  }
}

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
