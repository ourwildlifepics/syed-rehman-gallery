import type { SiteContent } from "../types";

export const fallbackContent: SiteContent = {
  photographerName: "Syed Rehman",
  homeImage: "/assets/patagonia-hero.jpg",
  homeImageAlt: "Black-and-white puma and cub photograph",
  activeFont: "forum",
  galleries: [
    {
      id: "patagonia",
      title: "Patagonia",
      description: "Quiet encounters from the southern edge of the wild.",
      coverImage: "/assets/patagonia-hero.jpg",
      artworks: [
        {
          id: "patagonia-mother-and-cub",
          title: "Patagonia",
          description: "A mother and cub moving through a quiet frame. This will become the image story once the gallery is finalized.",
          location: "Patagonia",
          year: "2026",
          image: "/assets/main-hero.jpg",
          alt: "Black-and-white puma and cub photograph",
          shopStatus: "comingSoon"
        }
      ]
    }
  ]
};
