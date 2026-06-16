import { getAssetById } from "@/src/tokens/assets";
import { srpCardSampleImages, type SrpCardStatusLabel } from "@/src/tokens/srp-card";

function asset(id: string) {
  const found = getAssetById("homepage-website", id);
  if (!found) throw new Error(`Missing homepage asset: ${id}`);
  return found;
}

export type HomepageFeaturedProperty = {
  id: string;
  name: string;
  subtitle: string;
  images: typeof srpCardSampleImages;
  rating: number;
  roomTypes: readonly string[];
  rent: number;
  originalRent?: number;
  offerLabel?: string;
  statusLabel?: SrpCardStatusLabel;
  visitsToday?: number;
  genderLabel?: string;
};

export const homepageHeroDesktop = asset("hero-desktop");
export const homepageHeroMobile = asset("hero-mobile");
export const homepageVideo = asset("homepage-video");
export const homepageAppScreenshot1 = asset("footer-screenshot-1");
export const homepageAppScreenshot2 = asset("footer-screenshot-2");

export const homepageBenefits = [
  {
    id: "deposit",
    title: "Just 1 month deposit",
    description: "Peace of mind for both landlords and tenants",
    icon: asset("desposit"),
  },
  {
    id: "lock-in",
    title: "No lock-in Period",
    description: "Don't worry about uncertainties anymore",
    icon: asset("no-lockin-period"),
  },
  {
    id: "brokerage",
    title: "No brokerage",
    description: "It's all transparent and no middle men talks",
    icon: asset("no-brokerage"),
  },
  {
    id: "move-in",
    title: "Instant move-in",
    description: "No waiting for paperworks and keys anymore!",
    icon: asset("instant-move-in"),
  },
] as const;

export const homepageStats = [
  {
    id: "events",
    value: "200+",
    label: "Events Hosted",
    icon: asset("events"),
  },
  {
    id: "cities",
    value: "16+",
    label: "Cities",
    icon: asset("cities"),
  },
  {
    id: "spaces",
    value: "250+",
    label: "Coliving Spaces",
    icon: asset("coliving-spaces"),
  },
  {
    id: "tenants",
    value: "50k+",
    label: "Happy Tenants",
    icon: asset("happy-tenants"),
  },
] as const;

export const homepagePressLogos = [
  asset("economic-teams"),
  asset("business-line"),
  asset("inc-42"),
  asset("your-story"),
  asset("et-realty"),
] as const;

export const homepageVibeChips = [
  { id: "chill", label: "Chill", emoji: "😎" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "fitness", label: "Fitness", emoji: "🏋️" },
  { id: "gamer", label: "Gamer", emoji: "🎮" },
] as const;

export const homepageVibeMoreCount = 8;

export const homepageFeaturedProperties: HomepageFeaturedProperty[] = [
  {
    id: "mahaveer",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 12500,
    statusLabel: "filling-fast",
    genderLabel: "Women Only",
  },
  {
    id: "suncity",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Double", "Triple"],
    rent: 12500,
    visitsToday: 7,
    genderLabel: "Women Only",
  },
  {
    id: "iti",
    name: "HelloWorld Mahaveer",
    subtitle: "Coliving PG in HSR Layout",
    images: srpCardSampleImages,
    rating: 4.5,
    roomTypes: ["Private", "Double", "Triple", "Quadruple"],
    rent: 12500,
    statusLabel: "trending",
    genderLabel: "Women Only",
  },
];

export const homepageFeedItems = [
  "/assets/community/hero/hero-1.png",
  "/assets/community/hero/hero-2.png",
  "/assets/community/hero/hero-3.png",
  "/assets/community/hero/hero-4.png",
] as const;

export {
  footerAboutLinks,
  footerCityLinks,
  footerContact,
  footerProductLinks,
  socialLinks,
} from "@/src/tokens/footer";
