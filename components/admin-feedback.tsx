"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  Filter,
  Heart,
  MessageCircle,
  MessageSquare,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"
import { Input } from "@/components/ui/input"

const avatars = ["/women_1.png", "/women_2.png"]

const demoFeedback = [
  { user: "Anonymous", text: "The breathing exercise was exactly what I needed during my exam week. The guided audio made it easy to follow along.", tool: "5-Minute Breathing Reset", sentiment: "positive", helpful: true, time: "12 min ago", avatar: 0 },
  { user: "Campus Member", text: "I found the gratitude journaling to be very helpful for shifting my mindset. Would love to see a weekly version.", tool: "Gratitude Reflection", sentiment: "positive", helpful: true, time: "34 min ago", avatar: 1 },
  { user: "Anonymous", text: "The sleep journal was too long for me. I wish there was a shorter 5-minute version for busy days.", tool: "Sleep Journal Prompt", sentiment: "neutral", helpful: false, time: "1 hr ago", avatar: 0 },
  { user: "Campus Member", text: "This tool literally changed how I approach my morning routine. I feel more grounded and ready for the day.", tool: "Mindful Walking", sentiment: "positive", helpful: true, time: "2 hrs ago", avatar: 1 },
  { user: "Anonymous", text: "The cognitive reframing exercise felt a bit clinical. Could use warmer language and more relatable examples.", tool: "Cognitive Reframing", sentiment: "neutral", helpful: false, time: "3 hrs ago", avatar: 0 },
  { user: "Campus Member", text: "I use the Pomodoro session every day now. It's helped me focus so much better during study blocks.", tool: "Pomodoro Focus Session", sentiment: "positive", helpful: true, time: "4 hrs ago", avatar: 1 },
  { user: "Anonymous", text: "The body scan meditation was calming but the background sounds were a bit distracting.", tool: "Body Scan Meditation", sentiment: "neutral", helpful: false, time: "5 hrs ago", avatar: 0 },
  { user: "Campus Member", text: "Absolutely wonderful. The habit tracker setup gave me a framework I've been looking for for months.", tool: "Habit Tracker Setup", sentiment: "positive", helpful: true, time: "6 hrs ago", avatar: 1 },
  { user: "Anonymous", text: "I didn't find the goal setting workshop helpful. The steps felt too generic and not personalized enough.", tool: "Goal Setting Workshop", sentiment: "negative", helpful: false, time: "8 hrs ago", avatar: 0 },
  { user: "Campus Member", text: "The active listening exercise transformed my conversations with my partner. Thank you for creating this.", tool: "Active Listening Exercise", sentiment: "positive", helpful: true, time: "12 hrs ago", avatar: 1 },
]

