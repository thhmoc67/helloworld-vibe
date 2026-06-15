import Image from "next/image";
import { cn } from "@/src/lib/cn";
import {
  defaultLogo,
  logoAssets,
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
  if (variant === "mark") return logoMark ?? defaultLogo;
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
  const sharedClassName = cn("h-auto w-auto object-contain", className);

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

export function LogoAssetCard({ logo }: { logo: LogoAsset }) {
  const filename = logo.file.split("/").pop() ?? logo.file;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-25 p-6">
      <div className="grid gap-3">
        <div className="flex min-h-28 items-center justify-center rounded-xl bg-white p-6">
          <Logo variant={logo} width={180} height={72} />
        </div>
        <div className="flex min-h-28 items-center justify-center rounded-xl bg-gray-900 p-6">
          <Logo variant={logo} width={180} height={72} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{logo.name}</p>
          <p className="mt-1 font-mono text-xs text-gray-500">{logo.file}</p>
        </div>
        <a
          href={logo.file}
          download={filename}
          className="inline-flex w-fit items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Download SVG
        </a>
      </div>
    </article>
  );
}

export function LogoGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {logoAssets.map((logo) => (
        <LogoAssetCard key={logo.file} logo={logo} />
      ))}
    </div>
  );
}
