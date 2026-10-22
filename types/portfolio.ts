export type ProjectHierarchy = "featured" | "major" | "supporting";

/** What a reviewer can check today. The tone drives the chip colour. */
export type ProjectState = {
  tone: "live" | "building" | "closed";
  label: string;
  note?: string;
};

export type ProjectLinks = {
  caseStudy?: string;
  demo?: string;
  site?: string;
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
  poster?: string;
  duration?: string;
  captions?: string;
  transcript?: string;
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
  state: ProjectState;
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
  workFormat: string;
  availability: string;
  profile: string;
  summary: string;
  resumeHref: string;
  resumeNote: string;
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
  projects: Project[];
  experience: PortfolioExperience[];
  skills: { area: string; items: string[]; description?: string; projects?: string[] }[];
  assistants: string[];
  process: { title: string; description: string }[];
  socials: { label: string; href: string; value: string }[];
};
