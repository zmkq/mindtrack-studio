import { requireAdmin } from "@/lib/auth"
import { jsonError } from "@/lib/errors"
import { readJson } from "@/lib/http"
import { deleteTicket, updateTicket } from "@/lib/services/tickets"

type Params = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    const ticket = await updateTicket(id, await readJson(request))

    return Response.json({ data: ticket })
  } catch (error) {
    return jsonError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    const result = await deleteTicket(id)

    return Response.json(result)
  } catch (error) {
    return jsonError(error)
  }
}
