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
      initialValue: 10
    }),
    defineField({
      name: "artworks",
      title: "Artworks",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artwork" }] }]
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage"
    }
  }
});
