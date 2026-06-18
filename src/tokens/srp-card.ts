export const srpCardSampleImages = [
  "/assets/community/hero/hero-1.png",
  "/assets/community/hero/hero-2.png",
  "/assets/community/hero/hero-3.png",
  "/assets/community/hero/hero-4.png",
  "/assets/community/sports/rectangle-2363-3.png",
] as const;

export const srpCardComingSoonImage =
  "https://hello-assets-items.s3.ap-south-1.amazonaws.com/images/coming-soon.jpg";

export const srpCardDefaultImage = srpCardComingSoonImage;

export function isSrpComingSoonImage(src: string): boolean {
  return src === srpCardDefaultImage || src.includes("coming-soon");
}

export type SrpCardStatusLabel = "filling-fast" | "trending";

export const srpCardVariants = {
  default: {
    id: "default",
    label: "Default",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 12500,
    statusLabel: "filling-fast" as SrpCardStatusLabel,
    genderLabel: "Women Only",
    saved: false,
  },
  saved: {
    id: "saved",
    label: "Saved",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 12500,
    visitsToday: 7,
    genderLabel: "Women Only",
    saved: true,
  },
  offer: {
    id: "offer",
    label: "Offer",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 8750,
    originalRent: 12500,
    offerLabel: "Upto 30% Off",
    statusLabel: "trending" as SrpCardStatusLabel,
    genderLabel: "Women Only",
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
