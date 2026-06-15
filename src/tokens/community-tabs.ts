export interface CommunityTabItem {
  id: string;
  label: string;
}

export const communityTabs = [
  { id: "sports-outdoor", label: "Sports & Outdoor" },
  { id: "social-mixers", label: "Social Mixers" },
  { id: "social-events", label: "Social Events & Parties" },
  { id: "workshops", label: "Workshops" },
] as const;

export type CommunityTabId = (typeof communityTabs)[number]["id"];

export const communityIntroCopy =
  "Sports, events, meetups, and everything that makes this community awesome.";

export const communityTabPanels: Record<
  CommunityTabId,
  { description: string; images: readonly string[] }
> = {
  "sports-outdoor": {
    description: "Cricket nights, morning runs, and outdoor games with your neighbors.",
    images: [
      "/assets/community/sports/rectangle-2363-3.png",
      "/assets/community/sports/rectangle-2364-3.png",
      "/assets/community/sports/rectangle-2365-3.png",
      "/assets/community/sports/rectangle-2366-6.png",
    ],
  },
  "social-mixers": {
    description: "Casual mixers to meet roommates, make friends, and unwind together.",
    images: [
      "/assets/community/social-mixers/rectangle-2363-2.png",
      "/assets/community/social-mixers/rectangle-2364-2.png",
      "/assets/community/social-mixers/rectangle-2365-2.png",
      "/assets/community/social-mixers/rectangle-2366-5.png",
    ],
  },
  "social-events": {
    description: "Parties, celebrations, and community events all year round.",
    images: [
      "/assets/community/social-events-parties/rectangle-2363.png",
      "/assets/community/social-events-parties/rectangle-2364.png",
      "/assets/community/social-events-parties/rectangle-2365.png",
      "/assets/community/social-events-parties/rectangle-2366.png",
    ],
  },
  workshops: {
    description: "Skill-building sessions from cooking to career growth.",
    images: [
      "/assets/community/workshops/rectangle-2363-4.png",
      "/assets/community/workshops/rectangle-2364-4.png",
      "/assets/community/workshops/rectangle-2365-4.png",
      "/assets/community/workshops/rectangle-2366-7.png",
    ],
  },
};
