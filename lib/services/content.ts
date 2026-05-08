import { getDb } from "@/lib/db"
import { AppError } from "@/lib/errors"
import {
  countMockMetrics,
  createMockContentCard,
  deleteMockContentCard,
  getMockContentCard,
  getMockContentCardBySlug,
  listMockContentCards,
  shouldUseMockData,
  updateMockContentCard,
  type MockContentCard,
} from "@/lib/mock-store"
import {
  contentCardInputSchema,
  contentCardUpdateSchema,
  contentQuerySchema,
  type ContentCardInput,
  type ContentCardUpdate,
} from "@/lib/schemas"

type ContentRecord = Awaited<ReturnType<typeof getDb>>["contentCard"] extends {
  findMany: (...args: never[]) => Promise<Array<infer T>>
}
  ? T
  : never
type ContentRecordLike = ContentRecord | MockContentCard

export type ContentCardDto = {
  id: string
  title: string
  slug: string
  category: string
  estimatedMinutes: number
  shortDescription: string
  steps: string[]
  status: string
  createdAt: string
  updatedAt: string
  viewCount: number
  completionCount: number
  helpfulCount: number
  favoriteCount: number
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function parseSteps(value: string) {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : [value]
  } catch {
    return value
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean)
  }
}

function toDto(
  card: ContentRecordLike,
  metrics: Record<string, Record<string, number>> = {}
): ContentCardDto {
  const counts = metrics[card.id] ?? {}

  return {
    id: card.id,
    title: card.title,
    slug: card.slug,
    category: card.category,
    estimatedMinutes: card.estimatedMinutes,
    shortDescription: card.shortDescription,
    steps: parseSteps(card.steps),
    status: card.status,
    createdAt: card.createdAt.toISOString(),
    updatedAt: card.updatedAt.toISOString(),
    viewCount: counts.view ?? 0,
    completionCount: counts.complete ?? 0,
    helpfulCount: counts.helpful ?? 0,
    favoriteCount: counts.favorite ?? 0,
  }
}

async function getMetrics(contentCardIds: string[]) {
  if (contentCardIds.length === 0) {
    return {}
  }

  if (shouldUseMockData()) {
    return countMockMetrics(contentCardIds)
  }

  const db = getDb()
  const grouped = await db.userInteraction.groupBy({
    by: ["contentCardId", "type"],
    where: { contentCardId: { in: contentCardIds } },
    _count: { _all: true },
  })

  return grouped.reduce<Record<string, Record<string, number>>>((acc, row) => {
    acc[row.contentCardId] ??= {}
    acc[row.contentCardId][row.type] = row._count._all
    return acc
  }, {})
}

async function uniqueSlug(title: string, currentId?: string) {
  const db = getDb()
  const baseSlug = slugify(title) || "mindtrack-card"
  let candidate = baseSlug
  let suffix = 2

  while (true) {
    const existing = await db.contentCard.findUnique({ where: { slug: candidate } })
    if (!existing || existing.id === currentId) {
      return candidate
    }

    candidate = `${baseSlug}-${suffix}`
    suffix += 1
  }
}

export async function listContentCards(input: unknown = {}) {
  const query = contentQuerySchema.parse(input)

  if (shouldUseMockData()) {
    const cards = listMockContentCards(query)
    const metrics = await getMetrics(cards.map((card) => card.id))
    return cards.map((card) => toDto(card, metrics))
  }

  const db = getDb()
  const where = {
    ...(query.admin ? {} : { status: "published" }),
    ...(query.category ? { category: query.category } : {}),
    ...(query.admin && query.status ? { status: query.status } : {}),
    ...(query.search
      ? {
          OR: [
            { title: { contains: query.search } },
            { shortDescription: { contains: query.search } },
            { category: { contains: query.search } },
          ],
        }
      : {}),
  }

  const cards = await db.contentCard.findMany({
    where,
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  })
  const metrics = await getMetrics(cards.map((card) => card.id))

  return cards.map((card) => toDto(card, metrics))
}

export async function getContentCard(id: string, options: { admin?: boolean } = {}) {
  if (shouldUseMockData()) {
    const card = getMockContentCard(id, options)
    const metrics = await getMetrics([card.id])
    return toDto(card, metrics)
  }

  const db = getDb()
  const card = await db.contentCard.findUnique({ where: { id } })

  if (!card || (!options.admin && card.status !== "published")) {
    throw new AppError("Content card not found", 404)
  }

  const metrics = await getMetrics([card.id])
  return toDto(card, metrics)
}

export async function getContentCardBySlug(slug: string) {
  if (shouldUseMockData()) {
    const card = getMockContentCardBySlug(slug)
    const metrics = await getMetrics([card.id])
    return toDto(card, metrics)
  }

  const db = getDb()
  const card = await db.contentCard.findUnique({ where: { slug } })

  if (!card || card.status !== "published") {
    throw new AppError("Content card not found", 404)
  }

  const metrics = await getMetrics([card.id])
  return toDto(card, metrics)
}

export async function createContentCard(input: ContentCardInput) {
  const data = contentCardInputSchema.parse(input)

  if (shouldUseMockData()) {
    return toDto(createMockContentCard(data))
  }

  const db = getDb()
  const card = await db.contentCard.create({
    data: {
      ...data,
      slug: await uniqueSlug(data.title),
      steps: JSON.stringify(data.steps),
    },
  })

  return toDto(card)
}

export async function updateContentCard(id: string, input: ContentCardUpdate) {
  const data = contentCardUpdateSchema.parse(input)

  if (shouldUseMockData()) {
    const card = updateMockContentCard(id, data)
    const metrics = await getMetrics([card.id])
    return toDto(card, metrics)
  }

  const db = getDb()
  const existing = await db.contentCard.findUnique({ where: { id } })

  if (!existing) {
    throw new AppError("Content card not found", 404)
  }

  const { steps, ...cardData } = data
  const card = await db.contentCard.update({
    where: { id },
    data: {
      ...cardData,
      ...(data.title ? { slug: await uniqueSlug(data.title, id) } : {}),
      ...(steps ? { steps: JSON.stringify(steps) } : {}),
    },
  })
  const metrics = await getMetrics([card.id])

  return toDto(card, metrics)
}

export async function deleteContentCard(id: string) {
  if (shouldUseMockData()) {
    return deleteMockContentCard(id)
  }

  const db = getDb()
  await getContentCard(id, { admin: true })
  await db.contentCard.delete({ where: { id } })

  return { ok: true }
}
