import { requireAdmin } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { getAnalytics } from "@/lib/services/analytics"

export async function GET() {
  try {
    await requireAdmin()
    const analytics = await getAnalytics()

    return Response.json({ data: analytics })
  } catch (error) {
    return jsonError(error)
  }
}
