import type { SitemapEvent, SitemapProperty } from "@/src/models/sitemap-types";

const createSlug = (str: string) => str.toLowerCase().split(" ").join("-");

export const srpSlug = (city: string) => {
  const hostels = ["kota"];
  if (hostels.includes(city?.toLowerCase())) {
    return `hostels-in-${city?.toLowerCase()}`;
  }
  return `coliving-in-${city?.toLowerCase()}`;
};

export const createHdpSlug = (property: SitemapProperty) => {
  const raw = (property?.name ?? property?.display_name ?? "").trim();
  const safe = raw || "listing";
  return createSlug(safe);
};

function getLocalityFromAddress(property: SitemapProperty): string {
  const line2 = property.address?.line2;
  if (!line2) return "";
  const params = line2.split(",");
  return params[params.length - 1]
    .trim()
    .toLowerCase()
    .split("-")
    .join("_")
    .split(" ")
    .join("_");
}

export const getLocalitySlug = (property: SitemapProperty): string => {
  if (property?.locality) {
    return property.locality
      .replace(/ /g, "-")
      .replace(/_/g, "-")
      .toLowerCase()
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  if (property?.address?.line2) {
    const raw = getLocalityFromAddress(property);
    return raw
      ? raw
          .replace(/_/g, "-")
          .toLowerCase()
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";
  }
  return "";
};

export const createEventSlug = (event: SitemapEvent) => {
  return `${event.name.split(" ").join("-")}-${event.id}`;
};
