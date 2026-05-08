import { getDb } from "@/lib/db"
import { AppError } from "@/lib/errors"
import {
  createMockTicket,
  deleteMockTicket,
  getMockTicketTitle,
  listMockTickets,
  shouldUseMockData,
  updateMockTicket,
} from "@/lib/mock-store"
import {
  bugTicketInputSchema,
  bugTicketUpdateSchema,
  qaQuerySchema,
  type BugTicketInput,
  type BugTicketUpdate,
} from "@/lib/schemas"

function toTicketDto(ticket: Awaited<ReturnType<typeof getTicketRecord>>) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    severity: ticket.severity,
    status: ticket.status,
    relatedPage: ticket.relatedPage,
    githubIssueUrl: ticket.githubIssueUrl,
    contentCardId: ticket.contentCardId,
    contentTitle: ticket.contentCard?.title ?? null,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }
}

function toMockTicketDto(ticket: ReturnType<typeof listMockTickets>[number]) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    severity: ticket.severity,
    status: ticket.status,
    relatedPage: ticket.relatedPage,
    githubIssueUrl: ticket.githubIssueUrl ?? null,
    contentCardId: ticket.contentCardId ?? null,
    contentTitle: getMockTicketTitle(ticket.contentCardId),
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }
}

async function getTicketRecord(id: string) {
  const db = getDb()
  const ticket = await db.bugTicket.findUnique({
    where: { id },
    include: { contentCard: { select: { title: true } } },
  })

  if (!ticket) {
    throw new AppError("Bug ticket not found", 404)
  }

  return ticket
}

export async function listTickets(input: unknown = {}) {
  const query = qaQuerySchema.parse(input)

  if (shouldUseMockData()) {
    return listMockTickets(query).map(toMockTicketDto)
  }

  const db = getDb()
  const tickets = await db.bugTicket.findMany({
    where: {
      ...(query.status ? { status: query.status } : {}),
      ...(query.severity ? { severity: query.severity } : {}),
    },
    include: { contentCard: { select: { title: true } } },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  })

  return tickets.map(toTicketDto)
}

export async function createTicket(input: BugTicketInput) {
  const data = bugTicketInputSchema.parse(input)

  if (shouldUseMockData()) {
    return toMockTicketDto(createMockTicket(data))
  }

  const db = getDb()

  const ticket = await db.bugTicket.create({
    data,
    include: { contentCard: { select: { title: true } } },
  })

  return toTicketDto(ticket)
}

export async function updateTicket(id: string, input: BugTicketUpdate) {
  const data = bugTicketUpdateSchema.parse(input)

  if (shouldUseMockData()) {
    return toMockTicketDto(updateMockTicket(id, data))
  }

  const db = getDb()
  await getTicketRecord(id)

  const ticket = await db.bugTicket.update({
    where: { id },
    data,
    include: { contentCard: { select: { title: true } } },
  })

  return toTicketDto(ticket)
}

export async function deleteTicket(id: string) {
  if (shouldUseMockData()) {
    return deleteMockTicket(id)
  }

  const db = getDb()
  await getTicketRecord(id)
  await db.bugTicket.delete({ where: { id } })

  return { ok: true }
}
