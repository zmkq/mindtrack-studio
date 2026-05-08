import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import { recordInteraction } from "@/lib/services/interactions"

type Params = {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const interaction = await recordInteraction(id, await readJson(request))

    return Response.json({ data: interaction }, { status: 201 })
  } catch (error) {
    return jsonError(error)
  }
}
