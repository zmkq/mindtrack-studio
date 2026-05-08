import { AppError } from "@/lib/errors"
import {
  type BugTicketInput,
  type BugTicketUpdate,
  type ContentCardInput,
  type ContentCardUpdate,
  type FeedbackInput,
  type InteractionInput,
} from "@/lib/schemas"

export type MockContentCard = {
  id: string
  title: string
  slug: string
  category: string
  estimatedMinutes: number
  shortDescription: string
  steps: string
  status: string
  createdAt: Date
  updatedAt: Date
}

type MockInteraction = {
  id: string
  contentCardId: string
  type: string
  userId: string
  createdAt: Date
}

type MockFeedback = {
  id: string
  contentCardId: string
  message: string
  sentiment: string
  tag?: string | null
  createdAt: Date
}

type MockTicket = {
  id: string
  title: string
  description: string
  severity: string
  status: string
  relatedPage: string
  githubIssueUrl?: string | null
  contentCardId?: string | null
  createdAt: Date
  updatedAt: Date
}

type ContentQuery = {
  admin?: boolean
  category?: string
  search?: string
  status?: string
}

type TicketQuery = {
  severity?: string
  status?: string
}

const now = new Date("2026-05-08T00:00:00.000Z")

function createCard(index: number, card: Omit<MockContentCard, "id" | "createdAt" | "updatedAt">): MockContentCard {
  const date = new Date(now.getTime() - index * 60 * 60 * 1000)

  return {
    ...card,
    id: `mock-card-${index + 1}`,
    createdAt: date,
    updatedAt: date,
  }
}

const initialCards = [
  {
    title: "Two-Minute Stress Reset",
    slug: "two-minute-stress-reset",
    category: "Stress",
    estimatedMinutes: 2,
    shortDescription: "A short grounding routine for noticing tension and shifting attention back to the present.",
    steps: JSON.stringify([
      "Sit with both feet on the floor and name three things you can see.",
      "Take four slow breaths, letting each exhale last a little longer than the inhale.",
      "Notice where your shoulders, jaw, or hands are holding tension.",
      "Choose one small next action you can do in the next five minutes.",
    ]),
    status: "published",
  },
  {
    title: "Focus Sprint Setup",
    slug: "focus-sprint-setup",
    category: "Focus",
    estimatedMinutes: 5,
    shortDescription: "A structured pre-work check-in that turns an open task into one clear focus sprint.",
    steps: JSON.stringify([
      "Write the single outcome you want by the end of the sprint.",
      "List the first physical or digital action required to start.",
      "Move unrelated tabs, notes, and notifications out of view.",
      "Set a timer for 20 minutes and stop when the timer ends.",
    ]),
    status: "published",
  },
  {
    title: "Sleep Wind-Down Audit",
    slug: "sleep-wind-down-audit",
    category: "Sleep",
    estimatedMinutes: 8,
    shortDescription: "A calm evening reflection that helps identify what supports or disrupts rest.",
    steps: JSON.stringify([
      "Write down what time you want to begin winding down tonight.",
      "Name one screen, caffeine, or schedule factor that could interfere.",
      "Choose one low-effort cue such as dimming lights or preparing tomorrow's clothes.",
      "End by writing one sentence that closes the day without judging it.",
    ]),
    status: "published",
  },
  {
    title: "Motivation Ladder",
    slug: "motivation-ladder",
    category: "Motivation",
    estimatedMinutes: 6,
    shortDescription: "A practical way to scale a goal down until the next step feels reachable.",
    steps: JSON.stringify([
      "Write the goal in one sentence.",
      "Create three versions: full effort, medium effort, and minimum effort.",
      "Pick the minimum effort version if your energy is low.",
      "After starting, decide whether to continue or stop with credit for beginning.",
    ]),
    status: "published",
  },
  {
    title: "Habit Cue Map",
    slug: "habit-cue-map",
    category: "Habits",
    estimatedMinutes: 7,
    shortDescription: "A behavior design exercise for connecting a small habit to a reliable daily cue.",
    steps: JSON.stringify([
      "Choose one habit that can be completed in under two minutes.",
      "Identify a daily event that already happens without reminders.",
      "Write the cue and habit together as: after I do X, I will do Y.",
      "Place any needed object where the cue already happens.",
    ]),
    status: "published",
  },
  {
    title: "Repair Conversation Notes",
    slug: "repair-conversation-notes",
    category: "Relationships",
    estimatedMinutes: 10,
    shortDescription: "A preparation worksheet for entering a difficult conversation with clarity and care.",
    steps: JSON.stringify([
      "Write the issue as an observable moment rather than a character judgment.",
      "Name the impact it had on you in one sentence.",
      "Write one question that invites the other person to share context.",
      "Choose one realistic request that would help next time.",
    ]),
    status: "published",
  },
  {
    title: "Attention Anchor",
    slug: "attention-anchor",
    category: "Focus",
    estimatedMinutes: 3,
    shortDescription: "A quick reset for returning to a task after distraction without self-criticism.",
    steps: JSON.stringify([
      "Pause and label the distraction in neutral language.",
      "Look at your task and identify the last completed step.",
      "Write the next action as a verb plus object.",
      "Start with only two minutes of work before deciding what comes next.",
    ]),
    status: "published",
  },
  {
    title: "Draft Review: Values Check",
    slug: "draft-review-values-check",
    category: "Motivation",
    estimatedMinutes: 9,
    shortDescription: "An unpublished draft that helps compare goals against personal values.",
    steps: JSON.stringify([
      "List the goal you are considering.",
      "Name the value it supports.",
      "Name the cost or tradeoff it may require.",
      "Decide whether the next step still fits your current priorities.",
    ]),
    status: "unpublished",
  },
].map((card, index) => createCard(index, card))

