"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock,
  Edit3,
  Filter,
  Globe,
  Inbox,
  Mail,
  Megaphone,
  MessageCircle,
  Plus,
  Search,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"
import { Input } from "@/components/ui/input"

const avatars = ["/women_1.png", "/women_2.png"]

const demoMessages = [
  { subject: "New Sleep Series Launch", preview: "We're excited to announce the launch of our new Sleep Foundations series, available to all members starting...", channel: "Announcement", recipients: "All Users", status: "sent", time: "May 6, 2026", avatar: 0 },
  { subject: "Weekly Wellness Digest", preview: "Here's your weekly roundup of new tools, popular practices, and community highlights from MindTrack Studio...", channel: "Newsletter", recipients: "Subscribers", status: "sent", time: "May 5, 2026", avatar: 1 },
  { subject: "Exam Season Support", preview: "As exam season approaches, we've curated a special collection of stress management and focus tools to help...", channel: "Announcement", recipients: "Campus Members", status: "scheduled", time: "May 12, 2026", avatar: 0 },
  { subject: "Content Review Reminder", preview: "Hi team, please review the pending content items before end of day Friday. We have 3 items awaiting...", channel: "Internal", recipients: "Editors", status: "sent", time: "May 4, 2026", avatar: 1 },
  { subject: "Feature Update: Habit Tracker", preview: "We've improved the habit tracker with new visualization options and weekly summaries. Check out what's new...", channel: "Product Update", recipients: "All Users", status: "draft", time: "—", avatar: 0 },
  { subject: "Gratitude Month Kickoff", preview: "May is Gratitude Month at MindTrack! Join us for daily gratitude prompts and a community reflection board...", channel: "Campaign", recipients: "All Users", status: "draft", time: "—", avatar: 1 },
  { subject: "Welcome to MindTrack", preview: "Thank you for joining MindTrack Studio. We're here to support your mental wellness journey with science-backed...", channel: "Onboarding", recipients: "New Users", status: "active", time: "Automated", avatar: 0 },
  { subject: "Practice Streak Milestone", preview: "Congratulations! You've completed 7 consecutive days of practice. Keep up the amazing work on your...", channel: "Nudge", recipients: "Active Users", status: "active", time: "Automated", avatar: 1 },
]

const channelConfig: Record<string, { color: string }> = {
  Announcement: { color: "#e65e48" },
  Newsletter: { color: "#a8c764" },
  Internal: { color: "#8f887d" },
  "Product Update": { color: "#d4874b" },
  Campaign: { color: "#e65e48" },
  Onboarding: { color: "#a8c764" },
  Nudge: { color: "#d4874b" },
}

