import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Box,
  FileText,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

const sectionConfig: Record<
  string,
  {
    title: string
    eyebrow: string
    description: string
    icon: LucideIcon
    primaryHref: string
    primaryLabel: string
  }
> = {
  dashboard: {
    title: "Admin Dashboard",
    eyebrow: "Studio overview",
    description:
      "A command view for content operations, engagement signals, QA status, and editorial readiness.",
    icon: LayoutDashboard,
    primaryHref: "/admin/analytics",
    primaryLabel: "View analytics",
  },
  users: {
    title: "Users",
    eyebrow: "Audience management",
    description:
      "A production implementation would connect Cognito groups, consent state, and program membership here.",
    icon: Users,
    primaryHref: "/admin/content",
    primaryLabel: "Manage content",
  },
  programs: {
    title: "Programs",
    eyebrow: "Learning pathways",
    description:
      "Group micro-exercises into campus programs, cohorts, or wellbeing initiatives.",
    icon: Box,
    primaryHref: "/admin/content",
    primaryLabel: "Open CMS",
  },
  tools: {
    title: "Tools",
    eyebrow: "Practice library",
    description:
      "Review the user-facing tools and make sure each practice has clear outcomes and safe copy.",
    icon: Sparkles,
    primaryHref: "/app",
    primaryLabel: "Open app",
  },
  collections: {
    title: "Collections",
    eyebrow: "Content bundles",
    description:
      "Organize practices by need state, topic, and program objective before publishing.",
    icon: Grid2X2,
    primaryHref: "/admin/content",
    primaryLabel: "Curate content",
  },
  feedback: {
    title: "Feedback",
    eyebrow: "User signals",
    description:
      "Centralize feedback, helpful votes, and qualitative notes from reflection and practice flows.",
    icon: MessageSquare,
    primaryHref: "/admin/qa",
    primaryLabel: "Open QA tracker",
  },
  reviews: {
    title: "Reviews",
    eyebrow: "Editorial review",
    description:
      "Track content accuracy, accessibility, tone, and readiness before publishing.",
    icon: ShieldCheck,
    primaryHref: "/admin/content",
    primaryLabel: "Review content",
  },
  messages: {
    title: "Messages",
    eyebrow: "Communication",
    description:
      "A future message center for announcements, nudges, and support operations.",
    icon: BookOpen,
    primaryHref: "/app/reflection",
    primaryLabel: "Open reflection",
  },
  settings: {
    title: "Settings",
    eyebrow: "Studio configuration",
    description:
      "Authentication providers, roles, content rules, and organization defaults belong here.",
    icon: Settings,
    primaryHref: "/admin/content",
    primaryLabel: "Back to CMS",
  },
  integrations: {
    title: "Integrations",
    eyebrow: "Connected systems",
    description:
      "Future integrations can include AWS Cognito, GitHub Issues, Notion, analytics exports, and AI providers.",
    icon: Gauge,
    primaryHref: "/admin/qa",
    primaryLabel: "Review tickets",
  },
  "audit-logs": {
    title: "Audit Logs",
    eyebrow: "Operational trace",
    description:
      "Track publishing events, role changes, moderation decisions, and QA transitions.",
    icon: FileText,
    primaryHref: "/admin/analytics",
    primaryLabel: "View metrics",
  },
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const config = sectionConfig[section] ?? sectionConfig.dashboard
  const Icon = config.icon

  return (
    <main className="min-h-screen bg-[#090908] px-6 py-8 text-[#eee6d8]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/content"
          className="inline-flex h-11 items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-[#d7cdbc]"
        >
          <ArrowLeft className="size-4" /> Back to Content Studio
        </Link>
        <section className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-10">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b]">
            {config.eyebrow}
          </div>
          <Icon className="mt-10 size-12 text-[#e65e48]" />
          <h1 className="mt-6 font-[Georgia] text-6xl leading-none text-[#f1e6d6]">
            {config.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b7afa4]">
            {config.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={config.primaryHref}
              className="inline-flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black"
            >
              {config.primaryLabel} <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/admin/qa"
              className="inline-flex h-12 items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-6 text-sm text-[#d8cebd]"
            >
              QA tracker
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
