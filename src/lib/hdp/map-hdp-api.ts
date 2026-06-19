import { capitalizeFirstLetter } from "@/src/lib/string-utils";
import type { GoogleData, NearByArea } from "@/src/models/property";
import type { NeighborhoodCardData } from "@/src/tokens/neighborhood-card";
import type {
  HdpResidentReview,
  HdpReviewCategory,
} from "@/src/tokens/hdp-reviews";

const NEARBY_EMOJI: Record<string, string> = {
  transport: "🚇",
  transit: "🚌",
  school: "🎓",
  education: "🎓",
  hospital: "🏥",
  health: "🏥",
  store: "🛒",
  shopping: "🛍️",
  food: "🍽️",
  dining: "☕",
  restaurant: "🍽️",
  gym: "💪",
  fitness: "💪",
  work: "🧑‍💻",
  office: "🏢",
  park: "🌳",
  mall: "🏬",
};

const NEARBY_IMAGES = [
  "/assets/community/hero/hero-1.png",
  "/assets/community/hero/hero-2.png",
  "/assets/locality/transit-bento-desktop.png",
  "/assets/community/sports/rectangle-2363-3.png",
] as const;

function formatNearbyLabel(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

function nearbyEmoji(key: string): string {
  const normalized = key.toLowerCase().replace(/[_-]+/g, " ");
  for (const [token, emoji] of Object.entries(NEARBY_EMOJI)) {
    if (normalized.includes(token)) return emoji;
  }
  return "📍";
}

function formatDistanceAway(distance?: string): string {
  const value = String(distance || "").trim();
  if (!value) return "";
  return /km$/i.test(value) ? `${value} away` : `${value} km away`;
}

export function mergeNearByAreas(
  nearBy: NearByArea | null | undefined,
  googleNearBy: NearByArea | null | undefined,
): NearByArea | null {
  const merged: NearByArea = {};
  for (const source of [nearBy, googleNearBy]) {
    if (!source) continue;
    for (const [key, places] of Object.entries(source)) {
      if (!Array.isArray(places) || places.length === 0) continue;
      merged[key] = [...(merged[key] ?? []), ...places];
    }
  }
  return Object.keys(merged).length > 0 ? merged : null;
}

export function mapNearByToNeighborhoodCards(
  nearBy: NearByArea | null | undefined,
  mapUrl?: string,
): NeighborhoodCardData[] {
  if (!nearBy) return [];

  const items: NeighborhoodCardData[] = [];
  let imageIndex = 0;

  for (const [categoryKey, places] of Object.entries(nearBy)) {
    if (!Array.isArray(places)) continue;

    const options = places
      .filter((place) => place?.name)
      .map((place, placeIndex) => {
        const imageSrc = NEARBY_IMAGES[imageIndex % NEARBY_IMAGES.length];
        imageIndex += 1;
        return {
          id: `${categoryKey}-${placeIndex}`,
          placeName: place.name,
          walkTime: formatDistanceAway(place.distance) || "Nearby",
          imageSrc,
          imageAlt: place.name,
        };
      });

    if (options.length === 0) continue;

    const category = formatNearbyLabel(categoryKey);
    const primary = options[0];

    items.push({
      id: categoryKey,
      emoji: nearbyEmoji(categoryKey),
      category,
      placeName: primary.placeName,
      imageSrc: primary.imageSrc,
      imageAlt: primary.imageAlt,
      walkTime: primary.walkTime,
      linkLabel: `View ${category}`,
      options,
      ...(mapUrl && options.length === 1 ? { href: mapUrl } : {}),
    });
  }

  return items;
}

function ratingLabel(rating: number): string {
  if (rating >= 4.5) return "Exceptional";
  if (rating >= 4.0) return "Very Good";
  if (rating >= 3.5) return "Good";
  return "Rated";
}

export function mapGoogleDataToReviewSummary(googleData: GoogleData | null | undefined) {
  if (!googleData) return null;

  const rating = Number(googleData.google_rating);
  const reviewCount =
    googleData.google_reviews_new?.length ?? googleData.google_reviews?.length ?? 0;

  if (!Number.isFinite(rating) && reviewCount === 0) return null;

  const categories: HdpReviewCategory[] = [
    { label: "Cleanliness", score: Number.isFinite(rating) ? rating : 4.5 },
    { label: "Location", score: Number.isFinite(rating) ? Math.max(0, rating - 0.1) : 4.4 },
    { label: "Amenities", score: Number.isFinite(rating) ? rating : 4.5 },
    { label: "Community", score: Number.isFinite(rating) ? Math.max(0, rating - 0.2) : 4.3 },
  ];

  return {
    rating: Number.isFinite(rating) ? rating.toFixed(1) : "—",
    label: Number.isFinite(rating) ? ratingLabel(rating) : "Reviews",
    reviewCount,
    recommendPercent: Number.isFinite(rating)
      ? Math.min(99, Math.round((rating / 5) * 100))
      : 90,
    categories,
    googleLink: googleData.google_link || undefined,
  };
}

const REVIEW_AVATARS = [
  "/assets/community/feed/feed-1.png",
  "/assets/community/feed/feed-2.png",
  "/assets/community/feed/feed-3.png",
  "/assets/community/feed/feed-4.png",
] as const;

export function mapGoogleReviewsToResidentReviews(
  googleData: GoogleData | null | undefined,
): HdpResidentReview[] {
  const reviews = googleData?.google_reviews_new ?? [];
  return reviews
    .filter((review) => review?.name && review?.review)
    .map((review, index) => ({
      id: `google-review-${index}`,
      name: review.name,
      rating: Number(review.star) || 5,
      quote: review.review,
      avatarSrc: REVIEW_AVATARS[index % REVIEW_AVATARS.length],
    }));
}

export type HdpReviewSummaryView = NonNullable<
  ReturnType<typeof mapGoogleDataToReviewSummary>
>;
