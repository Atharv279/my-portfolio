import { defineType, defineField } from "sanity";

export default defineType({
  name: "techStack",
  title: "Tech Stack",
  type: "document",
  fields: [
    defineField({ name: "glowColor", title: "Glow Color (rgba)", type: "string" }),
    defineField({
      name: "trending",
      title: "Trending Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "arsenal",
      title: "Full Arsenal Categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
            defineField({ name: "accentBorder", title: "Accent Border Class", type: "string" }),
            defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "footnote", title: "Footnote", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
