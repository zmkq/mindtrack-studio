"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Clock,
  Eye,
  Flame,
  Heart,
  Leaf,
  Moon,
  Plus,
  Sparkles,
  Star,
  SunMedium,
  Target,
  Timer,
  TrendingUp,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"

const images = ["/banner_1.png", "/women_2.png", "/banner_book.png", "/seed.png", "/banner_3.png", "/banner_book_2.png", "/asset.png", "/women_1.png"]

const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  Stress: { icon: SunMedium, color: "#e65e48" },
  Sleep: { icon: Moon, color: "#a8c764" },
  Focus: { icon: Target, color: "#d4874b" },
  Motivation: { icon: Flame, color: "#e65e48" },
  Habits: { icon: Leaf, color: "#a8c764" },
  Relationships: { icon: Users, color: "#d4874b" },
  Mindfulness: { icon: Brain, color: "#a8c764" },
  Gratitude: { icon: Heart, color: "#e65e48" },
}

const demoTools = [
  { title: "5-Minute Breathing Reset", category: "Stress", duration: 5, views: 1842, completions: 1204, rating: 4.8 },
  { title: "Sleep Journal Prompt", category: "Sleep", duration: 10, views: 1456, completions: 987, rating: 4.6 },
  { title: "Pomodoro Focus Session", category: "Focus", duration: 25, views: 1203, completions: 845, rating: 4.7 },
  { title: "Gratitude Reflection", category: "Gratitude", duration: 8, views: 1678, completions: 1342, rating: 4.9 },
  { title: "Body Scan Meditation", category: "Mindfulness", duration: 15, views: 987, completions: 678, rating: 4.5 },
  { title: "Goal Setting Workshop", category: "Motivation", duration: 20, views: 876, completions: 543, rating: 4.4 },
  { title: "Habit Tracker Setup", category: "Habits", duration: 12, views: 754, completions: 498, rating: 4.3 },
  { title: "Active Listening Exercise", category: "Relationships", duration: 15, views: 634, completions: 412, rating: 4.6 },
  { title: "Cognitive Reframing", category: "Stress", duration: 10, views: 1123, completions: 789, rating: 4.7 },
  { title: "Wind-Down Routine", category: "Sleep", duration: 20, views: 923, completions: 701, rating: 4.8 },
  { title: "Mindful Walking", category: "Mindfulness", duration: 15, views: 567, completions: 398, rating: 4.5 },
  { title: "Values Clarification", category: "Motivation", duration: 30, views: 445, completions: 312, rating: 4.6 },
]

