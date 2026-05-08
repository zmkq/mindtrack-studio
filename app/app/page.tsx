import { ContentBrowser } from "@/components/content-browser"
import { listContentCards } from "@/lib/services/content"

export default async function UserAppPage() {
  const cards = await listContentCards()

  return <ContentBrowser cards={cards} />
}
