import { z } from "zod"

export const categories = [
  "Stress",
  "Focus",
  "Sleep",
  "Motivation",
  "Habits",
  "Relationships",
] as const

export const contentStatuses = ["published", "unpublished"] as const
export const interactionTypes = ["view", "complete", "helpful", "favorite"] as const
export const roles = ["user", "admin"] as const
export const severities = ["low", "medium", "high"] as const
export const ticketStatuses = ["open", "in progress", "fixed"] as const

export const contentCardInputSchema = z.object({
  title: z.string().trim().min(4).max(120),
  category: z.enum(categories),
  estimatedMinutes: z.coerce.number().int().min(1).max(60),
  shortDescription: z.string().trim().min(20).max(280),
  steps: z.array(z.string().trim().min(8)).min(2).max(8),
  status: z.enum(contentStatuses).default("unpublished"),
})

export const contentCardUpdateSchema = contentCardInputSchema.partial()

export const contentQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z.enum(categories).optional(),
  status: z.enum(contentStatuses).optional(),
  admin: z.coerce.boolean().optional(),
})

export const interactionInputSchema = z.object({
  type: z.enum(interactionTypes),
  userId: z.string().trim().min(1).max(80).default("demo-user"),
})

export const feedbackInputSchema = z.object({
  message: z.string().trim().min(8).max(500),
  sentiment: z.enum(["positive", "neutral", "negative"]).default("neutral"),
  tag: z.string().trim().max(40).optional(),
})

export const bugTicketInputSchema = z.object({
  title: z.string().trim().min(5).max(140),
  description: z.string().trim().min(12).max(1000),
  severity: z.enum(severities).default("medium"),
  status: z.enum(ticketStatuses).default("open"),
  relatedPage: z.string().trim().min(1).max(160),
  githubIssueUrl: z
    .string()
    .trim()
    .url()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  contentCardId: z
    .string()
    .trim()
    .optional()
    .or(z.literal("").transform(() => undefined)),
})

export const bugTicketUpdateSchema = bugTicketInputSchema.partial()

export const qaQuerySchema = z.object({
  status: z.enum(ticketStatuses).optional(),
  severity: z.enum(severities).optional(),
})

export const roleInputSchema = z.object({
  role: z.enum(roles),
})

export const reflectionInputSchema = z.object({
  reflection: z.string().trim().min(20).max(1600),
})

export type ContentCardInput = z.infer<typeof contentCardInputSchema>
export type ContentCardUpdate = z.infer<typeof contentCardUpdateSchema>
export type InteractionInput = z.infer<typeof interactionInputSchema>
export type FeedbackInput = z.infer<typeof feedbackInputSchema>
export type BugTicketInput = z.infer<typeof bugTicketInputSchema>
export type BugTicketUpdate = z.infer<typeof bugTicketUpdateSchema>
export type Role = (typeof roles)[number]
