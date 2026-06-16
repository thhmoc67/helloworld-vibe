export interface PostSendOtpPayload {
  mobile: string;
}

export interface PostVerifyOtpPayload {
  mobile: string;
  otp?: number;
  session_id: string;
}
