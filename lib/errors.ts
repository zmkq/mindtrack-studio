import { ZodError } from "zod"

export class AppError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

export function jsonError(error: unknown) {
  if (error instanceof AppError) {
    return Response.json({ error: error.message }, { status: error.status })
  }

  if (error instanceof ZodError) {
    return Response.json(
      {
        error: "Validation failed",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 }
    )
  }

  console.error(error)
  return Response.json({ error: "Unexpected server error" }, { status: 500 })
}
