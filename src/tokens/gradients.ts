export const gradientStops = {
  sky: { token: "gradient-sky", className: "bg-gradient-sky", hex: "#D2F0FE" },
  mint: { token: "gradient-mint", className: "bg-gradient-mint", hex: "#E8FFC7" },
  lavender: {
    token: "gradient-lavender",
    className: "bg-gradient-lavender",
    hex: "#E9D7FE",
  },
  purple: {
    token: "gradient-purple",
    className: "bg-gradient-purple",
    hex: "#B694FE",
  },
  cyan: { token: "gradient-cyan", className: "bg-gradient-cyan", hex: "#B9E6FE" },
  contactSky: {
    token: "gradient-contact-sky",
    className: "bg-gradient-contact-sky",
    hex: "#D5ECF9",
  },
} as const;

export type GradientStopId = keyof typeof gradientStops;

export type GradientVariant = "tile" | "ratings-bar" | "banner" | "card" | "cta";

export type Gradient = {
  id: string;
  name: string;
  className: string;
  variant: GradientVariant;
  stops: [string, string];
  rating?: string;
};

export const gradients: Gradient[] = [
  {
    id: "locality-transit",
    name: "Transit",
    className: "bg-gradient-locality-transit",
    variant: "tile",
    stops: [gradientStops.sky.hex, gradientStops.mint.hex],
    rating: "4.8",
  },
  {
    id: "locality-night-life",
    name: "Night Life",
    className: "bg-gradient-locality-night-life",
    variant: "tile",
    stops: [gradientStops.sky.hex, gradientStops.lavender.hex],
    rating: "4.9",
  },
  {
    id: "locality-dining",
    name: "Dining",
    className: "bg-gradient-locality-dining",
    variant: "tile",
    stops: [gradientStops.sky.hex, gradientStops.lavender.hex],
    rating: "4.9",
  },
  {
    id: "locality-health",
    name: "Health",
    className: "bg-gradient-locality-health",
    variant: "tile",
    stops: [gradientStops.sky.hex, gradientStops.mint.hex],
    rating: "4.6",
  },
  {
    id: "locality-ratings",
    name: "Locality Ratings",
    className: "bg-gradient-locality-ratings",
    variant: "ratings-bar",
    stops: [gradientStops.sky.hex, gradientStops.lavender.hex],
  },
  {
    id: "property-vibe-match",
    name: "Vibe Match",
    className: "bg-gradient-property-vibe-match",
    variant: "banner",
    stops: [gradientStops.purple.hex, gradientStops.cyan.hex],
  },
  {
    id: "contact-card",
    name: "Contact Card",
    className: "bg-gradient-contact-card",
    variant: "card",
    stops: [gradientStops.contactSky.hex, "#FFFFFF"],
  },
  {
    id: "callback-cta",
    name: "Callback CTA",
    className: "bg-gradient-callback-cta",
    variant: "cta",
    stops: ["#D9F99E", "#84CC15"],
  },
];

export function getGradientClassName(id: string) {
  return gradients.find((gradient) => gradient.id === id)?.className;
}

export type TextGradient = {
  id: string;
  name: string;
  className: string;
  sample: string;
  fontClassName: string;
  stops: readonly string[];
};

export const textGradients: TextGradient[] = [
  {
    id: "vibe",
    name: "Vibe",
    className: "text-gradient-vibe",
    sample: "Vibe!",
    fontClassName: "font-satoshi text-4xl font-bold italic leading-normal sm:text-5xl",
    stops: ["#28B2AF", "#08A4ED", "#8C40C1"],
  },
  {
    id: "home",
    name: "Home",
    className: "text-gradient-home",
    sample: "Home!",
    fontClassName: "font-satoshi text-4xl font-bold italic leading-normal sm:text-5xl",
    stops: ["#5876D1", "#7A87E0"],
  },
  {
    id: "belonging",
    name: "Belonging",
    className: "text-gradient-belonging",
    sample: "Belonging.",
    fontClassName: "font-satoshi text-4xl font-bold italic leading-normal sm:text-5xl",
    stops: ["#08A4ED", "#8C40C1"],
  },
  {
    id: "different",
    name: "Different",
    className: "text-gradient-different",
    sample: "Different",
    fontClassName: "font-satoshi text-4xl font-bold italic leading-normal sm:text-5xl",
    stops: ["#4FB0B0", "#4A90E2", "#5B7FDB", "#7B61FF"],
  },
];

export function getTextGradientClassName(id: string) {
  return textGradients.find((gradient) => gradient.id === id)?.className;
}
