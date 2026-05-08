"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Brain, Check, CircleDot, Eye, Flame, Leaf, Play, Target, Timer, Zap } from "lucide-react"
import { UserShell } from "@/components/user-shell"

const practices = [
  { title: "Focus Flow Session", desc: "A timed deep work session with ambient soundscapes to help you enter and sustain a flow state.", duration: 25, completions: 912 },
  { title: "Pomodoro Timer", desc: "Structured focus intervals with mindful breaks, designed to maintain attention across long tasks.", duration: 30, completions: 1204 },
  { title: "Attention Training", desc: "Short exercises that strengthen your ability to direct and sustain attention deliberately.", duration: 8, completions: 567 },
  { title: "Digital Detox Check-in", desc: "A guided pause from screens with prompts to notice distractions and reset intention.", duration: 5, completions: 423 },
  { title: "Single-Tasking Practice", desc: "Learn to do one thing at a time with full presence, reducing the cognitive cost of task-switching.", duration: 15, completions: 334 },
  { title: "Mindful Listening", desc: "Practice deep listening as a focus exercise — strengthening attention through auditory presence.", duration: 10, completions: 298 },
]

export function UserFocusPage() {
  return (
    <UserShell activeItem="Focus" searchPlaceholder="Search focus tools...">
      <section className="anim-up relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
        <div className="absolute right-0 top-0 hidden h-full w-[45%] opacity-35 md:block">
          <Image src="/banner_book.png" alt="" fill className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Deep focus</div>
          <h1 className="mt-6 font-[Georgia] text-5xl leading-[1.05] text-[#f1e6d6] md:text-6xl">
            Sharpen your{" "}<span className="shimmer-text">attention.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa296]">
            Train your ability to focus deeply, reduce distractions, and build the mental clarity needed for meaningful work.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Focus Sessions", "23", "This month", Target, "#d4874b"],
          ["Total Deep Time", "9.5 hrs", "+2.1 hrs vs last month", Timer, "#a8c764"],
          ["Distraction Score", "Low", "Improving steadily", Eye, "#a8c764"],
        ].map(([label, value, sub, Icon, color], i) => (
          <div key={label as string} className={`glass-card hover-lift anim-up delay-${i + 1} rounded-md p-6`}>
            <Icon className="size-7" style={{ color: color as string }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      <section className="anim-up delay-4 mt-8">
        <h2 className="font-[Georgia] text-3xl">Focus practices</h2>
        <p className="mt-2 text-sm text-[#8f887d]">Build attention as a skill, one session at a time.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((p) => (
            <div key={p.title} className="group glass-card hover-lift overflow-hidden rounded-md p-6">
              <Target className="size-7 text-[#d4874b]" />
              <h3 className="mt-5 text-base font-medium text-[#eee6d8]">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#aaa296]">{p.desc}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[#8f887d]">
                <span className="flex items-center gap-1"><Timer className="size-3" /> {p.duration} min</span>
                <span>{p.completions} completed</span>
              </div>
              <button className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#d4874b]/15 text-sm text-[#d4874b] opacity-0 transition-all group-hover:opacity-100">
                <Play className="size-4" /> Start Session
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <CircleDot className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Presence is power.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">The ability to focus is one of the most valuable skills you can build.</p>
          </div>
        </div>
        <Link href="/app" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Browse Library <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
