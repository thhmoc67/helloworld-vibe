import { createHttpClient } from "@/src/apis/http";
import type {
  PostSendOtpPayload,
  PostVerifyOtpPayload,
} from "@/src/models/user";
import { setStoredMobile, setStoredToken } from "@/src/lib/auth-storage";

/** Sends login OTP via `hello/send/sms`. */
export async function sendLoginOtp(payload: PostSendOtpPayload) {
  try {
    setStoredMobile(payload.mobile);
    const { data } = await createHttpClient().post("hello/send/sms", payload);
    return data;
  } catch {
    return { success: false };
  }
}

/** Verifies login OTP via `hello/verify/sms` and stores the auth token on success. */
export async function verifyLoginOtp(payload: PostVerifyOtpPayload) {
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
