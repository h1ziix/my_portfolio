import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  person: {
    name: "Toksoz Sultan",
    displayName: "TOKSOZ SULTAN",
    title: "AI Product Developer",
    positioning: "AI Product Developer",
    experience: "2.5 years of development experience",
    location: "Almaty, Kazakhstan",
    availability: "Available for opportunities",
    profile:
      "I build web products, backend systems and internal tools that automate complex business processes.",
    summary:
      "Full-stack AI products, from interfaces and data to research, integrations, human approvals and controlled actions.",
    resumeHref: "/resume/toksoz-sultan-resume.pdf"
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" }
  ],
  heroMeta: ["Full-stack", "Agentic AI", "Automation"],
  projects: [
    {
      slug: "agentic-ops",
      name: "Agentic Ops",
      subtitle: "Agentic AI sales operations",
      summary:
        "A full-stack workspace that turns sales goals into company research, lead qualification and outreach drafts, with human approval before separate execution.",
      hierarchy: "featured",
      role: "Full-stack development, agent architecture and operational UI",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Zod",
        "Gemini",
        "Tavily",
        "Trigger.dev"
      ],
      releaseStatus: {
        label: "Release 1.0 candidate",
        description:
          "Deployed application; full integration, worker and external-execution acceptance remains in progress."
      },
      accessStatus: {
        label: "Public sample demo",
        description:
          "Fictional records. The demo makes no paid AI calls, sends no email and performs no CRM writes."
      },
      links: {
        demo: "https://agentic-ops-gold.vercel.app/demo/dashboard",
        source: "https://github.com/h1ziix/Agentic-Ops"
      },
      media: [
        {
          type: "image",
          src: "/projects/agentic-ops-demo.png",
          alt: "Agentic Ops dashboard displaying its labelled fictional sample workspace",
          width: 1440,
          height: 1000,
          caption: "Public sample workspace · fictional records"
        }
      ],
      features: [
        "Cited research and lead qualification",
        "Typed agents with persisted workflow state",
        "Exact approval followed by separate execution"
      ],
      limitations: [
        "Full Gmail, HubSpot and durable-worker acceptance remains pending.",
        "Sample records do not represent customer outcomes or live provider execution."
      ],
      evidence: [
        {
          label: "Source, architecture and release status",
          source: "https://github.com/h1ziix/Agentic-Ops"
        },
        {
          label: "Deployment and acceptance boundaries",
          source:
            "https://github.com/h1ziix/Agentic-Ops/blob/main/docs/deployment-progress.md"
        }
      ]
    },
    {
      slug: "kazecofood",
      name: "KazEcoFood",
      subtitle: "Internal document automation",
      summary:
        "An internal workplace-assessment platform that synchronizes organization, workplace and measurement data, validates fields and exports regulated DOCX packages.",
      hierarchy: "major",
      role: "Sole Fullstack Developer — product, frontend, backend, data and delivery",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Zod",
        "Vitest"
      ],
      releaseStatus: {
        label: "Internal production tool",
        description: "Used in workplace-assessment operations, as reported by the developer."
      },
      accessStatus: {
        label: "Public source",
        description: "The operational workspace is internal; the source repository is public."
      },
      links: {
        source: "https://github.com/h1ziix/KazFoodV2"
      },
      media: [],
      features: [
        "13 document types",
        "Shared-field and workplace synchronization",
        "Validation and DOCX batch generation"
      ],
      outcomes: [
        {
          value: "20–25 → 100–200",
          label: "Documents per day",
          basis: "Developer-reported operational throughput."
        },
        {
          value: "~2,000",
          label: "Employees in assessment scope",
          basis: "Developer-reported workflow scope."
        },
        {
          value: "70+",
          label: "Authored automated tests",
          basis: "Test declarations found in source; this is not a claim of a verified test run."
        }
      ]
    },
    {
      slug: "xeal",
      name: "XEAL",
      subtitle: "Commercial Webflow website",
      summary:
        "A responsive product website for XEAL, with frontend implementation and integration support.",
      hierarchy: "supporting",
      role: "Frontend implementation and integration support",
      technologies: ["Webflow"],
      releaseStatus: { label: "Live website" },
      accessStatus: { label: "Public website" },
      links: { demo: "https://relate-xeal.webflow.io/" },
      media: [
        {
          type: "video",
          src: "/projects/xeal-preview.mp4",
          alt: "XEAL product website video preview"
        }
      ],
      features: ["Responsive product presentation", "Frontend integration support"]
    },
    {
      slug: "campusforge",
      name: "CampusForge",
      subtitle: "AI-assisted educational workspace",
      summary:
        "An educational platform for documents, notes and events, with structured AI knowledge workflows.",
      hierarchy: "supporting",
      role: "Product architecture, frontend/backend integration and AI workflow design",
      technologies: ["Next.js", "TypeScript"],
      releaseStatus: { label: "Release status not documented" },
      accessStatus: { label: "Access on request" },
      links: { access: "#contact" },
      media: [
        {
          type: "video",
          src: "/projects/campusforge-preview.mp4",
          alt: "CampusForge educational workspace video preview"
        }
      ],
      features: ["Documents, notes and events", "Concise and expanded AI outputs"],
      limitations: ["Public source and demo access are not supplied in the current project material."]
    },
    {
      slug: "i-like-yogurt",
      name: "I Like & Yogurt",
      subtitle: "Commercial React website",
      summary:
        "A responsive business website with contact links and opening-status logic.",
      hierarchy: "supporting",
      role: "Frontend implementation, responsive UX and business logic",
      technologies: ["React"],
      releaseStatus: { label: "Release status not documented" },
      accessStatus: { label: "Access on request" },
      links: { access: "#contact" },
      media: [
        {
          type: "video",
          src: "/projects/i-like-yogurt-preview.mp4",
          alt: "I Like & Yogurt business website video preview"
        }
      ],
      features: ["Responsive business information", "Contact links", "Opening-status logic"],
      limitations: ["Public source and demo access are not supplied in the current project material."]
    }
  ],
  experience: [
    {
      company: "KazEcoFood",
      role: "Fullstack Developer / Automation Engineer",
      period: "Current role",
      responsibilities: [
        "Owned requirements, UX, frontend, backend, data modelling, testing and deployment of an internal assessment platform.",
        "Implemented authentication, Supabase storage, autosave and save-conflict handling.",
        "Automated shared-field synchronization, validation and DOCX batch export for workplace-assessment teams."
      ]
    }
  ],
  skills: [
    {
      area: "Frontend",
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"]
    },
    {
      area: "Backend & Data",
      items: ["Node.js", "Python", "SQL", "PostgreSQL", "Supabase", "MySQL"]
    },
    {
      area: "AI / Agents",
      items: [
        "Typed agent orchestration",
        "Structured output validation",
        "Evidence-backed research",
        "Human approval boundaries",
        "Gemini",
        "OpenAI API",
        "Anthropic API"
      ]
    },
    {
      area: "Automation & Integrations",
      items: ["REST APIs", "Tavily", "Gmail / HubSpot OAuth", "Trigger.dev", "DOCX generation", "Data synchronization"]
    },
    {
      area: "Tools & Delivery",
      items: ["Git", "GitHub", "Docker", "CI/CD", "Vitest", "Automated testing"]
    }
  ],
  assistants: ["Codex", "Claude Code", "ChatGPT"],
  process: [
    {
      title: "Understand",
      description: "Map the business workflow, inspect existing code and define the data and constraints."
    },
    {
      title: "Build",
      description: "Design the interfaces and architecture, then implement end to end with AI-assisted development."
    },
    {
      title: "Verify",
      description: "Review changes myself and check behavior, edge cases, security and performance."
    },
    {
      title: "Ship",
      description: "Test, integrate and deploy, then refine the system from real usage."
    }
  ],
  socials: [
    {
      label: "Email",
      href: "mailto:toksozzsultan@icloud.com",
      value: "toksozzsultan@icloud.com"
    },
    {
      label: "Telegram",
      href: "https://t.me/conf1denc",
      value: "@conf1denc"
    },
    {
      label: "GitHub",
      href: "https://github.com/h1ziix",
      value: "github.com/h1ziix"
    }
  ]
};
