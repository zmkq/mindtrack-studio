"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Cloud,
  Flame,
  Heart,
  Leaf,
  Moon,
  Sparkles,
  Sprout,
  SunMedium,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react"

import { UserShell } from "@/components/user-shell"

const images = ["/banner_1.png", "/women_2.png", "/banner_book.png", "/seed.png", "/banner_3.png"]

export function UserDashboard() {
  return (
    <UserShell activeItem="Dashboard" searchPlaceholder="Search your dashboard...">
      {/* ═══ GREETING ═══ */}
      <section className="anim-up relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
        <div className="absolute right-0 top-0 hidden h-full w-[40%] opacity-40 md:block">
          <Image src="/banner_1.png" alt="" fill className="object-cover" sizes="40vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Your wellness space
          </div>
          <h1 className="mt-6 font-[Georgia] text-5xl leading-[1.05] text-[#f1e6d6] md:text-6xl">
            Good evening,{" "}
            <span className="shimmer-text">welcome back.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa296]">
            You&apos;ve been consistent this week. Keep building on your momentum —
            every small practice adds up to lasting change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app" className="group inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03]">
              <Sparkles className="size-4 transition-transform group-hover:rotate-12" /> Start Today&apos;s Practice
            </Link>
            <Link href="/app/reflection" className="flex h-12 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-6 text-sm text-[#d8cebd] transition-all hover:border-white/20">
              <Heart className="size-4 text-[#e65e48]" /> Reflect
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DAILY STATS ═══ */}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["Practice Streak", "7 days", "Personal best!", Flame, "#e65e48"],
          ["Completed Today", "2 / 3", "1 remaining", Check, "#a8c764"],
          ["Weekly Minutes", "48 min", "+12 min vs last week", Timer, "#d4874b"],
          ["Mind Score", "82", "+4 this week", Brain, "#a8c764"],
        ].map(([label, value, sub, Icon, color], index) => (
          <div key={label as string} className={`glass-card hover-lift anim-up delay-${index + 1} rounded-md p-6`}>
            <Icon className="size-7 transition-transform duration-500 hover:scale-110" style={{ color: color as string }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Today's Plan */}
        <section className="anim-up delay-5 rounded-md border border-white/10 bg-[#11110f] p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-[Georgia] text-2xl">Today&apos;s plan</h2>
              <p className="mt-1 text-sm text-[#8f887d]">Your personalized practice queue</p>
            </div>
            <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-3 py-1 text-xs text-[#a8c764]">2 of 3 done</span>
          </div>
          <div className="mt-7 space-y-3">
            {[
              { title: "5-Minute Breathing Reset", category: "Stress", duration: 5, done: true, color: "#e65e48" },
              { title: "Gratitude Reflection", category: "Habits", duration: 8, done: true, color: "#a8c764" },
              { title: "Evening Wind-Down", category: "Sleep", duration: 15, done: false, color: "#d4874b" },
            ].map((item) => (
              <div key={item.title} className={`interactive-row flex items-center gap-4 rounded-md border p-4 transition ${item.done ? "border-[#a8c764]/20 bg-[#a8c764]/5" : "border-white/10 bg-white/[0.025]"}`}>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full ${item.done ? "bg-[#a8c764] text-black" : "border-2 border-white/20"}`}>
                  {item.done ? <Check className="size-4" /> : null}
                </span>
                <div className="relative z-10 flex-1">
                  <p className={`text-sm ${item.done ? "text-[#aaa296] line-through" : "text-[#eee6d8]"}`}>{item.title}</p>
                  <p className="mt-0.5 text-xs text-[#8f887d]">{item.category} · {item.duration} min</p>
                </div>
                {!item.done && (
                  <button className="relative z-10 rounded-md bg-[#e65e48] px-4 py-2 text-xs font-semibold text-black transition-all hover:scale-[1.05]">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Mood & Wellness */}
        <section className="anim-up delay-6 space-y-5">
          <div className="border-glow rounded-md border border-white/10 bg-[#11110f] p-7">
            <h2 className="font-[Georgia] text-2xl">Mood check-in</h2>
            <p className="mt-1 text-sm text-[#8f887d]">How are you feeling right now?</p>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {["😫", "😔", "😐", "🙂", "😊"].map((emoji, index) => (
                <button key={emoji} className={`grid size-14 place-items-center rounded-md border text-2xl transition-all hover:scale-110 ${index === 3 ? "border-[#e65e48] bg-[#e65e48]/10 shadow-[0_0_15px_rgba(230,94,72,0.15)]" : "border-white/10 bg-white/[0.035]"}`}>
                  {emoji}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-[#8f887d]">
              <span>Rough</span>
              <span>Great</span>
            </div>
          </div>

          <div className="glass-card rounded-md p-6">
            <h3 className="text-sm font-medium text-[#d8cebd]">Weekly mood trend</h3>
            <div className="mt-5 flex items-end gap-2">
              {[3, 2, 4, 3, 4, 5, 4].map((level, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="rounded-sm transition-all" style={{ height: `${level * 14}px`, background: `linear-gradient(to top, #e65e48, ${level >= 4 ? "#a8c764" : "#d4874b"})`, opacity: 0.4 + index * 0.08 }} />
                  <p className="mt-2 text-[10px] text-[#6f685f]">{["M", "T", "W", "T", "F", "S", "S"][index]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══ EXPLORE CATEGORIES ═══ */}
      <section className="anim-up delay-7 mt-6">
        <h2 className="font-[Georgia] text-2xl">Explore practices</h2>
        <p className="mt-1 text-sm text-[#8f887d]">Pick a focus area that resonates today</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { name: "Stress", icon: SunMedium, color: "#e65e48", tools: 12, desc: "Calm your mind", href: "/app/stress" },
            { name: "Focus", icon: Target, color: "#d4874b", tools: 10, desc: "Sharpen attention", href: "/app/focus" },
            { name: "Sleep", icon: Moon, color: "#a8c764", tools: 8, desc: "Rest better", href: "/app/sleep" },
            { name: "Habits", icon: Sprout, color: "#a8c764", tools: 11, desc: "Build routines", href: "/app/habits" },
          ].map((cat, index) => (
            <Link key={cat.name} href={cat.href} className="group glass-card hover-lift rounded-md p-6">
              <cat.icon className="size-8 transition-transform duration-500 group-hover:scale-110" style={{ color: cat.color }} />
              <h3 className="mt-5 text-lg font-medium text-[#eee6d8]">{cat.name}</h3>
              <p className="mt-1 text-sm text-[#8f887d]">{cat.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#aaa296]">{cat.tools} tools</span>
                <ArrowRight className="size-4 text-[#8f887d] transition-transform group-hover:translate-x-1" style={{ color: cat.color }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ RECENT ACTIVITY ═══ */}
      <section className="anim-up delay-8 mt-6 rounded-md border border-white/10 bg-[#11110f] p-7">
        <h2 className="font-[Georgia] text-2xl">Recent activity</h2>
        <p className="mt-1 text-sm text-[#8f887d]">Your practice history</p>
        <div className="mt-6 divide-y divide-white/10">
          {[
            { title: "5-Minute Breathing Reset", time: "Today, 7:42 PM", type: "Completed", color: "#a8c764" },
            { title: "Gratitude Reflection", time: "Today, 6:15 PM", type: "Completed", color: "#a8c764" },
            { title: "Cognitive Reframing", time: "Yesterday, 9:30 PM", type: "Completed", color: "#a8c764" },
            { title: "Body Scan Meditation", time: "Yesterday, 7:00 PM", type: "Saved", color: "#d4874b" },
            { title: "Focus Flow Session", time: "2 days ago", type: "Completed", color: "#a8c764" },
          ].map((item) => (
            <div key={item.title + item.time} className="interactive-row flex items-center justify-between gap-4 py-4">
              <div className="relative z-10 flex items-center gap-3">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-sm text-[#eee6d8]">{item.title}</p>
                  <p className="text-xs text-[#8f887d]">{item.time}</p>
                </div>
              </div>
              <span className="relative z-10 text-xs" style={{ color: item.color }}>{item.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BOTTOM BANNER ═══ */}
      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Leaf className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Your journey matters.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">Every practice builds resilience for the long run.</p>
          </div>
        </div>
        <Link href="/app" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03]">
          Browse Library <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
