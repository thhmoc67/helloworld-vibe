import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { HomepageReviews } from "@/components/marketing/homepage-reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colorPalettes, type ColorPalette } from "@/src/tokens/colors";
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
    <section id={id} className="scroll-mt-8 border-t border-gray-200 py-16">
      <div className="mb-10">
        <h2 className="text-display-sm font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-lg text-gray-600">{description}</p>
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

const bentoGradients = [
  {
    variant: "bento" as const,
    name: "Transit",
    className: "bg-bento-transit",
    stops: ["#D2F0FE", "#E8FFC7"],
    rating: "4.8",
  },
  {
    variant: "bento" as const,
    name: "Night Life",
    className: "bg-bento-night-life",
    stops: ["#D2F0FE", "#E9D7FE"],
    rating: "4.9",
  },
  {
    variant: "ratings-bar" as const,
    name: "Locality Ratings",
    className: "bg-bento-locality-ratings",
    stops: ["#D2F0FE", "#E9D7FE"],
  },
  {
    variant: "banner" as const,
    name: "Vibe Match",
    className: "bg-vibe-match",
    stops: ["#B694FE", "#B9E6FE"],
  },
] as const;

function GradientSwatch(gradient: (typeof bentoGradients)[number]) {
  const { variant, name, className, stops } = gradient;
  const rating = "rating" in gradient ? gradient.rating : undefined;
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
          className={`grid w-full max-w-md grid-cols-4 gap-2 rounded-3xl px-4 py-5 ${className}`}
        >
          {localityRatingCategories.map((category) => (
            <div key={category.label} className="text-center">
              <p className="text-lg font-bold text-gray-900">
                4.8 <span className="text-yelloworld-700">★</span>
              </p>
              <p className="mt-1 text-xs text-gray-600">
                <span aria-hidden>{category.emoji} </span>
                {category.label}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`flex h-52 w-full max-w-xs flex-col justify-between rounded-3xl p-6 ${className}`}
        >
          <div>
            <p className="text-lg font-bold text-gray-900">
              {rating} <span className="text-yelloworld-700">★</span>
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{name}</p>
          </div>
        </div>
      )}
      <div className="px-1">
        <p className="text-sm font-medium text-gray-900">{className}</p>
        <p className="font-mono text-sm text-gray-500">
          {stops.join(" → ")}
        </p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-sm font-medium text-hello-lime-700">
              Helloworld Revamp
            </p>
            <h1 className="text-xl font-bold text-gray-900">Design System</h1>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
            <Link
              href="/assets"
              className="hover:text-gray-900"
            >
              Assets
            </Link>
            <a href="#logos" className="hover:text-gray-900">
              Logos
            </a>
            <a href="#colors" className="hover:text-gray-900">
              Colors
            </a>
            <a href="#gradients" className="hover:text-gray-900">
              Gradients
            </a>
            <a href="#typography" className="hover:text-gray-900">
              Typography
            </a>
            <a href="#buttons" className="hover:text-gray-900">
              Buttons
            </a>
            <a href="#reviews" className="hover:text-gray-900">
              Reviews
            </a>
            <a href="#inputs" className="hover:text-gray-900">
              Inputs
            </a>
          </nav>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24">
        <div className="border-b border-gray-200 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-hello-lime-700">
            Figma → Code
          </p>
          <h1 className="mt-3 max-w-4xl text-display-lg font-bold tracking-tight text-gray-900">
            Component library verification
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
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
          description="Bento locality tiles, ratings bars, and property card banners — global Tailwind utilities from globals.css."
        >
          <div className="space-y-10">
            <div className="flex flex-wrap gap-8">
              {bentoGradients.map((gradient) => (
                <GradientSwatch key={gradient.className} {...gradient} />
              ))}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-25 p-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Stop tokens
              </h3>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-lg border border-gray-200 bg-bento-sky" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      bento-sky
                    </p>
                    <p className="font-mono text-xs text-gray-500">#D2F0FE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-lg border border-gray-200 bg-bento-mint" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      bento-mint
                    </p>
                    <p className="font-mono text-xs text-gray-500">#E8FFC7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-lg border border-gray-200 bg-bento-lavender" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      bento-lavender
                    </p>
                    <p className="font-mono text-xs text-gray-500">#E9D7FE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-lg border border-gray-200 bg-vibe-match-start" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      vibe-match-start
                    </p>
                    <p className="font-mono text-xs text-gray-500">#B694FE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-lg border border-gray-200 bg-vibe-match-end" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      vibe-match-end
                    </p>
                    <p className="font-mono text-xs text-gray-500">#B9E6FE</p>
                  </div>
                </div>
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
      </main>
    </div>
  );
}