export function AdminToolsPanel() {
  return (
    <AdminShell
      activeItem="Tools"
      searchPlaceholder="Search tools, categories..."
      sidebarNote={{ title: "Practice Library", subtitle: "Every tool is a chance\nto support wellbeing." }}
      quickActions={["Create Tool", "Review Practices", "Usage Reports"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Practice library
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Tools
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Review the user-facing tools, track usage patterns, and ensure each
            practice has clear outcomes and evidence-backed guidance.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <Plus className="size-4" /> Create Tool
        </button>
      </div>

      <ToolMetrics />
      <CategoryFilter />
      <ToolGrid />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <TopPerformers />
        <CategoryBreakdown />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="flex items-center gap-8">
          <Wand2 className="hidden size-16 text-[#8a4e31] md:block" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Tools that transform.</h2>
            <p className="mt-2 text-sm text-[#8f887d]">
              Each practice is designed with care, tested with empathy, and published with purpose.
            </p>
          </div>
        </div>
        <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Content Studio <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function ToolMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Tools", "48", "Across 8 categories", Sparkles, "#e65e48"],
    ["Total Views", "12,488", "+16.2% this month", Eye, "#a8c764"],
    ["Avg. Completion", "68%", "+5pp vs last month", Target, "#d4874b"],
    ["Avg. Rating", "4.6", "Based on 2,847 reviews", Star, "#e65e48"],
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

function CategoryFilter() {
  const cats = Object.entries(categoryConfig)

  return (
    <div className="mt-9 flex flex-wrap gap-2">
      <button className="rounded-md border border-[#e65e48] bg-[#e65e48]/12 px-4 py-2 text-sm text-[#e65e48]">
        All Categories
      </button>
      {cats.map(([name, { icon: Icon, color }]) => (
        <button
          key={name}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-[#b7afa4] transition hover:border-white/20"
        >
          <Icon className="size-3.5" style={{ color }} />
          {name}
        </button>
      ))}
    </div>
  )
}

function ToolGrid() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {demoTools.map((tool, index) => {
        const cat = categoryConfig[tool.category] ?? { icon: Sparkles, color: "#d4874b" }
        const Icon = cat.icon

        return (
          <div key={tool.title} className="group overflow-hidden rounded-md border border-white/10 bg-[#11110f] transition hover:border-white/20">
            <div className="relative h-32 overflow-hidden">
              <Image src={images[index % images.length]} alt="" fill className="object-cover transition group-hover:scale-105" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs" style={{ backgroundColor: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30` }}>
                  <Icon className="size-3" />
                  {tool.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs text-[#d8cebd]">
                <Timer className="size-3" />
                {tool.duration}m
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-[#eee6d8]">{tool.title}</h3>
              <div className="mt-3 flex items-center justify-between text-xs text-[#8f887d]">
                <span className="flex items-center gap-1"><Eye className="size-3" /> {tool.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Target className="size-3" /> {tool.completions.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-[#d4874b]"><Star className="size-3" /> {tool.rating}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${Math.round((tool.completions / tool.views) * 100)}%`, backgroundColor: cat.color }} />
              </div>
              <p className="mt-1 text-[10px] text-[#6f685f]">{Math.round((tool.completions / tool.views) * 100)}% completion rate</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TopPerformers() {
  const top = [...demoTools].sort((a, b) => b.completions - a.completions).slice(0, 5)

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Top performers</h2>
      <p className="mt-1 text-sm text-[#8f887d]">By completions this month</p>
      <div className="mt-7 space-y-4">
        {top.map((tool, index) => {
          const cat = categoryConfig[tool.category] ?? { icon: Sparkles, color: "#d4874b" }
          return (
            <div key={tool.title} className="grid grid-cols-[24px_1fr_80px] items-center gap-4">
              <span className="text-sm text-[#8f887d]">{index + 1}</span>
              <div>
                <p className="text-sm text-[#eee6d8]">{tool.title}</p>
                <p className="text-xs text-[#8f887d]">{tool.category}</p>
                <div className="mt-2 h-px bg-white/10">
                  <div className="h-px" style={{ width: `${Math.max(20, (tool.completions / top[0].completions) * 100)}%`, backgroundColor: cat.color }} />
                </div>
              </div>
              <span className="text-right text-sm text-[#d8cebd]">{tool.completions.toLocaleString()}</span>
            </div>
          )
        })}
      </div>
      <Link href="/admin/analytics" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View all analytics <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function CategoryBreakdown() {
  const catCounts: Record<string, number> = {}
  for (const tool of demoTools) {
    catCounts[tool.category] = (catCounts[tool.category] ?? 0) + 1
  }
  const total = demoTools.length

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Category breakdown</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Distribution across practice areas</p>
      <div className="mt-8 space-y-4">
        {Object.entries(catCounts).map(([name, count]) => {
          const cat = categoryConfig[name] ?? { icon: Sparkles, color: "#d4874b" }
          const Icon = cat.icon
          return (
            <div key={name} className="flex items-center gap-4">
              <Icon className="size-5 shrink-0" style={{ color: cat.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#b7afa4]">{name}</span>
                  <span className="text-[#d8cebd]">{count} tools</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${(count / total) * 100 * 3}%`, backgroundColor: cat.color }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Link href="/admin/collections" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        Organize into collections <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
