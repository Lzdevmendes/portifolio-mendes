export const SECTION_IDS = [
  "about",
  "projects",
  "experience",
  "skills",
  "certifications",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
