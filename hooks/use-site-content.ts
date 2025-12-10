"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { cloneDefaultContent, ensureSiteContent, MENU_DATA_URL, type SiteContent } from "@/lib/site-content"

export function useSiteContent(initialContent?: SiteContent) {
  const [content, setContent] = useState<SiteContent>(initialContent ?? cloneDefaultContent())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${MENU_DATA_URL}?ts=${Date.now()}`, { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch site content")
      }
      const payload = await response.json()
      setContent(ensureSiteContent(payload))
      setError(null)
    } catch (err) {
      console.error("Unable to fetch site content", err)
      setError("Unable to load the latest content. Showing the last saved version.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchContent()
  }, [fetchContent])

  return useMemo(
    () => ({
      content,
      isLoading,
      error,
      refresh: fetchContent,
    }),
    [content, error, fetchContent, isLoading]
  )
}