export function AdminMessagesPanel() {
  return (
    <AdminShell
      activeItem="Messages"
      searchPlaceholder="Search messages, campaigns..."
      sidebarNote={{ title: "Communication", subtitle: "Connect with care.\nInform with intention." }}
      quickActions={["New Announcement", "Schedule Campaign", "View Templates"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Communication
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Messages
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Create announcements, schedule campaigns, manage nudges, and stay
            connected with your community through thoughtful communication.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <Plus className="size-4" /> New Message
        </button>
      </div>

      <MessageMetrics />

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["All Messages", "Sent", "Scheduled", "Drafts", "Automated"].map((tab, index) => (
            <button key={tab} className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}>
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_170px_150px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
          <Input placeholder="Search messages..." className="h-11 border-white/10 bg-white/[0.035] pl-11 text-[#eee6d8] placeholder:text-[#6f685f]" />
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          Channel <ChevronRight className="size-3" />
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
          <Filter className="size-4" /> Filters
        </button>
      </div>

      <MessageList />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChannelBreakdown />
        <ComposePreview />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="flex items-center gap-8">
          <Megaphone className="hidden size-16 text-[#8a4e31] md:block" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Words that reach people, matter.</h2>
            <p className="mt-2 text-sm text-[#8f887d]">
              Every message is an opportunity to support, inform, and connect with your community.
            </p>
          </div>
        </div>
        <Link href="/admin/feedback" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          View Feedback <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function MessageMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Sent", "156", "This month", Send, "#e65e48"],
    ["Open Rate", "68%", "+5pp vs last month", Mail, "#a8c764"],
    ["Scheduled", "3", "Next 7 days", Clock, "#d4874b"],
    ["Active Automations", "4", "Running smoothly", Bell, "#a8c764"],
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

function MessageList() {
  return (
    <div className="mt-6 space-y-3">
      {demoMessages.map((msg, index) => {
        const channel = channelConfig[msg.channel] ?? { color: "#8f887d" }
        return (
          <div key={index} className="group rounded-md border border-white/10 bg-[#11110f] p-5 transition hover:border-white/20">
            <div className="flex items-start gap-4">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatars[msg.avatar]} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-[#eee6d8]">{msg.subject}</h3>
                    <MessageStatus status={msg.status} />
                  </div>
                  <span className="shrink-0 text-xs text-[#6f685f]">{msg.time}</span>
                </div>
                <p className="mt-2 line-clamp-1 text-sm text-[#8f887d]">{msg.preview}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="rounded px-2 py-0.5 text-[10px]" style={{ color: channel.color, backgroundColor: `${channel.color}12`, border: `1px solid ${channel.color}25` }}>
                    {msg.channel}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#8f887d]">
                    <Users className="size-3" /> {msg.recipients}
                  </span>
                </div>
              </div>
              <button className="hidden shrink-0 rounded-md border border-white/10 px-3 py-2 text-xs text-[#d8cebd] opacity-0 transition group-hover:opacity-100 lg:block">
                {msg.status === "draft" ? "Edit" : "View"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MessageStatus({ status }: { status: string }) {
  if (status === "sent") return <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-0.5 text-[10px] text-[#a8c764]">Sent</span>
  if (status === "scheduled") return <span className="rounded border border-[#d4874b]/25 bg-[#d4874b]/10 px-2 py-0.5 text-[10px] text-[#d4874b]">Scheduled</span>
  if (status === "active") return <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-0.5 text-[10px] text-[#a8c764]">Active</span>
  return <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-2 py-0.5 text-[10px] text-[#8f887d]">Draft</span>
}

function ChannelBreakdown() {
  const channels = [
    { name: "Announcements", sent: 42, openRate: "72%", color: "#e65e48" },
    { name: "Newsletters", sent: 24, openRate: "68%", color: "#a8c764" },
    { name: "Product Updates", sent: 18, openRate: "61%", color: "#d4874b" },
    { name: "Campaigns", sent: 12, openRate: "74%", color: "#e65e48" },
    { name: "Internal", sent: 36, openRate: "89%", color: "#8f887d" },
    { name: "Automated Nudges", sent: 24, openRate: "55%", color: "#d4874b" },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Channel breakdown</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Performance by communication channel</p>
      <div className="mt-7 space-y-4">
        {channels.map((ch) => (
          <div key={ch.name} className="flex items-center gap-4">
            <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: ch.color }} />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#b7afa4]">{ch.name}</span>
                <span className="text-xs text-[#8f887d]">{ch.sent} sent · {ch.openRate} open</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: ch.openRate, backgroundColor: ch.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ComposePreview() {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Quick compose</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Draft a new announcement</p>
      <div className="mt-7 space-y-4">
        <div>
          <label className="mb-2 block text-xs text-[#8f887d]">Subject</label>
          <Input placeholder="Enter subject line..." className="h-11 border-white/10 bg-white/[0.035] text-[#eee6d8] placeholder:text-[#6f685f]" />
        </div>
        <div>
          <label className="mb-2 block text-xs text-[#8f887d]">Message</label>
          <div className="min-h-[120px] rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-[#6f685f]">
            Start typing your message...
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs text-[#8f887d]">Channel</label>
            <button className="flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
              Announcement <ChevronRight className="size-3" />
            </button>
          </div>
          <div>
            <label className="mb-2 block text-xs text-[#8f887d]">Recipients</label>
            <button className="flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
              All Users <ChevronRight className="size-3" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#d8cebd]">
            <Edit3 className="size-4" /> Save Draft
          </button>
          <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#e65e48] text-sm font-semibold text-black">
            <Send className="size-4" /> Send
          </button>
        </div>
      </div>
    </section>
  )
}
