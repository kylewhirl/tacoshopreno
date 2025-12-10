"use client"

import { useEffect, useMemo, useState } from "react"
import {
  AlertCircle,
  BookText,
  Cog,
  Loader2,
  Megaphone,
  Phone,
  RefreshCcw,
  Save,
  Share2,
  Trash2,
  Undo2,
  UtensilsCrossed,
  Wand2,
  Plus,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSiteContent } from "@/hooks/use-site-content"
import {
  buildSiteContentPayload,
  cloneDefaultContent,
  MENU_SOURCE,
  type ContactHour,
  type MenuItem,
  type MenuSectionData,
  type SiteContent,
} from "@/lib/site-content"

const NAV_ITEMS = [
  { id: "hero", label: "Hero & CTA", icon: Megaphone },
  { id: "important", label: "Important Info", icon: AlertCircle },
  { id: "about", label: "About", icon: BookText },
  { id: "contact", label: "Contact & Hours", icon: Phone },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "settings", label: "Settings", icon: Cog },
] as const

type SectionId = (typeof NAV_ITEMS)[number]["id"]

interface AdminDashboardProps {
  githubToken: string
  onGithubTokenChange: (token: string) => void
  rememberToken: boolean
  onRememberTokenChange: (nextValue: boolean) => void
  onSignOut?: () => void
}

