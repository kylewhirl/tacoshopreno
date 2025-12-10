import siteContentJson from "@/menu.json"

export type CTAContent = {
  label: string
  href: string
}

export type HeroContent = {
  title: string
  subtitle: string
  primaryCta: CTAContent
  secondaryCta: CTAContent
}

export type ImportantContent = {
  announcement: string
  highlight: string
}

export type AboutContent = {
  heading: string
  highlight: string
  paragraphs: string[]
}

export type ContactHour = {
  label: string
  value: string
}

export type ContactContent = {
  addressLines: string[]
  phone: string
  hours: ContactHour[]
}

export type SocialLink = {
  label: string
  url: string
}

export type MenuItem = {
  name: string
  description?: string
  price?: string
}

export type MenuSectionData = {
  title: string
  description?: string
  pricing?: string
  items: MenuItem[]
}

export type MenuContent = {
  sections: MenuSectionData[]
}

export type SiteContent = {
  hero: HeroContent
  important: ImportantContent
  about: AboutContent
  contact: ContactContent
  socialLinks: SocialLink[]
  menu: MenuContent
}

const parsedSiteContent = siteContentJson as Partial<SiteContent>

export const DEFAULT_SITE_CONTENT = ensureSiteContent(parsedSiteContent)

export const cloneDefaultContent = (): SiteContent => JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT))

export function ensureSiteContent(payload: unknown): SiteContent {
  const data = (payload as Partial<SiteContent>) ?? {}

  return {
    hero: ensureHeroContent(data.hero),
    important: ensureImportantContent(data.important),
    about: ensureAboutContent(data.about),
    contact: ensureContactContent(data.contact),
    socialLinks: ensureSocialLinks(data.socialLinks),
    menu: { sections: ensureMenuSections(data.menu?.sections) },
  }
}

export const buildSiteContentPayload = (content: SiteContent): SiteContent => ({
  hero: { ...content.hero },
  important: { ...content.important },
  about: { ...content.about, paragraphs: [...content.about.paragraphs] },
  contact: {
    addressLines: [...content.contact.addressLines],
    phone: content.contact.phone,
    hours: content.contact.hours.map((entry) => ({ ...entry })),
  },
  socialLinks: content.socialLinks.map((link) => ({ ...link })),
  menu: {
    sections: content.menu.sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({ ...item })),
    })),
  },
})

function ensureHeroContent(hero?: Partial<HeroContent>): HeroContent {
  return {
    title: typeof hero?.title === "string" && hero.title.length ? hero.title : "Authentic Mexican Cuisine",
    subtitle:
      typeof hero?.subtitle === "string" && hero.subtitle.length
        ? hero.subtitle
        : "Experience the true flavors of Mexico at Taco Shop in Reno, Nevada.",
    primaryCta: ensureCTA(hero?.primaryCta) ?? { label: "View Our Menu", href: "#menu" },
    secondaryCta: ensureCTA(hero?.secondaryCta) ?? { label: "Call to Order", href: "tel:+17755077515" },
  }
}

function ensureCTA(cta?: Partial<CTAContent> | null): CTAContent | undefined {
  if (!cta) return undefined
  const label = typeof cta.label === "string" && cta.label.length ? cta.label : undefined
  const href = typeof cta.href === "string" && cta.href.length ? cta.href : undefined
  if (!label || !href) return undefined
  return { label, href }
}

function ensureImportantContent(important?: Partial<ImportantContent>): ImportantContent {
  return {
    announcement:
      typeof important?.announcement === "string" && important.announcement.length
        ? important.announcement
        : "Family-owned and operated in the heart of downtown Reno.",
    highlight:
      typeof important?.highlight === "string" && important.highlight.length
        ? important.highlight
        : "Authentic Mexican cuisine in the heart of Reno, Nevada.",
  }
}

function ensureAboutContent(about?: Partial<AboutContent>): AboutContent {
  return {
    heading: typeof about?.heading === "string" && about.heading.length ? about.heading : "Fresh & Authentic",
    highlight: typeof about?.highlight === "string" && about.highlight.length ? about.highlight : "Mexican Food",
    paragraphs:
      Array.isArray(about?.paragraphs) && about.paragraphs.length
        ? about.paragraphs.map((text) => (typeof text === "string" ? text : "")).filter(Boolean)
        : [
            "At Taco Shop, we pride ourselves on serving the most authentic Mexican cuisine in Reno.",
            "We use only the freshest ingredients to create delicious tacos, burritos, and more.",
          ],
  }
}

function ensureContactContent(contact?: Partial<ContactContent>): ContactContent {
  return {
    addressLines:
      Array.isArray(contact?.addressLines) && contact.addressLines.length
        ? contact.addressLines.map((line) => (typeof line === "string" ? line : "")).filter(Boolean)
        : ["811 S Center St, Reno, NV 89501"],
    phone: typeof contact?.phone === "string" && contact.phone.length ? contact.phone : "(775) 507-7515",
    hours:
      Array.isArray(contact?.hours) && contact.hours.length
        ? contact.hours
            .map((entry) => ({
              label: typeof entry?.label === "string" ? entry.label : "Hours",
              value: typeof entry?.value === "string" ? entry.value : "",
            }))
            .filter((entry) => entry.value.length)
        : [
            { label: "Tuesday - Saturday", value: "11:00 AM - 9:00 PM" },
            { label: "Sunday", value: "Closed" },
            { label: "Monday", value: "Closed" },
          ],
  }
}

function ensureSocialLinks(links?: SocialLink[]): SocialLink[] {
  return Array.isArray(links) && links.length
    ? links
        .map((link) => ({
          label: typeof link?.label === "string" ? link.label : "Social",
          url: typeof link?.url === "string" ? link.url : "#",
        }))
        .filter((link) => link.url !== "#")
    : [
        { label: "Facebook", url: "https://facebook.com/tacoshopreno" },
        { label: "Instagram", url: "https://instagram.com/tacoshopreno" },
      ]
}

export function ensureMenuSections(sections?: unknown): MenuSectionData[] {
  if (!Array.isArray(sections) || !sections.length) {
    return []
  }

  return sections.map((section) => ({
    title: typeof (section as MenuSectionData)?.title === "string" ? (section as MenuSectionData).title : "Untitled Section",
    description:
      typeof (section as MenuSectionData)?.description === "string"
        ? (section as MenuSectionData).description
        : undefined,
    pricing:
      typeof (section as MenuSectionData)?.pricing === "string"
        ? (section as MenuSectionData).pricing
        : undefined,
    items: Array.isArray((section as MenuSectionData)?.items)
      ? (section as MenuSectionData).items.map((item) => ({
          name: typeof item?.name === "string" ? item.name : "Menu Item",
          description: typeof item?.description === "string" ? item.description : undefined,
          price: typeof item?.price === "string" ? item.price : undefined,
        }))
      : [],
  }))
}

export const MENU_REPO = "kylewhirl/tacoshopreno"
export const MENU_BRANCH = "main"
export const MENU_PATH = "menu.json"
export const MENU_DATA_URL = `https://raw.githubusercontent.com/${MENU_REPO}/${MENU_BRANCH}/${MENU_PATH}`

export const MENU_SOURCE = {
  repo: MENU_REPO,
  branch: MENU_BRANCH,
  path: MENU_PATH,
  apiBase: `https://api.github.com/repos/${MENU_REPO}/contents/${MENU_PATH}`,
}
