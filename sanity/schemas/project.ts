import { defineType, defineField } from "sanity";

const pipelineStep = {
  type: "object" as const,
  name: "pipelineStep",
  fields: [
    defineField({ name: "step", title: "Step Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "accentColor", title: "Accent Color Class", type: "string" }),
  ],
};

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
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", title: "Category Label", type: "string" }),
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "tags",
      title: "Tags",
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
    defineField({ name: "glowColor", title: "Glow Color (rgba)", type: "string" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
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
            defineField({ name: "introText", title: "Intro Text", type: "text", rows: 3 }),
            defineField({ name: "pipelineSteps", title: "Pipeline Steps", type: "array", of: [pipelineStep] }),
            defineField({ name: "detailItems", title: "Detail Items", type: "array", of: [detailItem] }),
            defineField({ name: "infoCards", title: "Info Cards", type: "array", of: [infoCard] }),
          ],
        },
      ],
    }),
    // Phase 3: WebGL scene configuration
    defineField({
      name: "cameraPosition",
      title: "Camera Position [x, y, z]",
      type: "array",
      of: [{ type: "number" }],
      description: "Three.js camera coordinates for the project scene",
    }),
    defineField({
      name: "ambientLightIntensity",
      title: "Ambient Light Intensity",
      type: "number",
      description: "Three.js ambient light intensity (0-1)",
    }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
});
