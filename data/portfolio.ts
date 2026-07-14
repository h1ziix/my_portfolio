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
    name: "Sultan",
    displayName: "SULTAN",
    title: "Fullstack & AI Engineer",
    positioning: "AI-Native Fullstack Developer",
    experience: "Approximately 2 years of practical development experience",
    location: "Almaty, Kazakhstan",
    availability: "Available for opportunities",
    profile:
      "I build web products, backend systems, AI-powered features, internal tools and business-process automations.",
    summary:
      "Fullstack & AI Engineer focused on production-ready web products, backend systems and AI-powered automation."
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "AI Workflow", href: "#ai-workflow" },
    { label: "Contact", href: "#contact" }
  ],
  heroMeta: ["~2 years building", "Almaty, Kazakhstan", "Open to remote / hybrid"],
  approach: [
    "Understand the business problem",
    "Decompose the system",
    "Design the architecture",
    "Build with AI acceleration",
    "Validate, test, refine",
    "Ship and iterate"
  ],
  experience: [
    {
      company: "KazEcoFood",
      role: "Fullstack Developer / Automation Engineer",
      period: "Current experience",
      description:
        "Delivered internal tools, automation flows, dashboards and backend logic for document-heavy operational workflows.",
      facts: [
        "Analyzed internal business processes and repetitive manual operations",
        "Worked with 14 document templates and document-heavy workflows",
        "Created internal tools, web interfaces and dashboards",
        "Implemented backend logic, database work and API integrations",
        "Integrated external services and improved workflow consistency",
        "Delivered solutions from business problem to working implementation"
      ],
      capabilities: [
        "Automation",
        "Internal systems",
        "Document workflows",
        "Dashboards",
        "APIs",
        "Databases",
        "Integrations",
        "End-to-end delivery"
      ]
    }
  ],
  projects: [
    {
      name: "XEAL",
      category: "Web Product / Fullstack Project",
      description:
        "A polished product-facing web project shaped around clear presentation, frontend execution, integrations and production-oriented delivery.",
      url: "https://relate-xeal.webflow.io/",
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
