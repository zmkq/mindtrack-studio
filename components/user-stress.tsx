"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Brain, Check, Cloud, Heart, Leaf, Play, SunMedium, Timer, TrendingDown, Wind } from "lucide-react"
import { UserShell } from "@/components/user-shell"

const practices = [
  { title: "5-Minute Breathing Reset", desc: "A quick guided breathing exercise to activate your parasympathetic nervous system and bring calm.", duration: 5, completions: 847, img: "/banner_1.png" },
  { title: "Progressive Muscle Relaxation", desc: "Systematically tense and release muscle groups to release stored physical tension.", duration: 12, completions: 634, img: "/women_2.png" },
  { title: "Cognitive Reframing", desc: "Challenge anxious thought patterns with evidence-based cognitive restructuring techniques.", duration: 10, completions: 512, img: "/banner_book.png" },
  { title: "Worry Time Scheduling", desc: "Contain anxiety by designating a specific time to process worries, freeing the rest of your day.", duration: 8, completions: 389, img: "/banner_3.png" },
  { title: "Grounding Technique (5-4-3-2-1)", desc: "Use your senses to anchor yourself in the present moment when anxiety feels overwhelming.", duration: 5, completions: 721, img: "/seed.png" },
  { title: "Body Scan Meditation", desc: "A mindful journey through your body to notice and release tension you may not realize you're holding.", duration: 15, completions: 445, img: "/banner_1.png" },
]

export function UserStressPage() {
  return (
    <UserShell activeItem="Stress" searchPlaceholder="Search stress tools...">
      <section className="anim-up relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
        <div className="absolute right-0 top-0 hidden h-full w-[45%] opacity-35 md:block">
          <Image src="/banner_3.png" alt="" fill className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/70 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Stress management</div>
          <h1 className="mt-6 font-[Georgia] text-5xl leading-[1.05] text-[#f1e6d6] md:text-6xl">
            Calm your mind,{" "}<span className="shimmer-text">gently.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa296]">
            Evidence-based practices to help you manage stress, reduce anxiety, and build emotional resilience for daily life.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Stress Level", "Moderate", "↓ Improving", TrendingDown, "#a8c764"],
          ["Practices Done", "14", "This month", Check, "#e65e48"],
          ["Avg. Calm Time", "8 min", "+2 min vs last week", Timer, "#d4874b"],
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
        <h2 className="font-[Georgia] text-3xl">Stress relief practices</h2>
        <p className="mt-2 text-sm text-[#8f887d]">Choose one tool and keep the next step small.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((p, i) => (
            <div key={p.title} className="group glass-card hover-lift overflow-hidden rounded-md">
              <div className="relative h-36">
                <Image src={p.img} alt="" fill className="object-cover opacity-60 transition group-hover:opacity-80" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] to-transparent" />
                <button className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#e65e48]/90 text-black opacity-0 transition-all group-hover:opacity-100">
                  <Play className="size-4" />
                </button>
              </div>
              <div className="p-5">
                <SunMedium className="size-6 text-[#e65e48]" />
                <h3 className="mt-4 text-base font-medium text-[#eee6d8]">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#aaa296]">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-[#8f887d]">
                  <span>{p.duration} min</span>
                  <span>{p.completions} completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Wind className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">Breathe. You&apos;re safe here.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">Stress is natural. Managing it is a skill you can build.</p>
          </div>
        </div>
        <Link href="/app/reflection" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Reflect <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
