"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  CircleDot,
  Cloud,
  Flame,
  Heart,
  Home,
  Leaf,
  Menu,
  Moon,
  Search,
  Send,
  Sparkles,
  Sprout,
  Star,
  SunMedium,
  Target,
  Timer,
  Users,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "@/lib/schemas"
import type { ContentCardDto } from "@/lib/services/content"

const heroStats = [
  ["12", "Published tools"],
  ["6", "Focus areas"],
  ["4.8", "Avg. helpful score"],
]

const categoryIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Stress: SunMedium,
  Focus: Target,
  Sleep: Moon,
  Motivation: Flame,
  Habits: Leaf,
  Relationships: Users,
}

const categoryColors: Record<string, string> = {
  Stress: "#e65e48",
  Focus: "#d4874b",
  Sleep: "#a8c764",
  Motivation: "#e65e48",
  Habits: "#a8c764",
  Relationships: "#d4874b",
}

const images = ["/banner_1.png", "/women_2.png", "/banner_book.png", "/banner_3.png", "/seed.png", "/asset.png"]

export function ContentBrowser({ cards }: { cards: ContentCardDto[] }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedId, setSelectedId] = useState(cards[0]?.id ?? "")
  const [feedback, setFeedback] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const selected = cards.find((card) => card.id === selectedId) ?? cards[0]

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesCategory = category === "All" || card.category === category
      const matchesSearch = `${card.title} ${card.shortDescription} ${card.category}`
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [cards, category, search])

  function record(type: "complete" | "helpful" | "favorite") {
    if (!selected) return
    startTransition(async () => {
      const response = await fetch(`/api/content/${selected.id}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, userId: "demo-user" }),
      })
      setMessage(response.ok ? `Marked as ${type}.` : "Could not save interaction.")
    })
  }

  function submitFeedback() {
    if (!selected) return
    startTransition(async () => {
      const response = await fetch(`/api/content/${selected.id}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: feedback, sentiment: "neutral" }),
      })
      setMessage(response.ok ? "Feedback saved." : "Feedback must be at least 8 characters.")
      if (response.ok) setFeedback("")
    })
  }

  return (
    <main className="min-h-screen bg-[#090908] text-[#eee6d8]">
      <div className="grid min-h-screen xl:grid-cols-[230px_1fr]">
        <UserSidebar />
        <section className="border-l border-white/10">
          <TopBar search={search} setSearch={setSearch} />
          <div className="px-5 py-10 md:px-8">
            <div data-tour="app-hero">
              <Hero />
            </div>
            <div data-tour="app-categories">
              <CategoryStrip category={category} setCategory={setCategory} />
            </div>
            <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_390px]">
              <div data-tour="app-grid">
              <PracticeGrid
                cards={filteredCards}
                selectedId={selected?.id}
                setSelectedId={setSelectedId}
              />
              </div>
              <div data-tour="app-detail">
              <DetailPanel
                selected={selected}
                record={record}
                feedback={feedback}
                setFeedback={setFeedback}
                submitFeedback={submitFeedback}
                message={message}
                isPending={isPending}
              />
              </div>
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
      </div>
    </main>
  )
}

