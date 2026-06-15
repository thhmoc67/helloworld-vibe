export type HomepageReview = {
  quote: string;
  name: string;
  city: string;
  backgroundColor: string;
  rotation: number;
};

/** Parsed from Figma node 2712:18130 (Homepage Reviews). */
export const homepageReviews: HomepageReview[] = [
  {
    quote:
      "My stay has been truly comfortable and peaceful. The rooms are clean, the environment is friendly, and the staff is always supportive. I really enjoyed the community vibe and would happily recommend HelloWorld to others.",
    name: "Rasmita Dash",
    city: "Hyderabad",
    backgroundColor: "#fee1e1",
    rotation: -2,
  },
  {
    quote:
      "My stay has been truly comfortable and hassle-free. The warm, welcoming environment made it easy to feel at home from day one. The team was approachable and always ready to help whenever needed.",
    name: "Rishabh Lal",
    city: "Jaipur",
    backgroundColor: "#e6e0ff",
    rotation: 3,
  },
  {
    quote:
      "My stay at HelloWorld has been comfortable and hassle-free. The good living environment, clean rooms, and supportive staff motivated me to refer HelloWorld to my friends.",
    name: "Ashay Bhute",
    city: "Pune",
    backgroundColor: "#d7f8ee",
    rotation: -3,
  },
  {
    quote:
      "My stay at HelloWorld has been comfortable and convenient. The team was always responsive and ensured that everything was well maintained. It has been a smooth and pleasant experience overall.",
    name: "Abhimanyu Bijliya",
    city: "Chennai",
    backgroundColor: "#d6e5ff",
    rotation: 2,
  },
  {
    quote:
      "Living at HelloWorld has been such a warm and comforting experience for me. From the friendly staff to the well-kept spaces, everything just feels right.",
    name: "Salini Roy",
    city: "Hyderabad",
    backgroundColor: "#ffe2b9",
    rotation: -1,
  },
  {
    quote:
      "Loved the modern amenities and the attention to detail. The management is responsive and the community atmosphere makes it easy to settle in quickly.",
    name: "Vikram Reddy",
    city: "Chennai",
    backgroundColor: "#d4f5f0",
    rotation: 4,
  },
];
