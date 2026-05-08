import Link from "next/link"

import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { RoleSwitcher } from "@/components/role-switcher"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getCurrentRole } from "@/lib/auth"
import { getAnalytics } from "@/lib/services/analytics"

export default async function AdminAnalyticsPage() {
  const role = await getCurrentRole()
  const analytics = role === "admin" ? await getAnalytics() : null

  if (!analytics) {
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
              Switch to the local admin role to view engagement analytics.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return <AnalyticsDashboard data={analytics} />
}
