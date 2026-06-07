import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Turn this on when this gallery should appear in the website menu.",
      initialValue: true
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "orderRank",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the website menu.",
      initialValue: 10
    }),
    defineField({
      name: "artworks",
      title: "Artwork Images In This Gallery",
      type: "array",
      description: "Upload images directly inside this gallery. Existing artwork references are still supported for anything already published.",
      of: [
        {
          type: "object",
          name: "galleryArtwork",
          title: "Image",
          fields: [
            defineField({
              name: "title",
              title: "Image Name",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: { source: "title", maxLength: 96 }
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description: "Upload the photograph here.",
              options: { hotspot: true },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string"
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string"
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string"
            }),
            defineField({
              name: "shopStatus",
              title: "Shop Status",
              type: "string",
              initialValue: "comingSoon",
              options: {
                list: [
                  { title: "Coming soon", value: "comingSoon" },
                  { title: "Active", value: "active" }
                ]
              }
            }),
            defineField({
              name: "shopProductHandle",
              title: "Future Shopify Product Handle",
              type: "string",
              description: "Keep empty until Shopify is activated."
            })
          ],
          preview: {
            select: {
              title: "title",
              media: "image"
            },
            prepare({ title, media }) {
              return {
                title: title || "Untitled image",
                media
              };
            }
          }
        },
        {
          type: "reference",
          title: "Existing Artwork",
          to: [{ type: "artwork" }],
          options: {
            disableNew: false
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage"
    }
  }
});
