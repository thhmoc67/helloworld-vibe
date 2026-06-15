import { Logo } from "@/components/brand/logo";
import { ShowcaseShell } from "@/components/layout/showcase-shell";
import { AssetCard } from "@/components/media/asset-card";
import { AccordionSection } from "@/components/ui/accordion";
import {
  assetCategories,
  assetManifest,
  lottieGroups,
} from "@/src/tokens/assets";

const hwVibeLogos = assetCategories.find((category) => category.id === "logos");
const hwVibeCategories = assetCategories.filter((category) => category.id !== "logos");

const assetsNav = [
  { label: "Logos", id: "logos" },
  ...hwVibeCategories.map((category) => ({
    label: category.title,
    id: category.id,
  })),
  { label: "Lotties", id: "lotties" },
  { label: "Usage", id: "usage" },
];

export default function AssetsPage() {
  return (
    <ShowcaseShell
      eyebrow="Helloworld Revamp"
      title="Assets"
      navItems={assetsNav}
      secondaryLink={{ href: "/design-system", label: "Design system" }}
    >
      <div className="border-b border-gray-200 py-10 sm:py-16">
        <Logo width={200} height={80} priority className="max-w-[min(200px,75vw)]" />
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-hello-lime-700">
          Brand assets
        </p>
        <h1 className="mt-3 max-w-4xl text-display-md font-bold tracking-tight text-gray-900 sm:text-display-lg">
          HW vibe asset library
        </h1>
        <p className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
          Synced from the Desktop{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
            HW vibe assets
          </code>{" "}
          folder. Includes booking, community, error, HDP, logos, locality, and
          homepage website artwork — plus Lottie animations for payments and
          login flows.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          Last synced {new Date(assetManifest.syncedAt).toLocaleString()}.{" "}
          <a
            href="/assets/README.pdf"
            className="font-medium text-hello-lime-700 hover:text-hello-lime-800"
          >
            Read brand guidelines (PDF)
          </a>
        </p>
      </div>

      {hwVibeLogos ? (
        <AccordionSection
          id="logos"
          title={hwVibeLogos.title}
          description={hwVibeLogos.description}
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {hwVibeLogos.assets.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </AccordionSection>
      ) : null}

      {hwVibeCategories.map((category) => (
        <AccordionSection
          key={category.id}
          id={category.id}
          title={category.title}
          description={category.description}
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {category.assets.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </AccordionSection>
      ))}

      <AccordionSection
        id="lotties"
        title="Lottie animations"
        description="Payment and login flow animations. Use the LottieAnimation component with the file path from the manifest."
      >
        <div className="space-y-12">
          {lottieGroups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                {group.title}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {group.assets.map((asset) => (
                  <AssetCard key={asset.file} asset={asset} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection
        id="usage"
        title="Usage in code"
        description="Import assets from the generated manifest or use the media components directly."
      >
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-gray-25 p-6">
            <pre className="font-mono text-sm leading-relaxed text-gray-800">
              <code>{`import Image from "next/image";
import { LottieAnimation } from "@/components/media/lottie";
import { getAssetById, getLottieById } from "@/src/tokens/assets";

const tourConfirmed = getAssetById("hdp", "tour-confirmed");
const paymentSuccess = getLottieById("booking-payment-sucess-animation");

<Image src={tourConfirmed.file} alt={tourConfirmed.name} width={320} height={240} />

<LottieAnimation
  src={paymentSuccess.file}
  className="h-48 w-48"
  loop
  autoplay
/>`}</code>
            </pre>
          </div>
          <p className="text-sm text-gray-600">
            To refresh assets from Desktop, run{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              npm run sync:assets
            </code>
            . Set{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              HW_VIBE_ASSETS
            </code>{" "}
            to override the default Desktop folder path.
          </p>
        </div>
      </AccordionSection>
    </ShowcaseShell>
  );
}
