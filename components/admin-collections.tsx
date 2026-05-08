"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Calendar,
  Eye,
  Grid2X2,
  Layers,
  MoreHorizontal,
  Plus,
  Tag,
  type LucideIcon,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"

const images = ["/banner_1.png", "/banner_book.png", "/banner_3.png", "/seed.png", "/banner_book_2.png", "/women_2.png"]

const demoCollections = [
  { name: "Starter Kit", description: "Essential practices for new users beginning their wellness journey.", items: 8, views: 3421, status: "Published", color: "#a8c764", tags: ["onboarding", "essentials"] },
  { name: "Stress First Aid", description: "Quick relief tools for acute stress moments.", items: 5, views: 2876, status: "Published", color: "#e65e48", tags: ["stress", "urgent", "quick"] },
  { name: "Sleep Better Series", description: "A progressive collection for improving sleep quality over 2 weeks.", items: 7, views: 1987, status: "Published", color: "#a8c764", tags: ["sleep", "progressive"] },
  { name: "Focus Bootcamp", description: "Intensive focus and concentration exercises for high-demand periods.", items: 6, views: 1543, status: "Published", color: "#d4874b", tags: ["focus", "intensive"] },
  { name: "Relationship Toolkit", description: "Communication, empathy, and connection practices for better relationships.", items: 9, views: 1234, status: "Draft", color: "#e65e48", tags: ["relationships", "communication"] },
  { name: "Morning Rituals", description: "Curated morning practices for starting the day with intention.", items: 4, views: 0, status: "Draft", color: "#d4874b", tags: ["morning", "routine", "habits"] },
  { name: "Exam Season Support", description: "Targeted tools for managing academic stress and performance anxiety.", items: 6, views: 876, status: "Published", color: "#e65e48", tags: ["academic", "stress", "seasonal"] },
  { name: "Gratitude Pathway", description: "A structured gratitude practice building from daily to deep reflection.", items: 5, views: 1678, status: "Published", color: "#a8c764", tags: ["gratitude", "reflection"] },
]

export function AdminCollectionsPanel() {
  return (
    <AdminShell
      activeItem="Collections"
      searchPlaceholder="Search collections, tags..."
      sidebarNote={{ title: "Content Bundles", subtitle: "Curate with care.\nPublish with purpose." }}
      quickActions={["Create Collection", "Manage Tags", "View Analytics"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Content bundles
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Collections
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Organize practices by need, topic, and audience. Collections help
            users discover the right tools at the right time.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <Plus className="size-4" /> Create Collection
        </button>
      </div>

      <CollectionMetrics />

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["All Collections", "Published", "Drafts", "Seasonal"].map((tab, index) => (
            <button key={tab} className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}>
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {demoCollections.map((collection, index) => (
          <CollectionCard key={collection.name} collection={collection} image={images[index % images.length]} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <PopularTags />
        <CollectionPerformance />
      </div>

      <section className="border-glow anim-up delay-12 mt-6 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="flex items-center gap-8">
          <Boxes className="hidden size-16 text-[#8a4e31] md:block" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Curated paths, meaningful progress.</h2>
            <p className="mt-2 text-sm text-[#8f887d]">
              Well-organized collections make discovery effortless and growth intentional.
            </p>
          </div>
        </div>
        <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Add Content <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function CollectionMetrics() {
  const metrics: Array<[string, string, string, LucideIcon, string]> = [
    ["Total Collections", "8", "6 published, 2 drafts", Grid2X2, "#e65e48"],
    ["Total Items", "50", "Across all collections", Layers, "#a8c764"],
    ["Total Views", "13,615", "+22% this month", Eye, "#d4874b"],
    ["Unique Tags", "14", "Organized taxonomy", Tag, "#e65e48"],
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

function CollectionCard({ collection, image }: { collection: typeof demoCollections[0]; image: string }) {
  return (
    <div className="group overflow-hidden rounded-md border border-white/10 bg-[#11110f] transition hover:border-white/20">
      <div className="relative h-28 overflow-hidden">
        <Image src={image} alt="" fill className="object-cover transition group-hover:scale-105" sizes="300px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          {collection.status === "Published" ? (
            <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-2 py-0.5 text-[10px] text-[#a8c764]">Published</span>
          ) : (
            <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-2 py-0.5 text-[10px] text-[#8f887d]">Draft</span>
          )}
          <span className="text-[10px] text-[#d8cebd]">{collection.items} items</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#eee6d8]">{collection.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#8f887d]">{collection.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {collection.tags.map((tag) => (
            <span key={tag} className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#8f887d]">{tag}</span>
          ))}
        </div>
        {collection.views > 0 ? (
          <div className="mt-3 flex items-center gap-1 text-xs text-[#6f685f]">
            <Eye className="size-3" /> {collection.views.toLocaleString()} views
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PopularTags() {
  const tags = [
    { name: "stress", count: 18, color: "#e65e48" },
    { name: "sleep", count: 12, color: "#a8c764" },
    { name: "focus", count: 10, color: "#d4874b" },
    { name: "quick", count: 9, color: "#e65e48" },
    { name: "essentials", count: 8, color: "#a8c764" },
    { name: "progressive", count: 7, color: "#d4874b" },
    { name: "relationships", count: 6, color: "#e65e48" },
    { name: "habits", count: 6, color: "#a8c764" },
    { name: "reflection", count: 5, color: "#d4874b" },
    { name: "gratitude", count: 5, color: "#e65e48" },
    { name: "morning", count: 4, color: "#a8c764" },
    { name: "academic", count: 3, color: "#d4874b" },
    { name: "seasonal", count: 3, color: "#e65e48" },
    { name: "onboarding", count: 2, color: "#a8c764" },
  ]

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Popular tags</h2>
      <p className="mt-1 text-sm text-[#8f887d]">Content taxonomy overview</p>
      <div className="mt-7 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="rounded-md border border-white/10 px-3 py-2 text-xs transition hover:border-white/20"
            style={{ color: tag.color, backgroundColor: `${tag.color}08` }}
          >
            {tag.name} <span className="ml-1 text-[#6f685f]">{tag.count}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

function CollectionPerformance() {
  const top = [...demoCollections].filter((c) => c.views > 0).sort((a, b) => b.views - a.views).slice(0, 5)
  const maxViews = top[0]?.views ?? 1

  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <h2 className="font-[Georgia] text-2xl">Top collections</h2>
      <p className="mt-1 text-sm text-[#8f887d]">By views this month</p>
      <div className="mt-7 space-y-5">
        {top.map((collection, index) => (
          <div key={collection.name} className="grid grid-cols-[24px_1fr_80px] items-center gap-4">
            <span className="text-sm text-[#8f887d]">{index + 1}</span>
            <div>
              <p className="text-sm text-[#eee6d8]">{collection.name}</p>
              <p className="text-xs text-[#8f887d]">{collection.items} items</p>
              <div className="mt-2 h-px bg-white/10">
                <div className="h-px" style={{ width: `${(collection.views / maxViews) * 100}%`, backgroundColor: collection.color }} />
              </div>
            </div>
            <span className="text-right text-sm text-[#d8cebd]">{collection.views.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <Link href="/admin/analytics" className="mt-8 inline-flex items-center gap-2 text-sm text-[#e65e48]">
        View full report <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}
