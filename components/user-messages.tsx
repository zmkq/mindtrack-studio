"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bell, Check, Heart, Leaf, MessageCircle, Send, Sparkles, Star , type LucideIcon } from "lucide-react"
import { UserShell } from "@/components/user-shell"
import { Input } from "@/components/ui/input"

const messages = [
  { title: "Welcome to MindTrack Studio", preview: "Thank you for joining us. We're here to support your mental wellness journey with science-backed tools and practices...", from: "MindTrack Team", time: "May 6", read: true, type: "welcome" },
  { title: "🎉 You've completed 50 practices!", preview: "Incredible milestone! You've now completed 50 practices on MindTrack. That's real commitment to your wellbeing...", from: "MindTrack", time: "May 5", read: true, type: "achievement" },
  { title: "New: Sleep Foundations Series", preview: "We've just launched a new 7-day Sleep Foundations series. Improve your sleep quality with nightly guided practices...", from: "Content Team", time: "May 4", read: false, type: "announcement" },
  { title: "Weekly Wellness Digest", preview: "Here's your weekly roundup: You practiced 130 minutes, completed 7 tools, and maintained a 7-day streak...", from: "MindTrack", time: "May 3", read: false, type: "digest" },
  { title: "Exam Season Support", preview: "As exam season approaches, we've curated a special collection of stress management and focus tools to help...", from: "Wellness Team", time: "May 1", read: true, type: "announcement" },
  { title: "Your April Progress Report", preview: "April was a great month for you! 42 practices, 8.5 hours of mindful practice, and your Mind Score improved by...", from: "MindTrack", time: "Apr 30", read: true, type: "report" },
]

const typeColors: Record<string, string> = {
  welcome: "#a8c764",
  achievement: "#e65e48",
  announcement: "#d4874b",
  digest: "#a8c764",
  report: "#d4874b",
}

export function UserMessagesPage() {
  return (
    <UserShell activeItem="Messages" searchPlaceholder="Search messages...">
      <div className="anim-up">
        <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">Inbox</div>
        <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
          Your <span className="shimmer-text">messages</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
          Updates, achievements, and wellness insights delivered to support your journey.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {([
          ["Unread", "2", "New messages", MessageCircle, "#e65e48"],
          ["This Week", "4", "Messages received", Bell, "#d4874b"],
          ["Achievements", "3", "Earned this month", Star, "#a8c764"],
        ] as Array<[string, string, string, LucideIcon, string]>).map(([label, value, sub, Icon, color], i) => (
          <div key={label} className={`glass-card hover-lift anim-up delay-${i + 1} rounded-md p-6`}>
            <Icon className="size-7" style={{ color }} />
            <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
            <p className="metric-value mt-3 font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
            <p className="mt-3 text-xs text-[#9ab65d]">{sub}</p>
          </div>
        ))}
      </div>

      <section className="anim-up delay-4 mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[Georgia] text-3xl">Inbox</h2>
            <p className="mt-1 text-sm text-[#8f887d]">{messages.length} messages · 2 unread</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {messages.map((msg) => {
            const color = typeColors[msg.type] ?? "#8f887d"
            return (
              <div key={msg.title} className={`interactive-row group rounded-md border p-5 transition ${msg.read ? "border-white/10 bg-[#11110f]" : "border-white/15 bg-white/[0.04]"}`}>
                <div className="relative z-10 flex items-start gap-4">
                  <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${color}15` }}>
                    {msg.type === "achievement" ? <Star className="size-5" style={{ color }} /> : msg.type === "digest" ? <Sparkles className="size-5" style={{ color }} /> : <MessageCircle className="size-5" style={{ color }} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className={`text-sm ${msg.read ? "text-[#b7afa4]" : "font-medium text-[#eee6d8]"}`}>{msg.title}</h3>
                      <div className="flex shrink-0 items-center gap-2">
                        {!msg.read && <span className="size-2 rounded-full bg-[#e65e48] shadow-[0_0_6px_rgba(230,94,72,0.5)]" />}
                        <span className="text-xs text-[#6f685f]">{msg.time}</span>
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-1 text-sm text-[#8f887d]">{msg.preview}</p>
                    <p className="mt-2 text-xs text-[#6f685f]">From: {msg.from}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="relative z-10 flex items-center gap-6">
          <Heart className="hidden size-14 text-[#8a4e31] md:block anim-float" />
          <div>
            <h2 className="font-[Georgia] text-3xl"><span className="gradient-text">We&apos;re here for you.</span></h2>
            <p className="mt-2 text-sm text-[#8f887d]">Every message is crafted to support your wellbeing journey.</p>
          </div>
        </div>
        <Link href="/app/dashboard" className="relative z-10 group flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong">
          Back to Dashboard <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </UserShell>
  )
}
