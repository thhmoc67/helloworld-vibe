import { getAssetById } from "@/src/tokens/assets";

export type LogoAsset = {
  name: string;
  id: string;
  file: string;
};

const fallbackLogo: LogoAsset = {
  name: "Favicon",
  id: "favicon",
  file: "/assets/logos/favicon.svg",
};

function toLogoAsset(asset: NonNullable<ReturnType<typeof getAssetById>>): LogoAsset {
  return { name: asset.name, id: asset.id, file: asset.file };
}

const hwGradientBlack = getAssetById("logos", "gardient-black");
const hwBlack = getAssetById("logos", "black");
const hwBlackWordmark = getAssetById("logos", "black-wordmark");
const hwGradientMonogram = getAssetById("logos", "gradient-monogram");
const hwWhite = getAssetById("logos", "white");
const hwWhiteWordmark = getAssetById("logos", "white-wordmark");
const hwFavicon = getAssetById("logos", "favicon");

/** Full lockup for light backgrounds — gradient monogram + wordmark. */
export const defaultLogo: LogoAsset = hwGradientBlack
  ? toLogoAsset(hwGradientBlack)
  : hwBlack
    ? toLogoAsset(hwBlack)
    : fallbackLogo;

/** Wordmark only for light backgrounds. */
export const blackWordmark: LogoAsset = hwBlackWordmark
  ? toLogoAsset(hwBlackWordmark)
  : hwBlack
    ? toLogoAsset(hwBlack)
    : fallbackLogo;

/** Monogram only. */
export const logoMark: LogoAsset = hwGradientMonogram
  ? toLogoAsset(hwGradientMonogram)
  : hwFavicon
    ? toLogoAsset(hwFavicon)
    : fallbackLogo;

/** Wordmark only for dark or tinted backgrounds. */
export const whiteWordmark: LogoAsset = hwWhiteWordmark
  ? toLogoAsset(hwWhiteWordmark)
  : hwWhite
    ? toLogoAsset(hwWhite)
    : fallbackLogo;

/** Full lockup for dark backgrounds. */
export const footerLogo: LogoAsset = hwWhite
  ? toLogoAsset(hwWhite)
  : defaultLogo;
