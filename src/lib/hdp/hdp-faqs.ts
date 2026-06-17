import { hdpFaqs } from "@/src/tokens/hdp-faqs";
import type { CategoryProps } from "@/src/models/category";
import type { GoogleData, NearByArea, Property } from "@/src/models/property";

function humanizeAmenity(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function buildHdpFaqs(
  property: Property,
  googleData: GoogleData | null | undefined,
  categories: CategoryProps[],
  nearBy?: NearByArea | null,
): { question: string; answer: string }[] {
  const displayName = property.display_name || property.name || "this property";
  const dynamicFaqs: { question: string; answer: string }[] = [];

  const ratingVal = googleData?.google_rating;
  const hasRating =
    ratingVal != null && !Number.isNaN(Number(ratingVal)) && Number(ratingVal) > 0;
  const reviewCount =
    googleData?.google_reviews_new?.length ??
    googleData?.google_reviews?.length ??
    0;

  if (hasRating || reviewCount > 0) {
    const ratingSentence = hasRating
      ? `${displayName} currently has a Google rating of ${Number(ratingVal).toFixed(1)}.`
      : `${displayName} has published Google reviews.`;
    const countSentence =
      reviewCount > 0
        ? ` Review volume: ${reviewCount} review${reviewCount === 1 ? "" : "s"}.`
        : "";
    const linkSentence = googleData?.google_link
      ? ` You can read recent reviews here: ${googleData.google_link}.`
      : "";
    dynamicFaqs.push({
      question: `How are the reviews for ${displayName}?`,
      answer: `${ratingSentence}${countSentence}${linkSentence} Google reviews are useful for understanding resident feedback on cleanliness, maintenance response, staff behavior, safety, and overall day-to-day living experience.`,
    });
  }

  if (property.min_rent != null && property.min_rent > 0) {
    const rentStr = new Intl.NumberFormat("en-IN").format(property.min_rent);
    dynamicFaqs.push({
      question: `What is the rent at ${displayName}?`,
      answer: `Rent at ${displayName} starts from Rs ${rentStr} per month. Final monthly outflow can vary by room type, occupancy, floor, and move-in date.`,
    });
  }

  const addr = property.address;
  if (addr && (addr.line2 || addr.city)) {
    const locationParts = [addr.line1, addr.line2, addr.city, addr.state].filter(Boolean);
    const locationStr = locationParts.join(", ");
    if (locationStr) {
      dynamicFaqs.push({
        question: `Where is ${displayName} located?`,
        answer: `${displayName} is located at ${locationStr}.${addr.pincode ? ` Pincode: ${addr.pincode}.` : ""} Use Schedule a Visit to verify access roads and neighborhood suitability in person.`,
      });
    }
  }

  if (categories.length > 0) {
    const roomTypeLabels = Array.from(
      new Set(
        categories
          .map((category) => category.display_name || category.name)
          .filter(Boolean),
      ),
    );
    if (roomTypeLabels.length) {
      dynamicFaqs.push({
        question: `What room types are available at ${displayName}?`,
        answer: `This property offers: ${roomTypeLabels.join(", ")}. Availability can change quickly by category, so use the listing to compare inventory-wise rent and move-in readiness.`,
      });
    }
  }

  const allAmenities = Array.from(
    new Set([...(property.amenities ?? []), ...(property.rent_includes ?? [])]),
  ).filter(Boolean);

  if (allAmenities.length) {
    const amenitiesList = allAmenities
      .slice(0, 25)
      .map((item) => humanizeAmenity(String(item)))
      .join(", ");
    dynamicFaqs.push({
      question: `What amenities are available at ${displayName}?`,
      answer: `This property offers: ${amenitiesList}${allAmenities.length > 25 ? " and more." : "."}`,
    });
  }

  if (nearBy) {
    for (const [key, places] of Object.entries(nearBy)) {
      const filtered = (places || []).filter((place) => place?.name).slice(0, 5);
      if (!filtered.length) continue;
      const label = key
        .replace(/[_-]+/g, " ")
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
      const bullets = filtered
        .map((place) =>
          place.distance ? `- ${place.name} (${place.distance})` : `- ${place.name}`,
        )
        .join("\n");
      dynamicFaqs.push({
        question: `What is near ${displayName} for ${label}?`,
        answer: `Nearby ${label.toLowerCase()} options include:\n${bullets}`,
      });
    }
  }

  return [
    ...dynamicFaqs,
    ...hdpFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  ];
}
