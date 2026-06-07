import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import type { StructureBuilder } from "sanity/desk";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your_project_id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "our-wildlife-pics",
  title: "OurWildlifePics",
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Main Page")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Main Page")
              ),
            S.documentTypeListItem("gallery").title("Gallery")
          ])
    })
  ],
  schema: {
    types: schemaTypes
  }
});
