import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Main Page",
  type: "document",
  fields: [
    defineField({
      name: "photographerName",
      title: "Displayed Name",
      type: "string",
      initialValue: "Syed Rehman"
    }),
    defineField({
      name: "activeFont",
      title: "Signature Font",
      type: "string",
      initialValue: "forum",
      options: {
        list: [
          { title: "Forum", value: "forum" }
        ]
      }
    }),
    defineField({
      name: "homeImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "homeImageAlt",
      title: "Hero Image Alt Text",
      type: "string"
    })
  ],
  preview: {
    prepare: () => ({ title: "Main Page" })
  }
});
