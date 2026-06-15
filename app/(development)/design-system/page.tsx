import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ShowcaseShell } from "@/components/layout/showcase-shell";
import { HomepageReviews } from "@/components/marketing/homepage-reviews";
import { LocalityCardDemo } from "@/components/marketing/locality-card-demo";
import { NeighborhoodCardDemo } from "@/components/marketing/neighborhood-card-demo";
import { PropertyGalleryDemo } from "@/components/marketing/property-gallery-demo";
import { SrpCardDemo } from "@/components/marketing/srp-card-demo";
import { ModalDemo } from "@/components/ui/modal-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisitSchedulerDemo } from "@/components/booking/visit-scheduler-demo";
import { LocationSearchDemo } from "@/components/search/location-search-demo";
import { ProgressBarDemo } from "@/components/ui/progress-bar-demo";
import { PromoCodeInputDemo } from "@/components/ui/promo-code-input-demo";
import { ProgressRingDemo } from "@/components/ui/progress-ring-demo";
import { SegmentedControlDemo } from "@/components/ui/segmented-control-demo";
import { CommunityTabsDemo } from "@/components/ui/community-tabs-demo";
import { TabNavDemo } from "@/components/ui/tab-nav-demo";
import { colorPalettes, type ColorPalette } from "@/src/tokens/colors";
import { GradientsDemo } from "@/components/ui/gradients-demo";
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
  { label: "Visit Scheduler", id: "visit-scheduler" },
  { label: "Progress Ring", id: "progress-ring" },
  { label: "Progress Bar", id: "progress-bar" },
  { label: "Tab Nav", id: "tab-nav" },
  { label: "Community Tabs", id: "community-tabs" },
  { label: "SRP Card", id: "srp-card" },
  { label: "Locality Card", id: "locality-card" },
  { label: "Neighborhood Card", id: "neighborhood-card" },
  { label: "Gallery", id: "gallery" },
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
          description="Background fills and headline text gradients — staggered opacity fade-in on scroll, with gradient fills blooming in after each preview."
        >
          <GradientsDemo />
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
          description="Sticky-note review cards from Figma node 2712:18130 — staggered fade-in on scroll, rotated pastel tiles with tape, shadow, quote, tenant name, and city."
        >
          <div className="-mx-6 overflow-hidden rounded-2xl">
            <HomepageReviews title="" />
          </div>
        </Section>

        <Section
          id="buttons"
          title="Buttons"
          description="Matches Figma: Hello Lime for primary/color hierarchies, Error red for destructive, Gray for neutral secondary. Hover lift, press scale, and smooth color transitions on solid buttons."
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
          id="visit-scheduler"
          title="Visit Scheduler"
          description="Booking date and time picker — sliding blue-light selection indicators on date cards and time pills, staggered scroll-in entrance, and time slots re-animate when the date changes."
        >
          <VisitSchedulerDemo />
        </Section>

        <Section
          id="progress-ring"
          title="Progress Ring"
          description="Animated donut charts for vibe match scores and resident recommendation — ring draws on scroll into view with synced count-up on the percentage."
        >
          <ProgressRingDemo />
        </Section>

        <Section
          id="progress-bar"
          title="Progress Bar"
          description="Horizontal recommendation bar — lime-to-forest gradient fill animates width when scrolled into view, with a subtle fade-in entrance."
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
          id="community-tabs"
          title="Community Tabs"
          description="Underline tab bar for community categories — sliding lime indicator, color transitions, and animated photo grid on tab change."
        >
          <CommunityTabsDemo />
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
          id="neighborhood-card"
          title="Neighborhood Card"
          description="Daily routine timeline — staggered fade-in on scroll, timeline dots and lines draw in, cards lift on hover with chevron nudge on links."
        >
          <NeighborhoodCardDemo />
        </Section>

        <Section
          id="gallery"
          title="Property Gallery"
          description="Desktop: bento grid with video, moments, and photo tiles plus View All CTA. Mobile: full-screen viewer with chevrons, 1/20 counter, category pills, and pagination dots."
        >
          <PropertyGalleryDemo />
        </Section>

        <Section
          id="modal"
          title="Modal"
          description="Centered dialog overlay with fade + scale entrance, dimmed backdrop, floating close button, and scroll lock. Login variant includes phone input and terms link."
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
