import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ShowcaseShell } from "@/components/layout/showcase-shell";
import { HomepageReviews } from "@/components/marketing/homepage-reviews";
import { LocalityCardDemo } from "@/components/marketing/locality-card-demo";
import { SrpCardDemo } from "@/components/marketing/srp-card-demo";
import { ModalDemo } from "@/components/ui/modal-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationSearchDemo } from "@/components/search/location-search-demo";
import { ProgressBarDemo } from "@/components/ui/progress-bar-demo";
import { PromoCodeInputDemo } from "@/components/ui/promo-code-input-demo";
import { ProgressRingDemo } from "@/components/ui/progress-ring-demo";
import { SegmentedControlDemo } from "@/components/ui/segmented-control-demo";
import { TabNavDemo } from "@/components/ui/tab-nav-demo";
import { colorPalettes, type ColorPalette } from "@/src/tokens/colors";
import { gradientStops, gradients, textGradients } from "@/src/tokens/gradients";
import { fontFamilies, typeScale } from "@/src/tokens/typography";

const buttonHierarchies = [
  "primary",
  "secondary-color",
  "secondary-gray",
  "tertiary-color",
  "tertiary-gray",
  "link-color",
  "link-gray",
] as const;

const buttonSizes = ["sm", "md", "lg", "xl", "2xl"] as const;

const designSystemNav = [
  { label: "Assets", href: "/assets" },
  { label: "Logos", id: "logos" },
  { label: "Colors", id: "colors" },
  { label: "Gradients", id: "gradients" },
  { label: "Typography", id: "typography" },
  { label: "Reviews", id: "reviews" },
  { label: "Buttons", id: "buttons" },
  { label: "Segmented Control", id: "segmented-control" },
  { label: "Location Search", id: "location-search" },
  { label: "Progress Ring", id: "progress-ring" },
  { label: "Progress Bar", id: "progress-bar" },
  { label: "Tab Nav", id: "tab-nav" },
  { label: "SRP Card", id: "srp-card" },
  { label: "Locality Card", id: "locality-card" },
  { label: "Modal", id: "modal" },
  { label: "Inputs", id: "inputs" },
] as const;

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-gray-200 py-10 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-display-xs font-bold tracking-tight text-gray-900 sm:text-display-sm">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-base text-gray-600 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({
  palette,
  shade,
  hex,
}: {
  palette: string;
  shade: string | number;
  hex: string;
}) {
  const token = `${palette}-${shade}`;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-20 w-full rounded-xl border border-gray-200 shadow-xs"
        style={{ backgroundColor: hex }}
      />
      <div className="px-1">
        <p className="text-sm font-medium text-gray-900">{token}</p>
        <p className="font-mono text-sm text-gray-500">{hex.toUpperCase()}</p>
      </div>
    </div>
  );
}

function DotIcon() {
  return (
    <span
      aria-hidden
      className="inline-block size-2 rounded-full bg-current"
    />
  );
}

const localityRatingCategories = [
  { emoji: "🚌", label: "Transit" },
  { emoji: "🍽️", label: "Dining" },
  { emoji: "🌙", label: "Night Life" },
  { emoji: "🏥", label: "Health" },
] as const;

