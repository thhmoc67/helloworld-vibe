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

const hwFavicon = getAssetById("logos", "favicon");

export const defaultLogo: LogoAsset = hwFavicon
  ? toLogoAsset(hwFavicon)
  : fallbackLogo;

export const logoMark: LogoAsset = defaultLogo;
