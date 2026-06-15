import assetsManifest from "@/public/assets/manifest.json";

export type AssetType = "image" | "svg" | "video" | "lottie";

export type Asset = {
  id: string;
  name: string;
  file: string;
  originalName: string;
  type: AssetType;
  extension: string;
};

export type LottieAsset = Asset & {
  category: string;
  previewBackground?: "light" | "dark";
};

export type AssetCategoryId =
  | "booking"
  | "community"
  | "error"
  | "hdp"
  | "logos"
  | "locality"
  | "homepage-website";

export type AssetCategory = {
  id: AssetCategoryId;
  title: string;
  description: string;
  assets: Asset[];
};

type AssetsManifest = {
  source: string;
  sourcePath: string;
  readme: string | null;
  syncedAt: string;
  categories: Record<AssetCategoryId, Asset[]>;
  lotties: LottieAsset[];
  notes: string[];
};

const manifest = assetsManifest as AssetsManifest;

export const assetManifest = manifest;

export const assetCategories: AssetCategory[] = [
  {
    id: "booking",
    title: "Booking",
    description: "Booking flow illustrations and payment-state Lottie animations.",
    assets: manifest.categories.booking,
  },
  {
    id: "community",
    title: "Community",
    description: "Community page hero imagery, event galleries, and page video.",
    assets: manifest.categories.community,
  },
  {
    id: "error",
    title: "Error states",
    description: "Pagloo empty and error illustrations for 403, 404, 500, and offline.",
    assets: manifest.categories.error,
  },
  {
    id: "hdp",
    title: "HDP",
    description: "Property detail page badges and tour confirmation artwork.",
    assets: manifest.categories.hdp,
  },
  {
    id: "logos",
    title: "Logos",
    description: "Brand lockups, monograms, and wordmarks from HW vibe assets.",
    assets: manifest.categories.logos,
  },
  {
    id: "locality",
    title: "Locality, city & landmark",
    description: "Amenity icons and locality bento illustrations for SRP and landing pages.",
    assets: manifest.categories.locality,
  },
  {
    id: "homepage-website",
    title: "Homepage website",
    description: "Marketing homepage hero, trust badges, feature icons, and press logos.",
    assets: manifest.categories["homepage-website"],
  },
];

export const lottieAssets = manifest.lotties;

export const lottieGroups = [
  {
    id: "booking",
    title: "Booking",
    assets: lottieAssets.filter((asset) => asset.category === "booking"),
  },
  {
    id: "payments",
    title: "Payments",
    assets: lottieAssets.filter((asset) => asset.category === "payments"),
  },
  {
    id: "login",
    title: "Login",
    assets: lottieAssets.filter((asset) => asset.category === "login"),
  },
] as const;

export function getAssetById(category: AssetCategoryId, id: string) {
  return manifest.categories[category].find((asset) => asset.id === id);
}

export function getLottieById(id: string) {
  return lottieAssets.find((asset) => asset.id === id);
}

export function assetPath(file: string) {
  return file;
}
