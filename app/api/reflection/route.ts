import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import { summarizeReflection } from "@/lib/services/reflection"

export async function POST(request: Request) {
  try {
    const result = summarizeReflection(await readJson(request))

    return Response.json({ data: result })
  } catch (error) {
    return jsonError(error)
  }
}
