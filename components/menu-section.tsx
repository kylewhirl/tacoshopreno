interface MenuItem {
  name: string
  description?: string
  price?: string
}

interface MenuSectionProps {
  title: string
  description?: string
  pricing?: string
  items: MenuItem[]
}

export default function MenuSection({ title, description, pricing, items }: MenuSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="border-b border-dark/20 pb-4 mb-6">
        <h3 className="text-2xl font-bold text-coral">{title}</h3>
        {description && <p className="text-dark/70 mt-1">{description}</p>}
        {pricing && <p className="text-coral font-medium mt-1">{pricing}</p>}
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
    </div>
  )
}
