import type { HdpOccupancy } from "@/src/tokens/hdp";

export type BookingQueryParams = {
  categoryId: string | number;
  occupancy: HdpOccupancy;
  moveInDate: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  phone?: string;
};

export function buildBookingQuery(params: BookingQueryParams): string {
  const search = new URLSearchParams();
  search.set("categoryId", String(params.categoryId));
  search.set("occupancy", params.occupancy);
  search.set("moveInDate", params.moveInDate);

  if (params.firstName) search.set("firstName", params.firstName);
  if (params.lastName) search.set("lastName", params.lastName);
  if (params.email) search.set("email", params.email);
  if (params.gender) search.set("gender", params.gender);
  if (params.phone) search.set("phone", params.phone);

  return search.toString();
}

export function buildBookingHref(
  bookingPath: string,
  params: BookingQueryParams,
): string {
  const path = bookingPath.replace(/\/$/, "");
  return `${path}?${buildBookingQuery(params)}`;
}

export type BookingOccupantInfo = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
};

export type BookNowCompleteDetails = {
  categoryId: string;
  occupancy: HdpOccupancy;
  moveInDate: string;
} & BookingOccupantInfo;

export type BookingSelectionDetails = {
  categoryId: string;
  occupancy: HdpOccupancy;
};

export function parseBookingOccupantInfo(
  query: Record<string, string | undefined>,
): BookingOccupantInfo {
  return {
    firstName: query.firstName?.trim() ?? "",
    lastName: query.lastName?.trim() ?? "",
    email: query.email?.trim() ?? "",
    gender: query.gender?.trim() ?? "",
    phone: query.phone?.trim() ?? "",
  };
}
