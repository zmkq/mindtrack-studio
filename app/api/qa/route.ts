import { requireAdmin } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { readJson, searchParamsToObject } from "@/lib/http"
import { createTicket, listTickets } from "@/lib/services/tickets"

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const url = new URL(request.url)
    const tickets = await listTickets(searchParamsToObject(url.searchParams))

    return Response.json({ data: tickets })
  } catch (error) {
    return jsonError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const ticket = await createTicket(await readJson(request))

    return Response.json({ data: ticket }, { status: 201 })
  } catch (error) {
    return jsonError(error)
  }
}