export default function AdminDashboard({
  githubToken,
  onGithubTokenChange,
  rememberToken,
  onRememberTokenChange,
  onSignOut,
}: AdminDashboardProps) {
  const { content, isLoading, error: fetchError, refresh } = useSiteContent()
  const [draft, setDraft] = useState<SiteContent>(content)
  const [activeSection, setActiveSection] = useState<SectionId>("hero")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setDraft(content)
  }, [content])

  const draftHasChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content])

  const handleHeroChange = (field: "title" | "subtitle", value: string) => {
    setDraft((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }))
  }

  const handleHeroCtaChange = (ctaKey: "primaryCta" | "secondaryCta", field: "label" | "href", value: string) => {
    setDraft((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [ctaKey]: {
          ...prev.hero[ctaKey],
          [field]: value,
        },
      },
    }))
  }

  const handleImportantChange = (field: "announcement" | "highlight", value: string) => {
    setDraft((prev) => ({
      ...prev,
      important: { ...prev.important, [field]: value },
    }))
  }

  const handleAboutChange = (field: "heading" | "highlight", value: string) => {
    setDraft((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }))
  }

  const handleAboutParagraphChange = (index: number, value: string) => {
    setDraft((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        paragraphs: prev.about.paragraphs.map((paragraph, idx) => (idx === index ? value : paragraph)),
      },
    }))
  }

  const addAboutParagraph = () => {
    setDraft((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: [...prev.about.paragraphs, ""] },
    }))
  }

  const removeAboutParagraph = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: prev.about.paragraphs.filter((_, idx) => idx !== index) },
    }))
  }

  const handleAddressChange = (index: number, value: string) => {
    setDraft((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        addressLines: prev.contact.addressLines.map((line, idx) => (idx === index ? value : line)),
      },
    }))
  }

  const addAddressLine = () => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, addressLines: [...prev.contact.addressLines, ""] },
    }))
  }

  const removeAddressLine = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        addressLines: prev.contact.addressLines.filter((_, idx) => idx !== index),
      },
    }))
  }

  const handleContactField = (field: "phone", value: string) => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const handleHourChange = (index: number, field: keyof ContactHour, value: string) => {
    setDraft((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        hours: prev.contact.hours.map((entry, idx) => (idx === index ? { ...entry, [field]: value } : entry)),
      },
    }))
  }

  const addHourEntry = () => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, hours: [...prev.contact.hours, { label: "New Day", value: "" }] },
    }))
  }

  const removeHourEntry = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, hours: prev.contact.hours.filter((_, idx) => idx !== index) },
    }))
  }

  const handleSocialLinkChange = (index: number, field: "label" | "url", value: string) => {
    setDraft((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, idx) => (idx === index ? { ...link, [field]: value } : link)),
    }))
  }

  const addSocialLink = () => {
    setDraft((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { label: "New Link", url: "https://" }],
    }))
  }

  const removeSocialLink = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, idx) => idx !== index),
    }))
  }

  const handleMenuChange = (nextSections: MenuSectionData[]) => {
    setDraft((prev) => ({
      ...prev,
      menu: { sections: nextSections },
    }))
  }

  const handleRevert = () => {
    setDraft(content)
    setStatus("idle")
    setError(null)
  }

  const handleLoadDefaults = () => {
    setDraft(cloneDefaultContent())
    setStatus("idle")
    setError(null)
  }

  const handleSave = async () => {
    if (!draftHasChanges) return
    if (!githubToken) {
      setStatus("error")
      setError("Enter a GitHub token in Settings to save changes.")
      return
    }

    setStatus("saving")
    setError(null)

    try {
      const sha = await fetchCurrentSha(githubToken)
      await updateGithubFile({ token: githubToken, sha, payload: buildSiteContentPayload(draft) })
      setStatus("saved")
      await refresh()
      setTimeout(() => setStatus("idle"), 2000)
    } catch (err) {
      console.error("Failed to save site content", err)
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to save site content.")
    }
  }

  const refreshFromRemote = async () => {
    setStatus("idle")
    setError(null)
    await refresh()
  }

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Hero & CTA</CardTitle>
              <CardDescription>Update the hero headline and call-to-action links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Headline">
                  <Input value={draft.hero.title} onChange={(event) => handleHeroChange("title", event.target.value)} />
                </Field>
                <Field label="Subheading">
                  <Input value={draft.hero.subtitle} onChange={(event) => handleHeroChange("subtitle", event.target.value)} />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary CTA Label">
                  <Input
                    value={draft.hero.primaryCta.label}
                    onChange={(event) => handleHeroCtaChange("primaryCta", "label", event.target.value)}
                  />
                </Field>
                <Field label="Primary CTA Link">
                  <Input
                    value={draft.hero.primaryCta.href}
                    onChange={(event) => handleHeroCtaChange("primaryCta", "href", event.target.value)}
                  />
                </Field>
                <Field label="Secondary CTA Label">
                  <Input
                    value={draft.hero.secondaryCta.label}
                    onChange={(event) => handleHeroCtaChange("secondaryCta", "label", event.target.value)}
                  />
                </Field>
                <Field label="Secondary CTA Link">
                  <Input
                    value={draft.hero.secondaryCta.href}
                    onChange={(event) => handleHeroCtaChange("secondaryCta", "href", event.target.value)}
                  />
                </Field>
              </div>
            </CardContent>
          </Card>
        )
      case "important":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Important Messaging</CardTitle>
              <CardDescription>Highlight announcements or quick info for visitors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Announcement">
                <Textarea value={draft.important.announcement} onChange={(event) => handleImportantChange("announcement", event.target.value)} />
              </Field>
              <Field label="Highlight">
                <Textarea value={draft.important.highlight} onChange={(event) => handleImportantChange("highlight", event.target.value)} />
              </Field>
            </CardContent>
          </Card>
        )
      case "about":
        return (
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Control the copy used in the About block on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Heading">
                  <Input value={draft.about.heading} onChange={(event) => handleAboutChange("heading", event.target.value)} />
                </Field>
                <Field label="Highlight">
                  <Input value={draft.about.highlight} onChange={(event) => handleAboutChange("highlight", event.target.value)} />
                </Field>
              </div>
              <Separator />
              <div className="space-y-4">
                {draft.about.paragraphs.map((paragraph, index) => (
                  <div key={`paragraph-${index}`} className="space-y-2">
                    <Field label={`Paragraph ${index + 1}`}>
                      <Textarea value={paragraph} onChange={(event) => handleAboutParagraphChange(index, event.target.value)} />
                    </Field>
                    {draft.about.paragraphs.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeAboutParagraph(index)} className="text-red-600">
                        Remove paragraph
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addAboutParagraph}>
                  Add paragraph
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case "contact":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Manage address, phone number, and business hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field label="Phone">
                <Input value={draft.contact.phone} onChange={(event) => handleContactField("phone", event.target.value)} />
              </Field>
              <div className="space-y-3">
                <p className="text-sm font-medium text-dark">Address lines</p>
                {draft.contact.addressLines.map((line, index) => (
                  <div key={`address-${index}`} className="flex gap-2">
                    <Input value={line} onChange={(event) => handleAddressChange(index, event.target.value)} />
                    {draft.contact.addressLines.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAddressLine(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addAddressLine}>
                  Add address line
                </Button>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-dark">Hours</p>
                {draft.contact.hours.map((entry, index) => (
                  <div key={`hour-${index}`} className="grid gap-2 md:grid-cols-2">
                    <Input value={entry.label} onChange={(event) => handleHourChange(index, "label", event.target.value)} />
                    <div className="flex gap-2">
                      <Input value={entry.value} onChange={(event) => handleHourChange(index, "value", event.target.value)} />
                      {draft.contact.hours.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeHourEntry(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addHourEntry}>
                  Add hours row
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case "social":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Links appear in the Contact section on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {draft.socialLinks.map((link, index) => (
                <div key={`social-${index}`} className="grid gap-2 md:grid-cols-2">
                  <Input placeholder="Label" value={link.label} onChange={(event) => handleSocialLinkChange(index, "label", event.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="https://" value={link.url} onChange={(event) => handleSocialLinkChange(index, "url", event.target.value)} />
                    {draft.socialLinks.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                Add social link
              </Button>
            </CardContent>
          </Card>
        )
      case "menu":
        return <MenuEditor sections={draft.menu.sections} onChange={handleMenuChange} />
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>GitHub Settings</CardTitle>
              <CardDescription>
                Content is stored in <span className="font-mono">{MENU_SOURCE.path}</span> on the <span className="font-mono">{MENU_SOURCE.branch}</span> branch.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Personal Access Token">
                <Input
                  type="password"
                  value={githubToken}
                  onChange={(event) => onGithubTokenChange(event.target.value)}
                  placeholder="GitHub token with contents:write"
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={rememberToken} onCheckedChange={(checked) => onRememberTokenChange(Boolean(checked))} />
                Remember token on this device
              </label>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-white">
        <SidebarHeader className="border-b px-4 py-4">
          <p className="font-semibold text-lg">Taco Shop Admin</p>
          <p className="text-xs text-muted-foreground">Update site content</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b bg-white px-6 py-4 shadow-sm">
          <SidebarTrigger className="md:hidden" />
          <div>
            <p className="font-semibold">Site Content Manager</p>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            {onSignOut && (
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                Sign out
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={refreshFromRemote}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Reload
            </Button>
            <Button variant="outline" size="sm" onClick={handleLoadDefaults}>
              <Wand2 className="w-4 h-4 mr-2" /> Defaults
            </Button>
            <Button variant="outline" size="sm" onClick={handleRevert} disabled={!draftHasChanges}>
              <Undo2 className="w-4 h-4 mr-2" /> Revert
            </Button>
            <Button onClick={handleSave} size="sm" disabled={!draftHasChanges || status === "saving" || !githubToken}>
              {status === "saving" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {status === "saving" ? "Saving" : "Save"}
            </Button>
          </div>
          {status === "saved" && <p className="text-sm text-green-600">Content updated.</p>}
          {(error || fetchError) && <p className="text-sm text-red-600">{error ?? fetchError}</p>}
          {!githubToken && <p className="text-sm text-amber-600">Enter a GitHub token in Settings to enable saving.</p>}
        </header>
        <div className="p-6">
          {isLoading && !draft && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading content...</span>
            </div>
          )}
          <div className="space-y-6">{renderSection()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium text-dark/80 flex flex-col gap-2">
      {label}
      {children}
    </label>
  )
}

interface MenuEditorProps {
  sections: MenuSectionData[]
  onChange: (nextSections: MenuSectionData[]) => void
}

function MenuEditor({ sections, onChange }: MenuEditorProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex >= sections.length) {
      setActiveIndex(Math.max(0, sections.length - 1))
    }
  }, [activeIndex, sections.length])

  const updateSection = (index: number, updated: MenuSectionData) => {
    onChange(sections.map((section, idx) => (idx === index ? updated : section)))
  }

  const updateItem = (sectionIndex: number, itemIndex: number, field: keyof MenuItem, value: string) => {
    const targetSection = sections[sectionIndex]
    const nextItems = targetSection.items.map((item, idx) => (idx === itemIndex ? { ...item, [field]: value } : item))
    updateSection(sectionIndex, { ...targetSection, items: nextItems })
  }

  const addItem = (sectionIndex: number) => {
    const targetSection = sections[sectionIndex]
    updateSection(sectionIndex, {
      ...targetSection,
      items: [...targetSection.items, { name: "New Item", description: "", price: "" }],
    })
  }

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const targetSection = sections[sectionIndex]
    updateSection(sectionIndex, {
      ...targetSection,
      items: targetSection.items.filter((_, idx) => idx !== itemIndex),
    })
  }

  const addSection = () => {
    onChange([...sections, { title: "New Section", description: "", pricing: "", items: [] }])
    setActiveIndex(sections.length)
  }

  const removeSection = (index: number) => {
    if (sections.length <= 1) return
    onChange(sections.filter((_, idx) => idx !== index))
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const activeSection = sections[activeIndex]

  if (!activeSection) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="button" onClick={addSection}>
            Add first section
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
        <CardDescription>Edit sections and dishes shown on the public menu.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {sections.map((section, index) => (
            <Button
              key={`${section.title}-${index}`}
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
              size="sm"
            >
              {section.title || `Section ${index + 1}`}
            </Button>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addSection}>
            <Plus className="w-4 h-4 mr-2" /> Add Section
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Title">
            <Input value={activeSection.title} onChange={(event) => updateSection(activeIndex, { ...activeSection, title: event.target.value })} />
          </Field>
          <Field label="Description">
            <Input
              value={activeSection.description ?? ""}
              onChange={(event) => updateSection(activeIndex, { ...activeSection, description: event.target.value })}
            />
          </Field>
          <Field label="Pricing">
            <Input
              value={activeSection.pricing ?? ""}
              onChange={(event) => updateSection(activeIndex, { ...activeSection, pricing: event.target.value })}
            />
          </Field>
        </div>
        <Separator />
        <div className="space-y-4">
          {activeSection.items.map((item, itemIndex) => (
            <div key={`item-${itemIndex}`} className="space-y-3 rounded-lg border p-4">
              <div className="grid gap-2 md:grid-cols-3">
                <Field label="Name">
                  <Input value={item.name} onChange={(event) => updateItem(activeIndex, itemIndex, "name", event.target.value)} />
                </Field>
                <Field label="Price">
                  <Input value={item.price ?? ""} onChange={(event) => updateItem(activeIndex, itemIndex, "price", event.target.value)} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  value={item.description ?? ""}
                  onChange={(event) => updateItem(activeIndex, itemIndex, "description", event.target.value)}
                />
              </Field>
              <Button type="button" variant="ghost" size="sm" className="text-red-600" onClick={() => removeItem(activeIndex, itemIndex)}>
                <Trash2 className="w-4 h-4 mr-2" /> Remove item
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => addItem(activeIndex)}>
            Add item
          </Button>
        </div>
        {sections.length > 1 && (
          <Button type="button" variant="ghost" size="sm" className="text-red-600" onClick={() => removeSection(activeIndex)}>
            <Trash2 className="w-4 h-4 mr-2" /> Remove section
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

async function fetchCurrentSha(token: string): Promise<string | undefined> {
  const response = await fetch(`${MENU_SOURCE.apiBase}?ref=${MENU_SOURCE.branch}`, {
    headers: githubHeaders(token),
    cache: "no-store",
  })

  if (!response.ok) {
    if (response.status === 404) {
      return undefined
    }
    throw new Error(await extractGithubError(response, "Unable to read current menu file."))
  }

  const data = await response.json()
  return data.sha as string
}

async function updateGithubFile({
  token,
  sha,
  payload,
}: {
  token: string
  sha?: string
  payload: SiteContent
}) {
  const contentString = JSON.stringify(payload, null, 2)
  const content = encodeBase64(contentString)

  const response = await fetch(MENU_SOURCE.apiBase, {
    method: "PUT",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore: update site content",
      content,
      sha,
      branch: MENU_SOURCE.branch,
    }),
  })

  if (!response.ok) {
    throw new Error(await extractGithubError(response, "Failed to update GitHub file."))
  }
}

const githubHeaders = (token: string) => ({
  Authorization: `${getAuthScheme(token)} ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "taco-shop-admin",
})

const encodeBase64 = (value: string) => {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(unescape(encodeURIComponent(value)))
  }

  const nodeBuffer = (globalThis as unknown as { Buffer?: { from(value: string, encoding: string): { toString(encoding: string): string } } }).Buffer
  if (nodeBuffer) {
    return nodeBuffer.from(value, "utf-8").toString("base64")
  }

  throw new Error("Base64 encoding is not supported in this environment.")
}

const getAuthScheme = (token: string) => {
  if (token.startsWith("github_pat_") || token.startsWith("gho_") || token.startsWith("gha_") || token.startsWith("ghu_")) {
    return "Bearer"
  }
  return "token"
}

async function extractGithubError(response: Response, fallback: string) {
  try {
    const data = await response.json()
    if (typeof data?.message === "string" && data.message.length) {
      return data.message
    }
  } catch {
    // ignore
  }

  try {
    const text = await response.text()
    if (text) {
      return text
    }
  } catch {
    // ignore
  }

  return fallback
}
