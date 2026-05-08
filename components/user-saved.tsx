"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Cloud, Heart, Leaf, Moon, Play, Sparkles, Star, Sprout, SunMedium, Target, Timer, Trash2 , type LucideIcon } from "lucide-react"
import { UserShell } from "@/components/user-shell"

const saved = [
  { title: "5-Minute Breathing Reset", category: "Stress", duration: 5, savedDate: "May 6", icon: SunMedium, color: "#e65e48", img: "/banner_1.png" },
  { title: "Evening Wind-Down Routine", category: "Sleep", duration: 15, savedDate: "May 4", icon: Moon, color: "#a8c764", img: "/banner_3.png" },
  { title: "Focus Flow Session", category: "Focus", duration: 25, savedDate: "May 3", icon: Target, color: "#d4874b", img: "/banner_book.png" },
  { title: "Gratitude Reflection", category: "Habits", duration: 8, savedDate: "May 1", icon: Sprout, color: "#a8c764", img: "/seed.png" },
  { title: "Body Scan Meditation", category: "Stress", duration: 15, savedDate: "Apr 28", icon: SunMedium, color: "#e65e48", img: "/women_2.png" },
  { title: "Cognitive Reframing", category: "Stress", duration: 10, savedDate: "Apr 25", icon: Cloud, color: "#e65e48", img: "/banner_1.png" },
]

export function UserSavedPage() {
  return (
    <UserShell activeItem="Saved" searchPlaceholder="Search saved practices...">
      <div className="anim-up">
        <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Your collection</div>
        <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
          Saved <span className="shimmer-text">practices</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
          Your personal library of bookmarked tools and practices. Return to what works for you.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {([
          ["Saved Items", String(saved.length), "Across all categories", Star, "#d4874b"],
          ["Most Practiced", "Breathing Reset", "12 completions", Heart, "#e65e48"],
          ["Last Practiced", "2 hours ago", "Evening Wind-Down", Timer, "#a8c764"],
        ] as Array<[string, string, string, LucideIcon, string]>).map(([label, value, sub, Icon, color], i) => (
          <div key={label} className={`glass-card hover-lift anim-up delay-${i + 1} rounded-md p-6`}>
            <Icon className="size-7" style={{ color }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-3xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      <section className="anim-up delay-4 mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[Georgia] text-3xl">Your saved tools</h2>
            <p className="mt-1 text-sm text-[#8f887d]">{saved.length} practices saved</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saved.map((p) => (
            <div key={p.title} className="group glass-card hover-lift overflow-hidden rounded-md">
              <div className="relative h-32">
                <Image src={p.img} alt="" fill className="object-cover opacity-50 transition group-hover:opacity-70" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] to-transparent" />
                <button className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-black/50 text-[#8f887d] opacity-0 transition-all group-hover:opacity-100 hover:text-[#e65e48]">
                  <Trash2 className="size-3.5" />
                </button>
                <button className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#e65e48]/90 text-black opacity-0 transition-all group-hover:opacity-100">
                  <Play className="size-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <p.icon className="size-5" style={{ color: p.color }} />
                  <span className="text-xs text-[#8f887d]">{p.category} · {p.duration} min</span>
                </div>
                <h3 className="mt-3 text-base font-medium text-[#eee6d8]">{p.title}</h3>
                <p className="mt-3 text-xs text-[#6f685f]">Saved {p.savedDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Sparkles className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Curate what helps you.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">Your saved collection is your personal toolkit for wellbeing.</p>
          </div>
        </div>
        <Link href="/app" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Discover More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
