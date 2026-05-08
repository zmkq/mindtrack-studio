import { cookies } from "next/headers"

import { AppError } from "@/lib/errors"
import { roleInputSchema, type Role } from "@/lib/schemas"

const ROLE_COOKIE = "mindtrack-demo-role"

export async function getCurrentRole(): Promise<Role> {
  const cookieStore = await cookies()
  const rawRole = cookieStore.get(ROLE_COOKIE)?.value
  const parsed = roleInputSchema.safeParse({ role: rawRole })

  return parsed.success ? parsed.data.role : "user"
}

export async function requireAdmin() {
  const role = await getCurrentRole()
  if (role !== "admin") {
    throw new AppError("Admin role required for this action", 403)
  }
}

export async function setDemoRole(role: Role) {
  const cookieStore = await cookies()
  cookieStore.set(ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function clearDemoRole() {
  const cookieStore = await cookies()
  cookieStore.delete(ROLE_COOKIE)
}

/*
  AWS Cognito integration point:
  Replace the local role cookie with Cognito JWT/session validation here.
  The rest of the app should continue to call getCurrentRole() and
  requireAdmin(), which keeps route handlers and server components isolated
  from the auth provider implementation.
*/
