import HomeContent from "@/components/home-content"
import { DEFAULT_SITE_CONTENT } from "@/lib/site-content"

export default function Home() {
  return <HomeContent initialContent={DEFAULT_SITE_CONTENT} />
}
