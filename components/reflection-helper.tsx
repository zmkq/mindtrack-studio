"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  Brain,
  CheckCircle2,
  Cloud,
  Frown,
  Gauge,
  Grid2X2,
  Heart,
  LayoutDashboard,
  Leaf,
  Menu,
  MessageSquare,
  Moon,
  PenLine,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  SunMedium,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ReflectionResult = {
  disclaimer: string
  summary: string
  supportivePrompt: string
  suggestedNextStep: string
}

const defaultResult: ReflectionResult = {
  disclaimer: "This is not therapy or medical advice. It is only a reflection helper.",
  summary:
    "It sounds like you have been carrying a lot lately, balancing responsibilities, managing stress, and trying to stay strong for others. You are doing your best, even when it feels like it is not enough.",
  supportivePrompt:
    "You value growth and want clarity, but it is okay that things feel uncertain right now. You are not alone, and it is okay to take this one step at a time.",
  suggestedNextStep:
    "You have shown up for so much. Take a deep breath. You deserve care too.",
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
      ["Reflection", CheckCircle2, "/app/reflection"],
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

const moods: Array<[string, LucideIcon, string]> = [
  ["Overwhelmed", Cloud, "#e65e48"],
  ["Anxious", Frown, "#d4874b"],
  ["Sad", Frown, "#5787a8"],
  ["Calm", Smile, "#a8c764"],
  ["Grateful", Heart, "#e65e48"],
  ["Hopeful", SunMedium, "#a8c764"],
  ["Angry", Frown, "#e65e48"],
]

const nextSteps: Array<[string, string, LucideIcon, string]> = [
  ["Grounding Breath", "2-3 min breathing exercise.", Leaf, "#a8c764"],
  ["Thought Dump", "Release what's on your mind.", PenLine, "#d4874b"],
  ["Gratitude Pause", "Shift focus to small moments.", Heart, "#e65e48"],
  ["Self-Compassion", "Be kind to yourself, right now.", Heart, "#e65e48"],
  ["Sleep Reset", "Wind down with a calming routine.", Moon, "#a8c764"],
]

const recentReflections = [
  [
    "Overwhelmed",
    "Today felt heavy. I had so many things to do and not enough time. I kept pushing...",
    "May 24, 2026",
    "10:42 PM",
    Cloud,
    "#e65e48",
  ],
  [
    "Calm",
    "Took a quiet walk this evening. The air felt fresh and it helped me reset...",
    "May 22, 2026",
    "8:15 PM",
    Smile,
    "#a8c764",
  ],
  [
    "Grateful",
    "Grateful for my friends who checked in today. Little things mean a lot...",
    "May 20, 2026",
    "9:31 PM",
    Heart,
    "#e65e48",
  ],
] as const

export function ReflectionHelper() {
  const [reflection, setReflection] = useState("")
  const [selectedMoods, setSelectedMoods] = useState(["Overwhelmed"])
  const [result, setResult] = useState<ReflectionResult>(defaultResult)
  const [generatedAt, setGeneratedAt] = useState("Generated just now")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const count = reflection.length
  const prompt = useMemo(
    () =>
      reflection ||
      "I have been carrying a lot lately. I want to slow down, understand what I am feeling, and choose one kind next step.",
    [reflection]
  )

  function toggleMood(mood: string) {
    setSelectedMoods((current) =>
      current.includes(mood)
        ? current.filter((item) => item !== mood)
        : [...current, mood]
    )
  }

  function submit() {
    startTransition(async () => {
      const response = await fetch("/api/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reflection: prompt }),
      })
      const payload = await response.json()
      if (!response.ok) {
        setError(payload.error ?? "Reflection could not be summarized.")
        return
      }
      setError("")
      setResult(payload.data)
      setGeneratedAt("Generated just now")
    })
  }

  return (
    <main className="min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="grid min-h-screen xl:grid-cols-[230px_1fr]">
        <StudioSidebar />
        <section className="border-l border-white/10">
          <TopBar />
          <div className="px-5 py-12 md:px-8">
            <div data-tour="reflection-hero">
              <Hero />
            </div>
            <JournalPanel
              reflection={reflection}
              setReflection={setReflection}
              count={count}
              isPending={isPending}
              submit={submit}
              error={error}
            />
            <div data-tour="reflection-moods">
              <MoodSelector selectedMoods={selectedMoods} toggleMood={toggleMood} />
            </div>
            <div data-tour="reflection-summary">
              <SummaryPanel result={result} generatedAt={generatedAt} />
            </div>
            <NextSteps />
            <RecentReflections />
            <ClosingPill />
            <footer className="mt-10 flex flex-wrap justify-between gap-4 text-xs text-[#746d63]">
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

function StudioSidebar() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908] px-5 py-7 xl:flex">
      <div>
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8]">
            <Brain className="size-5" />
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
                      item === "Reflection"
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
            Research-driven.
            <br />
            Human-centered.
          </p>
          <div className="mt-20 h-24 rounded-full border border-[#7c4b2c]/50" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {["New Reflection", "View Insights", "Export Reflections"].map((item) => (
            <div
              key={item}
              className="mb-2 flex h-9 items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {item === "New Reflection" ? <ArrowRight className="size-3" /> : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar() {
  return (
    <header className="flex h-[84px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
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

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-none">
      <div className="absolute right-0 top-0 hidden h-[390px] w-[54%] opacity-55 lg:block">
        <Image src="/banner_book_2.png" alt="Candle and journal" fill priority className="object-cover" sizes="54vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090908] via-[#090908]/40 to-transparent" />
      </div>
      <div className="relative grid min-h-[360px] gap-10 lg:grid-cols-[0.62fr_0.38fr]">
        <div className="max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b]">
            Reflection helper
          </div>
          <h1 className="mt-7 font-[Georgia] text-[3.8rem] leading-[1.02] text-[#f1e6d6] md:text-[5rem]">
            Pause and <span className="text-[#e65e48]">reflect.</span>
            <br />
            You matter.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#b7afa4]">
            Take a moment to slow down, check in with yourself, and make sense
            of what you&apos;re feeling.
          </p>
          <div className="mt-8 flex max-w-[420px] items-start gap-4 rounded-md border border-white/10 bg-white/[0.055] p-5 text-sm leading-6 text-[#d8cebd]">
            <Shield className="mt-1 size-6 shrink-0 text-[#d4874b]" />
            <p>This is not therapy or medical advice. It is only a reflection helper.</p>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute left-3 top-16 font-[Georgia] text-2xl leading-snug text-[#d8cebd]">
            <span className="text-4xl text-[#d4874b]">“</span>
            Reflection turns
            <br />
            experience into
            <br />
            understanding.
            <p className="mt-5 font-sans text-xs text-[#b98257]">— Unknown</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function JournalPanel({
  reflection,
  setReflection,
  count,
  isPending,
  submit,
  error,
}: {
  reflection: string
  setReflection: (value: string) => void
  count: number
  isPending: boolean
  submit: () => void
  error: string
}) {
  return (
    <section data-tour="reflection-journal" className="rounded-xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-7 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-3xl">How are you feeling right now?</h2>
          <p className="mt-2 text-sm text-[#aaa296]">
            Write freely. There&apos;s no right or wrong way to express yourself.
          </p>
        </div>
        <span className="text-sm text-[#aaa296]">{count} / 4000</span>
      </div>
      <div className="mt-6 rounded-md border border-white/10 bg-[#11110f] p-4">
        <Textarea
          value={reflection}
          maxLength={4000}
          onChange={(event) => setReflection(event.target.value)}
          placeholder="Start writing your thoughts..."
          className="min-h-56 resize-none border-0 bg-transparent p-0 text-base leading-7 text-[#eee6d8] shadow-none placeholder:text-[#6f685f] focus-visible:ring-0"
        />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8f887d]">
          <p className="flex items-center gap-2">
            <Sprout className="size-4 text-[#8aa254]" />
            Tip: Be honest with yourself. This is your safe space.
          </p>
          <button className="rounded-md border border-white/10 px-4 py-2 text-[#b7afa4]">
            Use recent entry
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {error ? <p className="text-sm text-[#e65e48]">{error}</p> : <span />}
        <button
          disabled={isPending}
          onClick={submit}
          className="flex h-14 min-w-72 items-center justify-center gap-3 rounded-md bg-[#e65e48] px-8 text-sm font-semibold text-black disabled:opacity-60"
        >
          <Sparkles className="size-5" />
          Generate reflection
        </button>
      </div>
    </section>
  )
}

function MoodSelector({
  selectedMoods,
  toggleMood,
}: {
  selectedMoods: string[]
  toggleMood: (mood: string) => void
}) {
  return (
    <section className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d4874b]">
        How are you feeling?
      </p>
      <div className="mt-5 flex flex-wrap gap-4">
        {moods.map(([mood, Icon, color]) => {
          const active = selectedMoods.includes(mood)
          return (
            <button
              key={mood}
              onClick={() => toggleMood(mood)}
              className={`flex h-12 items-center gap-3 rounded-md border px-5 text-sm ${
                active
                  ? "border-[#e65e48] bg-[#e65e48]/10 text-[#eee6d8]"
                  : "border-white/10 bg-white/[0.035] text-[#d8cebd]"
              }`}
            >
              <Icon className="size-5" style={{ color }} />
              {mood}
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-[#8f887d]">You can select multiple moods</p>
    </section>
  )
}

function SummaryPanel({
  result,
  generatedAt,
}: {
  result: ReflectionResult
  generatedAt: string
}) {
  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <Sparkles className="mt-1 size-8 text-[#e65e48]" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Your reflection summary</h2>
            <p className="mt-2 text-sm text-[#aaa296]">
              Based on your reflection, here&apos;s what stood out.
            </p>
          </div>
        </div>
        <p className="text-xs text-[#8f887d]">
          {generatedAt} <span className="ml-2 inline-block size-2 rounded-full bg-[#8daa4f]" />
        </p>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="rounded-md border border-white/10 bg-[#12110f] p-6">
          <p className="text-sm leading-7 text-[#d8cebd]">{result.summary}</p>
          <p className="mt-6 text-sm leading-7 text-[#d8cebd]">{result.supportivePrompt}</p>
          <div className="mt-6 flex gap-4 rounded-md border border-[#8a5b37]/60 bg-[#d4874b]/8 p-5">
            <Leaf className="mt-1 size-7 shrink-0 text-[#9fb75e]" />
            <div>
              <p className="text-sm font-semibold text-[#d8cebd]">Kind reminder</p>
              <p className="mt-1 text-sm leading-6 text-[#d8cebd]">{result.suggestedNextStep}</p>
            </div>
          </div>
        </div>
        <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-full border border-[#6f4a2f]/40 bg-[radial-gradient(circle,rgba(212,117,66,0.12),transparent_65%)]">
          <Image src="/seed.png" alt="Seedling held in hands" fill className="object-cover opacity-80" sizes="260px" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#0d0d0c]/75" />
        </div>
      </div>
    </section>
  )
}

function NextSteps() {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex gap-4">
          <Leaf className="mt-1 size-7 text-[#8aa254]" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Suggested next steps</h2>
            <p className="mt-2 text-sm text-[#aaa296]">
              Based on your reflection, these practices may help you feel more grounded.
            </p>
          </div>
        </div>
        <Link href="/app" className="text-sm text-[#e65e48]">
          View all practices →
        </Link>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {nextSteps.map(([title, body, Icon, color]) => (
          <article key={title} className="rounded-md border border-white/10 bg-white/[0.035] p-6">
            <Icon className="size-8" style={{ color }} />
            <h3 className="mt-8 text-lg font-medium">{title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-[#aaa296]">{body}</p>
            <Link href="/app" className="mt-7 inline-flex items-center gap-2 text-sm text-[#e65e48]">
              Start practice <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecentReflections() {
  return (
    <section className="mt-9">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-3xl">Recent reflections</h2>
          <p className="mt-2 text-sm text-[#aaa296]">Your recent entries and summaries.</p>
        </div>
        <button className="text-sm text-[#e65e48]">View all →</button>
      </div>
      <div className="mt-6 space-y-3">
        {recentReflections.map(([mood, body, date, time, Icon, color]) => (
          <div
            key={mood}
            className="grid items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm md:grid-cols-[140px_1fr_130px_80px_24px]"
          >
            <p className="flex items-center gap-3">
              <Icon className="size-5" style={{ color }} />
              {mood}
            </p>
            <p className="truncate text-[#8f887d]">{body}</p>
            <p className="text-[#aaa296]">
              {date}
              <br />
              {time}
            </p>
            <button className="rounded-md border border-white/10 px-4 py-2 text-[#d8cebd]">
              View
            </button>
            <span className="text-[#8f887d]">⋮</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ClosingPill() {
  return (
    <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-6 py-4 text-center text-[#c79f67]">
      <Heart className="size-5 text-[#e65e48]" />
      You are not alone. Keep reflecting, keep growing.
    </div>
  )
}
