export function getApiBaseUrl() {
  const value =
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.BASE_URL ?? "";
  return value.trim().replace(/\/$/, "");
}

export function getApiOriginHeader() {
  const fromEnv = process.env.NEXT_PUBLIC_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`.replace(/\/$/, "");
  }

  return "https://thehelloworld.com";
}
