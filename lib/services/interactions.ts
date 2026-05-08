import { getDb } from "@/lib/db"
import { getContentCard } from "@/lib/services/content"
import { recordMockInteraction, shouldUseMockData } from "@/lib/mock-store"
import { interactionInputSchema, type InteractionInput } from "@/lib/schemas"

export async function recordInteraction(contentCardId: string, input: InteractionInput) {
  const data = interactionInputSchema.parse(input)

  if (shouldUseMockData()) {
    const interaction = recordMockInteraction(contentCardId, data)

    return {
      id: interaction.id,
      contentCardId: interaction.contentCardId,
      type: interaction.type,
      userId: interaction.userId,
      createdAt: interaction.createdAt.toISOString(),
    }
  }

  const db = getDb()

  await getContentCard(contentCardId)

  const interaction = await db.userInteraction.create({
    data: {
      contentCardId,
      userId: data.userId,
      type: data.type,
    },
  })

  return {
    id: interaction.id,
    contentCardId: interaction.contentCardId,
    type: interaction.type,
    userId: interaction.userId,
    createdAt: interaction.createdAt.toISOString(),
  }
}
