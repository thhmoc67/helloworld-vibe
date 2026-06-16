import Image from "next/image";
import { cn } from "@/src/lib/cn";
import {
  defaultLogo,
  logoMark,
  type LogoAsset,
} from "@/src/tokens/logos";

export type LogoProps = {
  variant?: "default" | "mark" | LogoAsset;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

function resolveAsset(variant: LogoProps["variant"]): LogoAsset {
  if (variant === "mark") return logoMark;
  if (variant && typeof variant === "object") return variant;
  return defaultLogo;
}

function isSvg(path: string) {
  return path.endsWith(".svg");
}

export function Logo({
  variant = "default",
  className,
  width = 120,
  height = 48,
  priority = false,
}: LogoProps) {
  const asset = resolveAsset(variant);
  const sharedClassName = cn(
    "max-w-full shrink-0 object-contain",
    className ?? "h-auto w-auto",
  );

  if (isSvg(asset.file)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset.file}
        alt={asset.name}
        width={width}
        height={height}
        className={sharedClassName}
      />
    );
  }

  return (
    <Image
      src={asset.file}
      alt={asset.name}
      width={width}
      height={height}
      priority={priority}
      className={sharedClassName}
    />
  );
}
