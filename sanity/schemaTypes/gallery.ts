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
      description: "Add the artwork documents that should appear inside this specific gallery. You can reuse an artwork in more than one gallery if needed.",
      of: [
        {
          type: "reference",
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
