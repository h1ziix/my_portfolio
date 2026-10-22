import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  person: {
    name: "Toksoz Sultan",
    displayName: "TOKSOZ SULTAN",
    title: "Full-stack developer",
    positioning: "Full-stack development, AI and automation",
    experience: "2.5 years of development experience",
    location: "Almaty, Kazakhstan",
    workFormat: "Remote or hybrid",
    availability: "Open to full-stack, AI and automation roles",
    profile:
      "I turn complex workflows into web products: from the interface and APIs to the database, background jobs and deployment.",
    summary: "From idea to working product.",
    resumeHref: "/resume/toksoz-sultan-resume.pdf",
    resumeNote: "PDF, in Russian"
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ],
  projects: [
    {
      slug: "agentic-ops",
      name: "Agentic Ops",
      subtitle: "AI sales operations",
      summary:
        "A workspace that turns a sales goal into company research, qualified leads and outreach drafts. Nothing is sent until a person approves it.",
      hierarchy: "featured",
      role: "Full-stack development, agent architecture and the operations interface",
      technologies: [
        "TypeScript",
        "Next.js",
        "PostgreSQL",
        "Supabase",
        "Zod",
        "Gemini",
        "Tavily",
        "Trigger.dev"
      ],
      state: {
        tone: "live",
        label: "Live demo",
        note: "Release 1.0 candidate. The demo runs on fictional records and sends nothing."
      },
      links: {
        caseStudy: "/work/agentic-ops",
        demo: "https://agentic-ops-gold.vercel.app/demo/dashboard",
        source: "https://github.com/h1ziix/Agentic-Ops"
      },
      media: [
        {
          type: "video",
          src: "/projects/agentic-ops/presentation.mp4",
          poster: "/projects/agentic-ops/poster.webp",
          alt: "Agentic Ops product presentation: research, lead scoring, outreach and human approval",
          duration: "1:30",
          captions: "/projects/agentic-ops/captions.ru.vtt",
          transcript: "/projects/agentic-ops/transcript.ru.txt",
          width: 1920,
          height: 1080,
          caption: "Product film. Russian narration and captions. Fictional demo records; no external actions."
        },
        {
          type: "image",
          src: "/projects/agentic-ops-demo.png",
          alt: "Agentic Ops dashboard displaying its labelled fictional sample workspace",
          width: 1440,
          height: 1000,
          caption: "The public sample workspace, with fictional records."
        }
      ],
      features: [
        "Research with cited sources, then lead scoring",
        "Typed agents whose workflow state is saved between steps",
        "Approval and execution are separate steps, so what runs is exactly what was approved"
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
      slug: "atu-campus",
      name: "ATU Campus",
      subtitle: "University learning platform",
      summary:
        "A university workspace for students and teachers: schedules, course materials, assignments, grades and communication in one responsive PWA.",
      hierarchy: "featured",
      role: "Product architecture, interface, API, database and background processing",
      technologies: ["TypeScript", "Next.js", "NestJS", "Python", "PostgreSQL", "Prisma", "Redis", "Docker"],
      state: {
        tone: "building",
        label: "Demo project",
        note: "Built with synthetic data. An independent project, awaiting a university pilot."
      },
      links: { caseStudy: "/work/atu-campus" },
      media: [
        {
          type: "video",
          src: "/projects/atu-campus/presentation.mp4",
          poster: "/projects/atu-campus/poster.webp",
          alt: "ATU Campus presentation showing student and teacher workflows and a future AI review concept",
          duration: "1:54",
          captions: "/projects/atu-campus/captions.ru.vtt",
          transcript: "/projects/atu-campus/transcript.ru.txt",
          width: 1920,
          height: 1080,
          caption: "Demo walkthrough. Russian narration and captions. The AI grading segment is a future feature concept."
        }
      ],
      features: [
        "Separate student and teacher workflows, in Russian and Kazakh",
        "Private assignment submissions, feedback, grades and attendance",
        "Typed API, queued file processing and isolated Python document parsing"
      ],
      limitations: [
        "No official university endorsement, live institutional integration or real student pilot yet.",
        "The AI grading segment in the video is a concept. Live AI provider and quality acceptance remain pending."
      ]
    },
    {
      slug: "kazecofood",
      name: "KazEcoFood",
      subtitle: "Internal document automation",
      summary:
        "An internal platform for workplace assessments. It keeps organization, workplace and measurement data in one place, validates it and exports the regulated DOCX packages.",
      hierarchy: "major",
      role: "Sole developer: requirements, interface, backend, data and delivery",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Zod",
        "Vitest"
      ],
      state: {
        tone: "live",
        label: "In production",
        note: "Internal tool. The source is public."
      },
      links: {
        source: "https://github.com/h1ziix/KazFoodV2"
      },
      media: [],
      features: [
        "13 document types",
        "Shared fields and workplaces stay in sync across documents",
        "Validation and batch DOCX export"
      ],
      outcomes: [
        {
          value: "20–25 before, 100–200 after",
          label: "Documents per day",
          basis: "The assessment team's daily output before and after the platform."
        },
        {
          value: "About 2,000",
          label: "Employees covered",
          basis: "People whose workplaces go through these assessments."
        },
        {
          value: "70+",
          label: "Automated tests",
          basis: "They cover the business rules behind the documents."
        }
      ]
    },
    {
      slug: "campusforge",
      name: "CampusForge",
      subtitle: "AI study workspace",
      summary:
        "A workspace for study documents, notes and events, with AI summaries in short and expanded form.",
      hierarchy: "supporting",
      role: "Product architecture, frontend and backend integration, AI workflow design",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Playwright", "Docker"],
      state: {
        tone: "building",
        label: "In development",
        note: "Not production-ready yet. The source is public."
      },
      links: { source: "https://github.com/h1ziix/CampusForge" },
      media: [
        {
          type: "video",
          src: "/projects/campusforge-preview.mp4",
          alt: "CampusForge educational workspace video preview"
        }
      ],
      features: ["Documents, notes and events", "Concise and expanded AI outputs"]
    },
    {
      slug: "stratweb",
      name: "StratWeb",
      subtitle: "CS2 match analytics",
      summary:
        "A scouting tool for Counter-Strike 2 teams. It parses finished match demos and finds team and player habits that repeat, each one traceable to the matches and rounds it came from.",
      hierarchy: "featured",
      role: "Own project: demo parsing, analytics engine and scouting reports",
      technologies: ["Python", "JavaScript", "FastAPI", "DuckDB", "Polars", "Docker", "pytest"],
      state: {
        tone: "building",
        label: "In development",
        note: "An independent project in local development. The source is public."
      },
      links: { caseStudy: "/work/stratweb", source: "https://github.com/h1ziix/StratWeb" },
      media: [
        {
          type: "video",
          src: "/projects/stratweb/presentation.mp4",
          poster: "/projects/stratweb/poster.webp",
          alt: "StratWeb showreel: CS2 match analysis, tactical patterns, round playback and scouting reports",
          duration: "0:46",
          width: 1920,
          height: 1080,
          caption: "A short product showreel with the native Russian interface. Music, no narration."
        }
      ],
      features: ["Demo parsing and match reconstruction", "Cross-match pattern detection", "Scouting reports"],
      limitations: ["Independent recommendation-quality acceptance is still pending."]
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
      state: { tone: "live", label: "Live client site" },
      links: { site: "https://relate-xeal.webflow.io/" },
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
      slug: "i-like-yogurt",
      name: "I Like & Yogurt",
      subtitle: "Commercial React website",
      summary:
        "A responsive business website with contact links and opening-status logic.",
      hierarchy: "supporting",
      role: "Frontend implementation, responsive UX and business logic",
      technologies: ["React"],
      state: { tone: "closed", label: "Client site", note: "Available on request." },
      links: { access: "#contact" },
      media: [
        {
          type: "video",
          src: "/projects/i-like-yogurt-preview.mp4",
          alt: "I Like & Yogurt business website video preview"
        }
      ],
      features: ["Responsive business information", "Contact links", "Opening-status logic"]
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
      area: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL"],
      description: "Typed product code, browser interactions, document processing and data analysis.",
      projects: ["agentic-ops", "atu-campus", "stratweb"]
    },
    {
      area: "Product interfaces",
      items: ["React", "Next.js", "Tailwind CSS", "Responsive PWA"],
      description: "Operational dashboards and interfaces built around real user workflows.",
      projects: ["agentic-ops", "atu-campus"]
    },
    {
      area: "Backend & data",
      items: ["Node.js", "NestJS", "FastAPI", "PostgreSQL", "Prisma", "Supabase", "DuckDB"],
      description: "APIs, relational models, access control and analytical data pipelines.",
      projects: ["atu-campus", "stratweb", "kazecofood"]
    },
    {
      area: "AI & automation",
      items: ["Gemini", "OpenAI API", "Tavily", "Zod", "Agent orchestration", "Human approval", "DOCX generation"],
      description: "Research with sources, validated outputs and explicit approval before execution.",
      projects: ["agentic-ops", "kazecofood"]
    },
    {
      area: "Infrastructure & quality",
      items: ["Redis", "BullMQ", "S3", "Docker", "Trigger.dev", "Git", "Playwright", "Vitest", "pytest"],
      description: "Background workers, file storage, reproducible environments and automated checks.",
      projects: ["atu-campus", "agentic-ops", "stratweb"]
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