function UserSidebar() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between border-r border-white/10 bg-[#080908] px-5 py-7 xl:flex">
      <div>
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-[#eee6d8]">
            <Brain className="size-5" />
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
          <NavGroup
            label="Practice"
            items={[
              ["Dashboard", Home, "/app/dashboard"],
              ["Library", BookOpen, "/app"],
              ["Reflection", Heart, "/app/reflection"],
            ]}
            active="Library"
          />
          <NavGroup
            label="Explore"
            items={[
              ["Stress", Cloud, "/app/stress"],
              ["Focus", Target, "/app/focus"],
              ["Sleep", Moon, "/app/sleep"],
              ["Habits", Sprout, "/app/habits"],
            ]}
            active=""
          />
          <NavGroup
            label="Account"
            items={[
              ["Saved", Star, "/app/saved"],
              ["Progress", CheckCircle2, "/app/progress"],
              ["Messages", Send, "/app/messages"],
            ]}
            active=""
          />
        </div>
      </div>
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-medium">Today&apos;s note</p>
          <p className="mt-2 text-xs leading-5 text-[#898177]">
            Small practices count.
            <br />
            Come back gently.
          </p>
          <div className="mt-16 h-24 rounded-full border border-[#7c4b2c]/50" />
        </div>
        <div>
          <p className="mb-4 text-sm">Quick Actions</p>
          {["Start Practice", "Open Reflection", "Saved Tools"].map((item) => (
            <Link
              key={item}
              href={item === "Open Reflection" ? "/app/reflection" : "/app"}
              className="mb-2 flex h-9 items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs text-[#b7afa4]"
            >
              {item}
              {item === "Start Practice" ? <ArrowRight className="size-3" /> : null}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

function NavGroup({
  label,
  items,
  active,
}: {
  label: string
  items: Array<[string, React.ComponentType<{ className?: string }>, string]>
  active: string
}) {
  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b98257] glow-text-amber">
        {label}
      </p>
      <div className="space-y-1">
        {items.map(([item, Icon, href]) => (
          <Link
            key={item}
            href={href}
            className={`group/nav relative flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-all duration-300 ${
              item === active
                ? "bg-[#e65e48]/12 text-[#e65e48] shadow-[inset_0_0_20px_rgba(230,94,72,0.06)]"
                : "text-[#999185] hover:bg-white/[0.04] hover:text-[#d8cebd]"
            }`}
          >
            {item === active && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#e65e48] shadow-[0_0_8px_rgba(230,94,72,0.5)]" />
            )}
            <Icon className={`size-4 transition-transform duration-300 ${item === active ? "" : "group-hover/nav:scale-110"}`} />
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

function TopBar({
  search,
  setSearch,
}: {
  search: string
  setSearch: (value: string) => void
}) {
  return (
    <header className="flex h-[84px] items-center justify-between gap-4 border-b border-white/10 px-5 md:px-8">
      <button className="grid size-10 place-items-center rounded-md text-[#d8cebd] xl:hidden">
        <Menu className="size-5" />
      </button>
      <div className="relative ml-auto w-full max-w-[430px]">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f685f]" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search practices, moods, topics..."
          className="h-12 border-white/10 bg-white/[0.035] pl-11 text-sm text-[#eee6d8] placeholder:text-[#6f685f]"
        />
      </div>
      <div className="hidden items-center gap-5 text-[#aaa296] md:flex">
        <SunMedium className="size-5" />
        <Bell className="size-5" />
        <Link href="/app/reflection" className="rounded-md bg-[#e65e48] px-4 py-2 text-sm font-semibold text-black">
          Reflect
        </Link>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#11110f] p-8 md:p-10">
      <div className="absolute right-0 top-0 hidden h-full w-[48%] opacity-55 md:block">
        <Image src="/banner_1.png" alt="Warm mountain morning" fill priority className="object-cover" sizes="48vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11110f] via-[#11110f]/60 to-transparent" />
      </div>
      <div className="relative max-w-2xl">
        <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b]">
          Mindful practice library
        </div>
        <h1 className="mt-7 font-[Georgia] text-[3.5rem] leading-[1.02] text-[#f1e6d6] md:text-[5rem]">
          Small tools for
          <br />
          steadier days.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#b7afa4]">
          Explore psychology-informed practices for stress, sleep, focus,
          motivation, habits, and relationships.
        </p>
        <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
          {heroStats.map(([value, label]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/20 p-4">
              <p className="font-[Georgia] text-3xl">{value}</p>
              <p className="mt-1 text-xs text-[#8f887d]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryStrip({
  category,
  setCategory,
}: {
  category: string
  setCategory: (value: string) => void
}) {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap gap-3">
        {["All", ...categories].map((item) => {
          const Icon = item === "All" ? Sparkles : categoryIcons[item]
          const color = item === "All" ? "#d4874b" : categoryColors[item]
          const active = category === item
          return (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`flex h-12 items-center gap-3 rounded-md border px-5 text-sm ${
                active
                  ? "border-[#e65e48] bg-[#e65e48]/10 text-[#eee6d8]"
                  : "border-white/10 bg-white/[0.035] text-[#b7afa4]"
              }`}
            >
              {Icon ? <Icon className="size-5" style={{ color }} /> : null}
              {item}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function PracticeGrid({
  cards,
  selectedId,
  setSelectedId,
}: {
  cards: ContentCardDto[]
  selectedId?: string
  setSelectedId: (id: string) => void
}) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[Georgia] text-3xl">Recommended practices</h2>
          <p className="mt-2 text-sm text-[#8f887d]">Choose one tool and keep the next step small.</p>
        </div>
        <span className="text-sm text-[#e65e48]">{cards.length} tools</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {cards.length === 0 ? (
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-8 text-sm text-[#8f887d]">
            No practices match this filter yet.
          </div>
        ) : (
          cards.map((card, index) => {
            const Icon = categoryIcons[card.category] ?? CircleDot
            const color = categoryColors[card.category] ?? "#d4874b"
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedId(card.id)}
                className={`group overflow-hidden rounded-md border text-left transition ${
                  selectedId === card.id
                    ? "border-[#e65e48] bg-[#e65e48]/8"
                    : "border-white/10 bg-white/[0.035] hover:border-white/20"
                }`}
              >
                <div className="relative h-36">
                  <Image src={images[index % images.length]} alt="" fill className="object-cover opacity-70 transition group-hover:opacity-85" sizes="420px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="size-7" style={{ color }} />
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#8f887d]">
                      {card.estimatedMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-[#eee6d8]">{card.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#aaa296]">
                    {card.shortDescription}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-[#8f887d]">
                    <span>{card.category}</span>
                    <span>{card.completionCount} completed</span>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </section>
  )
}

function DetailPanel({
  selected,
  record,
  feedback,
  setFeedback,
  submitFeedback,
  message,
  isPending,
}: {
  selected?: ContentCardDto
  record: (type: "complete" | "helpful" | "favorite") => void
  feedback: string
  setFeedback: (value: string) => void
  submitFeedback: () => void
  message: string
  isPending: boolean
}) {
  if (!selected) {
    return (
      <aside className="rounded-md border border-white/10 bg-white/[0.035] p-6 text-sm text-[#8f887d]">
        Select a practice to inspect details.
      </aside>
    )
  }

  return (
    <aside className="xl:sticky xl:top-6 xl:self-start">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#11110f]">
        <div className="relative h-56">
          <Image src="/women_2.png" alt={selected.title} fill className="object-cover opacity-80" sizes="390px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-[#e65e48]/30 bg-[#e65e48]/10 px-3 py-1 text-xs text-[#e65e48]">
              {selected.category}
            </span>
            <span className="flex items-center gap-2 text-xs text-[#8f887d]">
              <Timer className="size-4" /> {selected.estimatedMinutes} min
            </span>
          </div>
          <h2 className="mt-5 font-[Georgia] text-3xl leading-tight">{selected.title}</h2>
          <p className="mt-4 text-sm leading-6 text-[#aaa296]">{selected.shortDescription}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            <Metric value={selected.viewCount} label="Views" />
            <Metric value={selected.completionCount} label="Done" />
            <Metric value={selected.helpfulCount} label="Helpful" />
          </div>
          <div className="mt-7 space-y-3">
            {selected.steps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-md border border-white/10 bg-black/20 p-4 text-sm leading-6">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e65e48]/15 text-xs text-[#e65e48]">
                  {index + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-3 gap-2">
            <ActionButton disabled={isPending} onClick={() => record("complete")} icon={Check}>
              Complete
            </ActionButton>
            <ActionButton disabled={isPending} onClick={() => record("helpful")} icon={Heart}>
              Helpful
            </ActionButton>
            <ActionButton disabled={isPending} onClick={() => record("favorite")} icon={Star}>
              Save
            </ActionButton>
          </div>
          <div className="mt-7">
            <Textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Share short product feedback about this practice"
              className="min-h-24 border-white/10 bg-black/20 text-[#eee6d8] placeholder:text-[#6f685f]"
            />
            <button
              disabled={isPending}
              onClick={submitFeedback}
              className="mt-3 flex h-11 w-full items-center justify-center rounded-md bg-[#e65e48] text-sm font-semibold text-black disabled:opacity-60"
            >
              Submit feedback
            </button>
            {message ? <p className="mt-3 text-sm text-[#a8c764]">{message}</p> : null}
          </div>
        </div>
      </div>
    </aside>
  )
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="font-[Georgia] text-2xl">{value}</p>
      <p className="mt-1 text-[#8f887d]">{label}</p>
    </div>
  )
}

function ActionButton({
  children,
  icon: Icon,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 flex-col items-center justify-center gap-1 rounded-md border border-white/10 bg-white/[0.035] text-xs text-[#d8cebd] disabled:opacity-60"
    >
      <Icon className="size-4 text-[#e65e48]" />
      {children}
    </button>
  )
}

function BottomBand() {
  return (
    <section className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
      <div className="flex items-center gap-6">
        <Leaf className="hidden size-14 text-[#8a4e31] md:block" />
        <div>
          <h2 className="font-[Georgia] text-3xl">Practice that fits real life.</h2>
          <p className="mt-2 text-sm text-[#8f887d]">
            Short, grounded tools for everyday wellbeing.
          </p>
        </div>
      </div>
      <Link href="/app/reflection" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
        Open Reflection <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
