import { defineType, defineField } from "sanity";

export default defineType({
  name: "methodology",
  title: "Methodology",
  type: "document",
  fields: [
    defineField({ name: "glowColor", title: "Glow Color (rgba)", type: "string" }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
            defineField({ name: "brief", title: "Brief", type: "string" }),
            defineField({ name: "detail", title: "Detail", type: "text", rows: 4 }),
          ],
        },
      ],
    }),
    defineField({
      name: "whyItWorks",
      title: "Why It Works Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
          ],
        },
      ],
    }),
  ],
});
