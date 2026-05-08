"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  GraduationCap,
  Layers,
  Plus,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"

const images = ["/banner_1.png", "/banner_book.png", "/banner_3.png", "/seed.png", "/banner_book_2.png", "/women_2.png"]

const demoPrograms = [
  { name: "Stress & Resilience", description: "Build coping strategies and emotional resilience through guided practices.", tools: 12, enrolled: 847, completion: 72, status: "Active", color: "#e65e48" },
  { name: "Sleep Foundations", description: "Evidence-based sleep hygiene techniques for better rest and recovery.", tools: 8, enrolled: 623, completion: 81, status: "Active", color: "#a8c764" },
  { name: "Focus & Flow", description: "Concentration exercises and mindful productivity techniques.", tools: 10, enrolled: 534, completion: 68, status: "Active", color: "#d4874b" },
  { name: "Relationship Skills", description: "Communication, empathy, and boundary-setting practices.", tools: 9, enrolled: 412, completion: 65, status: "Draft", color: "#e65e48" },
  { name: "Motivation Lab", description: "Goal-setting frameworks and behavioral activation strategies.", tools: 7, enrolled: 0, completion: 0, status: "Draft", color: "#d4874b" },
  { name: "Habit Architecture", description: "Build sustainable habits using evidence-backed behavior design.", tools: 11, enrolled: 289, completion: 74, status: "Active", color: "#a8c764" },
]

export function AdminProgramsPanel() {
  return (
    <AdminShell
      activeItem="Programs"
      searchPlaceholder="Search programs, cohorts..."
      sidebarNote={{ title: "Learning Pathways", subtitle: "Structured journeys\nfor lasting change." }}
      quickActions={["Create Program", "Manage Cohorts", "View Enrollment"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Learning pathways
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Programs
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Group micro-exercises into structured programs, cohorts, and wellbeing
            initiatives that guide users through meaningful growth.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <Plus className="size-4" /> Create Program
        </button>
      </div>

      <ProgramMetrics />

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["All Programs", "Active", "Drafts", "Archived"].map((tab, index) => (
            <button key={tab} className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}>
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoPrograms.map((program, index) => (
          <ProgramCard key={program.name} program={program} image={images[index % images.length]} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <EnrollmentOverview />
        <CurriculumTimeline />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="flex items-center gap-8">
          <GraduationCap className="hidden size-16 text-[#8a4e31] md:block" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Structured support, real outcomes.</h2>
            <p className="mt-2 text-sm text-[#8f887d]">
              Programs turn individual tools into coherent learning journeys.
            </p>
          </div>
        </div>
        <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Add Content <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function ProgramMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Programs", "6", "4 active, 2 drafts", Layers, "#e65e48"],
    ["Total Enrolled", "2,705", "+18% this month", Users, "#a8c764"],
    ["Avg. Completion", "72%", "+4pp vs last month", Target, "#d4874b"],
    ["Tools in Programs", "57", "Across 6 programs", BookOpen, "#e65e48"],
  ]

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, delta, Icon, color]) => (
        <div key={label} className="glass-card hover-lift rounded-md p-6">
          <Icon className="size-7" style={{ color }} />
          <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
          <p className="mt-3 metric-value font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
          <p className="mt-3 text-xs text-[#9ab65d]">{delta}</p>
        </div>
      ))}
    </div>
  )
}

