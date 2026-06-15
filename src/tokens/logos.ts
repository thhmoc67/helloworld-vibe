import logosManifest from "@/public/logos/manifest.json";
import { getAssetById } from "@/src/tokens/assets";

export type LogoVariant = string;

export type LogoAsset = {
  name: string;
  id: string;
  file: string;
};

export const logoAssets: LogoAsset[] = logosManifest.logos;

const hwFavicon = getAssetById("logos", "favicon");

const hwFaviconLogo: LogoAsset | undefined = hwFavicon
  ? { name: hwFavicon.name, id: hwFavicon.id, file: hwFavicon.file }
  : undefined;

export const defaultLogo: LogoAsset =
  hwFaviconLogo ??
  logoAssets.find((logo) => /logo-with-wordmark|logo-variation-1/i.test(logo.file)) ??
  logoAssets[0];

export const logoMark: LogoAsset =
  hwFaviconLogo ??
  logoAssets.find((logo) => /logo-mark|monogram-1/i.test(logo.file)) ??
  logoAssets[0];

export type LogoGroup = {
  id: string;
  title: string;
  description: string;
  assets: LogoAsset[];
};

function logosMatching(pattern: RegExp) {
  return logoAssets.filter((logo) => pattern.test(logo.file));
}

export const logoGroups: LogoGroup[] = [
  {
    id: "lockups",
    title: "Logo lockups",
    description: "Full horizontal marks for headers, marketing, and product surfaces.",
    assets: logosMatching(/logo-with-wordmark|logo-variation-/),
  },
  {
    id: "marks",
    title: "Marks & monograms",
    description: "Compact symbols for avatars, app chrome, and tight layouts.",
    assets: logosMatching(/logo-mark|monogram-|favicon|app-icon/),
  },
  {
    id: "wordmarks",
    title: "Word marks",
    description: "Typography-only treatments for co-branding and minimal contexts.",
    assets: logosMatching(/wordmark-/),
  },
];
