"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Check, Flame, Leaf, Play, Plus, Repeat, Sprout, Target, Timer } from "lucide-react"
import { UserShell } from "@/components/user-shell"

const habits = [
  { name: "Morning Meditation", streak: 12, target: 30, time: "7:00 AM", done: true },
  { name: "Gratitude Journal", streak: 8, target: 30, time: "9:00 PM", done: true },
  { name: "10-Min Walk", streak: 5, target: 21, time: "12:30 PM", done: false },
  { name: "Digital Sunset", streak: 3, target: 14, time: "9:30 PM", done: false },
  { name: "Drink Water (8 cups)", streak: 7, target: 30, time: "All day", done: true },
]

const practices = [
  { title: "Habit Stacking Guide", desc: "Link new habits to existing routines for automatic, effortless consistency.", duration: 8, completions: 723 },
  { title: "The 2-Minute Rule", desc: "Start any habit by making it so small it takes less than 2 minutes to complete.", duration: 5, completions: 1089 },
  { title: "Temptation Bundling", desc: "Pair a habit you need to build with an activity you already enjoy.", duration: 6, completions: 445 },
  { title: "Implementation Intentions", desc: "Use 'when-then' planning to pre-decide when and where habits happen.", duration: 7, completions: 534 },
  { title: "Environment Design", desc: "Reshape your physical environment to make good habits obvious and bad ones invisible.", duration: 10, completions: 387 },
  { title: "Habit Tracking Ritual", desc: "A nightly review practice to mark your wins and keep momentum visible.", duration: 3, completions: 856 },
]

export function UserHabitsPage() {
  return (
    <UserShell activeItem="Habits" searchPlaceholder="Search habit tools...">
      <section className="anim-up relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
        <div className="absolute right-0 top-0 hidden h-full w-[45%] opacity-35 md:block">
          <Image src="/seed.png" alt="" fill className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Habit building</div>
          <h1 className="mt-6 font-[Georgia] text-5xl leading-[1.05] text-[#f1e6d6] md:text-6xl">
            Build habits that{" "}<span className="shimmer-text">last.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa296]">
            Small, consistent actions create lasting change. Track your habits, build streaks, and use science-backed strategies to make good behavior automatic.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Active Habits", "5", "3 completed today", Repeat, "#a8c764"],
          ["Best Streak", "12 days", "Morning Meditation", Flame, "#e65e48"],
          ["Consistency", "84%", "+7pp this month", Target, "#a8c764"],
        ].map(([label, value, sub, Icon, color], i) => (
          <div key={label as string} className={`glass-card hover-lift anim-up delay-${i + 1} rounded-md p-6`}>
            <Icon className="size-7" style={{ color: color as string }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      <section className="anim-up delay-4 mt-8 rounded-md border border-white/10 bg-[#11110f] p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-[Georgia] text-2xl">Today&apos;s habits</h2>
            <p className="mt-1 text-sm text-[#8f887d]">3 of 5 completed</p>
          </div>
          <button className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-4 text-xs text-[#d8cebd]">
            <Plus className="size-3" /> Add Habit
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {habits.map((h) => (
            <div key={h.name} className={`interactive-row flex items-center gap-4 rounded-md border p-4 transition ${h.done ? "border-[#a8c764]/20 bg-[#a8c764]/5" : "border-white/10 bg-white/[0.025]"}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${h.done ? "bg-[#a8c764] text-black" : "border-2 border-white/20"}`}>
                {h.done ? <Check className="size-4" /> : null}
              </span>
              <div className="relative z-10 flex-1">
                <p className={`text-sm ${h.done ? "text-[#aaa296] line-through" : "text-[#eee6d8]"}`}>{h.name}</p>
                <p className="mt-0.5 text-xs text-[#8f887d]">{h.time} · {h.streak} day streak</p>
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="hidden w-20 sm:block">
                  <div className="progress-shine h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#a8c764]" style={{ width: `${(h.streak / h.target) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] text-[#8f887d]">{h.streak}/{h.target}</p>
                </div>
                <Flame className="size-4" style={{ color: h.streak >= 7 ? "#e65e48" : "#8f887d" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="anim-up delay-6 mt-6">
        <h2 className="font-[Georgia] text-3xl">Habit-building tools</h2>
        <p className="mt-2 text-sm text-[#8f887d]">Strategies from behavioral science to make habits stick.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((p) => (
            <div key={p.title} className="group glass-card hover-lift overflow-hidden rounded-md p-6">
              <Sprout className="size-7 text-[#a8c764]" />
              <h3 className="mt-5 text-base font-medium text-[#eee6d8]">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#aaa296]">{p.desc}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[#8f887d]">
                <span className="flex items-center gap-1"><Timer className="size-3" /> {p.duration} min</span>
                <span>{p.completions} completed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Leaf className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Tiny steps, lasting change.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">You don&apos;t rise to the level of your goals. You fall to the level of your systems.</p>
          </div>
        </div>
        <Link href="/app/progress" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          View Progress <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
