import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import { createFeedback } from "@/lib/services/feedback"

type Params = {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const feedback = await createFeedback(id, await readJson(request))

    return Response.json({ data: feedback }, { status: 201 })
  } catch (error) {
    return jsonError(error)
  }
}
