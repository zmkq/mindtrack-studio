import Link from "next/link"

import { AdminContentPanel } from "@/components/admin-content-panel"
import { RoleSwitcher } from "@/components/role-switcher"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getCurrentRole } from "@/lib/auth"
import { listContentCards } from "@/lib/services/content"

export default async function AdminContentPage() {
  const role = await getCurrentRole()
  const cards = role === "admin" ? await listContentCards({ admin: true }) : []

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-[#090908] px-6 py-8 text-[#eee6d8]">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="outline">
              <Link href="/">Back to Studio</Link>
            </Button>
            <RoleSwitcher role={role} />
          </div>
          <Alert>
            <AlertTitle>Admin role required</AlertTitle>
            <AlertDescription>
              Switch to the local admin role to use the Content Studio.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return <AdminContentPanel initialCards={cards} />
}
