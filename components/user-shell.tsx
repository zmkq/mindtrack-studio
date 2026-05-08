"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  Cloud,
  Heart,
  Home,
  Menu,
  Moon,
  Search,
  Send,
  Sprout,
  Star,
  SunMedium,
  Target,
  type LucideIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"

const navGroups: Array<{
  label: string
  items: Array<[string, LucideIcon, string]>
}> = [
  {
    label: "Practice",
    items: [
      ["Dashboard", Home, "/app/dashboard"],
      ["Library", BookOpen, "/app"],
      ["Reflection", Heart, "/app/reflection"],
    ],
  },
  {
    label: "Explore",
    items: [
      ["Stress", Cloud, "/app/stress"],
      ["Focus", Target, "/app/focus"],
      ["Sleep", Moon, "/app/sleep"],
      ["Habits", Sprout, "/app/habits"],
    ],
  },
  {
    label: "Account",
    items: [
      ["Saved", Star, "/app/saved"],
      ["Progress", CheckCircle2, "/app/progress"],
      ["Messages", Send, "/app/messages"],
    ],
  },
]

type UserShellProps = {
  activeItem: string
  children: ReactNode
  searchPlaceholder?: string
}

export function UserShell({
  activeItem,
  children,
  searchPlaceholder = "Search practices, moods, topics...",
}: UserShellProps) {
  return (
    <main className="gradient-mesh grain-overlay min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="relative z-10 grid min-h-screen xl:grid-cols-[230px_1fr]">
        <Sidebar activeItem={activeItem} />
        <section className="border-l border-white/10">
          <TopBar searchPlaceholder={searchPlaceholder} />
          <div className="px-5 py-10 md:px-8">
            {children}
            <footer className="anim-up delay-12 mt-10 flex flex-wrap justify-between gap-4 text-xs text-[#746d63]">
              <span>© 2026 MindTrack Studio. All rights reserved.</span>
              <span className="flex gap-8">
                <span className="transition hover:text-[#d8cebd]">Privacy Policy</span>
                <span className="transition hover:text-[#d8cebd]">Terms of Service</span>
                <span className="transition hover:text-[#d8cebd]">Contact</span>
              </span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  )
}

function Sidebar({ activeItem }: { activeItem: string }) {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908]/80 px-5 py-7 backdrop-blur-sm xl:flex">
      <div>
        <Link href="/" className="group flex items-center gap-3 anim-fade">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8] transition-all duration-500 group-hover:border-[#e65e48] group-hover:shadow-[0_0_20px_rgba(230,94,72,0.2)]">
            <Brain className="size-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </span>
          <span className="text-base font-semibold uppercase leading-5 tracking-[0.24em]">
            MindTrack
            <br />
            Studio
          </span>
        </Link>
        <Link
          href="/"
          className="anim-up delay-1 mt-12 flex h-11 items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-[#d7cdbc] transition-all hover:border-white/20 hover:bg-white/[0.06]"
        >
          <ArrowLeft className="size-4" /> Back to Studio
        </Link>
        <div className="mt-12 space-y-9">
          {navGroups.map((group, groupIndex) => (
            <div key={group.label} className={`anim-up delay-${groupIndex + 2}`}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b98257] glow-text-amber">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(([item, Icon, href]) => {
                  const isActive = item === activeItem
                  return (
                    <Link
                      key={item}
                      href={href}
                      className={`group/nav relative flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-[#e65e48]/12 text-[#e65e48] shadow-[inset_0_0_20px_rgba(230,94,72,0.06)]"
                          : "text-[#999185] hover:bg-white/[0.04] hover:text-[#d8cebd]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#e65e48] shadow-[0_0_8px_rgba(230,94,72,0.5)]" />
                      )}
                      <Icon className={`size-4 transition-transform duration-300 ${isActive ? "" : "group-hover/nav:scale-110"}`} />
                      {item}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5 anim-up delay-6">
        <div className="radial-ring relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-medium">Today&apos;s note</p>
          <p className="mt-2 text-xs leading-5 text-[#898177]">
            Small practices count.
            <br />
            Come back gently.
          </p>
          <div className="mt-16 h-24 rounded-full border border-[#7c4b2c]/50 anim-float" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {[
            ["Start Practice", "/app"],
            ["Open Reflection", "/app/reflection"],
            ["Saved Tools", "/app/saved"],
          ].map(([item, href], index) => (
            <Link
              key={item}
              href={href}
              className="glass-card-subtle mb-2 flex h-9 cursor-pointer items-center justify-between rounded-md px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {index === 0 ? <ArrowRight className="size-3" /> : null}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar({ searchPlaceholder }: { searchPlaceholder: string }) {
  return (
    <header className="anim-down flex h-[84px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
      <button className="grid size-10 place-items-center rounded-md text-[#d8cebd] xl:hidden">
        <Menu className="size-5" />
      </button>
      <div className="relative ml-auto w-full max-w-[430px]">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          placeholder={searchPlaceholder}
          className="h-12 border-white/10 bg-white/[0.035] pl-11 text-sm text-[#eee6d8] placeholder:text-[#6f685f] transition-all focus:border-[#e65e48]/30 focus:shadow-[0_0_20px_rgba(230,94,72,0.08)]"
        />
      </div>
      <div className="hidden items-center gap-5 text-[#aaa296] md:flex">
        <SunMedium className="size-5 cursor-pointer transition-all hover:rotate-45 hover:text-[#d4874b]" />
        <div className="relative">
          <Bell className="size-5 cursor-pointer transition-all hover:text-[#e65e48]" />
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-[#e65e48] shadow-[0_0_8px_rgba(230,94,72,0.5)]" />
        </div>
        <Link href="/app/reflection" className="group rounded-md bg-[#e65e48] px-4 py-2 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03]">
          Reflect
        </Link>
      </div>
    </header>
  )
}
