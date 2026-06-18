export type VibeChip = {
  id: string;
  label: string;
  emoji: string;
};

export const vibeChips = [
  { id: "foodie", label: "Foodie", emoji: "🍔" },
  { id: "sports", label: "Sports", emoji: "⚽️" },
  { id: "coder", label: "Coder", emoji: "💻" },
  { id: "fitness", label: "Fitness", emoji: "🏋️" },
  { id: "board-games", label: "Board Games", emoji: "🎲" },
  { id: "movies", label: "Movies", emoji: "🎬" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "networking", label: "Networking", emoji: "🤝" },
  { id: "reading", label: "Reading", emoji: "📚" },
] as const satisfies readonly VibeChip[];
