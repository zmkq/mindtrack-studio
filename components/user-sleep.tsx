"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Clock, Moon, Play, Sparkles, Star, Timer } from "lucide-react"
import { UserShell } from "@/components/user-shell"

const practices = [
  { title: "Evening Wind-Down Routine", desc: "A guided sequence to transition from your active day into restful evening, preparing body and mind for sleep.", duration: 15, completions: 892 },
  { title: "Sleep Hygiene Checklist", desc: "Review and optimize your sleep environment and pre-bed habits for deeper, more restorative rest.", duration: 5, completions: 1134 },
  { title: "Body Scan for Sleep", desc: "A slow, progressive relaxation that guides awareness through your body, releasing tension for easier sleep onset.", duration: 20, completions: 667 },
  { title: "Sleep Story: Rain on Leaves", desc: "A calming narrative set in nature, designed to gently occupy the mind as you drift off to sleep.", duration: 25, completions: 534 },
  { title: "4-7-8 Breathing Technique", desc: "A specific breathing pattern clinically shown to activate relaxation and reduce the time it takes to fall asleep.", duration: 5, completions: 978 },
  { title: "Worry Journal Before Bed", desc: "Write down tomorrow's concerns before sleep so your mind can let go and rest more peacefully.", duration: 10, completions: 412 },
]

export function UserSleepPage() {
  return (
    <UserShell activeItem="Sleep" searchPlaceholder="Search sleep tools...">
      <section className="anim-up relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
        <div className="absolute right-0 top-0 hidden h-full w-[45%] opacity-30 md:block">
          <Image src="/seed.png" alt="" fill className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Sleep &amp; rest</div>
          <h1 className="mt-6 font-[Georgia] text-5xl leading-[1.05] text-[#f1e6d6] md:text-6xl">
            Rest deeper,{" "}<span className="shimmer-text">wake renewed.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa296]">
            Science-backed routines and techniques to improve your sleep quality, fall asleep faster, and wake feeling restored.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Avg. Sleep Quality", "7.4 / 10", "+0.8 this month", Star, "#a8c764"],
          ["Wind-Down Streak", "5 nights", "Keep it going!", Moon, "#d4874b"],
          ["Avg. Time to Sleep", "18 min", "↓ 6 min improved", Clock, "#a8c764"],
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
        <h2 className="font-[Georgia] text-3xl">Sleep practices</h2>
        <p className="mt-2 text-sm text-[#8f887d]">Build a restful evening, one habit at a time.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((p) => (
            <div key={p.title} className="group glass-card hover-lift overflow-hidden rounded-md p-6">
              <Moon className="size-7 text-[#a8c764]" />
              <h3 className="mt-5 text-base font-medium text-[#eee6d8]">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#aaa296]">{p.desc}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[#8f887d]">
                <span className="flex items-center gap-1"><Timer className="size-3" /> {p.duration} min</span>
                <span>{p.completions} completed</span>
              </div>
              <button className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#a8c764]/15 text-sm text-[#a8c764] opacity-0 transition-all group-hover:opacity-100">
                <Play className="size-4" /> Begin
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Moon className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Good sleep changes everything.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">Rest is not a luxury — it&apos;s the foundation of wellbeing.</p>
          </div>
        </div>
        <Link href="/app" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Browse Library <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
