import { getCurrentRole, setDemoRole } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import { roleInputSchema } from "@/lib/schemas"

export async function GET() {
  try {
    return Response.json({ data: { role: await getCurrentRole() } })
  } catch (error) {
    return jsonError(error)
  }
}

export async function POST(request: Request) {
  try {
    const { role } = roleInputSchema.parse(await readJson(request))
    await setDemoRole(role)

    return Response.json({ data: { role } })
  } catch (error) {
    return jsonError(error)
  }
}
