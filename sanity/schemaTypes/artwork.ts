import { defineField, defineType } from "sanity";

export default defineType({
  name: "artwork",
  title: "Artwork",
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
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload the photograph here. To show it on the website, add this artwork to a Gallery document after publishing.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
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
      subtitle: "location",
      media: "image"
    }
  }
});
