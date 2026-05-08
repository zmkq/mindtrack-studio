"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {error.message || "MindTrack Studio could not complete this request."}
          </p>
          <Button onClick={reset}>Try again</Button>
        </CardContent>
      </Card>
    </main>
  )
}
