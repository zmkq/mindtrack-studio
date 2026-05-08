import { getDb } from "@/lib/db"
import { getContentCard } from "@/lib/services/content"
import { feedbackInputSchema, type FeedbackInput } from "@/lib/schemas"

export async function createFeedback(contentCardId: string, input: FeedbackInput) {
  const data = feedbackInputSchema.parse(input)
  const db = getDb()

  await getContentCard(contentCardId)

  const feedback = await db.feedback.create({
    data: {
      contentCardId,
      message: data.message,
      sentiment: data.sentiment,
      tag: data.tag,
    },
  })

  return {
    id: feedback.id,
    contentCardId: feedback.contentCardId,
    message: feedback.message,
    sentiment: feedback.sentiment,
    tag: feedback.tag,
    createdAt: feedback.createdAt.toISOString(),
  }
}
