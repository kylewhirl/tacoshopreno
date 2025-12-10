"use client"

import MenuSection from "@/components/menu-section"
import type { MenuSectionData } from "@/lib/site-content"

interface MenuDisplayProps {
  sections: MenuSectionData[]
}

export default function MenuDisplay({ sections }: MenuDisplayProps) {
  if (!sections.length) {
    return <p className="text-center text-dark">No menu items available.</p>
  }

  const sectionRows = []
  for (let i = 0; i < sections.length; i += 2) {
    sectionRows.push(sections.slice(i, i + 2))
  }

  return (
    <div className="space-y-8">
      {sectionRows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid md:grid-cols-2 gap-8">
          {row.map((section) => (
            <MenuSection key={section.title} {...section} />
          ))}
          {row.length === 1 && <div className="hidden md:block" />}
        </div>
      ))}
    </div>
  )
}