function ProgramCard({ program, image }: { program: typeof demoPrograms[0]; image: string }) {
  return (
    <div className="group overflow-hidden rounded-md border border-white/10 bg-[#11110f] transition hover:border-white/20">
      <div className="relative h-40 overflow-hidden">
        <Image src={image} alt="" fill className="object-cover transition group-hover:scale-105" sizes="400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] to-transparent" />
        <div className="absolute bottom-3 left-4">
          {program.status === "Active" ? (
            <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-1 text-xs text-[#a8c764]">Active</span>
          ) : (
            <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-2 py-1 text-xs text-[#8f887d]">Draft</span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-[Georgia] text-xl text-[#f1e6d6]">{program.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#8f887d]">{program.description}</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-3 text-center">
            <p className="font-[Georgia] text-xl text-[#d8cebd]">{program.tools}</p>
            <p className="text-[10px] text-[#8f887d]">Tools</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-3 text-center">
            <p className="font-[Georgia] text-xl text-[#d8cebd]">{program.enrolled}</p>
            <p className="text-[10px] text-[#8f887d]">Enrolled</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-3 text-center">
            <p className="font-[Georgia] text-xl" style={{ color: program.color }}>{program.completion}%</p>
            <p className="text-[10px] text-[#8f887d]">Complete</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="flex h-10 flex-1 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#d8cebd]">
            Edit Program
          </button>
          <button className="flex h-10 flex-1 items-center justify-center rounded-md text-sm text-[#e65e48]" style={{ backgroundColor: `${program.color}15`, border: `1px solid ${program.color}30` }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

function EnrollmentOverview() {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">Enrollment trends</h2>
          <p className="mt-1 text-sm text-[#8f887d]">Monthly enrollment across programs</p>
        </div>
        <button className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-[#8f887d]">
          Last 6 months
        </button>
      </div>
      <div className="mt-8 space-y-5">
        {[
          ["Stress & Resilience", 847, "#e65e48"],
          ["Sleep Foundations", 623, "#a8c764"],
          ["Focus & Flow", 534, "#d4874b"],
          ["Habit Architecture", 289, "#a8c764"],
          ["Relationship Skills", 412, "#e65e48"],
        ].map(([name, enrolled, color]) => (
          <div key={name as string}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b7afa4]">{name}</span>
              <span className="text-[#d8cebd]">{(enrolled as number).toLocaleString()}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.max(10, ((enrolled as number) / 850) * 100)}%`, backgroundColor: color as string }}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/analytics" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        Full enrollment report <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function CurriculumTimeline() {
  const phases = [
    { phase: "Phase 1", title: "Foundation", weeks: "Weeks 1-2", tools: 3, status: "complete" },
    { phase: "Phase 2", title: "Building Skills", weeks: "Weeks 3-4", tools: 4, status: "complete" },
    { phase: "Phase 3", title: "Deep Practice", weeks: "Weeks 5-6", tools: 3, status: "active" },
    { phase: "Phase 4", title: "Integration", weeks: "Weeks 7-8", tools: 2, status: "upcoming" },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">Curriculum structure</h2>
          <p className="mt-1 text-sm text-[#8f887d]">Stress & Resilience program</p>
        </div>
        <Link href="/admin/content" className="text-sm text-[#e65e48]">
          Edit <ArrowUpRight className="ml-1 inline size-3" />
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.phase} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`grid size-8 place-items-center rounded-full border ${
                phase.status === "complete" ? "border-[#a8c764] bg-[#a8c764]/15" :
                phase.status === "active" ? "border-[#e65e48] bg-[#e65e48]/15" :
                "border-white/10 bg-white/[0.035]"
              }`}>
                {phase.status === "complete" ? (
                  <Check className="size-4 text-[#a8c764]" />
                ) : phase.status === "active" ? (
                  <Clock className="size-4 text-[#e65e48]" />
                ) : (
                  <span className="size-2 rounded-full bg-[#6f685f]" />
                )}
              </div>
              {index < phases.length - 1 ? (
                <div className={`w-px flex-1 ${phase.status === "complete" ? "bg-[#a8c764]/30" : "bg-white/10"}`} />
              ) : null}
            </div>
            <div className="pb-6">
              <p className="text-xs text-[#8f887d]">{phase.phase} · {phase.weeks}</p>
              <h3 className="mt-1 text-sm font-medium text-[#eee6d8]">{phase.title}</h3>
              <p className="mt-2 text-xs text-[#8f887d]">{phase.tools} tools assigned</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
