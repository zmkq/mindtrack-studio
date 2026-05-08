"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  Calendar,
  Flame,
  Gauge,
  Grid2X2,
  Heart,
  LayoutDashboard,
  Leaf,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Target,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"

type AnalyticsData = {
  totals: {
    views: number
    completions: number
    helpfulVotes: number
    feedbackSubmissions: number
  }
  completionRate: number
  mostViewedContent: Array<{ title: string; views: number; category?: string }>
  mostHelpfulContent: Array<{ title: string; helpfulVotes: number }>
  categoryPerformance: Array<{
    category: string
    views: number
    completions: number
    helpfulVotes: number
    contentCount: number
  }>
}

const navGroups: Array<{
  label: string
  items: Array<[string, LucideIcon, string]>
}> = [
  {
    label: "Overview",
    items: [
      ["Dashboard", LayoutDashboard, "/admin/dashboard"],
      ["Analytics", Gauge, "/admin/analytics"],
    ],
  },
  {
    label: "Management",
    items: [
      ["Users", Users, "/admin/users"],
      ["Content", BookOpen, "/admin/content"],
      ["Programs", Box, "/admin/programs"],
      ["Tools", Sparkles, "/admin/tools"],
      ["Collections", Grid2X2, "/admin/collections"],
    ],
  },
  {
    label: "Engagement",
    items: [
      ["Feedback", MessageSquare, "/admin/feedback"],
      ["Reviews", ShieldCheck, "/admin/reviews"],
      ["Messages", MessageSquare, "/admin/messages"],
    ],
  },
  {
    label: "System",
    items: [
      ["Settings", Settings, "/admin/settings"],
      ["Integrations", Grid2X2, "/admin/integrations"],
      ["Audit Logs", BookOpen, "/admin/audit-logs"],
    ],
  },
]

const categoryIcons: Record<string, LucideIcon> = {
  Stress: SunMedium,
  Sleep: Moon,
  Focus: Target,
  Motivation: Flame,
  Habits: Leaf,
  Relationships: Users,
}

const categoryColors: Record<string, string> = {
  Stress: "#e65e48",
  Sleep: "#a8c764",
  Focus: "#e65e48",
  Motivation: "#e65e48",
  Habits: "#a8c764",
  Relationships: "#d4874b",
}

const images = ["/banner_1.png", "/women_2.png", "/banner_book.png", "/banner_book_2.png", "/banner_3.png"]

export function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const sessions = data.totals.views + data.totals.completions
  const activeUsers = Math.max(data.totals.views, 1)
  const returningUsers = Math.round(data.completionRate / 2)
  const avgSessionMinutes = Math.max(4, Math.round(data.completionRate / 4))
  const timeSeries = buildTimeSeries(data)
  const funnel = [
    ["Started", data.totals.views, 100],
    ["Engaged", sessions, Math.min(100, Math.round((sessions / Math.max(data.totals.views * 2, 1)) * 100))],
    ["Completed", data.totals.completions, Math.round(data.completionRate)],
    ["Helpful Vote", data.totals.helpfulVotes, Math.round((data.totals.helpfulVotes / Math.max(data.totals.views, 1)) * 100)],
  ] as const

  return (
    <main className="min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="grid min-h-screen xl:grid-cols-[230px_1fr]">
        <StudioSidebar />
        <section className="border-l border-white/10">
          <TopBar />
          <div className="px-5 py-10 md:px-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h1 className="font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
                  Analytics
                </h1>
                <p className="mt-4 text-sm leading-6 text-[#aaa296]">
                  See what helps people come back, complete tools, and feel supported.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="flex h-12 items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] px-5 text-sm text-[#d8cebd]">
                  May 20 - Jun 18, 2026 <Calendar className="size-4 text-[#8f887d]" />
                </button>
                <button className="flex h-12 items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] px-5 text-sm text-[#d8cebd]">
                  Export Report <ArrowDownToLine className="size-4 text-[#8f887d]" />
                </button>
              </div>
            </div>

            <div data-tour="analytics-metrics">
            <MetricGrid
              activeUsers={activeUsers}
              sessions={sessions}
              completionRate={data.completionRate}
              helpfulVotes={data.totals.helpfulVotes}
              avgSessionMinutes={avgSessionMinutes}
              returningUsers={returningUsers}
            />
            </div>

            <div data-tour="analytics-chart">
              <EngagementPanel timeSeries={timeSeries} />
            </div>
            <div data-tour="analytics-categories">
              <CategoryPanel categories={data.categoryPerformance} />
            </div>

            <div data-tour="analytics-insights" className="mt-5 grid gap-5 lg:grid-cols-2">
              <TopContentPanel items={data.mostViewedContent} />
              <SentimentPanel feedbackCount={data.totals.feedbackSubmissions} />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <FunnelPanel funnel={funnel} />
              <InsightPanel categories={data.categoryPerformance} />
            </div>
            <BottomReportCta />
            <footer className="mt-8 flex flex-wrap justify-between gap-4 text-xs text-[#746d63]">
              <span>© 2026 MindTrack Studio. All rights reserved.</span>
              <span className="flex gap-8">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact</span>
              </span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  )
}