function GradientSwatch({ gradient }: { gradient: (typeof gradients)[number] }) {
  const { variant, name, className, stops } = gradient;
  const rating = gradient.rating;
  return (
    <div className="flex flex-col gap-4">
      {variant === "banner" ? (
        <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-gray-200">
          <div className="h-36 bg-gray-200" aria-hidden />
          <div
            className={`flex items-center justify-center gap-1 px-4 py-2.5 ${className}`}
          >
            <p className="text-sm text-gray-900">
              <span aria-hidden>✨ </span>
              <span className="font-bold">93%</span> Vibe Match
            </p>
          </div>
          <div className="h-10 bg-white" aria-hidden />
        </div>
      ) : variant === "ratings-bar" ? (
        <div
          className={`grid w-full max-w-md grid-cols-2 gap-3 rounded-3xl px-3 py-4 sm:grid-cols-4 sm:gap-2 sm:px-4 sm:py-5 ${className}`}
        >
          {localityRatingCategories.map((category) => (
            <div key={category.label} className="min-w-0 text-center">
              <p className="text-base font-bold text-gray-900 sm:text-lg">
                4.8 <span className="text-yelloworld-700">★</span>
              </p>
              <p className="mt-1 text-[11px] text-gray-600 sm:text-xs">
                <span aria-hidden>{category.emoji} </span>
                {category.label}
              </p>
            </div>
          ))}
        </div>
      ) : variant === "tile" ? (
        <div
          className={`flex h-44 w-full max-w-xs flex-col justify-between rounded-3xl p-5 sm:h-52 sm:p-6 ${className}`}
        >
          <div>
            <p className="text-lg font-bold text-gray-900">
              {rating} <span className="text-yelloworld-700">★</span>
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{name}</p>
          </div>
        </div>
      ) : variant === "card" ? (
        <div
          className={`w-full max-w-xs rounded-3xl p-6 shadow-md ${className}`}
        >
          <p className="text-center text-lg font-bold text-gray-900">
            Let us help you!
          </p>
          <div className="mt-6 space-y-3">
            <div className="h-10 rounded-lg border border-gray-200 bg-white" />
            <div className="h-10 rounded-lg border border-gray-200 bg-white" />
            <div className="h-10 rounded-lg border border-gray-200 bg-white" />
          </div>
        </div>
      ) : variant === "cta" ? (
        <div
          className={`flex h-12 w-full max-w-xs items-center justify-center rounded-xl px-6 text-sm font-bold text-gray-900 ${className}`}
        >
          Request Callback
        </div>
      ) : null}
      <div className="px-1">
        <p className="text-sm font-medium text-gray-900">{className}</p>
        <p className="font-mono text-sm text-gray-500">
          {stops.join(" → ")}
        </p>
      </div>
    </div>
  );
}

