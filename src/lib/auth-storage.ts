const MOBILE_KEY = "mobile";
const TOKEN_KEY = "token";

export function getStoredMobile(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(MOBILE_KEY);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setStoredMobile(mobile: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOBILE_KEY, mobile);
}

export function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function isLoggedIn(): boolean {
  return Boolean(getStoredMobile() && getStoredToken());
}