const globalForMockStore = globalThis as unknown as {
  mindtrackMockStore?: {
    cards: MockContentCard[]
    interactions: MockInteraction[]
    feedback: MockFeedback[]
    tickets: MockTicket[]
    sequence: number
  }
}

function interactionRows(cardId: string, index: number) {
  const rows: MockInteraction[] = []
  const counts = {
    view: 8 + index * 3,
    complete: 2 + (index % 5),
    helpful: 1 + (index % 4),
    favorite: index % 3,
  }

  for (const [type, count] of Object.entries(counts)) {
    for (let i = 0; i < count; i += 1) {
      rows.push({
        id: `mock-interaction-${cardId}-${type}-${i}`,
        contentCardId: cardId,
        type,
        userId: `demo-user-${i % 6}`,
        createdAt: now,
      })
    }
  }

  return rows
}

function getStore() {
  if (!globalForMockStore.mindtrackMockStore) {
    globalForMockStore.mindtrackMockStore = {
      cards: [...initialCards],
      interactions: initialCards.flatMap((card, index) => card.status === "published" ? interactionRows(card.id, index) : []),
      feedback: [
        {
          id: "mock-feedback-1",
          contentCardId: "mock-card-1",
          message: "The short format made it easy to use between meetings.",
          sentiment: "positive",
          tag: "easy-to-use",
          createdAt: now,
        },
        {
          id: "mock-feedback-2",
          contentCardId: "mock-card-2",
          message: "I liked having one clear outcome before starting my work block.",
          sentiment: "positive",
          tag: "focus-support",
          createdAt: now,
        },
      ],
      tickets: [
        {
          id: "mock-ticket-1",
          title: "Category filter resets after opening a card",
          description: "When testing the exercise browser, the selected category should persist after returning from a detail view.",
          severity: "medium",
          status: "open",
          relatedPage: "/app",
          contentCardId: "mock-card-2",
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "mock-ticket-2",
          title: "Admin preview should show unpublished badge",
          description: "CMS testers noted that draft previews need a clear unpublished indicator before content review.",
          severity: "medium",
          status: "fixed",
          relatedPage: "/admin/content",
          contentCardId: "mock-card-8",
          githubIssueUrl: "https://github.com/example/mindtrack-studio/issues/14",
          createdAt: now,
          updatedAt: now,
        },
      ],
      sequence: 100,
    }
  }

  return globalForMockStore.mindtrackMockStore
}

