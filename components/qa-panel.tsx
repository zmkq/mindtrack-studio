"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  Bug,
  Check,
  Circle,
  Clock,
  FileText,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trash2,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { severities, ticketStatuses } from "@/lib/schemas"
import type { ContentCardDto } from "@/lib/services/content"

type Ticket = {
  id: string
  title: string
  description: string
  severity: string
  status: string
  relatedPage: string
  githubIssueUrl: string | null
  contentCardId: string | null
  contentTitle: string | null
}

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
      ["Content", BookOpen, "/admin/content"],
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
      ["QA Tracker", Bug, "/admin/qa"],
    ],
  },
  {
    label: "System",
    items: [
      ["Settings", Settings, "/admin/settings"],
      ["Integrations", Grid2X2, "/admin/integrations"],
      ["Audit Logs", FileText, "/admin/audit-logs"],
    ],
  },
]

const severityStyles: Record<string, { color: string; label: string }> = {
  low: { color: "#a8c764", label: "Low" },
  medium: { color: "#d4874b", label: "Medium" },
  high: { color: "#e65e48", label: "High" },
}

export function QaPanel({
  initialTickets,
  cards,
}: {
  initialTickets: Ticket[]
  cards: ContentCardDto[]
}) {
  const [tickets, setTickets] = useState(initialTickets)
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [query, setQuery] = useState("")
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    status: "open",
    relatedPage: "/app",
    githubIssueUrl: "",
    contentCardId: "",
  })
  const [selectedId, setSelectedId] = useState(initialTickets[0]?.id ?? "")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(
    () =>
      tickets.filter((ticket) => {
        const matchesQuery = `${ticket.title} ${ticket.description} ${ticket.relatedPage}`
          .toLowerCase()
          .includes(query.toLowerCase())
        return (
          matchesQuery &&
          (statusFilter === "all" || ticket.status === statusFilter) &&
          (severityFilter === "all" || ticket.severity === severityFilter)
        )
      }),
    [tickets, statusFilter, severityFilter, query]
  )

  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? filtered[0]
  const counts = {
    open: tickets.filter((ticket) => ticket.status === "open").length,
    progress: tickets.filter((ticket) => ticket.status === "in progress").length,
    fixed: tickets.filter((ticket) => ticket.status === "fixed").length,
    high: tickets.filter((ticket) => ticket.severity === "high").length,
  }

  function create() {
    startTransition(async () => {
      const response = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const body = await response.json()

      if (!response.ok) {
        setMessage(body.error ?? "Ticket could not be created.")
        return
      }

      setTickets((current) => [body.data, ...current])
      setSelectedId(body.data.id)
      setMessage("Ticket created.")
      setForm({
        title: "",
        description: "",
        severity: "medium",
        status: "open",
        relatedPage: "/app",
        githubIssueUrl: "",
        contentCardId: "",
      })
    })
  }

  function updateStatus(ticket: Ticket, status: string) {
    startTransition(async () => {
      const response = await fetch(`/api/qa/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const body = await response.json()
      if (response.ok) {
        setTickets((current) => current.map((item) => (item.id === ticket.id ? body.data : item)))
        setSelectedId(body.data.id)
        setMessage("Ticket updated.")
      }
    })
  }

  function remove(ticket: Ticket) {
    startTransition(async () => {
      const response = await fetch(`/api/qa/${ticket.id}`, { method: "DELETE" })
      if (response.ok) {
        setTickets((current) => current.filter((item) => item.id !== ticket.id))
        setSelectedId(tickets.find((item) => item.id !== ticket.id)?.id ?? "")
        setMessage("Ticket deleted.")
      }
    })
  }

  return (
    <main className="min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="grid min-h-screen xl:grid-cols-[230px_1fr_380px]">
        <StudioSidebar />
        <section className="border-x border-white/10">
          <TopBar query={query} setQuery={setQuery} />
          <div className="px-5 py-10 md:px-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b]">
                  QA tracker
                </div>
                <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
                  Quality signals,
                  <br />
                  tracked with care.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
                  Capture bugs, connect issues to content, and move each ticket
                  through a focused review workflow.
                </p>
              </div>
              <button
                onClick={create}
                disabled={isPending}
                className="flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-5 text-sm font-semibold text-black disabled:opacity-60"
              >
                <Plus className="size-4" />
                Create Ticket
              </button>
            </div>
            <div data-tour="qa-metrics">
              <MetricRow counts={counts} />
            </div>
            <Filters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              severityFilter={severityFilter}
              setSeverityFilter={setSeverityFilter}
            />
            <div data-tour="qa-board">
            <TicketBoard
              tickets={filtered}
              selectedId={selected?.id}
              setSelectedId={setSelectedId}
              updateStatus={updateStatus}
              remove={remove}
            />
            </div>
            <BottomBand />
            <footer className="mt-10 flex flex-wrap justify-between gap-4 text-xs text-[#746d63]">
              <span>© 2026 MindTrack Studio. All rights reserved.</span>
              <span className="flex gap-8">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact</span>
              </span>
            </footer>
          </div>
        </section>
        <div data-tour="qa-inspector">
        <Inspector
          selected={selected}
          form={form}
          setForm={setForm}
          cards={cards}
          create={create}
          updateStatus={updateStatus}
          remove={remove}
          isPending={isPending}
          message={message}
        />
        </div>
      </div>
    </main>
  )
}

function StudioSidebar() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908] px-5 py-7 xl:flex">
      <div>
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8]">
            <Sparkles className="size-5" />
          </span>
          <span className="text-base font-semibold uppercase leading-5 tracking-[0.24em]">
            MindTrack
            <br />
            Studio
          </span>
        </Link>
        <Link
          href="/"
          className="mt-12 flex h-11 items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-[#d7cdbc]"
        >
          <ArrowLeft className="size-4" /> Back to Studio
        </Link>
        <div className="mt-12 space-y-9">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b98257]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(([item, Icon, href]) => (
                  <Link
                    key={item}
                    href={href}
                    className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm ${
                      item === "QA Tracker"
                        ? "bg-[#e65e48]/12 text-[#e65e48]"
                        : "text-[#999185]"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-medium">Testing notes</p>
          <p className="mt-2 text-xs leading-5 text-[#898177]">
            Verify calmly.
            <br />
            Ship confidently.
          </p>
          <div className="mt-20 h-24 rounded-full border border-[#7c4b2c]/50" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {["New Ticket", "Review Open", "Export Tickets"].map((item) => (
            <div
              key={item}
              className="mb-2 flex h-9 items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {item === "New Ticket" ? <ArrowRight className="size-3" /> : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar({
  query,
  setQuery,
}: {
  query: string
  setQuery: (value: string) => void
}) {
  return (
    <header className="flex h-[84px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
      <button className="grid size-10 place-items-center rounded-md text-[#d8cebd] xl:hidden">
        <Menu className="size-5" />
      </button>
      <div className="relative ml-auto w-full max-w-[430px]">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search bugs, pages, content..."
          className="h-12 border-white/10 bg-white/[0.035] pl-11 text-sm text-[#eee6d8] placeholder:text-[#6f685f]"
        />
      </div>
      <div className="hidden items-center gap-5 text-[#aaa296] md:flex">
        <SunMedium className="size-5" />
        <Bell className="size-5" />
        <div className="relative size-9 overflow-hidden rounded-full">
          <Image src="/women_1.png" alt="Admin avatar" fill className="object-cover" sizes="36px" />
        </div>
      </div>
    </header>
  )
}

function MetricRow({ counts }: { counts: { open: number; progress: number; fixed: number; high: number } }) {
  const metrics: Array<[string, number, LucideIcon, string]> = [
    ["Open", counts.open, AlertTriangle, "#e65e48"],
    ["In progress", counts.progress, Clock, "#d4874b"],
    ["Fixed", counts.fixed, Check, "#a8c764"],
    ["High severity", counts.high, XCircle, "#e65e48"],
  ]
  return (
    <div className="mt-9 grid gap-4 md:grid-cols-4">
      {metrics.map(([label, value, Icon, color]) => (
        <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] p-6">
          <Icon className="size-7" style={{ color }} />
          <p className="mt-5 text-sm text-[#aaa296]">{label}</p>
          <p className="mt-3 font-[Georgia] text-4xl">{value}</p>
        </div>
      ))}
    </div>
  )
}

function Filters({
  statusFilter,
  setStatusFilter,
  severityFilter,
  setSeverityFilter,
}: {
  statusFilter: string
  setStatusFilter: (value: string) => void
  severityFilter: string
  setSeverityFilter: (value: string) => void
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-11 w-44 border-white/10 bg-white/[0.035] text-[#b7afa4]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {ticketStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={severityFilter} onValueChange={setSeverityFilter}>
        <SelectTrigger className="h-11 w-44 border-white/10 bg-white/[0.035] text-[#b7afa4]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All severities</SelectItem>
          {severities.map((severity) => (
            <SelectItem key={severity} value={severity}>
              {severity}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function TicketBoard({
  tickets,
  selectedId,
  setSelectedId,
  updateStatus,
  remove,
}: {
  tickets: Ticket[]
  selectedId?: string
  setSelectedId: (id: string) => void
  updateStatus: (ticket: Ticket, status: string) => void
  remove: (ticket: Ticket) => void
}) {
  const columns = [
    ["open", "Open"],
    ["in progress", "In Progress"],
    ["fixed", "Fixed"],
  ] as const

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      {columns.map(([status, title]) => (
        <section key={status} className="rounded-md border border-white/10 bg-[#11110f] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[Georgia] text-2xl">{title}</h2>
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[#8f887d]">
              {tickets.filter((ticket) => ticket.status === status).length}
            </span>
          </div>
          <div className="space-y-3">
            {tickets.filter((ticket) => ticket.status === status).map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedId(ticket.id)}
                className={`w-full rounded-md border p-4 text-left transition ${
                  selectedId === ticket.id
                    ? "border-[#e65e48] bg-[#e65e48]/8"
                    : "border-white/10 bg-white/[0.035] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <Severity severity={ticket.severity} />
                  <span className="text-xs text-[#8f887d]">{ticket.relatedPage}</span>
                </div>
                <h3 className="mt-4 text-sm font-medium leading-6 text-[#eee6d8]">{ticket.title}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#8f887d]">{ticket.description}</p>
                {ticket.contentTitle ? (
                  <p className="mt-4 rounded bg-white/[0.04] px-3 py-2 text-xs text-[#b7afa4]">
                    {ticket.contentTitle}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center justify-between">
                  <Select value={ticket.status} onValueChange={(next) => updateStatus(ticket, next)}>
                    <SelectTrigger onClick={(event) => event.stopPropagation()} className="h-9 w-36 border-white/10 bg-black/20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketStatuses.map((nextStatus) => (
                        <SelectItem key={nextStatus} value={nextStatus}>
                          {nextStatus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      remove(ticket)
                    }}
                    className="grid size-9 place-items-center rounded-md border border-white/10 text-[#8f887d] hover:text-[#e65e48]"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Inspector({
  selected,
  form,
  setForm,
  cards,
  create,
  updateStatus,
  remove,
  isPending,
  message,
}: {
  selected?: Ticket
  form: {
    title: string
    description: string
    severity: string
    status: string
    relatedPage: string
    githubIssueUrl: string
    contentCardId: string
  }
  setForm: (value: {
    title: string
    description: string
    severity: string
    status: string
    relatedPage: string
    githubIssueUrl: string
    contentCardId: string
  }) => void
  cards: ContentCardDto[]
  create: () => void
  updateStatus: (ticket: Ticket, status: string) => void
  remove: (ticket: Ticket) => void
  isPending: boolean
  message: string
}) {
  return (
    <aside className="min-h-screen bg-[#0b0b0a] px-5 py-8 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto">
      <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e65e48]">Create bug report</p>
        <h2 className="mt-3 font-[Georgia] text-3xl">New QA ticket</h2>
        <div className="mt-6 space-y-4">
          <Label className="grid gap-2 text-sm text-[#b7afa4]">
            Title
            <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="border-white/10 bg-black/20" />
          </Label>
          <Label className="grid gap-2 text-sm text-[#b7afa4]">
            Description
            <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-28 border-white/10 bg-black/20" />
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Label className="grid gap-2 text-sm text-[#b7afa4]">
              Severity
              <Select value={form.severity} onValueChange={(severity) => setForm({ ...form, severity })}>
                <SelectTrigger className="w-full border-white/10 bg-black/20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {severities.map((severity) => <SelectItem key={severity} value={severity}>{severity}</SelectItem>)}
                </SelectContent>
              </Select>
            </Label>
            <Label className="grid gap-2 text-sm text-[#b7afa4]">
              Status
              <Select value={form.status} onValueChange={(status) => setForm({ ...form, status })}>
                <SelectTrigger className="w-full border-white/10 bg-black/20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ticketStatuses.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </SelectContent>
              </Select>
            </Label>
          </div>
          <Label className="grid gap-2 text-sm text-[#b7afa4]">
            Related page
            <Input value={form.relatedPage} onChange={(event) => setForm({ ...form, relatedPage: event.target.value })} className="border-white/10 bg-black/20" />
          </Label>
          <Label className="grid gap-2 text-sm text-[#b7afa4]">
            GitHub issue URL
            <Input value={form.githubIssueUrl} onChange={(event) => setForm({ ...form, githubIssueUrl: event.target.value })} className="border-white/10 bg-black/20" />
          </Label>
          <Label className="grid gap-2 text-sm text-[#b7afa4]">
            Linked content
            <Select value={form.contentCardId || "none"} onValueChange={(contentCardId) => setForm({ ...form, contentCardId: contentCardId === "none" ? "" : contentCardId })}>
              <SelectTrigger className="w-full border-white/10 bg-black/20"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No linked card</SelectItem>
                {cards.map((card) => <SelectItem key={card.id} value={card.id}>{card.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </Label>
          <button disabled={isPending} onClick={create} className="flex h-12 w-full items-center justify-center rounded-md bg-[#e65e48] text-sm font-semibold text-black disabled:opacity-60">
            Create ticket
          </button>
          {message ? <p className="text-sm text-[#a8c764]">{message}</p> : null}
        </div>
      </div>

      {selected ? (
        <div className="mt-5 rounded-md border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Severity severity={selected.severity} />
              <h2 className="mt-4 font-[Georgia] text-2xl leading-tight">{selected.title}</h2>
            </div>
            <Bug className="size-6 text-[#e65e48]" />
          </div>
          <p className="mt-5 text-sm leading-6 text-[#aaa296]">{selected.description}</p>
          <div className="mt-5 space-y-3 text-sm">
            <Info label="Status" value={selected.status} />
            <Info label="Related page" value={selected.relatedPage} />
            <Info label="Content" value={selected.contentTitle ?? "No linked content"} />
            <Info label="GitHub" value={selected.githubIssueUrl ?? "Not linked"} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button disabled={isPending} onClick={() => updateStatus(selected, "fixed")} className="h-11 rounded-md border border-[#a8c764]/40 text-sm text-[#a8c764] disabled:opacity-60">
              Mark fixed
            </button>
            <button disabled={isPending} onClick={() => remove(selected)} className="h-11 rounded-md border border-[#e65e48]/40 text-sm text-[#e65e48] disabled:opacity-60">
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function Severity({ severity }: { severity: string }) {
  const style = severityStyles[severity] ?? severityStyles.medium
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs" style={{ color: style.color }}>
      <Circle className="size-3 fill-current" />
      {style.label}
    </span>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-3">
      <p className="text-xs text-[#8f887d]">{label}</p>
      <p className="mt-1 break-words text-[#d8cebd]">{value}</p>
    </div>
  )
}

function BottomBand() {
  return (
    <section className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
      <div>
        <h2 className="font-[Georgia] text-3xl">Better QA, calmer releases.</h2>
        <p className="mt-2 text-sm text-[#8f887d]">
          Keep user-facing wellbeing tools clear, reliable, and easy to trust.
        </p>
      </div>
      <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
        Review Content <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
