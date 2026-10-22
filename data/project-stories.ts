export const projectStorySlugs = ["agentic-ops", "atu-campus", "stratweb"] as const;

export type ProjectStorySlug = (typeof projectStorySlugs)[number];

type ProjectStory = {
  problem: string;
  architecture: { title: string; description: string }[];
  decisions: { title: string; description: string }[];
};

/** The longer product story; shared facts, media and status live in portfolio.ts. */
export const projectStories = {
  "agentic-ops": {
    problem:
      "Sales research involves more than generating a message. A useful system needs to carry the goal, company evidence and qualification through to a draft that an operator can inspect and approve. I built one workspace for that complete workflow.",
    architecture: [
      {
        title: "Define the goal",
        description:
          "The Next.js interface captures a sales goal, targeting criteria and an optional saved customer profile. A typed planner turns that input into tasks with explicit dependencies."
      },
      {
        title: "Research and qualify",
        description:
          "Tavily supplies source evidence. Gemini agents research companies, score opportunities and review the findings. Zod validates their structured outputs before the workflow moves forward."
      },
      {
        title: "Prepare and approve",
        description:
          "An outreach agent prepares a draft. The operator can inspect the sources and edit the message, then approve its exact revision, recipient and connected account."
      },
      {
        title: "Execute and keep context",
        description:
          "A separate execution request goes to a deterministic executor. Supabase PostgreSQL stores workflow state and activity; the Trigger.dev integration supports scheduled continuation and fresh follow-up proposals."
      }
    ],
    decisions: [
      {
        title: "Approval belongs to an exact action",
        description:
          "Approval freezes the content and recipient. An edit creates a new revision that needs approval again, and execution remains a separate step. This makes the operator's decision visible in both the interface and the backend."
      },
      {
        title: "Progress survives individual agent runs",
        description:
          "The orchestrator owns persisted workflow state. Typed services, validated outputs and saved activity make it possible to resume work and understand which step produced a result."
      },
      {
        title: "Evidence stays next to the decision",
        description:
          "Company research carries its sources into qualification and review. The workspace exposes tasks, citations, drafts and activity so a person can judge a proposal before taking action."
      },
      {
        title: "A useful demo without setup",
        description:
          "The public showcase uses labelled fictional records and browser-only decisions. Reviewers can explore a complete workflow without signing in, paying for model calls or sending a real message."
      }
    ]
  },
  "atu-campus": {
    problem:
      "Students and teachers need a clear path from the timetable to course materials, assignments and feedback. I built a responsive university workspace that connects these everyday tasks, backed by a shared academic data model and separate role-based workflows.",
    architecture: [
      {
        title: "One interface, different responsibilities",
        description:
          "A Next.js and React PWA provides Russian and Kazakh interfaces for students, teachers and administrators. Student study flows and teacher publishing tools share one design system."
      },
      {
        title: "A typed academic API",
        description:
          "NestJS handles schedules, materials, assignments, grades, attendance and chat. An OpenAPI-generated client connects the interface to the API; Better Auth sessions and server-side permissions control access."
      },
      {
        title: "Keep academic records connected",
        description:
          "PostgreSQL and Prisma model courses, groups, teaching assignments and enrolments. Published material versions, private submissions and feedback retain their relationship to the correct course and user."
      },
      {
        title: "Process files outside the request",
        description:
          "Private files use S3 storage. Redis and BullMQ coordinate background processing, while an isolated Python parser extracts bounded content from PDF and Office documents. Docker packages the supporting services."
      }
    ],
    decisions: [
      {
        title: "Model access around the course",
        description:
          "A student's enrolment and a teacher's assignment determine the records they can access. Permissions are enforced by the API, including when a private file is downloaded."
      },
      {
        title: "Make publishing and submission explicit",
        description:
          "Teachers publish material and assignment versions; students submit a specific attempt and receive a server receipt. Feedback and grades have their own publication step, keeping drafts separate from what students see."
      },
      {
        title: "Preserve work through interruptions",
        description:
          "Draft protection, explicit conflict resolution and retry handling help keep edits intact through navigation and failed requests. These states are part of the interface, alongside the successful path."
      },
      {
        title: "Build for both a phone and a teaching desk",
        description:
          "The same product supports a student's mobile timetable and a teacher's wider workspace. Shared components, RU/KK dictionaries and a typed client keep the experience consistent across those views."
      }
    ]
  },
  stratweb: {
    problem:
      "Preparing for an opponent means reviewing many completed matches. I built an offline workspace that turns CS2 demo files into repeatable observations, with every finding linked to the matches and rounds behind it.",
    architecture: [
      {
        title: "Import completed matches",
        description:
          "A demoparser2 adapter converts .dem files into a versioned canonical dataset. Validation runs before the match is saved to DuckDB."
      },
      {
        title: "Reconstruct each round",
        description:
          "Deterministic gameplay, temporal and spatial engines reconstruct events and player state. A 2D viewer connects the analysis to map positions and the round timeline."
      },
      {
        title: "Find repeated habits",
        description:
          "Per-round tactical facts become team and player patterns across matches. Each observation retains its sample size, source availability and supporting rounds."
      },
      {
        title: "Prepare the scouting report",
        description:
          "A FastAPI workspace with Jinja templates and JavaScript exposes findings, map and timeline evidence, scouting reports and JSON, PDF and print exports."
      }
    ],
    decisions: [
      {
        title: "Keep the parser behind a boundary",
        description:
          "A dedicated parser port isolates demoparser2 from the domain models and analytics. Parser-specific data is normalized before it enters the rest of the system."
      },
      {
        title: "Compute statistics with deterministic code",
        description:
          "Gameplay metrics, patterns and recommendations come from explicit rules. Their inputs and versions are saved so the same analysis can be reproduced."
      },
      {
        title: "Keep evidence attached to every observation",
        description:
          "Findings retain their match, round and source references, with links to the relevant map and timeline. Small samples and incomplete source data remain visible."
      },
      {
        title: "Preserve historical reports",
        description:
          "Reports pin their original source runs and versions. Later analysis creates a new report, while user annotations keep a separate revision."
      }
    ]
  }
} satisfies Record<ProjectStorySlug, ProjectStory>;
