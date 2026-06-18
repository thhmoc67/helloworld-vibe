import PRESENT_CITIES from "@/src/constants/cities";
import {
  colivingFlatLocalityPath,
  isKotaCity,
  kotaHostelsFlatLocalityPath,
  kotaPgFlatLocalityPath,
  srpSlug,
} from "@/src/lib/sitemap-slug";
import {
  parseFlatColivingLocalitySlug,
  parseFlatGenderLocalitySlug,
  parseFlatKotaGenderHostelSlug,
  parseFlatKotaGenericHostelSlug,
  parseFlatPgLocalitySlug,
  parseMarketingSrpSlug,
} from "@/src/lib/srp-slug-parse";
import { localityNameToSlug } from "@/src/lib/string-utils";

export function resolveEffectiveSrpSlug(
  pathname: string | null | undefined,
  city: string,
  explicitSrpSlug?: string,
): string {
  if (explicitSrpSlug?.trim()) return explicitSrpSlug.trim().toLowerCase();

  const segment = (pathname || "").split("/").filter(Boolean)[0] ?? "";
  if (!segment) return srpSlug(city);

  const marketing = parseMarketingSrpSlug(segment);
  if (marketing && !marketing.localityOnly) return segment;

  const genderFlat = parseFlatGenderLocalitySlug(segment, PRESENT_CITIES);
  if (genderFlat) {
    return genderFlat.slugGender === "male only"
      ? `pg-for-boys-in-${genderFlat.city}`
      : `pg-for-girls-in-${genderFlat.city}`;
  }

  const kotaGenderFlat = parseFlatKotaGenderHostelSlug(segment);
  if (kotaGenderFlat) {
    return kotaGenderFlat.slugGender === "male only"
      ? "boys-hostels-in-kota"
      : "girls-hostels-in-kota";
  }

  const kotaHostelFlat = parseFlatKotaGenericHostelSlug(segment);
  if (kotaHostelFlat) return "hostels-in-kota";

  const colivingFlat = parseFlatColivingLocalitySlug(segment, PRESENT_CITIES);
  if (colivingFlat) return `coliving-in-${colivingFlat.city}`;

  const pgFlat = parseFlatPgLocalitySlug(segment, PRESENT_CITIES);
  if (pgFlat) {
    return isKotaCity(pgFlat.city) ? "hostels-in-kota" : `pg-in-${pgFlat.city}`;
  }

  return srpSlug(city);
}

export function buildLocalitySrpHref(
  city: string,
  localityName: string,
  options?: { pathname?: string | null; srpSlug?: string },
): string {
  const cityKey = city.trim().toLowerCase();
  const localitySlug = localityNameToSlug(localityName);
  if (!cityKey || !localitySlug) return "";

  const effectiveSrp = resolveEffectiveSrpSlug(
    options?.pathname,
    cityKey,
    options?.srpSlug,
  );

  if (effectiveSrp.startsWith("pg-for-boys-in-")) {
    return `/pg-for-boys-in-${localitySlug}-${cityKey}`;
  }
  if (effectiveSrp.startsWith("pg-for-girls-in-")) {
    return `/pg-for-girls-in-${localitySlug}-${cityKey}`;
  }
  if (effectiveSrp === "boys-hostels-in-kota") {
    return `/boys-hostel-in-${localitySlug}-kota`;
  }
  if (effectiveSrp === "girls-hostels-in-kota") {
    return `/girls-hostel-in-${localitySlug}-kota`;
  }

  const marketing = parseMarketingSrpSlug(effectiveSrp);
  if (marketing) {
    if (isKotaCity(cityKey) && marketing.livingType === "hostels") {
      return kotaHostelsFlatLocalityPath(localitySlug) || "";
    }
    if (marketing.livingType === "coliving" && !marketing.slugGender) {
      return colivingFlatLocalityPath(cityKey, localitySlug) || "";
    }
    if (effectiveSrp.startsWith("pg-in-")) {
      if (isKotaCity(cityKey)) {
        return kotaPgFlatLocalityPath(localitySlug) || "";
      }
      return `/pg-in-${localitySlug}-${cityKey}`;
    }
  }

  return colivingFlatLocalityPath(cityKey, localitySlug) || "";
}

export function buildCitySrpHref(
  city: string,
  options?: { pathname?: string | null; srpSlug?: string },
): string {
  const cityKey = city.trim().toLowerCase();
  if (!cityKey) return "";

  const effectiveSrp = resolveEffectiveSrpSlug(
    options?.pathname,
    cityKey,
    options?.srpSlug,
  );
  return effectiveSrp ? `/${effectiveSrp}` : "";
}
