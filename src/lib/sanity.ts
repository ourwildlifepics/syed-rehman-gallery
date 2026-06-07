import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SiteContent } from "../types";
import { fallbackContent } from "../data/fallbackContent";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-06-01";

export const hasSanityConfig = Boolean(projectId && projectId !== "your_project_id");

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false
});

const builder = imageUrlBuilder(sanityClient);

function imageUrl(source: unknown, fallback: string, width = 2400) {
  if (!source) return fallback;
  try {
    return builder.image(source).width(width).quality(88).url();
  } catch {
    return fallback;
  }
}

const settingsQuery = `*[_type == "siteSettings"][0]{
  photographerName,
  activeFont,
  homeImage,
  homeImageAlt
}`;

const galleriesQuery = `*[_type == "gallery" && published == true] | order(orderRank asc, title asc) {
  "id": slug.current,
  title,
  description,
  coverImage,
  "artworks": artworks[]->{
    "id": slug.current,
    title,
    description,
    location,
    year,
    image,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio,
    alt,
    shopStatus,
    shopProductHandle
  }
}`;

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasSanityConfig) return fallbackContent;

  const [settings, galleries] = await Promise.all([
    sanityClient.fetch(settingsQuery),
    sanityClient.fetch(galleriesQuery)
  ]);

  const sanityGalleries = (galleries || []).map((gallery: any) => ({
    id: gallery.id,
    title: gallery.title,
    description: gallery.description,
    coverImage: imageUrl(gallery.coverImage, fallbackContent.homeImage),
    artworks: (gallery.artworks || []).map((artwork: any) => ({
      id: artwork.id,
      title: artwork.title,
      description: artwork.description,
      location: artwork.location,
      year: artwork.year,
      image: imageUrl(artwork.image, fallbackContent.homeImage, 4200),
      aspectRatio: artwork.aspectRatio,
      alt: artwork.alt || artwork.title,
      shopStatus: artwork.shopStatus || "comingSoon",
      shopProductHandle: artwork.shopProductHandle
    }))
  }));
  const sanityGalleryIds = new Set(sanityGalleries.map((gallery) => gallery.id));
  const localGalleries = fallbackContent.galleries.filter((gallery) => !sanityGalleryIds.has(gallery.id));

  return {
    photographerName: settings?.photographerName || fallbackContent.photographerName,
    activeFont: settings?.activeFont || fallbackContent.activeFont,
    homeImage: imageUrl(settings?.homeImage, fallbackContent.homeImage),
    homeImageAlt: settings?.homeImageAlt || fallbackContent.homeImageAlt,
    galleries: [...sanityGalleries, ...localGalleries]
  };
}
