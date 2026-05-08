"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock,
  FileText,
  Heart,
  Leaf,
  PenLine,
  Plus,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"

const images = ["/banner_1.png", "/women_2.png", "/banner_book.png", "/seed.png", "/banner_3.png"]

export function AdminDashboard() {
  return (
    <AdminShell
      activeItem="Dashboard"
      searchPlaceholder="Search dashboard..."
      sidebarNote={{ title: "Command Center", subtitle: "Your studio at a glance.\nStay informed, act fast." }}
      quickActions={["Create Content", "View Analytics", "Open QA Tracker"]}
    >
      {/* ═══ HERO SECTION ═══ */}
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Command center
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6] md:text-6xl">
            Good evening,{" "}
            <span className="shimmer-text">Admin.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Here&apos;s a snapshot of your studio. Content health is strong,
            engagement is trending upward, and your team is making progress.
          </p>
        </div>
        <Link
          href="/admin/content"
          className="anim-scale delay-3 group inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]"
        >
          <Plus className="size-4 transition-transform group-hover:rotate-90" /> Create Content
        </Link>
      </div>

      {/* ═══ METRICS GRID ═══ */}
      <MetricGrid />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <RecentActivity />
        <QuickPulse />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <ContentSnapshot />
        <EngagementSnapshot />
        <TeamActivity />
      </div>
      <BottomBanner />
    </AdminShell>
  )
}

