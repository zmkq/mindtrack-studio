"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Crown,
  Filter,
  Mail,
  MoreHorizontal,
  PenLine,
  Search,
  Shield,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"
import { Input } from "@/components/ui/input"

const avatars = ["/women_1.png", "/women_2.png"]

const demoUsers = [
  { name: "Dr. Emma Harper", email: "emma.harper@mindtrack.io", role: "Admin", status: "Active", joined: "Jan 12, 2026", sessions: 142, avatar: 0 },
  { name: "Liam Park", email: "liam.park@mindtrack.io", role: "Editor", status: "Active", joined: "Feb 3, 2026", sessions: 98, avatar: 1 },
  { name: "Sofia Delgado", email: "sofia.delgado@mindtrack.io", role: "Editor", status: "Active", joined: "Feb 18, 2026", sessions: 87, avatar: 0 },
  { name: "Marcus Chen", email: "marcus.chen@mindtrack.io", role: "Viewer", status: "Active", joined: "Mar 5, 2026", sessions: 64, avatar: 1 },
  { name: "Priya Sharma", email: "priya.sharma@mindtrack.io", role: "Editor", status: "Invited", joined: "Apr 1, 2026", sessions: 31, avatar: 0 },
  { name: "James Wright", email: "james.wright@mindtrack.io", role: "Viewer", status: "Active", joined: "Apr 10, 2026", sessions: 22, avatar: 1 },
  { name: "Aisha Okafor", email: "aisha.okafor@mindtrack.io", role: "Admin", status: "Active", joined: "Jan 5, 2026", sessions: 201, avatar: 0 },
  { name: "Daniel Kim", email: "daniel.kim@mindtrack.io", role: "Viewer", status: "Inactive", joined: "Mar 22, 2026", sessions: 8, avatar: 1 },
]

export function AdminUsersPanel() {
  return (
    <AdminShell
      activeItem="Users"
      searchPlaceholder="Search users, roles, emails..."
      sidebarNote={{ title: "People First", subtitle: "Every user represents\na real person's journey." }}
      quickActions={["Invite User", "Export Users", "Manage Roles"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Audience management
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Users
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Manage your studio team, track engagement, and control access roles
            across the platform.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <UserPlus className="size-4" /> Invite User
        </button>
      </div>

      <UserMetrics />

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["All Users", "Active", "Editors", "Admins", "Invited"].map((tab, index) => (
            <button
              key={tab}
              className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}
            >
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_170px_150px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
          <Input
            placeholder="Search by name or email..."
            className="h-11 border-white/10 bg-white/[0.035] pl-11 text-[#eee6d8] placeholder:text-[#6f685f]"
          />
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          Role <ChevronRight className="size-3" />
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          <Filter className="size-4" /> Filters
        </button>
      </div>

      <UserTable />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <RoleDistribution />
        <EngagementBreakdown />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div>
          <h2 className="font-[Georgia] text-3xl">People are at the heart of it all.</h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            Understanding your audience helps you create content that truly helps.
          </p>
        </div>
        <Link
          href="/admin/analytics"
          className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black"
        >
          View Analytics <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function UserMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Users", "2,847", "+214 this month", Users, "#e65e48"],
    ["Active Now", "1,923", "67.5% of total", UserCheck, "#a8c764"],
    ["New This Month", "214", "+32% vs April", UserPlus, "#d4874b"],
    ["Admin Users", "4", "Secure access", Crown, "#e65e48"],
  ]

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, delta, Icon, color]) => (
        <div key={label} className="glass-card hover-lift rounded-md p-6">
          <Icon className="size-7" style={{ color }} />
          <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
          <p className="mt-3 metric-value font-[Georgia] text-4xl text-[#f1e6d6]">{value}</p>
          <p className="mt-3 text-xs text-[#9ab65d]">{delta}</p>
        </div>
      ))}
    </div>
  )
}

function UserTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-white/10 bg-[#11110f]">
      <div className="grid grid-cols-[minmax(220px,1.4fr)_1fr_0.6fr_0.6fr_0.6fr_0.6fr_42px] border-b border-white/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a77b5e] max-lg:hidden">
        <span>User</span>
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span>Joined</span>
        <span>Sessions</span>
        <span />
      </div>
      <div className="divide-y divide-white/10">
        {demoUsers.map((user) => (
          <div
            key={user.email}
            className="grid items-center gap-4 px-5 py-4 text-sm transition hover:bg-white/[0.025] lg:grid-cols-[minmax(220px,1.4fr)_1fr_0.6fr_0.6fr_0.6fr_0.6fr_42px]"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatars[user.avatar]} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-[#ddd4c6]">{user.name}</p>
                <p className="mt-0.5 text-xs text-[#7f776d] lg:hidden">{user.role} · {user.status}</p>
              </div>
            </div>
            <span className="hidden text-[#aaa296] lg:block">{user.email}</span>
            <span className="hidden lg:block">
              <RoleBadge role={user.role} />
            </span>
            <span className="hidden lg:block">
              <StatusBadge status={user.status} />
            </span>
            <span className="hidden text-xs text-[#8f887d] lg:block">{user.joined}</span>
            <span className="hidden text-[#d8cebd] lg:block">{user.sessions}</span>
            <span className="hidden lg:flex items-center justify-end">
              <button className="grid size-8 place-items-center rounded text-[#8f887d] hover:bg-white/5 hover:text-[#eee6d8]">
                <MoreHorizontal className="size-4" />
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-[#8f887d]">
        <span>Showing 1 to {demoUsers.length} of {demoUsers.length} users</span>
        <div className="flex items-center gap-4">
          <ChevronLeft className="size-4" />
          <span className="grid size-8 place-items-center rounded border border-[#e65e48] text-[#e65e48]">1</span>
          <span>2</span>
          <span>3</span>
          <ChevronRight className="size-4" />
        </div>
      </div>
    </div>
  )
}

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, { border: string; bg: string; text: string }> = {
    Admin: { border: "border-[#e65e48]/25", bg: "bg-[#e65e48]/10", text: "text-[#e65e48]" },
    Editor: { border: "border-[#d4874b]/25", bg: "bg-[#d4874b]/10", text: "text-[#d4874b]" },
    Viewer: { border: "border-[#8f887d]/20", bg: "bg-white/[0.035]", text: "text-[#8f887d]" },
  }
  const s = styles[role] ?? styles.Viewer
  return (
    <span className={`rounded border px-2 py-1 text-xs ${s.border} ${s.bg} ${s.text}`}>
      {role}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Active") {
    return (
      <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-1 text-xs text-[#a8c764]">
        Active
      </span>
    )
  }
  if (status === "Invited") {
    return (
      <span className="rounded border border-[#d4874b]/25 bg-[#d4874b]/10 px-2 py-1 text-xs text-[#d4874b]">
        Invited
      </span>
    )
  }
  return (
    <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-2 py-1 text-xs text-[#8f887d]">
      Inactive
    </span>
  )
}

function RoleDistribution() {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Role distribution</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Access levels across the team</p>
      <div className="mt-8 grid gap-6 md:grid-cols-[180px_1fr]">
        <div className="grid size-44 place-items-center rounded-full border-[20px] border-[#8f887d] border-l-[#e65e48] border-t-[#d4874b] text-center">
          <div>
            <p className="font-[Georgia] text-4xl text-[#f1e6d6]">8</p>
            <p className="text-sm text-[#8f887d]">Team</p>
          </div>
        </div>
        <div className="space-y-5 text-sm">
          {[
            ["Admins", "2", "25%", "#e65e48"],
            ["Editors", "3", "37.5%", "#d4874b"],
            ["Viewers", "3", "37.5%", "#8f887d"],
          ].map(([label, count, percent, color]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-[#b7afa4]">
                <span className="size-3 rounded-sm" style={{ backgroundColor: color }} />
                {label}
              </span>
              <span className="text-[#d8cebd]">{count} ({percent})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EngagementBreakdown() {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">User engagement</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Activity patterns this month</p>
      <div className="mt-8 space-y-5">
        {[
          ["Power Users (50+ sessions)", 4, 2847, "#e65e48"],
          ["Regular Users (10-49 sessions)", 12, 2847, "#a8c764"],
          ["Casual Users (1-9 sessions)", 38, 2847, "#d4874b"],
          ["Inactive (0 sessions)", 6, 2847, "#8f887d"],
        ].map(([label, count, , color]) => (
          <div key={label as string}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b7afa4]">{label}</span>
              <span className="text-[#d8cebd]">{count as number}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(8, ((count as number) / 60) * 100)}%`,
                  backgroundColor: color as string,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/analytics" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View full analytics <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
