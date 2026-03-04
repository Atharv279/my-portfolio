import { defineType, defineField } from "sanity";

const detailItem = {
  type: "object" as const,
  name: "detailItem",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
  ],
};

const infoCard = {
  type: "object" as const,
  name: "infoCard",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
  ],
};

export default defineType({
  name: "hardwareOps",
  title: "Hardware & Ops",
  type: "document",
  fields: [
    defineField({ name: "headerIcon", title: "Header Lucide Icon Name", type: "string" }),
    defineField({ name: "headerLabel", title: "Header Label", type: "string" }),
    defineField({ name: "glowColor", title: "Glow Color (rgba)", type: "string" }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "certificationLabel", title: "Certification Label", type: "string" }),
    defineField({
      name: "expandedSections",
      title: "Expanded Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "accentColor", title: "Accent Color Class", type: "string" }),
            defineField({ name: "detailItems", title: "Detail Items", type: "array", of: [detailItem] }),
            defineField({ name: "infoCards", title: "Info Cards", type: "array", of: [infoCard] }),
          ],
        },
      ],
    }),
  ],
});
