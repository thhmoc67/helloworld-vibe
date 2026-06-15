export const srpCardSampleImages = [
  "/assets/community/hero/hero-1.png",
  "/assets/community/hero/hero-2.png",
  "/assets/community/hero/hero-3.png",
  "/assets/community/hero/hero-4.png",
  "/assets/community/sports/rectangle-2363-3.png",
] as const;

export const srpCardVariants = {
  default: {
    id: "default",
    label: "Default",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Double", "Triple"],
    rent: 12500,
    visitsToday: 7,
    genderLabel: "Men Only",
    saved: false,
  },
  saved: {
    id: "saved",
    label: "Saved",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.9,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 12500,
    saved: true,
  },
  offer: {
    id: "offer",
    label: "Offer",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Double"],
    rent: 8750,
    originalRent: 12500,
    offerLabel: "Upto 30% Off",
    saved: false,
  },
} as const;

export type SrpCardVariantId = keyof typeof srpCardVariants;

export function formatRent(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
