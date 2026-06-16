export interface UploadContactLeadPayload {
  name: string;
  email?: string;
  phone: string;
  location: string;
  city?: string | number;
  otp: number | undefined;
  source?: string;
  referrer?: string;
  srp?: boolean;
  propertyName?: string;
  utm_source?: string;
  utm_url?: string;
}
