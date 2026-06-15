export interface NeighborhoodCardData {
  id: string;
  emoji: string;
  category: string;
  placeName: string;
  imageSrc: string;
  imageAlt?: string;
  walkTime: string;
  linkLabel: string;
  href?: string;
}

/** Sample daily-routine cards from the neighborhood timeline (HSR Layout). */
export const neighborhoodRoutineSamples: readonly NeighborhoodCardData[] = [
  {
    id: "morning",
    emoji: "☀️",
    category: "Morning",
    placeName: "Blue Tokai Coffee",
    imageSrc: "/assets/community/hero/hero-1.png",
    walkTime: "3 min walk",
    linkLabel: "View Cafes Nearby",
    href: "#",
  },
  {
    id: "workout",
    emoji: "💪",
    category: "Workout",
    placeName: "Cult.fit HSR",
    imageSrc: "/assets/community/sports/rectangle-2363-3.png",
    walkTime: "6 min walk",
    linkLabel: "View Gyms Nearby",
    href: "#",
  },
  {
    id: "commute",
    emoji: "🚇",
    category: "Commute",
    placeName: "Silk Board Metro",
    imageSrc: "/assets/locality/transit-bento-desktop.png",
    walkTime: "5 min walk",
    linkLabel: "View Transit Nearby",
    href: "#",
  },
  {
    id: "work",
    emoji: "💼",
    category: "Work",
    placeName: "Prestige Tech Park",
    imageSrc: "/assets/community/hero/hero-2.png",
    walkTime: "5 min walk",
    linkLabel: "View Offices Nearby",
    href: "#",
  },
  {
    id: "lunch",
    emoji: "🍽️",
    category: "Lunch",
    placeName: "Social, HSR",
    imageSrc: "/assets/locality/dinning-bento-desktop.png",
    walkTime: "8 min walk",
    linkLabel: "View Dining Nearby",
    href: "#",
  },
] as const;

export const neighborhoodSectionTitle = "Your neighborhood routine";
