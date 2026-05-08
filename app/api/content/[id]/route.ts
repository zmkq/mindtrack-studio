import { requireAdmin } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import {
  deleteContentCard,
  getContentCard,
  updateContentCard,
} from "@/lib/services/content"
import { recordInteraction } from "@/lib/services/interactions"

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const url = new URL(request.url)
    const admin = url.searchParams.get("admin") === "true"
    const trackView = url.searchParams.get("trackView") !== "false" && !admin

    const card = await getContentCard(id, { admin })

    if (trackView) {
      await recordInteraction(id, { type: "view", userId: "demo-user" })
    }

    return Response.json({ data: card })
  } catch (error) {
    return jsonError(error)
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    const card = await updateContentCard(id, await readJson(request))

    return Response.json({ data: card })
  } catch (error) {
    return jsonError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    const result = await deleteContentCard(id)

    return Response.json(result)
  } catch (error) {
    return jsonError(error)
  }
}
