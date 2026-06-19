export type GalleryCategory = "property-video" | "moments" | "photos";

export type GalleryMediaItem = {
  id: string;
  category: GalleryCategory;
  label: string;
  imageSrc: string;
  kind: "video" | "image";
};

export const galleryCategoryTabs: {
  value: GalleryCategory;
  label: string;
}[] = [
  { value: "property-video", label: "Property Video" },
  { value: "moments", label: "Moments" },
  { value: "photos", label: "Photos" },
];

export const propertyGalleryTotal = 20;

const galleryImages = [
  "/assets/community/hero/hero-1.png",
  "/assets/community/hero/hero-2.png",
  "/assets/community/hero/hero-3.png",
  "/assets/community/hero/hero-4.png",
  "/assets/locality/dinning-bento-desktop.png",
  "/assets/locality/nightlife-bento-desktop.png",
  "/assets/locality/health-bento-desktop.png",
  "/assets/locality/transit-bento-desktop.png",
] as const;

export const propertyGalleryItems: GalleryMediaItem[] = [
  {
    id: "video-1",
    category: "property-video",
    label: "Property Video",
    imageSrc: galleryImages[0],
    kind: "video",
  },
  {
    id: "moments-1",
    category: "moments",
    label: "Moments",
    imageSrc: galleryImages[1],
    kind: "image",
  },
  {
    id: "living-room",
    category: "photos",
    label: "Living Room",
    imageSrc: galleryImages[2],
    kind: "image",
  },
  {
    id: "washroom",
    category: "photos",
    label: "Washroom",
    imageSrc: galleryImages[3],
    kind: "image",
  },
  ...Array.from({ length: 16 }, (_, index) => {
    const imageSrc = galleryImages[(index + 4) % galleryImages.length];
    const category: GalleryCategory =
      index < 4 ? "moments" : "photos";
    return {
      id: `gallery-${index + 5}`,
      category,
      label: category === "moments" ? "Moments" : "Photos",
      imageSrc,
      kind: "image" as const,
    };
  }),
];

export const propertyGalleryDesktop = {
  video: propertyGalleryItems[0],
  moments: propertyGalleryItems[1],
  livingRoom: propertyGalleryItems[2],
  washroom: propertyGalleryItems[3],
};

export function getGalleryItemsByCategory(category: GalleryCategory) {
  return propertyGalleryItems.filter((item) => item.category === category);
}

export function getGalleryCategoryIndex(category: GalleryCategory) {
  return propertyGalleryItems.findIndex((item) => item.category === category);
}

const desktopTileLabels = [
  "Property Video",
  "Moments",
  "Living Room",
  "Washroom",
] as const;

export function buildGalleryItemsFromImages(
  images: readonly string[],
): GalleryMediaItem[] {
  return images.map((imageSrc, index) => {
    const category: GalleryCategory =
      index === 0 ? "property-video" : index === 1 ? "moments" : "photos";
    return {
      id: `gallery-${index}`,
      category,
      label: desktopTileLabels[index] ?? "Photos",
      imageSrc,
      kind: index === 0 ? "video" : "image",
    };
  });
}

export function buildGalleryDesktopFromImages(
  images: readonly string[],
): typeof propertyGalleryDesktop {
  const items = buildGalleryItemsFromImages(images);
  const pick = (index: number) => items[index] ?? items[0];

  return {
    video: pick(0),
    moments: pick(1),
    livingRoom: pick(2),
    washroom: pick(3),
  };
}
