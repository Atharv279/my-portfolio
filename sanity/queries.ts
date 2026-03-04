export const profileQuery = `*[_type == "profile"][0]`;

export const educationQuery = `*[_type == "education"] | order(sortOrder asc)`;

export const experiencesQuery = `*[_type == "experience"] | order(sortOrder asc)`;

export const techStackQuery = `*[_type == "techStack"][0]`;

export const projectsQuery = `*[_type == "project"] | order(sortOrder asc) {
  _id, title, slug, category, badge, description, tags,
  glowColor, sourceUrl, expandedSections,
  cameraPosition, ambientLightIntensity
}`;

export const methodologyQuery = `*[_type == "methodology"][0]`;

export const hardwareOpsQuery = `*[_type == "hardwareOps"][0]`;
