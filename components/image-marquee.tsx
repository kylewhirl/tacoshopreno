"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

// Image data for the marquee
const images = [
  {
    src: "images/al-pastor.webp",
    alt: "Al pastor tacos topped with pineapple",
    caption: "Al Pastor Tacos",
  },
  {
    src: "images/cheeseburger.webp",
    alt: "Cheeseburger taco sizzling on the griddle",
    caption: "Cheeseburger Tacos",
  },
  {
    src: "images/fish.webp",
    alt: "Crispy fish tacos with cabbage slaw",
    caption: "Crispy Fish Tacos",
  },
  {
    src: "images/patio.webp",
    alt: "Outdoor patio with guests dining",
    caption: "Patio Dining",
  },
  {
    src: "images/doors.webp",
    alt: "Taco Shop entrance doors",
    caption: "Front Entrance",
  },
  {
    src: "images/sign.webp",
    alt: 'Exterior "Get Tacos" sign',
    caption: "Exterior",
  },
  {
    src: "images/menu.jpeg",
    alt: "Taco Shop printed menu",
    caption: "House Menu",
  },
  {
    src: "images/feature.png.webp",
    alt: "Exterior of Taco Shop",
    caption: "Storefront",
  },
]

export default function ImageMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    // Clone the first set of images and append them to create the infinite effect
    const cloneItems = () => {
      const items = marqueeElement.querySelectorAll(".marquee-item")
      const clonedItems = Array.from(items).map((item) => item.cloneNode(true))
      clonedItems.forEach((item) => {
        marqueeElement.appendChild(item)
      })
    }

    cloneItems()

    // Animation for the marquee
    let animationId: number
    let position = 0
    const speed = 0.5 // Adjust speed as needed

    const animate = () => {
      position -= speed

      // Reset position when first set of images is completely scrolled
      if (position <= -marqueeElement.querySelector(".marquee-item-group")!.clientWidth) {
        position = 0
      }

      marqueeElement.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animate()
    }

    marqueeElement.addEventListener("mouseenter", handleMouseEnter)
    marqueeElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      marqueeElement.removeEventListener("mouseenter", handleMouseEnter)
      marqueeElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="py-12 bg-coral/10 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-dark">
          Our <span className="text-coral">Gallery</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          <div className="marquee-item-group flex">
            {images.map((image, index) => (
              <div key={index} className="marquee-item flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative h-48 w-full">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-center font-medium text-dark">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
