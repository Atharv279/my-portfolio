import { defineType, defineField } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string" }),
    defineField({ name: "currentRole", title: "Current Role", type: "string" }),
    defineField({
      name: "professionalSummary",
      title: "Professional Summary Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["github", "linkedin", "twitter", "email"] },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