function buildTimeSeries(data: AnalyticsData) {
  const days = [
    "May 20",
    "May 23",
    "May 26",
    "May 29",
    "Jun 1",
    "Jun 4",
    "Jun 7",
    "Jun 10",
    "Jun 13",
    "Jun 16",
    "Jun 18",
  ]
  const baseUsers = Math.max(1200, data.totals.views * 85)
  const baseSessions = Math.max(2200, (data.totals.views + data.totals.completions) * 75)

  return days.map((day, index) => ({
    day,
    activeUsers: Math.round(baseUsers * (0.62 + Math.sin(index * 0.88) * 0.18 + index * 0.032)),
    sessions: Math.round(baseSessions * (0.72 + Math.cos(index * 0.72) * 0.14 + index * 0.026)),
  }))
}

function StudioSidebar() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908] px-5 py-7 xl:flex">
      <div>
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8]">
            <Sparkles className="size-5" />
          </span>
          <span className="text-base font-semibold uppercase leading-5 tracking-[0.24em]">
            MindTrack
            <br />
            Studio
          </span>
        </Link>
        <Link
          href="/"
          className="mt-12 flex h-11 items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-[#d7cdbc]"
        >
          <ArrowLeft className="size-4" /> Back to Studio
        </Link>
        <div className="mt-12 space-y-9">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b98257]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(([item, Icon, href]) => (
                  <Link
                    key={item}
                    href={href}
                    className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm ${
                      item === "Analytics"
                        ? "bg-[#e65e48]/12 text-[#e65e48]"
                        : "text-[#999185]"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-medium">MindTrack Studio</p>
          <p className="mt-2 text-xs leading-5 text-[#898177]">
            Research-Driven
            <br />
            Mental Wellness
          </p>
          <div className="mt-20 h-24 rounded-full border border-[#7c4b2c]/50" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {["Create Content", "Send Announcement", "Export Reports"].map((item) => (
            <div
              key={item}
              className="mb-2 flex h-9 items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {item === "Create Content" ? <ArrowRight className="size-3" /> : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar() {
  return (
    <header className="flex h-[92px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
      <button className="grid size-10 place-items-center rounded-md text-[#d8cebd] xl:hidden">
        <Menu className="size-5" />
      </button>
      <div className="relative ml-auto w-full max-w-[430px]">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          placeholder="Search content, users, tools..."
          className="h-12 border-white/10 bg-white/[0.035] pl-11 text-sm text-[#eee6d8] placeholder:text-[#6f685f]"
        />
      </div>
      <div className="hidden items-center gap-5 text-[#aaa296] md:flex">
        <SunMedium className="size-5" />
        <Bell className="size-5" />
        <div className="flex items-center gap-3">
          <div className="relative size-9 overflow-hidden rounded-full">
            <Image src="/women_1.png" alt="Admin avatar" fill className="object-cover" sizes="36px" />
          </div>
          <div className="text-xs">
            <p className="font-medium text-[#eee6d8]">Admin</p>
            <p className="text-[#6f685f]">Studio</p>
          </div>
        </div>
      </div>
    </header>
  )
}

function MetricGrid({
  activeUsers,
  sessions,
  completionRate,
  helpfulVotes,
  avgSessionMinutes,
  returningUsers,
}: {
  activeUsers: number
  sessions: number
  completionRate: number
  helpfulVotes: number
  avgSessionMinutes: number
  returningUsers: number
}) {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Active Users", formatNumber(activeUsers), "+18.6% vs Apr 20 - May 19", Users, "#e65e48"],
    ["Sessions", formatNumber(sessions), "+12.3% vs Apr 20 - May 19", Target, "#e65e48"],
    ["Completion Rate", `${completionRate}%`, "+6.7pp vs Apr 20 - May 19", Gauge, "#a8c764"],
    ["Helpful Votes", formatNumber(helpfulVotes), "+21.4% vs Apr 20 - May 19", Heart, "#e65e48"],
    ["Avg. Session Time", `${avgSessionMinutes}m 36s`, "+9.2% vs Apr 20 - May 19", Timer, "#a8c764"],
    ["Returning Users", `${returningUsers}%`, "+5.8pp vs Apr 20 - May 19", Users, "#a8c764"],
  ]

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {metrics.map(([label, value, delta, Icon, color]) => (
        <div
          key={label}
          className="rounded-md border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-7"
        >
          <Icon className="size-8" style={{ color }} />
          <p className="mt-7 text-sm text-[#b7afa4]">{label}</p>
          <p className="mt-5 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
          <p className="mt-4 text-xs text-[#9ab65d]">{delta}</p>
        </div>
      ))}
    </div>
  )
}

function EngagementPanel({ timeSeries }: { timeSeries: Array<{ day: string; activeUsers: number; sessions: number }> }) {
  return (
    <section className="mt-5 rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">Engagement over time</h2>
          <p className="mt-1 text-sm text-[#8f887d]">Daily active users vs. sessions</p>
        </div>
        <div className="flex overflow-hidden rounded-md border border-white/10 text-sm text-[#8f887d]">
          {["7D", "30D", "90D", "Custom"].map((item) => (
            <button
              key={item}
              className={`h-10 px-5 ${item === "30D" ? "bg-[#d4874b]/15 text-[#d4874b]" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeSeries} margin={{ left: 0, right: 18, top: 18, bottom: 0 }}>
            <CartesianGrid stroke="#ffffff14" vertical={false} />
            <XAxis dataKey="day" stroke="#8f887d" tickLine={false} axisLine={false} />
            <YAxis stroke="#8f887d" tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value) / 1000}K`} />
            <Tooltip
              contentStyle={{
                background: "#151411",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#eee6d8",
              }}
            />
            <Line type="monotone" dataKey="activeUsers" stroke="#e65e48" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="sessions" stroke="#a8c764" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function CategoryPanel({ categories }: { categories: AnalyticsData["categoryPerformance"] }) {
  const maxViews = Math.max(...categories.map((category) => category.views), 1)

  return (
    <section className="mt-5 rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">Category performance</h2>
          <p className="mt-1 text-sm text-[#8f887d]">How each topic area is performing</p>
        </div>
        <button className="rounded-md border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-[#b7afa4]">
          By Completion Rate
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category.category] ?? Target
          const color = categoryColors[category.category] ?? "#d4874b"
          const rate = Math.max(
            1,
            Math.round((category.completions / Math.max(category.views, 1)) * 100)
          )

          return (
            <div key={category.category} className="rounded-md border border-white/10 bg-white/[0.025] p-5">
              <Icon className="size-8" style={{ color }} />
              <p className="mt-4 text-sm">{category.category}</p>
              <p className="mt-7 font-[Georgia] text-4xl">{rate}%</p>
              <p className="mt-2 text-xs text-[#8f887d]">Completion Rate</p>
              <p className="mt-3 text-xs text-[#9ab65d]">↑ {Math.max(1, Math.round((category.views / maxViews) * 8))}pp</p>
              <MiniSpark color={color} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TopContentPanel({ items }: { items: AnalyticsData["mostViewedContent"] }) {
  const max = Math.max(...items.map((item) => item.views), 1)

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Top content</h2>
      <p className="mt-1 text-sm text-[#8f887d]">By completions</p>
      <div className="mt-7 space-y-4">
        {items.slice(0, 5).map((item, index) => (
          <div key={item.title} className="grid grid-cols-[24px_54px_1fr_80px] items-center gap-4">
            <span className="text-sm text-[#8f887d]">{index + 1}</span>
            <div className="relative size-12 overflow-hidden rounded">
              <Image src={images[index % images.length]} alt="" fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="text-xs text-[#8f887d]">Tool</p>
              <div className="mt-2 h-px bg-white/10">
                <div
                  className="h-px bg-[#e65e48]"
                  style={{ width: `${Math.max(18, (item.views / max) * 100)}%` }}
                />
              </div>
            </div>
            <span className="text-right text-sm">{formatNumber(item.views)}</span>
          </div>
        ))}
      </div>
      <Link href="/admin/content" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View all content <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function SentimentPanel({ feedbackCount }: { feedbackCount: number }) {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">User sentiment</h2>
          <p className="mt-1 text-sm text-[#8f887d]">From feedback and reviews</p>
        </div>
        <button className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-[#8f887d]">
          All feedback
        </button>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
        <div className="grid size-44 place-items-center rounded-full border-[24px] border-[#a8c764] border-r-[#d4874b] border-t-[#e65e48] text-center">
          <div>
            <p className="font-[Georgia] text-4xl">84%</p>
            <p className="text-sm">Positive</p>
          </div>
        </div>
        <div className="space-y-5 text-sm">
          {[
            ["Positive", "84%", "#a8c764"],
            ["Neutral", "11%", "#d4874b"],
            ["Negative", "5%", "#e65e48"],
          ].map(([label, value, color]) => (
            <p key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-[#b7afa4]">
                <span className="size-3 rounded-sm" style={{ backgroundColor: color }} />
                {label}
              </span>
              <span>{value}</span>
            </p>
          ))}
          <p className="pt-2 text-xs text-[#8f887d]">{feedbackCount} seeded feedback submissions</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-sm text-[#d8cebd]">Top feedback themes</p>
        <div className="flex flex-wrap gap-2">
          {["Helpful 32%", "Easy to use 18%", "Practical 16%", "Calming 12%", "Life changing 9%", "Too long 5%"].map((theme) => (
            <span key={theme} className="rounded-md bg-[#d4874b]/10 px-3 py-2 text-xs text-[#d8a06e]">
              {theme}
            </span>
          ))}
        </div>
      </div>
      <Link href="/admin/qa" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View all feedback <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function FunnelPanel({ funnel }: { funnel: readonly (readonly [string, number, number])[] }) {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Completion funnel</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Overall journey</p>
      <div className="mt-8 space-y-6">
        {funnel.map(([label, value, percent], index) => (
          <div key={label} className="grid grid-cols-[100px_74px_1fr_46px] items-center gap-4 text-sm">
            <span>{label}</span>
            <span>{formatNumber(value)}</span>
            <div className="h-5 border border-white/10 bg-black/20">
              <div
                className="h-full bg-gradient-to-r from-[#e65e48] to-[#d4874b]"
                style={{ width: `${Math.max(6, percent)}%`, opacity: 1 - index * 0.12 }}
              />
            </div>
            <span>{percent}%</span>
          </div>
        ))}
      </div>
      <Link href="/admin/analytics" className="mt-10 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View full funnel analysis <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function InsightPanel({ categories }: { categories: AnalyticsData["categoryPerformance"] }) {
  const top = [...categories].sort((a, b) => b.completions - a.completions).slice(0, 3)

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Insight highlights</h2>
      <p className="mt-1 text-sm text-[#8f887d]">What&apos;s driving impact</p>
      <div className="mt-8 divide-y divide-white/10">
        {top.map((category, index) => {
          const Icon = categoryIcons[category.category] ?? Flame
          const color = categoryColors[category.category] ?? "#d4874b"
          return (
            <div key={category.category} className="grid grid-cols-[40px_1fr_70px] gap-4 py-5">
              <Icon className="size-8" style={{ color }} />
              <p className="text-sm leading-6 text-[#aaa296]">
                {category.category} content drove {category.completions} completions and {category.helpfulVotes} helpful votes this period.
              </p>
              <div className="text-right text-xs">
                <p className="text-[#8f887d]">Impact</p>
                <p className={index === 2 ? "text-[#d4874b]" : "text-[#a8c764]"}>
                  {index === 2 ? "Medium" : "High"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <Link href="/admin/analytics" className="mt-6 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View all insights <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

function BottomReportCta() {
  return (
    <section className="mt-5 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
      <div className="flex items-center gap-8">
        <Leaf className="hidden size-16 text-[#8a4e31] md:block" />
        <div>
          <h2 className="font-[Georgia] text-3xl">Data with purpose.</h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            We measure what matters so we can build what helps.
          </p>
        </div>
      </div>
      <button className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
        Schedule Report <Calendar className="size-4" />
      </button>
    </section>
  )
}

function MiniSpark({ color }: { color: string }) {
  const data = [
    { value: 12 },
    { value: 16 },
    { value: 9 },
    { value: 20 },
    { value: 14 },
    { value: 24 },
    { value: 18 },
  ]

  return (
    <div className="mt-5 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.08} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}
