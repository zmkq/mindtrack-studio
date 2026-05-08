"use client"

import Link from "next/link"
import { ArrowRight, Award, BookOpen, Calendar, Check, Clock, Flame, Heart, Leaf, Star, Target, TrendingUp, Trophy, Zap , type LucideIcon } from "lucide-react"
import { UserShell } from "@/components/user-shell"

export function UserProgressPage() {
  return (
    <UserShell activeItem="Progress" searchPlaceholder="Search progress...">
      <div className="anim-up">
        <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Your journey</div>
        <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
          Your <span className="shimmer-text">progress</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
          See how far you&apos;ve come. Every practice, every streak, every reflection adds up to real growth.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {([
          ["Total Practices", "87", "Since you joined", BookOpen, "#e65e48"],
          ["Current Streak", "7 days", "Personal best!", Flame, "#e65e48"],
          ["Total Minutes", "14.2 hrs", "Of mindful practice", Clock, "#d4874b"],
          ["Mind Score", "82 / 100", "+12 since starting", Star, "#a8c764"],
        ] as Array<[string, string, string, LucideIcon, string]>).map(([label, value, sub, Icon, color], i) => (
          <div key={label} className={`glass-card hover-lift anim-up delay-${i + 1} rounded-md p-6`}>
            <Icon className="size-7" style={{ color }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Weekly Activity */}
        <section className="anim-up delay-5 rounded-md border border-white/10 bg-[#11110f] p-7">
          <h2 className="font-[Georgia] text-2xl">Weekly activity</h2>
          <p className="mt-1 text-sm text-[#8f887d]">Practice minutes per day this week</p>
          <div className="mt-7 flex items-end gap-3">
            {[
              { day: "Mon", min: 18, done: true },
              { day: "Tue", min: 12, done: true },
              { day: "Wed", min: 25, done: true },
              { day: "Thu", min: 8, done: true },
              { day: "Fri", min: 22, done: true },
              { day: "Sat", min: 30, done: true },
              { day: "Sun", min: 15, done: true },
            ].map((d) => (
              <div key={d.day} className="flex-1 text-center">
                <div className="relative mx-auto w-full max-w-[40px]">
                  <div className="progress-shine overflow-hidden rounded-t-sm transition-all" style={{ height: `${d.min * 4}px`, background: "linear-gradient(to top, #e65e48, #d4874b)" }} />
                </div>
                <p className="mt-3 text-xs text-[#8f887d]">{d.day}</p>
                <p className="text-xs text-[#d8cebd]">{d.min}m</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.025] p-4">
            <span className="text-sm text-[#aaa296]">Weekly total</span>
            <span className="font-[Georgia] text-2xl text-[#f1e6d6]">130 min</span>
          </div>
        </section>

        {/* Achievements */}
        <section className="anim-up delay-6 space-y-5">
          <div className="border-glow rounded-md border border-white/10 bg-[#11110f] p-7">
            <h2 className="font-[Georgia] text-2xl">Achievements</h2>
            <p className="mt-1 text-sm text-[#8f887d]">Milestones you&apos;ve unlocked</p>
            <div className="mt-6 space-y-4">
              {[
                { name: "First Practice", desc: "Completed your first tool", icon: Zap, earned: true, color: "#a8c764" },
                { name: "Week Warrior", desc: "7-day practice streak", icon: Flame, earned: true, color: "#e65e48" },
                { name: "Deep Diver", desc: "Completed 50 practices", icon: BookOpen, earned: true, color: "#d4874b" },
                { name: "Zen Master", desc: "100 practices completed", icon: Trophy, earned: false, color: "#8f887d" },
                { name: "Month Strong", desc: "30-day streak", icon: Award, earned: false, color: "#8f887d" },
              ].map((a) => (
                <div key={a.name} className={`flex items-center gap-4 rounded-md border p-4 transition ${a.earned ? "border-white/10 bg-white/[0.025]" : "border-white/5 bg-white/[0.015] opacity-50"}`}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${a.color}15` }}>
                    <a.icon className="size-5" style={{ color: a.color }} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-[#eee6d8]">{a.name}</p>
                    <p className="text-xs text-[#8f887d]">{a.desc}</p>
                  </div>
                  {a.earned && <Check className="size-4 text-[#a8c764]" />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Category Breakdown */}
      <section className="anim-up delay-7 mt-6 rounded-md border border-white/10 bg-[#11110f] p-7">
        <h2 className="font-[Georgia] text-2xl">Category breakdown</h2>
        <p className="mt-1 text-sm text-[#8f887d]">Where you spend your practice time</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { name: "Stress", practices: 32, minutes: 245, color: "#e65e48", pct: 37 },
            { name: "Focus", practices: 23, minutes: 412, color: "#d4874b", pct: 26 },
            { name: "Sleep", practices: 18, minutes: 198, color: "#a8c764", pct: 21 },
            { name: "Habits", practices: 14, minutes: 86, color: "#a8c764", pct: 16 },
          ].map((cat) => (
            <div key={cat.name} className="glass-card-subtle rounded-md p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#eee6d8]">{cat.name}</span>
                <span className="text-xs text-[#8f887d]">{cat.pct}%</span>
              </div>
              <div className="progress-shine mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
              </div>
              <div className="mt-3 flex justify-between text-xs text-[#8f887d]">
                <span>{cat.practices} practices</span>
                <span>{cat.minutes} min</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <TrendingUp className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Growth is never linear.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">What matters is showing up. You&apos;re doing that beautifully.</p>
          </div>
        </div>
        <Link href="/app" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Continue Practicing <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
