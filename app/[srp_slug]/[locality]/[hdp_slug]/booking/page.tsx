import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingPageContent } from "@/components/booking/booking-page-content";
import {
  filterCategoriesByOccupancy,
  getAvailableOccupancies,
} from "@/src/lib/hdp/category-occupancy";
import { resolveHdpPage } from "@/src/lib/hdp/resolve-hdp-page";
import {
  getBreadcrumbSchema,
  getPublicSiteUrl,
  getWebPageSchema,
  type HdpPageSchema,
} from "@/src/lib/schema";
import {
  parseBookingOccupantInfo,
} from "@/src/lib/booking/url";
import type { HdpOccupancy } from "@/src/tokens/hdp";

export const revalidate = 120;

type PageProps = {
  params: Promise<{
    srp_slug: string;
    locality: string;
    hdp_slug: string;
  }>;
  searchParams: Promise<{
    categoryId?: string;
    occupancy?: string;
    moveInDate?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: string;
    phone?: string;
  }>;
};

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function defaultMoveInDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return toDateInputValue(date);
}

function isHdpOccupancy(value: string | undefined): value is HdpOccupancy {
  return (
    value === "private" ||
    value === "double" ||
    value === "triple" ||
    value === "quadruple"
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { srp_slug, locality, hdp_slug } = await params;
  const config = await resolveHdpPage(srp_slug, locality, hdp_slug);
  if (!config) return {};

  const title = `Booking | ${config.view.displayName}`;
  const description = `Complete your booking at ${config.view.displayName}. Choose payment options and reserve your room.`;
  const canonicalPath = `${config.canonicalPath}/booking`;

  return {
    title,
    description,
    alternates: {
      canonical: `${getPublicSiteUrl()}/${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${getPublicSiteUrl()}/${canonicalPath}`,
      type: "website",
    },
  };
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { srp_slug, locality, hdp_slug } = await params;
  const query = await searchParams;
  const config = await resolveHdpPage(srp_slug, locality, hdp_slug);
  if (!config) notFound();

  const visibleCategories = config.categories.filter(
    (category) => category.show_to_ui && !category.is_removed,
  );
  const availableOccupancies = getAvailableOccupancies(visibleCategories);
  const occupancy = isHdpOccupancy(query.occupancy)
    ? query.occupancy
    : availableOccupancies[0] ?? "private";

  const occupancyCategories = filterCategoriesByOccupancy(
    visibleCategories,
    occupancy,
  );
  const categoryId = Number.parseInt(query.categoryId ?? "", 10);
  const resolvedCategoryId =
    occupancyCategories.find((category) => category.id === categoryId)?.id ??
    occupancyCategories[0]?.id;

  if (!resolvedCategoryId) notFound();

  const moveInDate = query.moveInDate ?? defaultMoveInDate();
  const occupantInfo = parseBookingOccupantInfo(query);
  const hdpPath = `/${config.canonicalPath}`;
  const bookingPath = `${config.canonicalPath}/booking`;
  const bookingHref = `/${bookingPath}`;
  const baseUrl = getPublicSiteUrl();

  const schema: HdpPageSchema = {
    webPage: getWebPageSchema({
      baseUrl,
      path: bookingPath,
      name: `Booking | ${config.view.displayName}`,
      description: `Complete your booking at ${config.view.displayName}.`,
    }),
    breadcrumb: getBreadcrumbSchema(baseUrl, [
      { name: "Home", path: "" },
      ...config.breadcrumbItems
        .filter((item) => item.path)
        .map((item) => ({ name: item.name, path: item.path! })),
      { name: "Booking", path: bookingPath },
    ]),
  };

  return (
    <BookingPageContent
      property={config.property}
      categories={visibleCategories}
      categoryId={resolvedCategoryId}
      occupancy={occupancy}
      moveInDate={moveInDate}
      occupantInfo={occupantInfo}
      hdpPath={hdpPath}
      bookingPath={bookingHref}
      schema={schema}
    />
  );
}
