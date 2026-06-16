export function validateField(
  type: string,
  value: string | number | undefined,
): boolean {
  if (value == null || value === "") return false;

  const trimmed = String(value).trim();

  switch (type) {
    case "phone":
    case "mobile":
      return /^\d{10}$/.test(trimmed);
    case "name":
      return /^[a-zA-Z\s]{1,40}$/.test(trimmed);
    case "email":
      return /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/.test(
        trimmed,
      );
    case "otp":
      return /^\d{6}$/.test(trimmed);
    case "location":
      return trimmed.length > 0;
    default:
      return true;
  }
}
