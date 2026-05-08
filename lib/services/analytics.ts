import { getDb } from "@/lib/db"
import { getMockAnalytics, shouldUseMockData } from "@/lib/mock-store"

export async function getAnalytics() {
  if (shouldUseMockData()) {
    return getMockAnalytics()
  }

  const db = getDb()
  const [cards, interactions, feedbackCount] = await Promise.all([
    db.contentCard.findMany(),
    db.userInteraction.groupBy({
      by: ["contentCardId", "type"],
      _count: { _all: true },
    }),
    db.feedback.count(),
  ])

  const byCard = interactions.reduce<Record<string, Record<string, number>>>((acc, row) => {
    acc[row.contentCardId] ??= {}
    acc[row.contentCardId][row.type] = row._count._all
    return acc
  }, {})

  const totals = interactions.reduce(
    (acc, row) => {
      if (row.type === "view") acc.views += row._count._all
      if (row.type === "complete") acc.completions += row._count._all
      if (row.type === "helpful") acc.helpfulVotes += row._count._all
      return acc
    },
    { views: 0, completions: 0, helpfulVotes: 0, feedbackSubmissions: feedbackCount }
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

  const categoryMap = new Map<
    string,
    { category: string; views: number; completions: number; helpfulVotes: number; contentCount: number }
  >()

  for (const metric of contentMetrics) {
    const existing =
      categoryMap.get(metric.category) ??
      {
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