export function shouldUseMockData() {
  if (process.env.USE_MOCK_DATA === "true" || process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return true
  }

  if (process.env.USE_MOCK_DATA === "false") {
    return false
  }

  const databaseUrl = process.env.DATABASE_URL
  return process.env.VERCEL === "1" && (!databaseUrl || databaseUrl.startsWith("file:"))
}

export function countMockMetrics(contentCardIds?: string[]) {
  const ids = contentCardIds ? new Set(contentCardIds) : null

  return getStore().interactions.reduce<Record<string, Record<string, number>>>((acc, row) => {
    if (ids && !ids.has(row.contentCardId)) return acc
    acc[row.contentCardId] ??= {}
    acc[row.contentCardId][row.type] = (acc[row.contentCardId][row.type] ?? 0) + 1
    return acc
  }, {})
}

export function listMockContentCards(query: ContentQuery = {}) {
  const search = query.search?.toLowerCase()

  return getStore().cards
    .filter((card) => query.admin || card.status === "published")
    .filter((card) => !query.category || card.category === query.category)
    .filter((card) => !query.status || card.status === query.status)
    .filter((card) => {
      if (!search) return true
      return [card.title, card.shortDescription, card.category].some((value) => value.toLowerCase().includes(search))
    })
    .sort((a, b) => a.status.localeCompare(b.status) || b.updatedAt.getTime() - a.updatedAt.getTime())
}

export function getMockContentCard(id: string, options: { admin?: boolean } = {}) {
  const card = getStore().cards.find((item) => item.id === id)
  if (!card || (!options.admin && card.status !== "published")) {
    throw new AppError("Content card not found", 404)
  }

  return card
}

export function getMockContentCardBySlug(slug: string) {
  const card = getStore().cards.find((item) => item.slug === slug)
  if (!card || card.status !== "published") {
    throw new AppError("Content card not found", 404)
  }

  return card
}

export function createMockContentCard(data: ContentCardInput) {
  const store = getStore()
  const id = `mock-card-${store.sequence += 1}`
  const card = createCard(store.cards.length, {
    ...data,
    slug: uniqueMockSlug(data.title),
    steps: JSON.stringify(data.steps),
  })

  card.id = id
  card.createdAt = new Date()
  card.updatedAt = card.createdAt
  store.cards.unshift(card)
  return card
}

export function updateMockContentCard(id: string, data: ContentCardUpdate) {
  const store = getStore()
  const index = store.cards.findIndex((card) => card.id === id)
  if (index === -1) {
    throw new AppError("Content card not found", 404)
  }

  const existing = store.cards[index]
  const { steps, ...cardData } = data
  const updated: MockContentCard = {
    ...existing,
    ...cardData,
    ...(data.title ? { slug: uniqueMockSlug(data.title, id) } : {}),
    ...(steps ? { steps: JSON.stringify(steps) } : {}),
    updatedAt: new Date(),
  }

  store.cards[index] = updated
  return updated
}

export function deleteMockContentCard(id: string) {
  const store = getStore()
  const index = store.cards.findIndex((card) => card.id === id)
  if (index === -1) {
    throw new AppError("Content card not found", 404)
  }

  store.cards.splice(index, 1)
  store.interactions = store.interactions.filter((row) => row.contentCardId !== id)
  store.feedback = store.feedback.filter((row) => row.contentCardId !== id)
  store.tickets = store.tickets.map((ticket) => ticket.contentCardId === id ? { ...ticket, contentCardId: null } : ticket)
  return { ok: true }
}

export function recordMockInteraction(contentCardId: string, data: InteractionInput) {
  getMockContentCard(contentCardId)
  const store = getStore()
  const interaction = {
    id: `mock-interaction-${store.sequence += 1}`,
    contentCardId,
    type: data.type,
    userId: data.userId,
    createdAt: new Date(),
  }

  store.interactions.push(interaction)
  return interaction
}

export function createMockFeedback(contentCardId: string, data: FeedbackInput) {
  getMockContentCard(contentCardId)
  const store = getStore()
  const feedback = {
    id: `mock-feedback-${store.sequence += 1}`,
    contentCardId,
    message: data.message,
    sentiment: data.sentiment,
    tag: data.tag,
    createdAt: new Date(),
  }

  store.feedback.push(feedback)
  return feedback
}