function MetricGrid() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Content", "128", "+12 this month", FileText, "#e65e48"],
    ["Active Users", "2,847", "+18.6% vs last month", Users, "#e65e48"],
    ["Completion Rate", "73%", "+6.7pp vs last month", Target, "#a8c764"],
    ["Open QA Tickets", "7", "3 high severity", ShieldCheck, "#d4874b"],
    ["Helpful Votes", "1,204", "+21.4% vs last month", Heart, "#e65e48"],
    ["Avg. Session", "8m 36s", "+9.2% vs last month", Clock, "#a8c764"],
  ]

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {metrics.map(([label, value, delta, Icon, color], index) => (
        <div
          key={label}
          className={`glass-card hover-lift anim-up delay-${index + 1} rounded-md p-7`}
        >
          <Icon className="size-8 transition-transform duration-500 hover:scale-110" style={{ color }} />
          <p className="mt-7 text-sm text-[#b7afa4]">{label}</p>
          <p className="metric-value mt-5 font-[Georgia] text-4xl text-[#f1e6d6]" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
            {value}
          </p>
          <p className="mt-4 text-xs text-[#9ab65d]">{delta}</p>
          {/* Mini sparkline decoration */}
          <div className="mt-4 flex gap-px opacity-40">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-full">
                <div
                  className="rounded-sm"
                  style={{
                    height: `${h * 0.25}px`,
                    background: `linear-gradient(to top, ${color}, transparent)`,
                    opacity: 0.3 + i * 0.1,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function RecentActivity() {
  const activities = [
    { action: "Published", title: "5-Minute Breathing Reset", user: "Dr. Emma Harper", time: "12 min ago", icon: Check, color: "#a8c764" },
    { action: "Edited", title: "Stress Journaling Prompt", user: "Liam Park", time: "28 min ago", icon: PenLine, color: "#d4874b" },
    { action: "Created", title: "Sleep Hygiene Checklist", user: "Sofia Delgado", time: "1 hr ago", icon: Plus, color: "#e65e48" },
    { action: "Reviewed", title: "Cognitive Restructuring Guide", user: "Dr. Emma Harper", time: "2 hrs ago", icon: ShieldCheck, color: "#a8c764" },
    { action: "Feedback", title: "Gratitude Practice", user: "Anonymous User", time: "3 hrs ago", icon: Heart, color: "#d4874b" },
    { action: "QA Fixed", title: "Timer not resetting on pause", user: "Liam Park", time: "4 hrs ago", icon: Zap, color: "#a8c764" },
    { action: "Published", title: "Mindful Walking Exercise", user: "Sofia Delgado", time: "5 hrs ago", icon: Check, color: "#a8c764" },
  ]

  return (
    <section className="anim-up delay-7 rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-2xl">Recent activity</h2>
          <p className="mt-1 text-sm text-[#8f887d]">What&apos;s happening across the studio</p>
        </div>
        <Link href="/admin/content" className="text-sm text-[#e65e48] transition-colors hover:text-[#f27760]">View all</Link>
      </div>
      <div className="mt-7 divide-y divide-white/10">
        {activities.map((activity, index) => (
          <div key={index} className="interactive-row flex items-center gap-4 py-4">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-md transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: `${activity.color}15` }}
            >
              <activity.icon className="size-4" style={{ color: activity.color }} />
            </span>
            <div className="relative z-10 min-w-0 flex-1">
              <p className="text-sm text-[#eee6d8]">
                <span className="font-medium" style={{ color: activity.color }}>{activity.action}</span>
                {" · "}
                {activity.title}
              </p>
              <p className="mt-1 text-xs text-[#8f887d]">{activity.user}</p>
            </div>
            <span className="relative z-10 shrink-0 text-xs text-[#6f685f]">{activity.time}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function QuickPulse() {
  return (
    <section className="anim-up delay-8 space-y-5">
      <div className="border-glow rounded-md border border-white/10 bg-[#11110f] p-7">
        <h2 className="font-[Georgia] text-2xl">Studio health</h2>
        <p className="mt-1 text-sm text-[#8f887d]">Overall system status</p>
        <div className="mt-7 mx-auto grid size-44 place-items-center rounded-full border-[14px] border-[#a8c764] border-b-[#d4874b] text-center" style={{ animation: "breathe 6s ease-in-out infinite" }}>
          <div>
            <p className="font-[Georgia] text-5xl text-[#f1e6d6] glow-text-coral">91</p>
            <p className="text-sm text-[#a8c764]">Excellent</p>
          </div>
        </div>
        <div className="mt-7 space-y-4">
          {[
            ["Content Quality", 94, "#a8c764"],
            ["User Engagement", 87, "#a8c764"],
            ["QA Coverage", 82, "#d4874b"],
            ["Publishing Pace", 91, "#a8c764"],
          ].map(([label, value, color]) => (
            <div key={label as string} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-[#8f887d]">{label}</span>
              <div className="flex items-center gap-3">
                <div className="progress-shine h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, backgroundColor: color as string }} />
                </div>
                <span className="w-10 text-right text-[#d8cebd]">{value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card-subtle rounded-md p-5">
        <p className="text-sm font-medium text-[#d8cebd]">Upcoming</p>
        <div className="mt-4 space-y-3">
          {[
            ["Content review deadline", "Tomorrow, 10:00 AM", "#e65e48"],
            ["Analytics report export", "May 12, 2026", "#d4874b"],
            ["Program launch: Resilience", "May 15, 2026", "#a8c764"],
          ].map(([title, date, color]) => (
            <div key={title as string} className="group flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 text-[#b7afa4]">
                <span className="size-1.5 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: color as string }} />
                {title}
              </span>
              <span className="text-[#8f887d]">{date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentSnapshot() {
  return (
    <section className="anim-up delay-9 glass-card hover-lift rounded-md p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-[Georgia] text-xl">Content</h2>
        <Link href="/admin/content" className="group text-xs text-[#e65e48]">
          Manage <ArrowUpRight className="ml-1 inline size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {[
          ["Published", 84, "#a8c764"],
          ["In Review", 18, "#d4874b"],
          ["Drafts", 26, "#8f887d"],
        ].map(([label, count, color]) => (
          <div key={label as string} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-3 text-[#b7afa4]">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: color as string }} />
              {label}
            </span>
            <span className="metric-value font-[Georgia] text-lg text-[#f1e6d6]">{count}</span>
          </div>
        ))}
      </div>
      <div className="progress-shine mt-6 flex h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[#a8c764]" style={{ width: "66%" }} />
        <div className="h-full bg-[#d4874b]" style={{ width: "14%" }} />
        <div className="h-full bg-[#8f887d]" style={{ width: "20%" }} />
      </div>
      <p className="mt-3 text-xs text-[#8f887d]">128 total pieces · 84 live</p>
    </section>
  )
}

function EngagementSnapshot() {
  const engagements: Array<[string, string, string, LucideIcon, string]> = [
    ["Views this week", "4,218", "+14%", TrendingUp, "#e65e48"],
    ["Completions", "1,847", "+22%", Target, "#a8c764"],
    ["Feedback entries", "312", "+8%", BookOpen, "#d4874b"],
    ["Helpful rate", "84%", "+3pp", Heart, "#a8c764"],
  ]

  return (
    <section className="anim-up delay-10 glass-card hover-lift rounded-md p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-[Georgia] text-xl">Engagement</h2>
        <Link href="/admin/analytics" className="group text-xs text-[#e65e48]">
          Analytics <ArrowUpRight className="ml-1 inline size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-6 space-y-5">
        {engagements.map(([label, value, delta, Icon, color]) => (
          <div key={label} className="group flex items-center gap-4">
            <Icon className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-125" style={{ color }} />
            <div className="flex-1">
              <p className="text-xs text-[#8f887d]">{label}</p>
              <p className="mt-1 text-sm text-[#d8cebd]">{value}</p>
            </div>
            <span className="text-xs text-[#9ab65d]">{delta}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function TeamActivity() {
  const team = [
    { name: "Dr. Emma Harper", role: "Clinical Psychologist", actions: 24, avatar: "/women_1.png" },
    { name: "Liam Park", role: "Content Editor", actions: 18, avatar: "/women_2.png" },
    { name: "Sofia Delgado", role: "Research Lead", actions: 15, avatar: "/women_1.png" },
  ]

  return (
    <section className="anim-up delay-11 glass-card hover-lift rounded-md p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-[Georgia] text-xl">Team</h2>
        <Link href="/admin/users" className="group text-xs text-[#e65e48]">
          All users <ArrowUpRight className="ml-1 inline size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-6 space-y-5">
        {team.map((member) => (
          <div key={member.name} className="group flex items-center gap-3">
            <div className="relative size-10 overflow-hidden rounded-full ring-2 ring-transparent transition-all group-hover:ring-[#e65e48]/20">
              <Image src={member.avatar} alt="" fill className="object-cover" sizes="40px" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#eee6d8]">{member.name}</p>
              <p className="text-xs text-[#8f887d]">{member.role}</p>
            </div>
            <div className="text-right">
              <p className="metric-value text-sm text-[#d8cebd]">{member.actions}</p>
              <p className="text-xs text-[#8f887d]">actions</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 dot-grid rounded-md border border-white/10 bg-white/[0.025] p-4">
        <p className="text-xs text-[#8f887d]">Team activity this week</p>
        <div className="mt-3 flex gap-1">
          {[68, 45, 82, 55, 90, 72, 60].map((height, index) => (
            <div key={index} className="flex-1">
              <div
                className="rounded-sm transition-all duration-700 hover:opacity-100"
                style={{
                  height: `${height * 0.5}px`,
                  background: `linear-gradient(to top, #e65e48, #d4874b)`,
                  opacity: 0.3 + index * 0.1,
                  animationDelay: `${index * 80}ms`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-[#6f685f]">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>
    </section>
  )
}

function BottomBanner() {
  return (
    <section className="anim-up delay-12 border-glow mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
      <div className="relative z-10 flex items-center gap-8">
        <div className="hidden size-24 text-[#8a4e31] md:block anim-float">
          <svg viewBox="0 0 80 80" fill="none" className="size-full">
            <path d="M14 70C26 43 38 27 65 10" stroke="currentColor" strokeWidth="1.2" />
            <path d="M28 47C20 44 18 36 24 30C32 33 34 40 28 47Z" stroke="currentColor" />
            <path d="M42 30C35 25 35 17 42 12C48 17 48 25 42 30Z" stroke="currentColor" />
            <path d="M51 24C52 15 59 10 68 12C67 21 61 26 51 24Z" stroke="currentColor" />
            <path d="M23 57C16 56 11 62 10 70C18 71 24 66 23 57Z" stroke="currentColor" />
          </svg>
        </div>
        <div>
          <h2 className="font-[Georgia] text-3xl">
            Your studio, your{" "}
            <span className="gradient-text">mission.</span>
          </h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            Every piece of content you publish has the power to support someone&apos;s wellbeing journey.
          </p>
        </div>
      </div>
      <Link
        href="/admin/content"
        className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03]"
      >
        Open Content Studio <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  )
}
