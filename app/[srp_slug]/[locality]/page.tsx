import { redirect, notFound } from "next/navigation";
import PRESENT_CITIES from "@/src/constants/cities";
import {
  colivingFlatLocalityPath,
  isKotaCity,
  kotaHostelsFlatLocalityPath,
} from "@/src/lib/sitemap-slug";
import { parseMarketingSrpSlug } from "@/src/lib/srp-slug-parse";

type PageProps = {
  params: Promise<{ srp_slug: string; locality: string }>;
};

function flatGenderLocalityPath(
  srpSlugParam: string,
  localitySlug: string,
  city: string,
): string | null {
  if (srpSlugParam.startsWith("pg-for-boys-in-")) {
    return `/pg-for-boys-in-${localitySlug}-${city}`;
  }
  if (srpSlugParam.startsWith("pg-for-girls-in-")) {
    return `/pg-for-girls-in-${localitySlug}-${city}`;
  }
  if (srpSlugParam.startsWith("gents-pg-in-")) {
    return `/pg-for-boys-in-${localitySlug}-${city}`;
  }
  if (srpSlugParam.startsWith("ladies-pg-in-")) {
    return `/pg-for-girls-in-${localitySlug}-${city}`;
  }
  return null;
}

export default async function NestedLocalitySrpRedirect({ params }: PageProps) {
  const { srp_slug, locality } = await params;
  const marketing = parseMarketingSrpSlug(srp_slug);
  if (!marketing) notFound();

  const localitySlug = String(locality || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
  const city = marketing.city;

  if (marketing.livingType === "coliving" && !marketing.slugGender) {
    const target = colivingFlatLocalityPath(city, localitySlug);
    if (target) redirect(target);
  }

  if (isKotaCity(city) && marketing.livingType === "hostels") {
    if (srp_slug === "boys-hostels-in-kota") {
      redirect(`/boys-hostel-in-${localitySlug}-kota`);
    }
    if (srp_slug === "girls-hostels-in-kota") {
      redirect(`/girls-hostel-in-${localitySlug}-kota`);
    }
    const target = kotaHostelsFlatLocalityPath(localitySlug);
    if (target) redirect(target);
  }

  const genderTarget = flatGenderLocalityPath(srp_slug, localitySlug, city);
  if (genderTarget) redirect(genderTarget);

  const flatColiving = colivingFlatLocalityPath(city, localitySlug);
  if (flatColiving && PRESENT_CITIES.includes(city as (typeof PRESENT_CITIES)[number])) {
    redirect(flatColiving);
  }

  notFound();
}