function TextGradientSwatch({
  gradient,
}: {
  gradient: (typeof textGradients)[number];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-25 p-6">
      <div className="overflow-visible py-1">
        <p className={`${gradient.fontClassName} ${gradient.className}`}>
          {gradient.sample}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{gradient.className}</p>
        <p className="font-mono text-sm text-gray-500">
          {gradient.stops.join(" → ")}
        </p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ShowcaseShell
      eyebrow="Helloworld Revamp"
      title="Design System"
      navItems={[...designSystemNav]}
      secondaryLink={{ href: "/assets", label: "Assets" }}
    >
        <div className="border-b border-gray-200 py-10 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-hello-lime-700">
            Figma → Code
          </p>
          <h1 className="mt-3 max-w-4xl text-display-md font-bold tracking-tight text-gray-900 sm:text-display-lg">
            Component library verification
          </h1>
          <p className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
            Tokens and components mapped from the Helloworld Revamp Figma file.
            Use this page to verify colors, typography, and button variants match
            the design system.
          </p>
        </div>

        <Section
          id="logos"
          title="Logos"
          description="Brand marks synced from the HW vibe assets folder on Desktop."
        >
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-gray-200 bg-gray-25 p-8">
            <Logo width={160} height={64} priority />
            <Logo variant="mark" width={48} height={48} />
            <Link
              href="/assets"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-hello-lime-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-hello-lime-600"
            >
              View all assets
            </Link>
          </div>
        </Section>

        <Section
          id="colors"
          title="Color palettes"
          description="Semantic color scales from Figma variables — Hello Lime, Yelloworld, Gray, Error, Blue light, and Brand."
        >
          <div className="space-y-14">
            {(Object.keys(colorPalettes) as ColorPalette[]).map((palette) => (
              <div key={palette}>
                <h3 className="mb-6 text-lg font-semibold capitalize text-gray-900">
                  {palette.replace("-", " ")}
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11">
                  {Object.entries(colorPalettes[palette]).map(([shade, hex]) => (
                    <ColorSwatch
                      key={`${palette}-${shade}`}
                      palette={palette}
                      shade={shade}
                      hex={hex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="gradients"
          title="Gradients"
          description="Background fills and headline text gradients — reusable Tailwind utilities from globals.css."
        >
          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Background gradients
              </h3>
              <div className="flex flex-wrap gap-8">
                {gradients.map((gradient) => (
                  <GradientSwatch key={gradient.id} gradient={gradient} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Text gradients
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {textGradients.map((gradient) => (
                  <TextGradientSwatch key={gradient.id} gradient={gradient} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-25 p-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Stop tokens
              </h3>
              <div className="mt-4 flex flex-wrap gap-6">
                {Object.values(gradientStops).map((stop) => (
                  <div key={stop.token} className="flex items-center gap-3">
                    <span
                      className={`size-10 rounded-lg border border-gray-200 ${stop.className}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {stop.token}
                      </p>
                      <p className="font-mono text-xs text-gray-500">
                        {stop.hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="typography"
          title="Typography"
          description="Satoshi is the primary UI typeface. Playfair Display and Caveat are accent fonts from the brand pitch."
        >
          <div className="space-y-16">
            {fontFamilies.map((font) => (
              <div
                key={font.name}
                className="rounded-2xl border border-gray-200 bg-gray-25 p-8"
              >
                <h3 className={`text-display-xs font-bold ${font.className}`}>
                  {font.name}
                </h3>
                <p
                  className={`mt-8 text-display-sm font-medium ${font.className}`}
                >
                  {font.alphabet}
                </p>
                <p
                  className={`mt-6 text-display-sm font-medium lowercase ${font.className}`}
                >
                  {font.alphabet.toLowerCase()}
                </p>
                <p className={`mt-6 text-display-xs ${font.className}`}>
                  {font.numerals}
                </p>
                <p className={`mt-8 text-lg text-gray-600 ${font.className}`}>
                  {font.sample}
                </p>
              </div>
            ))}

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Type scale
              </h3>
              <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
                {typeScale.map((style) => (
                  <div
                    key={style.name}
                    className="grid gap-4 p-6 md:grid-cols-[200px_1fr]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {style.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {style.size}
                      </p>
                      <p className="text-xs text-gray-500">
                        LH {style.lineHeight}
                      </p>
                    </div>
                    <p className={`${style.className} font-medium text-gray-900`}>
                      HelloWorld makes moving in effortless.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="reviews"
          title="Homepage Reviews"
          description="Sticky-note review cards from Figma node 2712:18130 — rotated pastel tiles with tape, shadow, quote, tenant name, and city."
        >
          <div className="-mx-6 overflow-hidden rounded-2xl">
            <HomepageReviews title="" />
          </div>
        </Section>

        <Section
          id="buttons"
          title="Buttons"
          description="Matches Figma: Hello Lime for primary/color hierarchies, Error red for destructive, Gray for neutral secondary."
        >
          <div className="space-y-16">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Hierarchies (md, default)
              </h3>
              <div className="flex flex-wrap gap-4">
                {buttonHierarchies.map((hierarchy) => (
                  <Button key={hierarchy} hierarchy={hierarchy}>
                    Button
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Destructive (md)
              </h3>
              <div className="flex flex-wrap gap-4">
                {buttonHierarchies.map((hierarchy) => (
                  <Button key={hierarchy} hierarchy={hierarchy} destructive>
                    Button
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Sizes</h3>
              <div className="flex flex-wrap items-end gap-4">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size}>
                    Button
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                With icons
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button hierarchy="primary" iconLeading={<DotIcon />}>
                  Leading
                </Button>
                <Button hierarchy="secondary-color" iconTrailing={<DotIcon />}>
                  Trailing
                </Button>
                <Button
                  hierarchy="secondary-gray"
                  iconLeading={<DotIcon />}
                  iconTrailing={<DotIcon />}
                >
                  Both
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                States
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Full matrix
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Hierarchy</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                      <th className="px-4 py-3 font-medium">Destructive</th>
                      <th className="px-4 py-3 font-medium">Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {buttonHierarchies.map((hierarchy) => (
                      <tr key={hierarchy}>
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {hierarchy}
                        </td>
                        <td className="px-4 py-4">
                          <Button hierarchy={hierarchy} size="sm">
                            Button
                          </Button>
                        </td>
                        <td className="px-4 py-4">
                          <Button hierarchy={hierarchy} size="sm" destructive>
                            Button
                          </Button>
                        </td>
                        <td className="px-4 py-4">
                          <Button hierarchy={hierarchy} size="sm" disabled>
                            Button
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="segmented-control"
          title="Segmented Control"
          description="Pill toggle for switching locality views — animated sliding thumb with gray track and white active indicator."
        >
          <SegmentedControlDemo />
        </Section>

        <Section
          id="location-search"
          title="Location Search"
          description="Combined city picker and locality search — pill bar with animated dropdowns for city list and filtered localities."
        >
          <LocationSearchDemo />
        </Section>

        <Section
          id="progress-ring"
          title="Progress Ring"
          description="Animated donut charts for vibe match scores and resident recommendation — SVG stroke with gradient fill."
        >
          <ProgressRingDemo />
        </Section>

        <Section
          id="progress-bar"
          title="Progress Bar"
          description="Horizontal recommendation bar — lime-to-forest gradient fill with animated width."
        >
          <ProgressBarDemo />
        </Section>

        <Section
          id="tab-nav"
          title="Tab Nav"
          description="Property detail section tabs with lime active pill and gradient-underlined heading — horizontally scrollable on mobile."
        >
          <TabNavDemo />
        </Section>

        <Section
          id="srp-card"
          title="SRP Card"
          description="Search results property card — image carousel, overlay badges, rating, room types, pricing, and dual CTAs. Variants: filling fast, saved, and offer."
        >
          <SrpCardDemo />
        </Section>

        <Section
          id="locality-card"
          title="Locality Card"
          description="Desktop: wide card with arrow CTA and circular prev/next controls. Mobile: titled horizontal carousel with peek, arrow on card, and pill pagination dots."
        >
          <LocalityCardDemo />
        </Section>

        <Section
          id="modal"
          title="Modal"
          description="Centered dialog overlay with dimmed backdrop, floating close button, and scroll lock. Login variant includes phone input and terms link."
        >
          <ModalDemo />
        </Section>

        <Section
          id="inputs"
          title="Inputs"
          description="Text fields with label, focus ring, disabled/read-only, and error states."
        >
          <div className="space-y-16">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                States
              </h3>
              <div className="grid max-w-sm gap-8">
                <Input
                  label="Email"
                  placeholder="olivia@untitledui.com"
                />
                <Input
                  label="Email"
                  defaultValue="olivia@untitledui.com"
                />
                <Input
                  label="Email"
                  defaultValue="olivia@untitledui.com"
                  readOnly
                />
                <Input
                  label="Email"
                  placeholder="olivia@untitledui.com"
                  disabled
                />
                <Input
                  label="Email"
                  defaultValue="olivia@untitledui.com"
                  error
                  hint="This is an error message."
                />
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Promo / referral code
              </h3>
              <PromoCodeInputDemo />
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                With helper text
              </h3>
              <div className="max-w-sm">
                <Input
                  label="Email"
                  placeholder="olivia@untitledui.com"
                  hint="We'll never share your email."
                />
              </div>
            </div>
          </div>
        </Section>
    </ShowcaseShell>
  );
}
