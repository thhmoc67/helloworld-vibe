import axios from "axios";
import { getApiBaseUrl, getApiOriginHeader } from "@/src/lib/api";
import { getStoredMobile, getStoredToken } from "@/src/lib/auth-storage";

export function createHttpClient(secured = false) {
  const headers: Record<string, string> = {
    origin: getApiOriginHeader(),
  };

  if (secured && typeof window !== "undefined") {
    const mobile = getStoredMobile();
    const token = getStoredToken();
    if (mobile) headers.mobile = mobile;
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 30_000,
    headers,
  });
}
