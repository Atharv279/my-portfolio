import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Lucide Icon Name", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["trending", "ai-ml", "networking", "backend-ops"] },
    }),
  ],
});
