import AnimatedInView from "@/components/animated-in-view"
import type { MenuSectionData } from "@/lib/site-content"

export default function MenuSection({ title, description, pricing, items }: MenuSectionData) {
  return (
    <AnimatedInView
      as="div"
      className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="border-b border-dark/20 pb-4 mb-6">
        <h3 className="text-2xl font-bold text-coral">{title}</h3>
        {description && (
          <AnimatedInView as="p" className="text-dark/70 mt-1" variant="fade-in">
            {description}
          </AnimatedInView>
        )}
        {pricing && (
          <AnimatedInView as="p" className="text-coral font-medium mt-1" variant="fade-in">
            {pricing}
          </AnimatedInView>
        )}
      </div>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="border-b border-dark/10 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <span className="font-medium text-dark">{item.name}</span>
              {item.price && <span className="text-coral font-medium">{item.price}</span>}
            </div>
            {item.description && <p className="text-dark/70 text-sm mt-1">{item.description}</p>}
          </li>
        ))}
      </ul>
    </AnimatedInView>
  )
}
