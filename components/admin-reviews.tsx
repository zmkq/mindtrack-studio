"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronRight,
  Circle,
  Clock,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Search,
  ShieldCheck,
  XCircle,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"
import { Input } from "@/components/ui/input"

const avatars = ["/women_1.png", "/women_2.png"]

const demoReviews = [
  { title: "5-Minute Breathing Reset", author: "Dr. Emma Harper", stage: "approved", reviewer: "Sofia Delgado", score: 96, checks: 5, totalChecks: 5, updated: "2 hrs ago", avatar: 0 },
  { title: "Sleep Hygiene Checklist", author: "Liam Park", stage: "in-review", reviewer: "Dr. Emma Harper", score: 78, checks: 3, totalChecks: 5, updated: "4 hrs ago", avatar: 1 },
  { title: "Cognitive Restructuring Guide", author: "Sofia Delgado", stage: "in-review", reviewer: "Liam Park", score: 82, checks: 4, totalChecks: 5, updated: "6 hrs ago", avatar: 0 },
  { title: "Stress Journaling Prompt", author: "Dr. Emma Harper", stage: "needs-changes", reviewer: "Sofia Delgado", score: 61, checks: 2, totalChecks: 5, updated: "8 hrs ago", avatar: 1 },
  { title: "Gratitude Practice", author: "Liam Park", stage: "approved", reviewer: "Dr. Emma Harper", score: 94, checks: 5, totalChecks: 5, updated: "1 day ago", avatar: 0 },
  { title: "Mindful Walking Exercise", author: "Sofia Delgado", stage: "pending", reviewer: "—", score: 0, checks: 0, totalChecks: 5, updated: "1 day ago", avatar: 1 },
  { title: "Pomodoro Focus Session", author: "Liam Park", stage: "approved", reviewer: "Sofia Delgado", score: 91, checks: 5, totalChecks: 5, updated: "2 days ago", avatar: 0 },
  { title: "Body Scan Meditation", author: "Dr. Emma Harper", stage: "pending", reviewer: "—", score: 0, checks: 0, totalChecks: 5, updated: "2 days ago", avatar: 1 },
  { title: "Goal Setting Workshop", author: "Sofia Delgado", stage: "needs-changes", reviewer: "Dr. Emma Harper", score: 54, checks: 1, totalChecks: 5, updated: "3 days ago", avatar: 0 },
  { title: "Habit Tracker Setup", author: "Liam Park", stage: "in-review", reviewer: "Sofia Delgado", score: 75, checks: 3, totalChecks: 5, updated: "3 days ago", avatar: 1 },
]

const stageConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  pending: { label: "Pending", color: "#8f887d", icon: Clock },
  "in-review": { label: "In Review", color: "#d4874b", icon: Eye },
  "needs-changes": { label: "Needs Changes", color: "#e65e48", icon: XCircle },
  approved: { label: "Approved", color: "#a8c764", icon: CheckCircle },
}

export function AdminReviewsPanel() {
  const counts = {
    pending: demoReviews.filter((r) => r.stage === "pending").length,
    inReview: demoReviews.filter((r) => r.stage === "in-review").length,
    needsChanges: demoReviews.filter((r) => r.stage === "needs-changes").length,
    approved: demoReviews.filter((r) => r.stage === "approved").length,
  }

  return (
    <AdminShell
      activeItem="Reviews"
      searchPlaceholder="Search reviews, authors..."
      sidebarNote={{ title: "Editorial Review", subtitle: "Quality assured.\nTrust maintained." }}
      quickActions={["Start Review", "Export Report", "Review Guidelines"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Editorial review
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Reviews
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Track content accuracy, accessibility, tone, and readiness before
            publishing to ensure every piece meets quality standards.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <ShieldCheck className="size-4" /> Start Review
        </button>
      </div>

      <ReviewMetrics counts={counts} />

      <ReviewPipeline counts={counts} />

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_170px_150px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
          <Input placeholder="Search content titles..." className="h-11 border-white/10 bg-white/[0.035] pl-11 text-[#eee6d8] placeholder:text-[#6f685f]" />
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          Stage <ChevronRight className="size-3" />
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          <Filter className="size-4" /> Filters
        </button>
      </div>

      <ReviewTable />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ReviewChecklist />
        <ReviewerActivity />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div>
          <h2 className="font-[Georgia] text-3xl">Quality is a habit, not a gate.</h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            Every review is an opportunity to strengthen the trust users place in our content.
          </p>
        </div>
        <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Content Studio <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function ReviewMetrics({ counts }: { counts: { pending: number; inReview: number; needsChanges: number; approved: number } }) {
  const metrics: Array<[string, number, string, LucideIcon, string]> = [
    ["Pending", counts.pending, "Awaiting reviewer", Clock, "#8f887d"],
    ["In Review", counts.inReview, "Being evaluated", Eye, "#d4874b"],
    ["Needs Changes", counts.needsChanges, "Action required", XCircle, "#e65e48"],
    ["Approved", counts.approved, "Ready to publish", CheckCircle, "#a8c764"],
  ]

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, delta, Icon, color]) => (
        <div key={label} className="glass-card hover-lift rounded-md p-6">
          <Icon className="size-7" style={{ color }} />
          <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
          <p className="mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
          <p className="mt-3 text-xs text-[#9ab65d]">{delta}</p>
        </div>
      ))}
    </div>
  )
}

