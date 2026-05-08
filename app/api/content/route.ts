import { requireAdmin } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { readJson, searchParamsToObject } from "@/lib/http"
import { createContentCard, listContentCards } from "@/lib/services/content"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = searchParamsToObject(url.searchParams)
    const cards = await listContentCards(query)

    return Response.json({ data: cards })
  } catch (error) {
    return jsonError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const card = await createContentCard(await readJson(request))

    return Response.json({ data: card }, { status: 201 })
  } catch (error) {
    return jsonError(error)
  }
}