export function listMockTickets(query: TicketQuery = {}) {
  return getStore().tickets
    .filter((ticket) => !query.status || ticket.status === query.status)
    .filter((ticket) => !query.severity || ticket.severity === query.severity)
    .sort((a, b) => a.status.localeCompare(b.status) || b.updatedAt.getTime() - a.updatedAt.getTime())
}

export function createMockTicket(data: BugTicketInput) {
  const store = getStore()
  const ticket = {
    ...data,
    id: `mock-ticket-${store.sequence += 1}`,
    githubIssueUrl: data.githubIssueUrl ?? null,
    contentCardId: data.contentCardId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  store.tickets.unshift(ticket)
  return ticket
}

export function updateMockTicket(id: string, data: BugTicketUpdate) {
  const store = getStore()
  const index = store.tickets.findIndex((ticket) => ticket.id === id)
  if (index === -1) {
    throw new AppError("Bug ticket not found", 404)
  }

  const ticket = {
    ...store.tickets[index],
    ...data,
    updatedAt: new Date(),
  }

  store.tickets[index] = ticket
  return ticket
}

export function deleteMockTicket(id: string) {
  const store = getStore()
  const index = store.tickets.findIndex((ticket) => ticket.id === id)
  if (index === -1) {
    throw new AppError("Bug ticket not found", 404)
  }

  store.tickets.splice(index, 1)
  return { ok: true }
}

export function getMockAnalytics() {
  const cards = listMockContentCards({ admin: true })
  const byCard = countMockMetrics()
  const feedbackSubmissions = getStore().feedback.length

  const totals = Object.values(byCard).reduce<{
    views: number
    completions: number
    helpfulVotes: number
    feedbackSubmissions: number
  }>(
    (acc, counts) => {
      acc.views += counts.view ?? 0
      acc.completions += counts.complete ?? 0
      acc.helpfulVotes += counts.helpful ?? 0
      return acc
    },
    { views: 0, completions: 0, helpfulVotes: 0, feedbackSubmissions }
  )

  const contentMetrics = cards.map((card) => ({
    id: card.id,
    title: card.title,
    category: card.category,
    status: card.status,
    views: byCard[card.id]?.view ?? 0,
    completions: byCard[card.id]?.complete ?? 0,
    helpfulVotes: byCard[card.id]?.helpful ?? 0,
  }))

  const categoryMap = new Map<string, { category: string; views: number; completions: number; helpfulVotes: number; contentCount: number }>()

  for (const metric of contentMetrics) {
    const existing = categoryMap.get(metric.category) ?? {
      category: metric.category,
      views: 0,
      completions: 0,
      helpfulVotes: 0,
      contentCount: 0,
    }

    existing.views += metric.views
    existing.completions += metric.completions
    existing.helpfulVotes += metric.helpfulVotes
    existing.contentCount += 1
    categoryMap.set(metric.category, existing)
  }

  return {
    totals,
    completionRate: totals.views === 0 ? 0 : Math.round((totals.completions / totals.views) * 1000) / 10,
    mostViewedContent: [...contentMetrics].sort((a, b) => b.views - a.views).slice(0, 5),
    mostHelpfulContent: [...contentMetrics].sort((a, b) => b.helpfulVotes - a.helpfulVotes).slice(0, 5),
    categoryPerformance: [...categoryMap.values()].sort((a, b) => b.views - a.views),
  }
}

export function getMockTicketTitle(contentCardId?: string | null) {
  if (!contentCardId) return null
  return getStore().cards.find((card) => card.id === contentCardId)?.title ?? null
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function uniqueMockSlug(title: string, currentId?: string) {
  const store = getStore()
  const baseSlug = slugify(title) || "mindtrack-card"
  let candidate = baseSlug
  let suffix = 2

  while (store.cards.some((card) => card.slug === candidate && card.id !== currentId)) {
    candidate = `${baseSlug}-${suffix}`
    suffix += 1
  }

  return candidate
}