function ReviewPipeline({ counts }: { counts: { pending: number; inReview: number; needsChanges: number; approved: number } }) {
  const total = counts.pending + counts.inReview + counts.needsChanges + counts.approved
  const stages = [
    { label: "Pending", count: counts.pending, color: "#8f887d" },
    { label: "In Review", count: counts.inReview, color: "#d4874b" },
    { label: "Needs Changes", count: counts.needsChanges, color: "#e65e48" },
    { label: "Approved", count: counts.approved, color: "#a8c764" },
  ]

  return (
    <section className="mt-5 rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Review pipeline</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Content flowing through editorial stages</p>
      <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-white/10">
        {stages.map((stage) => (
          <div key={stage.label} className="h-full" style={{ width: `${(stage.count / total) * 100}%`, backgroundColor: stage.color }} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-4 text-xs">
        {stages.map((stage) => (
          <span key={stage.label} className="flex items-center gap-2 text-[#b7afa4]">
            <span className="size-2.5 rounded-sm" style={{ backgroundColor: stage.color }} />
            {stage.label}: {stage.count}
          </span>
        ))}
      </div>
    </section>
  )
}

function ReviewTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-white/10 bg-[#11110f]">
      <div className="grid grid-cols-[minmax(200px,1.4fr)_0.7fr_0.7fr_0.5fr_0.6fr_0.5fr] border-b border-white/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a77b5e] max-lg:hidden">
        <span>Content</span>
        <span>Author</span>
        <span>Reviewer</span>
        <span>Stage</span>
        <span>Score</span>
        <span>Updated</span>
      </div>
      <div className="divide-y divide-white/10">
        {demoReviews.map((review) => {
          const stage = stageConfig[review.stage] ?? stageConfig.pending
          const StageIcon = stage.icon
          return (
            <div key={review.title} className="grid items-center gap-4 px-5 py-4 text-sm transition hover:bg-white/[0.025] lg:grid-cols-[minmax(200px,1.4fr)_0.7fr_0.7fr_0.5fr_0.6fr_0.5fr]">
              <div className="flex items-center gap-3">
                <FileText className="size-5 shrink-0 text-[#8f887d]" />
                <div>
                  <p className="text-[#ddd4c6]">{review.title}</p>
                  <p className="mt-0.5 text-xs text-[#7f776d] lg:hidden">{stage.label}</p>
                </div>
              </div>
              <span className="hidden items-center gap-2 text-[#aaa296] lg:flex">
                <span className="relative size-6 overflow-hidden rounded-full">
                  <Image src={avatars[review.avatar]} alt="" fill className="object-cover" sizes="24px" />
                </span>
                {review.author}
              </span>
              <span className="hidden text-[#aaa296] lg:block">{review.reviewer}</span>
              <span className="hidden lg:block">
                <span className="inline-flex items-center gap-1.5 rounded border px-2 py-1 text-xs" style={{ color: stage.color, borderColor: `${stage.color}30`, backgroundColor: `${stage.color}10` }}>
                  <StageIcon className="size-3" />
                  {stage.label}
                </span>
              </span>
              <span className="hidden lg:block">
                {review.score > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${review.score}%`, backgroundColor: review.score >= 80 ? "#a8c764" : review.score >= 60 ? "#d4874b" : "#e65e48" }} />
                    </div>
                    <span className="text-xs text-[#d8cebd]">{review.score}</span>
                  </div>
                ) : (
                  <span className="text-xs text-[#6f685f]">—</span>
                )}
              </span>
              <span className="hidden text-xs text-[#8f887d] lg:block">{review.updated}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ReviewChecklist() {
  const checks = [
    { label: "Content accuracy verified", description: "Facts, statistics, and claims checked against sources" },
    { label: "Evidence & sources added", description: "Academic references and supporting research linked" },
    { label: "Readability score > 60", description: "Flesch-Kincaid readability analysis passed" },
    { label: "Accessibility standards met", description: "WCAG 2.1 AA compliance verified" },
    { label: "SEO metadata added", description: "Title, description, and tags optimized" },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Review checklist</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Standard quality gates for all content</p>
      <div className="mt-7 space-y-4">
        {checks.map((check, index) => (
          <div key={check.label} className="flex items-start gap-3">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm ${index < 3 ? "bg-[#a8c764] text-black" : "border border-[#6f685f]"}`}>
              {index < 3 ? <Check className="size-3" /> : null}
            </span>
            <div>
              <p className="text-sm text-[#eee6d8]">{check.label}</p>
              <p className="mt-1 text-xs text-[#8f887d]">{check.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ReviewerActivity() {
  const reviewers = [
    { name: "Dr. Emma Harper", reviewed: 24, approved: 18, pending: 3, avatar: 0 },
    { name: "Liam Park", reviewed: 16, approved: 12, pending: 2, avatar: 1 },
    { name: "Sofia Delgado", reviewed: 19, approved: 15, pending: 1, avatar: 0 },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Reviewer activity</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Team review performance this month</p>
      <div className="mt-7 space-y-5">
        {reviewers.map((reviewer) => (
          <div key={reviewer.name} className="rounded-md border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center gap-3">
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image src={avatars[reviewer.avatar]} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#eee6d8]">{reviewer.name}</p>
                <p className="text-xs text-[#8f887d]">{reviewer.reviewed} reviews completed</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-md bg-white/[0.035] py-2">
                <p className="font-[Georgia] text-lg text-[#d8cebd]">{reviewer.reviewed}</p>
                <p className="text-[#8f887d]">Reviewed</p>
              </div>
              <div className="rounded-md bg-white/[0.035] py-2">
                <p className="font-[Georgia] text-lg text-[#a8c764]">{reviewer.approved}</p>
                <p className="text-[#8f887d]">Approved</p>
              </div>
              <div className="rounded-md bg-white/[0.035] py-2">
                <p className="font-[Georgia] text-lg text-[#d4874b]">{reviewer.pending}</p>
                <p className="text-[#8f887d]">Pending</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
