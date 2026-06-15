import Image from "next/image";
import { LottieAnimation } from "@/components/media/lottie";
import type { Asset, LottieAsset } from "@/src/tokens/assets";
import { cn } from "@/src/lib/cn";

function isSvg(path: string) {
  return path.endsWith(".svg");
}

function getPreviewBackground(asset: Asset | LottieAsset) {
  if ("previewBackground" in asset && asset.previewBackground === "dark") {
    return "dark";
  }

  if (/white/i.test(asset.id) || /white/i.test(asset.name)) {
    return "dark";
  }

  return "light";
}

export function AssetPreview({ asset }: { asset: Asset }) {
  if (asset.type === "lottie") {
    return (
      <LottieAnimation
        src={asset.file}
        className="h-40 w-40"
        ariaLabel={asset.name}
      />
    );
  }

  if (asset.type === "video") {
    return (
      <video
        src={asset.file}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
      />
    );
  }

  if (isSvg(asset.file)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset.file}
        alt={asset.name}
        className="max-h-full max-w-full object-contain"
      />
    );
  }

  return (
    <Image
      src={asset.file}
      alt={asset.name}
      width={320}
      height={240}
      className="max-h-full max-w-full object-contain"
    />
  );
}

export function AssetCard({ asset }: { asset: Asset | LottieAsset }) {
  const filename = asset.file.split("/").pop() ?? asset.file;
  const previewBackground = getPreviewBackground(asset);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-25 p-5">
      <div
        className={cn(
          "flex min-h-40 items-center justify-center overflow-hidden rounded-xl p-4",
          previewBackground === "dark" ? "bg-gray-900" : "bg-white",
        )}
      >
        <AssetPreview asset={asset} />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
          <p className="mt-1 font-mono text-xs text-gray-500">{asset.file}</p>
        </div>
        <a
          href={asset.file}
          download={filename}
          className="inline-flex w-fit items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Download
        </a>
      </div>
    </article>
  );
}
