export type ShopStatus = "comingSoon" | "active";

export type Artwork = {
  id: string;
  title: string;
  description: string;
  location?: string;
  year?: string;
  image: string;
  aspectRatio?: number;
  alt: string;
  shopStatus: ShopStatus;
  shopProductHandle?: string;
};

export type Gallery = {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  artworks: Artwork[];
};

export type SiteContent = {
  photographerName: string;
  homeImage: string;
  homeImageAlt: string;
  activeFont: string;
  galleries: Gallery[];
};
