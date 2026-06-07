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
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub Website Code",
      type: "url",
      description: "Admin shortcut to the website code repository.",
      initialValue: "https://github.com/ourwildlifepics/syed-rehman-gallery",
      validation: (Rule) => Rule.uri({ scheme: ["https"] })
    }),
    defineField({
      name: "liveWebsiteUrl",
      title: "Live Website",
      type: "url",
      description: "Admin shortcut to the public website.",
      initialValue: "https://www.syedrehmangallery.com",
      validation: (Rule) => Rule.uri({ scheme: ["https"] })
    }),
    defineField({
      name: "vercelDeploymentsUrl",
      title: "Vercel Deployments",
      type: "url",
      description: "Admin shortcut for checking whether a website deployment has finished.",
      initialValue: "https://vercel.com",
      validation: (Rule) => Rule.uri({ scheme: ["https"] })
    }),
    defineField({
      name: "contentWorkflowNote",
      title: "Content Workflow Note",
      type: "text",
      rows: 4,
      description: "A private reminder for how to update the website.",
      initialValue: "Open Gallery, choose or create a gallery, add artwork images inside it, publish, then wait for the live website to update."
    })
  ],
  preview: {
    prepare: () => ({ title: "Main Page" })
  }
});
