import type { ProjectCaseStudy } from "@/types/portfolio";

/** Existing detailed evidence, ready for later case-study work; no routes are implied. */
export const projectCaseStudies: Partial<Record<string, ProjectCaseStudy>> = {
  kazecofood: {
    problem:
      "Workplace-assessment teams need consistent organization, workplace and measurement data across regulated documents, with validation and complete DOCX packages.",
    contribution: [
      "Built the internal full-stack platform from scratch and owned requirements, UX, frontend, backend, data modelling, testing and deployment.",
      "Centralized project, workplace and measurement data across the document workflow.",
      "Implemented authentication, Supabase storage, autosave and save-conflict handling.",
      "Automated shared fields, workplace synchronization, technical-field validation and DOCX batch export.",
      "Used Supabase RLS for access control."
    ],
    features: [
      "13 document types, including cover, introduction and conclusion entries",
      "Shared organization and workplace data",
      "Measurement data synchronization",
      "Technical-field validation",
      "DOCX package generation"
    ],
    outcomes: [
      {
        value: "~2,000",
        label: "Employees covered by assessment workflows",
        basis: "Developer-reported operational scope; no independent measurement supplied."
      },
      {
        value: "20–25 → 100–200",
        label: "Daily document throughput",
        basis: "Developer-reported before/after counts; measurement period and comparison basis are not supplied."
      },
      {
        value: "70+",
        label: "Authored automated tests",
        basis: "The portfolio audit found 71 test declarations in nine files; it did not run them."
      }
    ],
    limitations: [
      "The operational workspace is internal and has no supplied public demo URL.",
      "Business outcomes are reported by the developer and have not been independently measured in the portfolio audit.",
      "The repository's older ARCHITECTURE.md does not describe all of the current implementation."
    ],
    evidence: [
      { label: "Source repository", source: "https://github.com/h1ziix/KazFoodV2" },
      {
        label: "Document registry",
        source: "https://github.com/h1ziix/KazFoodV2/blob/main/src/lib/docs/registry.ts"
      }
    ]
  }
};
