"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  ChevronDown,
  FileText,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"

const navGroups: Array<{
  label: string
  items: Array<[string, LucideIcon, string]>
}> = [
  {
    label: "Overview",
    items: [
      ["Dashboard", LayoutDashboard, "/admin/dashboard"],
      ["Analytics", Gauge, "/admin/analytics"],
    ],
  },
  {
    label: "Management",
    items: [
      ["Users", Users, "/admin/users"],
      ["Content", FileText, "/admin/content"],
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
      ["Messages", BookOpen, "/admin/messages"],
    ],
  },
  {
    label: "System",
    items: [["Settings", Settings, "/admin/settings"]],
  },
]

type AdminShellProps = {
  activeItem: string
  children: ReactNode
  rightPanel?: ReactNode
  sidebarNote?: { title: string; subtitle: string }
  quickActions?: string[]
  searchPlaceholder?: string
}

export function AdminShell({
  activeItem,
  children,
  rightPanel,
  sidebarNote = { title: "MindTrack Studio", subtitle: "Research-driven.\nMember-focused." },
  quickActions = ["Create Content", "Send Announcement", "Export Reports"],
  searchPlaceholder = "Search content, users, tools...",
}: AdminShellProps) {
  return (
    <main className="gradient-mesh grain-overlay min-h-screen bg-[#090908] text-[#eee6d8]">
      <div
        className={`relative z-10 grid min-h-screen ${
          rightPanel ? "xl:grid-cols-[230px_1fr_360px]" : "xl:grid-cols-[230px_1fr]"
        }`}
      >
        <Sidebar activeItem={activeItem} note={sidebarNote} quickActions={quickActions} />
        <section className={rightPanel ? "border-x border-white/10" : "border-l border-white/10"}>
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
        {rightPanel}
      </div>
    </main>
  )
}

function Sidebar({
  activeItem,
  note,
  quickActions,
}: {
  activeItem: string
  note: { title: string; subtitle: string }
  quickActions: string[]
}) {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908]/80 px-5 py-7 backdrop-blur-sm xl:flex">
      <div>
        <Link href="/" className="group flex items-center gap-3 anim-fade">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8] transition-all duration-500 group-hover:border-[#e65e48] group-hover:shadow-[0_0_20px_rgba(230,94,72,0.2)]">
            <Sparkles className="size-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
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
          <p className="text-sm font-medium">{note.title}</p>
          <p className="mt-2 whitespace-pre-line text-xs leading-5 text-[#898177]">
            {note.subtitle}
          </p>
          <div className="mt-20 h-24 rounded-full border border-[#7c4b2c]/50 anim-float" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {quickActions.map((item, index) => (
            <div
              key={item}
              className="glass-card-subtle mb-2 flex h-9 cursor-pointer items-center justify-between rounded-md px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {index === 0 ? <ArrowRight className="size-3" /> : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar({ searchPlaceholder }: { searchPlaceholder: string }) {
  return (
    <header className="anim-down flex h-[92px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
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
        <div className="group flex cursor-pointer items-center gap-3">
          <div className="relative size-9 overflow-hidden rounded-full ring-2 ring-transparent transition-all group-hover:ring-[#e65e48]/30">
            <Image src="/women_1.png" alt="Admin avatar" fill className="object-cover" sizes="36px" />
          </div>
          <div className="text-xs">
            <p className="font-medium text-[#eee6d8]">Admin</p>
            <p className="text-[#6f685f]">Studio</p>
          </div>
          <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
        </div>
      </div>
    </header>
  )
}
