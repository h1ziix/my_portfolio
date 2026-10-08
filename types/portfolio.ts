export type ProjectHierarchy = "featured" | "major" | "supporting";

export type ProjectStatus = {
  label: string;
  description?: string;
};

export type ProjectLinks = {
  caseStudy?: string;
  demo?: string;
  source?: string;
  access?: string;
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type ProjectOutcome = {
  value: string;
  label: string;
  basis?: string;
};

export type ProjectEvidence = {
  label: string;
  source: string;
};

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  hierarchy: ProjectHierarchy;
  role: string;
  technologies: string[];
  releaseStatus: ProjectStatus;
  accessStatus: ProjectStatus;
  links: ProjectLinks;
  media: ProjectMedia[];
  features: string[];
  outcomes?: ProjectOutcome[];
  evidence?: ProjectEvidence[];
  limitations?: string[];
};

/** Detailed source material, kept separate from homepage project summaries. */
export type ProjectCaseStudy = {
  problem?: string;
  contribution?: string[];
  features?: string[];
  outcomes?: ProjectOutcome[];
  limitations?: string[];
  evidence?: ProjectEvidence[];
};

export type PortfolioPerson = {
  name: string;
  displayName: string;
  title: string;
  positioning: string;
  experience: string;
  location: string;
  availability: string;
  profile: string;
  summary: string;
  resumeHref: string;
};

export type PortfolioExperience = {
  company: string;
  role: string;
  period?: string;
  format?: string;
  responsibilities: string[];
};

export type Portfolio = {
  person: PortfolioPerson;
  navigation: { label: string; href: string }[];
  heroMeta: string[];
  projects: Project[];
  experience: PortfolioExperience[];
  skills: { area: string; items: string[] }[];
  assistants: string[];
  process: { title: string; description: string }[];
  socials: { label: string; href: string; value: string }[];
};
