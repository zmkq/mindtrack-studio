"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PenLine,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { categories, contentStatuses } from "@/lib/schemas"
import type { ContentCardDto } from "@/lib/services/content"

type FormState = {
  id?: string
  title: string
  category: string
  estimatedMinutes: string
  shortDescription: string
  steps: string
  status: string
}

const emptyForm: FormState = {
  title: "",
  category: "Stress",
  estimatedMinutes: "8",
  shortDescription: "",
  steps: "",
  status: "unpublished",
}

const images = [
  "/women_2.png",
  "/banner_1.png",
  "/banner_book.png",
  "/seed.png",
  "/banner_3.png",
  "/women_1.png",
  "/asset.png",
  "/banner_book_2.png",
]

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
    items: [
      ["Settings", Settings, "/admin/settings"],
      ["Integrations", Grid2X2, "/admin/integrations"],
      ["Audit Logs", FileText, "/admin/audit-logs"],
    ],
  },
]

export function AdminContentPanel({ initialCards }: { initialCards: ContentCardDto[] }) {
  const [cards, setCards] = useState(initialCards)
  const [selectedId, setSelectedId] = useState(initialCards[0]?.id ?? "")
  const [form, setForm] = useState<FormState | null>(null)
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const selected = cards.find((card) => card.id === selectedId) ?? cards[0]

  const visibleCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesQuery = `${card.title} ${card.shortDescription} ${card.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesCategory = categoryFilter === "all" || card.category === categoryFilter
      const matchesStatus = statusFilter === "all" || card.status === statusFilter

      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [cards, categoryFilter, query, statusFilter])

  function createForm() {
    setForm(emptyForm)
    setMessage("")
  }

  function edit(card: ContentCardDto) {
    setSelectedId(card.id)
    setForm({
      id: card.id,
      title: card.title,
      category: card.category,
      estimatedMinutes: String(card.estimatedMinutes),
      shortDescription: card.shortDescription,
      steps: card.steps.join("\n"),
      status: card.status,
    })
    setMessage("")
  }

  function save() {
    if (!form) return
    startTransition(async () => {
      const payload = {
        title: form.title,
        category: form.category,
        estimatedMinutes: Number(form.estimatedMinutes),
        shortDescription: form.shortDescription,
        steps: form.steps
          .split("\n")
          .map((step) => step.trim())
          .filter(Boolean),
        status: form.status,
      }
      const response = await fetch(form.id ? `/api/content/${form.id}` : "/api/content", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const body = await response.json()

      if (!response.ok) {
        setMessage(body.error ?? "Content could not be saved.")
        return
      }

      setCards((current) =>
        form.id
          ? current.map((card) => (card.id === form.id ? body.data : card))
          : [body.data, ...current]
      )
      setSelectedId(body.data.id)
      setForm(null)
      setMessage("Content saved.")
    })
  }

  function patchStatus(card: ContentCardDto, status?: string) {
    startTransition(async () => {
      const nextStatus =
        status ?? (card.status === "published" ? "unpublished" : "published")
      const response = await fetch(`/api/content/${card.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      })
      const body = await response.json()
      if (response.ok) {
        setCards((current) => current.map((item) => (item.id === card.id ? body.data : item)))
        setSelectedId(body.data.id)
        setMessage(`Content ${nextStatus === "published" ? "published" : "moved to draft"}.`)
      }
    })
  }

  function remove(card: ContentCardDto) {
    startTransition(async () => {
      const response = await fetch(`/api/content/${card.id}`, { method: "DELETE" })
      if (response.ok) {
        setCards((current) => current.filter((item) => item.id !== card.id))
        setSelectedId(cards.find((item) => item.id !== card.id)?.id ?? "")
        setMessage("Content deleted.")
      }
    })
  }

  return (
    <main className="min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="grid min-h-screen xl:grid-cols-[230px_1fr_360px]">
        <StudioSidebar />
        <section className="border-x border-white/10">
          <TopBar />
          <div className="px-5 py-10 md:px-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div data-tour="admin-hero">
                <h1 className="font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
                  Content Studio
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
                  Create, manage, and publish science-backed content that
                  supports mental well-being and growth.
                </p>
              </div>
              <button
                data-tour="admin-create"
                type="button"
                onClick={createForm}
                className="inline-flex h-12 items-center overflow-hidden rounded-md border border-[#e65e48] bg-[#e65e48] text-sm font-semibold text-black shadow-[0_12px_45px_rgba(230,94,72,0.2)]"
              >
                <span className="flex h-full items-center gap-2 px-5">
                  <Plus className="size-4" /> Create Content
                </span>
                <span className="grid h-full w-12 border-l border-black/20 place-items-center">
                  <ChevronDown className="size-4" />
                </span>
              </button>
            </div>

            <Tabs />
            <div data-tour="admin-filters">
              <Filters
                query={query}
                setQuery={setQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
            <div data-tour="admin-table">
            <ContentTable
              cards={visibleCards}
              selectedId={selected?.id}
              setSelectedId={setSelectedId}
              edit={edit}
              remove={remove}
            />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1fr]">
              <HealthCard />
              <RecentEdits cards={cards.slice(0, 5)} />
            </div>

            <BottomBanner />
            <footer className="mt-8 flex flex-wrap justify-between gap-4 text-xs text-[#746d63]">
              <span>© 2026 MindTrack Studio. All rights reserved.</span>
              <span className="flex gap-8">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact</span>
              </span>
            </footer>
          </div>
        </section>
        <div data-tour="admin-inspector">
          <Inspector
            selected={selected}
            form={form}
            setForm={setForm}
            save={save}
            patchStatus={patchStatus}
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
        <div className="mt-12 space-y-9" data-tour="admin-nav">
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
                      item === "Content"
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
          <p className="text-sm font-medium">MindTrack Studio</p>
          <p className="mt-2 text-xs leading-5 text-[#898177]">
            Research-driven.
            <br />
            Member-focused.
          </p>
          <div className="mt-20 h-24 rounded-full border border-[#7c4b2c]/50" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {["Create Content", "Send Announcement", "Export Content"].map((item) => (
            <div
              key={item}
              className="mb-2 flex h-9 items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {item === "Create Content" ? <ArrowRight className="size-3" /> : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function TopBar() {
  return (
    <header className="flex h-[92px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
      <button className="grid size-10 place-items-center rounded-md text-[#d8cebd] xl:hidden">
        <Menu className="size-5" />
      </button>
      <div className="relative ml-auto w-full max-w-[430px]" data-tour="admin-search">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          placeholder="Search content, users, tags..."
          className="h-12 border-white/10 bg-white/[0.035] pl-11 text-sm text-[#eee6d8] placeholder:text-[#6f685f]"
        />
      </div>
      <div className="hidden items-center gap-5 text-[#aaa296] md:flex">
        <SunMedium className="size-5" />
        <Bell className="size-5" />
        <div className="flex items-center gap-3">
          <div className="relative size-9 overflow-hidden rounded-full">
            <Image src="/women_1.png" alt="Admin avatar" fill className="object-cover" sizes="36px" />
          </div>
          <div className="text-xs">
            <p className="font-medium text-[#eee6d8]">Admin</p>
            <p className="text-[#6f685f]">Studio</p>
          </div>
          <ChevronDown className="size-3" />
        </div>
      </div>
    </header>
  )
}

function Tabs() {
  return (
    <div className="mt-14 border-b border-white/10">
      <div className="flex gap-10 text-sm text-[#8f887d]">
        {["All", "Drafts", "Review", "Published", "Archived"].map((item) => (
          <button
            key={item}
            className={`relative h-12 ${item === "All" ? "text-[#e65e48]" : ""}`}
          >
            {item}
            {item === "All" ? (
              <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}

function Filters({
  query,
  setQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: {
  query: string
  setQuery: (value: string) => void
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
}) {
  return (
    <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_150px_170px_150px_96px]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search content..."
          className="h-11 border-white/10 bg-white/[0.035] pl-11 text-[#eee6d8] placeholder:text-[#6f685f]"
        />
      </div>
      <Select value="all">
        <SelectTrigger className="h-11 w-full border-white/10 bg-white/[0.035] text-[#b7afa4]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="article">Article</SelectItem>
          <SelectItem value="tool">Tool</SelectItem>
        </SelectContent>
      </Select>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="h-11 w-full border-white/10 bg-white/[0.035] text-[#b7afa4]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-11 w-full border-white/10 bg-white/[0.035] text-[#b7afa4]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {contentStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.035] text-sm text-[#b7afa4]">
        <Filter className="size-4" /> Filters
      </button>
    </div>
  )
}

function ContentTable({
  cards,
  selectedId,
  setSelectedId,
  edit,
  remove,
}: {
  cards: ContentCardDto[]
  selectedId?: string
  setSelectedId: (id: string) => void
  edit: (card: ContentCardDto) => void
  remove: (card: ContentCardDto) => void
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-white/10 bg-[#11110f]">
      <div className="grid grid-cols-[minmax(250px,1.4fr)_0.45fr_0.6fr_0.7fr_0.6fr_0.65fr_42px] border-b border-white/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a77b5e] max-lg:hidden">
        <span>Content</span>
        <span>Type</span>
        <span>Category</span>
        <span>Author</span>
        <span>Status</span>
        <span>Updated</span>
        <span />
      </div>
      <div className="divide-y divide-white/10">
        {cards.length === 0 ? (
          <div className="p-8 text-sm text-[#8f887d]">No content matches these filters.</div>
        ) : (
          cards.slice(0, 10).map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedId(card.id)}
              className={`grid w-full items-center gap-4 px-5 py-4 text-left text-sm transition lg:grid-cols-[minmax(250px,1.4fr)_0.45fr_0.6fr_0.7fr_0.6fr_0.65fr_42px] ${
                selectedId === card.id ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-white/5 lg:size-16">
                  <Image
                    src={images[index % images.length]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="leading-6 text-[#ddd4c6]">{card.title}</p>
                  <p className="mt-1 text-xs text-[#7f776d] lg:hidden">
                    {card.category} · {card.status}
                  </p>
                </div>
              </div>
              <span className="hidden text-[#aaa296] lg:block">
                {index % 4 === 0 ? "Article" : index % 4 === 1 ? "Tool" : index % 4 === 2 ? "Worksheet" : "Guide"}
              </span>
              <span className="hidden text-[#aaa296] lg:block">{card.category}</span>
              <span className="hidden items-center gap-2 text-[#d8cebd] lg:flex">
                <span className="relative size-7 overflow-hidden rounded-full">
                  <Image src={index % 2 ? "/women_1.png" : "/women_2.png"} alt="" fill className="object-cover" sizes="28px" />
                </span>
                {index % 3 === 0 ? "Dr. Emma Harper" : index % 3 === 1 ? "Liam Park" : "Sofia Delgado"}
              </span>
              <span className="hidden lg:block">
                <StatusBadge status={card.status} review={index % 5 === 2} />
              </span>
              <span className="hidden text-xs leading-5 text-[#8f887d] lg:block">
                May {24 - index}, 2026
                <br />
                {index + 2}:42 PM
              </span>
              <span className="hidden items-center justify-end gap-1 lg:flex">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    edit(card)
                  }}
                  className="grid size-8 place-items-center rounded text-[#8f887d] hover:bg-white/5 hover:text-[#eee6d8]"
                >
                  <PenLine className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    remove(card)
                  }}
                  className="grid size-8 place-items-center rounded text-[#8f887d] hover:bg-white/5 hover:text-[#e65e48]"
                >
                  <X className="size-4" />
                </button>
              </span>
            </button>
          ))
        )}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-[#8f887d]">
        <span>Showing 1 to {Math.min(cards.length, 10)} of {cards.length || 0} results</span>
        <div className="flex items-center gap-4">
          <ChevronLeft className="size-4" />
          <span className="grid size-8 place-items-center rounded border border-[#e65e48] text-[#e65e48]">
            1
          </span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>13</span>
          <ChevronRight className="size-4" />
        </div>
      </div>
    </div>
  )
}

function Inspector({
  selected,
  form,
  setForm,
  save,
  patchStatus,
  isPending,
  message,
}: {
  selected?: ContentCardDto
  form: FormState | null
  setForm: (value: FormState | null) => void
  save: () => void
  patchStatus: (card: ContentCardDto, status?: string) => void
  isPending: boolean
  message: string
}) {
  return (
    <aside className="min-h-screen bg-[#0b0b0a] px-5 py-8 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto">
      {form ? (
        <EditorPanel form={form} setForm={setForm} save={save} isPending={isPending} message={message} />
      ) : selected ? (
        <PreviewPanel
          selected={selected}
          patchStatus={patchStatus}
          isPending={isPending}
          message={message}
        />
      ) : (
        <div className="rounded-md border border-white/10 p-6 text-sm text-[#8f887d]">
          Select content to preview.
        </div>
      )}
    </aside>
  )
}

function PreviewPanel({
  selected,
  patchStatus,
  isPending,
  message,
}: {
  selected: ContentCardDto
  patchStatus: (card: ContentCardDto, status?: string) => void
  isPending: boolean
  message: string
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-[Georgia] text-3xl leading-tight text-[#f1e6d6]">
          {selected.title}
        </h2>
        <X className="mt-2 size-5 text-[#8f887d]" />
      </div>
      <div className="flex gap-8 border-b border-white/10 text-sm text-[#8f887d]">
        <span className="relative h-11 text-[#eee6d8]">
          Preview
          <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" />
        </span>
        <span>Details</span>
      </div>
      <div className="relative h-64 overflow-hidden rounded-md border border-white/10">
        <Image src="/women_2.png" alt={selected.title} fill className="object-cover" sizes="360px" />
      </div>
      <div className="flex items-center gap-3 text-sm text-[#8f887d]">
        <Badge className="rounded-full border-white/10 bg-white/[0.05] text-[#d8cebd]">
          {selected.category}
        </Badge>
        <span>·</span>
        <span>{selected.estimatedMinutes} min read</span>
      </div>
      <p className="text-sm leading-6 text-[#aaa296]">{selected.shortDescription}</p>
      <div>
        <p className="mb-3 text-sm text-[#d8cebd]">Tags</p>
        <div className="flex flex-wrap gap-2">
          {[selected.category.toLowerCase(), "mental health", "education", "psychology", "self-awareness"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#8f887d]"
              >
                {tag}
              </span>
            )
          )}
          <span className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#8f887d]">
            +
          </span>
        </div>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
        <p className="text-sm text-[#d8cebd]">Author</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative size-9 overflow-hidden rounded-full">
              <Image src="/women_1.png" alt="" fill className="object-cover" sizes="36px" />
            </span>
            <div>
              <p className="text-sm">Dr. Emma Harper</p>
              <p className="text-xs text-[#8f887d]">Clinical Psychologist</p>
            </div>
          </div>
          <button className="rounded-md border border-white/10 px-3 py-2 text-xs text-[#d8cebd]">
            Change
          </button>
        </div>
      </div>
      <WorkflowCard selected={selected} patchStatus={patchStatus} isPending={isPending} message={message} />
    </div>
  )
}

function EditorPanel({
  form,
  setForm,
  save,
  isPending,
  message,
}: {
  form: FormState
  setForm: (value: FormState | null) => void
  save: () => void
  isPending: boolean
  message: string
}) {
  return (
    <div className="space-y-5 rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#e65e48]">
            {form.id ? "Edit Content" : "Create Content"}
          </p>
          <h2 className="mt-2 font-[Georgia] text-3xl">Content details</h2>
        </div>
        <button onClick={() => setForm(null)} className="text-[#8f887d]">
          <X className="size-5" />
        </button>
      </div>
      <Label className="grid gap-2 text-sm text-[#b7afa4]">
        Title
        <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="border-white/10 bg-black/20" />
      </Label>
      <Label className="grid gap-2 text-sm text-[#b7afa4]">
        Category
        <Select value={form.category} onValueChange={(category) => setForm({ ...form, category })}>
          <SelectTrigger className="w-full border-white/10 bg-black/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>
      <div className="grid grid-cols-2 gap-3">
        <Label className="grid gap-2 text-sm text-[#b7afa4]">
          Minutes
          <Input type="number" min={1} value={form.estimatedMinutes} onChange={(event) => setForm({ ...form, estimatedMinutes: event.target.value })} className="border-white/10 bg-black/20" />
        </Label>
        <Label className="grid gap-2 text-sm text-[#b7afa4]">
          Status
          <Select value={form.status} onValueChange={(status) => setForm({ ...form, status })}>
            <SelectTrigger className="w-full border-white/10 bg-black/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contentStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>
      </div>
      <Label className="grid gap-2 text-sm text-[#b7afa4]">
        Short description
        <Textarea value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} className="min-h-24 border-white/10 bg-black/20" />
      </Label>
      <Label className="grid gap-2 text-sm text-[#b7afa4]">
        Exercise steps, one per line
        <Textarea value={form.steps} onChange={(event) => setForm({ ...form, steps: event.target.value })} className="min-h-36 border-white/10 bg-black/20" />
      </Label>
      <Button disabled={isPending} onClick={save} className="h-12 w-full border-[#e65e48] bg-[#e65e48] text-black hover:bg-[#f27760]">
        Save Content
      </Button>
      {message ? <p className="text-sm text-[#a8c764]">{message}</p> : null}
    </div>
  )
}

function WorkflowCard({
  selected,
  patchStatus,
  isPending,
  message,
}: {
  selected: ContentCardDto
  patchStatus: (card: ContentCardDto, status?: string) => void
  isPending: boolean
  message: string
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-[Georgia] text-xl">Publishing Workflow</h3>
        <ChevronDown className="size-4 text-[#8f887d]" />
      </div>
      <div className="mt-7 space-y-3 text-sm">
        {["Publish now", "Schedule for later", "Save as draft"].map((item, index) => (
          <p key={item} className="flex items-center gap-3 text-[#aaa296]">
            <span
              className={`grid size-4 place-items-center rounded-full border ${
                index === 0 ? "border-[#e65e48]" : "border-[#6f685f]"
              }`}
            >
              {index === 0 ? <span className="size-2 rounded-full bg-[#e65e48]" /> : null}
            </span>
            {item}
          </p>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-[#8f887d]">
        <div className="rounded-md border border-white/10 bg-black/20 p-3">May 24, 2026</div>
        <div className="rounded-md border border-white/10 bg-black/20 p-3">10:45 AM</div>
      </div>
      <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
        <p className="text-sm text-[#d8cebd]">Review Checklist <span className="float-right text-[#8f887d]">4 of 5 completed</span></p>
        {["Content accuracy verified", "Evidence & sources added", "Readability score > 60", "Accessibility standards met"].map((item) => (
          <p key={item} className="flex items-center gap-3 text-sm text-[#aaa296]">
            <span className="grid size-4 place-items-center rounded-sm bg-[#a8c764] text-black">
              <Check className="size-3" />
            </span>
            {item}
          </p>
        ))}
        <p className="flex items-center gap-3 text-sm text-[#aaa296]">
          <span className="size-4 rounded-sm border border-[#6f685f]" />
          SEO meta data added
        </p>
      </div>
      <div className="mt-7 border-t border-white/10 pt-6">
        <p className="text-sm text-[#d8cebd]">Content Health</p>
        <p className="mt-3 text-sm text-[#a8c764]">Excellent <span className="float-right text-[#d8cebd]">92/100</span></p>
        <div className="mt-2 h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[92%] rounded-full bg-[#a8c764]" />
        </div>
        <p className="mt-4 text-xs leading-5 text-[#8f887d]">
          Well-structured, evidence-backed, and ready to publish.
        </p>
      </div>
      <button
        disabled={isPending}
        onClick={() => patchStatus(selected, "published")}
        className="mt-7 flex h-12 w-full items-center justify-center rounded-md bg-[#e65e48] text-sm font-semibold text-black disabled:opacity-60"
      >
        Publish Content
      </button>
      <button
        disabled={isPending}
        onClick={() => patchStatus(selected, "unpublished")}
        className="mt-3 flex h-11 w-full items-center justify-center rounded-md border border-white/10 text-sm text-[#d8cebd] disabled:opacity-60"
      >
        Send for Review
      </button>
      {message ? <p className="mt-4 text-sm text-[#a8c764]">{message}</p> : null}
    </div>
  )
}

function StatusBadge({ status, review }: { status: string; review?: boolean }) {
  if (review) {
    return (
      <span className="rounded border border-[#d4874b]/25 bg-[#d4874b]/10 px-2 py-1 text-xs text-[#d4874b]">
        Review
      </span>
    )
  }

  if (status === "published") {
    return (
      <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-1 text-xs text-[#a8c764]">
        Published
      </span>
    )
  }

  return (
    <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-2 py-1 text-xs text-[#8f887d]">
      Draft
    </span>
  )
}

function HealthCard() {
  return (
    <div className="rounded-md border border-white/10 bg-[#11110f] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-[Georgia] text-xl">Content Health Overview</h3>
        <span className="text-xs text-[#8f887d]">This week +</span>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-[180px_1fr]">
        <div className="grid size-40 place-items-center rounded-full border-[12px] border-[#a8c764] border-b-white/10 text-center">
          <div>
            <p className="text-4xl">87</p>
            <p className="text-sm text-[#d8cebd]">Excellent</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            ["Accuracy", "94%"],
            ["Engagement", "78%"],
            ["Readability", "82%"],
            ["Freshness", "91%"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-[#8f887d]">{label}</span>
              <span>{value}</span>
              <span className="h-5 w-14 rounded bg-[linear-gradient(135deg,transparent_20%,#a8c764_22%,transparent_25%,transparent_50%,#d4874b_52%,transparent_56%)]" />
            </div>
          ))}
        </div>
      </div>
      <Link href="/admin/analytics" className="mt-6 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View full report <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}

function RecentEdits({ cards }: { cards: ContentCardDto[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#11110f] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-[Georgia] text-xl">Recent Edits</h3>
        <span className="text-sm text-[#e65e48]">View all</span>
      </div>
      <div className="mt-6 space-y-4">
        {cards.map((card, index) => (
          <div key={card.id} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
            <div className="relative size-10 overflow-hidden rounded">
              <Image src={images[index % images.length]} alt="" fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <p className="text-sm">{card.title}</p>
              <p className="text-xs text-[#8f887d]">{index % 2 ? "Liam Park" : "Dr. Emma Harper"}</p>
            </div>
            <span className="text-xs text-[#8f887d]">May {24 - index}, 10:42 AM</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomBanner() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
      <div className="flex items-center gap-8">
        <LeafGraphic />
        <div>
          <h3 className="font-[Georgia] text-3xl leading-tight">
            Great content changes minds.
            <br />
            Thoughtful content changes lives.
          </h3>
          <p className="mt-3 text-sm text-[#8f887d]">
            MindTrack Studio empowers better mental health through science,
            empathy, and intentional design.
          </p>
        </div>
      </div>
      <Link href="/admin/content" className="rounded-md border border-[#8a4e31] px-4 py-3 text-sm text-[#e65e48]">
        Content Guidelines
      </Link>
    </div>
  )
}

function LeafGraphic() {
  return (
    <div className="hidden size-24 text-[#8a4e31] md:block">
      <Sprig />
    </div>
  )
}

function Sprig() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="size-full">
      <path d="M14 70C26 43 38 27 65 10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 47C20 44 18 36 24 30C32 33 34 40 28 47Z" stroke="currentColor" />
      <path d="M42 30C35 25 35 17 42 12C48 17 48 25 42 30Z" stroke="currentColor" />
      <path d="M51 24C52 15 59 10 68 12C67 21 61 26 51 24Z" stroke="currentColor" />
      <path d="M23 57C16 56 11 62 10 70C18 71 24 66 23 57Z" stroke="currentColor" />
    </svg>
  )
}
