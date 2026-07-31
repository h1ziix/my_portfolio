import {
  Bot,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Mail,
  MessageCircle,
  Server,
  Workflow
} from "lucide-react";

export const portfolio = {
  person: {
    name: "Toksoz Sultan",
    displayName: "TOKSOZ SULTAN",
    title: "Fullstack Developer / Automation & AI Integrations",
    positioning: "Fullstack Developer",
    experience: "2.5 years of development experience",
    age: "18 years old",
    location: "Almaty, Kazakhstan",
    availability: "Available for opportunities",
    profile:
      "I build web products, backend systems and internal tools that automate complex business processes.",
    summary:
      "Fullstack developer focused on production web products, internal systems, document automation and practical AI integrations.",
    resumeHref: "/resume/toksoz-sultan-resume.pdf"
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "AI Workflow", href: "#ai-workflow" },
    { label: "Contact", href: "#contact" }
  ],
  heroMeta: ["18 years old", "2.5 years experience", "Remote / hybrid · Almaty"],
  approach: [
    "Understand the business problem",
    "Decompose the system",
    "Design the architecture",
    "Implement end to end",
    "Validate, test, refine",
    "Ship and iterate"
  ],
  experience: [
    {
      company: "KazEcoFood",
      role: "Fullstack Developer / Automation Engineer",
      period: "Current role",
      description:
        "Built an internal fullstack platform from scratch for workplace assessment workflows and regulated DOCX document generation.",
      facts: [
        "Covered the full product cycle: requirements, UX, frontend, backend, data model, testing and deployment",
        "Centralized projects, workplace data and measurements across 13 protocol types",
        "Implemented authentication, Supabase storage, autosave and save-conflict handling",
        "Automated shared fields, workplace synchronization, validation and DOCX batch export",
        "Supported assessment workflows covering approximately 2,000 employees",
        "Increased daily document throughput from 20–25 to 100–200"
      ],
      capabilities: [
        "13 protocol types",
        "~2,000 employees",
        "4–8× throughput",
        "70+ automated tests",
        "Supabase RLS",
        "DOCX generation",
        "Data synchronization",
        "End-to-end ownership"
      ]
    }
  ],
  projects: [
    {
      name: "KazEcoFood",
      category: "Flagship Case / Internal Operations",
      description:
        "A production document automation platform for workplace assessment. It centralizes organization, workplace and measurement data, synchronizes them across regulated protocols, validates technical fields and generates complete DOCX packages.",
      impact:
        "Built from scratch and used in workflows covering approximately 2,000 employees. Daily document throughput grew from 20–25 to 100–200 — a 4–8× operational improvement.",
      url: "https://github.com/h1ziix/KazFoodV2",
      linkLabel: "View source & architecture",
      role: "Sole Fullstack Developer — product, frontend, backend, data and delivery",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Zod",
        "Vitest"
      ],
      focus: [
        "~2,000 employees in scope",
        "13 protocol types",
        "4–8× daily throughput",
        "DOCX batch generation",
        "70+ automated tests",
        "End-to-end ownership"
      ],
      previewKind: "operations",
      previewStats: [
        { value: "13", label: "Protocol types" },
        { value: "4–8×", label: "Daily throughput" },
        { value: "~2K", label: "Employees covered" },
        { value: "70+", label: "Automated tests" }
      ]
    },
    {
      name: "XEAL",
      category: "Web Product / Fullstack Project",
      description:
        "A public product website delivered with responsive frontend implementation, product-focused presentation and integration support.",
      url: "https://relate-xeal.webflow.io/",
      linkLabel: "Open live project",
      role: "Frontend implementation, product thinking, integration support",
      stack: ["Webflow", "Frontend", "Responsive UI", "Integrations"],
      focus: [
        "Product thinking",
        "Frontend implementation",
        "Polished UI",
        "Integrations",
        "Production-oriented delivery"
      ],
      previewKind: "commerce",
      previewAsset: "/projects/xeal-preview.mp4",
      previewType: "video",
      previewAlt: "XEAL product video preview",
      imageTodo: "TODO: Add project screenshot to public/projects/xeal.png"
    },
    {
      name: "CampusForge",
      category: "AI / Education / SaaS",
      description:
        "An AI-oriented educational platform designed around documents, notes, events and structured knowledge workflows.",
      url: "#contact",
      linkLabel: "Request project access",
      role: "Product architecture, frontend/backend integration, AI workflow design",
      stack: ["Next.js", "TypeScript", "AI Workflows", "Documents", "Structured Data"],
      focus: [
        "AI workflows",
        "Document context",
        "Structured information",
        "Concise and expanded AI outputs",
        "Scalable structure"
      ],
      previewKind: "knowledge",
      previewAsset: "/projects/campusforge-preview.mp4",
      previewType: "video",
      previewAlt: "CampusForge product video preview",
      imageTodo: "TODO: Add project screenshot to public/projects/campusforge.png"
    },
    {
      name: "I Like & Yogurt",
      category: "Commercial Web Product",
      description:
        "A commercial web product built around responsive interface work, business requirements, contact paths and maintainable frontend structure.",
      url: "#contact",
      linkLabel: "Request project access",
      role: "Frontend implementation, responsive UX, business logic",
      stack: ["React", "Responsive UI", "Business Logic", "Contact Integrations"],
      focus: [
        "Responsive UI",
        "Real business requirements",
        "Links and contact integrations",
        "Opening/closing status logic",
        "Polished visual identity",
        "Maintainable frontend"
      ],
      previewKind: "retail",
      previewAsset: "/projects/i-like-yogurt-preview.mp4",
      previewType: "video",
      previewAlt: "I Like & Yogurt product video preview",
      imageTodo: "TODO: Add project screenshot to public/projects/i-like-yogurt.png"
    }
  ],
  stack: [
    {
      area: "Frontend",
      icon: Code2,
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"]
    },
    {
      area: "Backend",
      icon: Server,
      items: ["Node.js", "REST API", "Python", "SQL"]
    },
    {
      area: "Data",
      icon: Database,
      items: ["PostgreSQL", "Supabase", "MySQL"]
    },
    {
      area: "Infra / Tools",
      icon: GitBranch,
      items: ["Git", "GitHub", "Docker", "CI/CD"]
    },
    {
      area: "AI",
      icon: BrainCircuit,
      items: [
        "Codex",
        "ChatGPT",
        "Claude Code",
        "Anthropic API",
        "OpenAI API",
        "LLM Integration",
        "AI Workflows"
      ]
    }
  ],
  aiWorkflow: [
    {
      label: "Context",
      body: "Understand requirements and inspect the codebase"
    },
    {
      label: "Decompose",
      body: "Break complex tasks into verifiable units"
    },
    {
      label: "Architect",
      body: "Define interfaces, data flow and constraints"
    },
    {
      label: "Build",
      body: "Use AI tools to accelerate implementation"
    },
    {
      label: "Verify",
      body: "Review generated code, edge cases, security and performance"
    },
    {
      label: "Ship",
      body: "Test, integrate and deliver production-ready changes"
    }
  ],
  agentLines: [
    "inspect codebase",
    "map dependencies",
    "propose architecture",
    "implement incrementally",
    "run checks",
    "inspect failures",
    "refactor",
    "ship"
  ],
  toolkit: [
    { label: "Daily Workflow", value: "Codex / Claude Code / ChatGPT", icon: Bot },
    { label: "Core", value: "TypeScript / Node.js / Next.js", icon: Layers3 },
    { label: "Data", value: "PostgreSQL / Supabase", icon: Database },
    { label: "AI", value: "LLM APIs / AI Integrations", icon: BrainCircuit },
    { label: "Focus", value: "Automation / Products / Backend / AI", icon: Workflow }
  ],
  socials: [
    {
      label: "Email",
      href: "mailto:toksozzsultan@icloud.com",
      value: "toksozzsultan@icloud.com",
      icon: Mail,
      isTodo: false
    },
    {
      label: "Telegram",
      href: "https://t.me/conf1denc",
      value: "@conf1denc",
      icon: MessageCircle,
      isTodo: false
    },
    {
      label: "GitHub",
      href: "https://github.com/h1ziix",
      value: "https://github.com/h1ziix",
      icon: GitBranch,
      isTodo: false
    }
  ]
} as const;

export type Project = (typeof portfolio.projects)[number];
