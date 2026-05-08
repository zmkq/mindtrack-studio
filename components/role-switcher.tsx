"use client"

import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import type { Role } from "@/lib/schemas"

export function RoleSwitcher({ role }: { role: Role }) {
  const [currentRole, setCurrentRole] = useState(role)
  const [isPending, startTransition] = useTransition()

  function switchRole(nextRole: Role) {
    startTransition(async () => {
      const response = await fetch("/api/auth/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      })

      if (response.ok) {
        setCurrentRole(nextRole)
        window.location.reload()
      }
    })
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2 text-sm">
      <span className="px-2 text-muted-foreground">Role: {currentRole}</span>
      <Button
        type="button"
        size="sm"
        variant={currentRole === "user" ? "default" : "outline"}
        disabled={isPending}
        onClick={() => switchRole("user")}
      >
        User
      </Button>
      <Button
        type="button"
        size="sm"
        variant={currentRole === "admin" ? "default" : "outline"}
        disabled={isPending}
        onClick={() => switchRole("admin")}
      >
        Admin
      </Button>
    </div>
  )
}