export function AdminFeedbackPanel() {
  return (
    <AdminShell
      activeItem="Feedback"
      searchPlaceholder="Search feedback, tools..."
      sidebarNote={{ title: "User Signals", subtitle: "Every voice matters.\nEvery insight helps." }}
      quickActions={["Export Feedback", "Sentiment Report", "Flag Review"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            User signals
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Feedback
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Centralize user feedback, helpful votes, and qualitative notes from
            practice and reflection flows.
          </p>
        </div>
        <button className="flex h-12 items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-5 text-sm text-[#d8cebd]">
          Export Report <ArrowRight className="size-4 text-[#8f887d]" />
        </button>
      </div>

      <FeedbackMetrics />
      <SentimentOverview />

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["All Feedback", "Positive", "Neutral", "Negative", "Flagged"].map((tab, index) => (
            <button key={tab} className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}>
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_150px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
          <Input placeholder="Search feedback..." className="h-11 border-white/10 bg-white/[0.035] pl-11 text-[#eee6d8] placeholder:text-[#6f685f]" />
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          <Filter className="size-4" /> Filters
        </button>
      </div>

      <FeedbackStream />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <FeedbackThemes />
        <HelpfulVoteSummary />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div>
          <h2 className="font-[Georgia] text-3xl">Listening is the first step to building trust.</h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            User feedback shapes every improvement we make.
          </p>
        </div>
        <Link href="/admin/qa" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Open QA Tracker <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function FeedbackMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Feedback", "312", "+38 this week", MessageSquare, "#e65e48"],
    ["Helpful Votes", "1,204", "84% positive", ThumbsUp, "#a8c764"],
    ["Avg. Rating", "4.6 / 5", "+0.2 vs last month", Star, "#d4874b"],
    ["Response Rate", "92%", "Team responding actively", Check, "#a8c764"],
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

function SentimentOverview() {
  return (
    <section className="mt-5 rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Sentiment analysis</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Overall feedback sentiment distribution</p>
      <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr]">
        <div className="grid size-44 place-items-center rounded-full border-[24px] border-[#a8c764] border-r-[#d4874b] border-t-[#e65e48] text-center">
          <div>
            <p className="font-[Georgia] text-4xl text-[#f1e6d6]">84%</p>
            <p className="text-sm text-[#a8c764]">Positive</p>
          </div>
        </div>
        <div className="space-y-5 text-sm">
          {[
            ["Positive", "84%", "262 responses", "#a8c764"],
            ["Neutral", "11%", "34 responses", "#d4874b"],
            ["Negative", "5%", "16 responses", "#e65e48"],
          ].map(([label, percent, count, color]) => (
            <div key={label}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 text-[#b7afa4]">
                  <span className="size-3 rounded-sm" style={{ backgroundColor: color }} />
                  {label}
                </span>
                <span className="text-[#d8cebd]">{percent}</span>
              </div>
              <p className="mt-1 text-xs text-[#8f887d]">{count}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: percent, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeedbackStream() {
  return (
    <div className="mt-6 space-y-3">
      {demoFeedback.map((item, index) => (
        <div key={index} className="rounded-md border border-white/10 bg-[#11110f] p-5 transition hover:border-white/20">
          <div className="flex items-start gap-4">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image src={avatars[item.avatar]} alt="" fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#eee6d8]">{item.user}</span>
                  <SentimentBadge sentiment={item.sentiment} />
                </div>
                <span className="shrink-0 text-xs text-[#6f685f]">{item.time}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#aaa296]">{item.text}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="rounded bg-white/[0.04] px-3 py-1 text-xs text-[#8f887d]">{item.tool}</span>
                {item.helpful ? (
                  <span className="flex items-center gap-1 text-xs text-[#a8c764]">
                    <ThumbsUp className="size-3" /> Helpful
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-[#8f887d]">
                    <ThumbsDown className="size-3" /> Not helpful
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  if (sentiment === "positive") {
    return <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-0.5 text-[10px] text-[#a8c764]">Positive</span>
  }
  if (sentiment === "negative") {
    return <span className="rounded border border-[#e65e48]/25 bg-[#e65e48]/10 px-2 py-0.5 text-[10px] text-[#e65e48]">Negative</span>
  }
  return <span className="rounded border border-[#d4874b]/25 bg-[#d4874b]/10 px-2 py-0.5 text-[10px] text-[#d4874b]">Neutral</span>
}

function FeedbackThemes() {
  const themes = [
    { label: "Helpful & Practical", percent: "32%", count: 100, color: "#a8c764" },
    { label: "Easy to Use", percent: "18%", count: 56, color: "#a8c764" },
    { label: "Calming & Relaxing", percent: "16%", count: 50, color: "#d4874b" },
    { label: "Too Long", percent: "8%", count: 25, color: "#e65e48" },
    { label: "Life Changing", percent: "12%", count: 37, color: "#a8c764" },
    { label: "Needs More Variety", percent: "5%", count: 16, color: "#d4874b" },
    { label: "Great Audio", percent: "9%", count: 28, color: "#a8c764" },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Feedback themes</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Most common themes from user responses</p>
      <div className="mt-7 flex flex-wrap gap-2">
        {themes.map((theme) => (
          <span
            key={theme.label}
            className="rounded-md px-3 py-2 text-xs"
            style={{ backgroundColor: `${theme.color}10`, color: theme.color, border: `1px solid ${theme.color}25` }}
          >
            {theme.label} <span className="ml-1 opacity-60">{theme.percent}</span>
          </span>
        ))}
      </div>
      <div className="mt-7 space-y-3">
        {themes.slice(0, 4).map((theme) => (
          <div key={theme.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b7afa4]">{theme.label}</span>
              <span className="text-[#d8cebd]">{theme.count}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: theme.percent, backgroundColor: theme.color }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HelpfulVoteSummary() {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Helpful vote breakdown</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Tools ranked by helpful rate</p>
      <div className="mt-7 space-y-4">
        {[
          ["Gratitude Reflection", "94%", 1342, "#a8c764"],
          ["5-Minute Breathing Reset", "91%", 1204, "#e65e48"],
          ["Sleep Journal Prompt", "87%", 987, "#a8c764"],
          ["Pomodoro Focus Session", "85%", 845, "#d4874b"],
          ["Mindful Walking", "82%", 678, "#a8c764"],
        ].map(([name, rate, votes, color]) => (
          <div key={name as string} className="flex items-center gap-4">
            <Heart className="size-4 shrink-0" style={{ color: color as string }} />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#b7afa4]">{name}</span>
                <span className="text-[#d8cebd]">{rate}</span>
              </div>
              <p className="mt-1 text-xs text-[#8f887d]">{(votes as number).toLocaleString()} votes</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/analytics" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View engagement analytics <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
