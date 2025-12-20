"use client"

import { useEffect, useRef } from "react"

const reviews = [
  {
    name: "Jasper Clayton",
    date: "8 months ago",
    rating: 5,
    text: "Tucked away gem with reasonable prices. Great service and a nice patio. Tacos and their sauces were full of flavor.",
  },
  {
    name: "Pete Mitchell",
    date: "6 months ago",
    rating: 5,
    text: "Small outdoor seating area. The crispy fish and carnitas tacos were both high quality and flavorful. This has become our new taco spot.",
  },
  {
    name: "Anthony Nguyen",
    date: "5 years ago",
    rating: 5,
    text: "Ordered a carne asada torta and carne asada tacos; everything was fresh, well seasoned and tasty.",
  },
  {
    name: "viento.aparente",
    date: "5 months ago",
    rating: 5,
    text: "During my trip through the western US this was the best food I found. The people were nice and the prices were reasonable when I visited in June.",
  },
  {
    name: "Brian Peaden Jr",
    date: "5 months ago",
    rating: 5,
    text: "Excellent food! I ate so many tacos that I wasn’t hungry for a day. Dine‑in dinner cost about $1–10 and the food, service and atmosphere were all five‑star. Seating is on an outdoor patio.",
  },
  {
    name: "Ali Saremi",
    date: "4 years ago",
    rating: 5,
    text: "Cheeseburger tacos melted in my mouth and were very cheap. Seating is simple and outside. Parking is limited. We got take‑out for dinner.",
  },
  {
    name: "Josh Philpott",
    date: "4 years ago",
    rating: 5,
    text: "Tacos were excellent and the cheeseburger taco tasted exactly like a cheeseburger. I’d like to try the chorizo next time. Only downside is you can’t mix and match taco orders.",
  },
  {
    name: "Steve Keegan",
    date: "4 months ago",
    rating: 5,
    text: "High‑quality ingredients and meats. The al pastor and carne asada tacos were excellent with flavorful green salsa. Hidden in an alley with no signage – almost like a speakeasy – but worth searching out. Recommended dishes include the asada, fish and al pastor tacos.",
  },
  {
    name: "Kelly Small",
    date: "3 years ago",
    rating: 5,
    text: "Good tacos and Mexican food served out of a building in an alley. You have to park and walk. Took the order back to the office and everyone liked it. We’ll be back.",
  },
  {
    name: "Jeremy Stoker",
    date: "3 years ago",
    rating: 5,
    text: "Delicious tacos from a tiny shop tucked in an alley. The playful staff and great food make this a must‑visit.",
  },
  {
    name: "Veronica Valencia",
    date: "3 years ago",
    rating: 5,
    text: "Authentic street tacos that are juicy and generously filled. Their sauces tie it all together.",
  },
  {
    name: "Amy MM",
    date: "3 weeks ago",
    rating: 5,
    text: "Excellent tacos and friendly service. They had heaters inside the tent so outdoor seating was comfortable even in cool weather. Lunch for one cost about $1–10.",
  },
  {
    name: "Jesse Hedrick",
    date: "3 months ago",
    rating: 5,
    text: "Small place that only has outdoor seating. Fish tacos were hand‑dipped and amazing. Food, service and atmosphere were all top notch.",
  },
  {
    name: "Talley Kayser",
    date: "3 months ago",
    rating: 5,
    text: "Ordered twenty tacos and burritos for pickup. The order was ready on time and everything was delicious. Impressed by the accuracy and hospitality of this small family business.",
  },
  {
    name: "Andrea Andrea3000",
    date: "2 years ago",
    rating: 5,
    text: "New favorite street tacos. The fish tacos were crispy and delicious; two tacos for $7 or three for $9 so I ordered three. Highly recommend their fish tacos.",
  },
  {
    name: "W Moran",
    date: "2 months ago",
    rating: 5,
    text: "The burrito was really good and also unique with corn and melted cheddar cheese. Not the same as a San Francisco burrito, but tasty. Salsa was very spicy. A bit pricey; we ordered 6 tacos, 2 burritos, rice and beans, and drinks totalling about $75.",
  },
  {
    name: "Cory Steffen",
    date: "2 months ago",
    rating: 5,
    text: "Loved this taco spot. Carnitas, al pastor and carne asada tacos were tender and flavorful. Tortillas were fresh and salsa roja was spicy but tasty.",
  },
  {
    name: "Robert Ritchie",
    date: "2 months ago",
    rating: 5,
    text: "Located in a back alley behind a cocktail bar. Limited outdoor tables. Vegetarian tacos and sides were the best Mexican food I found in Reno. Everything was full of flavor and the salsa was great.",
  },
  {
    name: "Puru",
    date: "1 year ago",
    rating: 5,
    text: "The couple who run this place are sweet. Fish tacos and cauliflower veggie tacos were delicious – some of the best Mexican food I’ve had in Reno. Seating is inside a tent so don’t expect much ambiance, but the food is affordable and tasty.",
  },
  {
    name: "Valentino X",
    date: "1 year ago",
    rating: 5,
    text: "Great place with super‑delicious tacos. The quesadilla was one of the best I’ve had. Nice atmosphere and friendly owners. Dinner for two cost about $20–30.",
  },
  {
    name: "Brynna Malen",
    date: "1 year ago",
    rating: 5,
    text: "Fish tacos were great and my vegetarian daughter loved the veggie tacos. Outdoor seating was pleasant and they have a good variety of drinks.",
  },
  {
    name: "Dan Walton",
    date: "1 year ago",
    rating: 5,
    text: "Awesome tacos from a great family‑run business. Really enjoyed the al pastor and would highly recommend this place.",
  },
  {
    name: "Rick M",
    date: "1 year ago",
    rating: 5,
    text: "Came for the cheeseburger tacos and they were very good. Also tried the fish tacos and liked them.",
  },
  {
    name: "Amber Malsberger",
    date: "1 year ago",
    rating: 5,
    text: "Best carne asada and fish tacos I’ve had. Tried the carne asada, fish and cheeseburger tacos – the fish and asada were top notch.",
  },
  {
    name: "Emily Sue",
    date: "1 year ago",
    rating: 5,
    text: "I’m a taco snob and this is my absolute favorite place. The pastor is incredible and the fish taco is unlike anything I’ve ever had. It’s a simple, friendly family business. Be patient – it’s not fast food – and expect to pay a bit more, but it’s worth every penny.",
  },
  {
    name: "Mike Gnitecki",
    date: "1 month ago",
    rating: 5,
    text: "Excellent fish tacos at a reasonable price. Seating is outdoors under a tent. Order three fish tacos instead of two because they are small.",
  },
  {
    name: "Kris Hulsing",
    date: "1 year ago",
    rating: 4,
    text: "Small hole‑in‑the‑wall spot that was busy at lunch. Outdoor tables were full but the service was nice and food was good. Will be back.",
  },
]

export default function ReviewsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    const cloneItems = () => {
      const items = marqueeElement.querySelectorAll(".marquee-review")
      const clonedItems = Array.from(items).map((item) => item.cloneNode(true))
      clonedItems.forEach((item) => {
        marqueeElement.appendChild(item)
      })
    }

    cloneItems()

    let animationId: number
    let position = 0
    const speed = 0.35

    const animate = () => {
      position -= speed

      const group = marqueeElement.querySelector(".marquee-review-group") as HTMLElement | null
      if (group && position <= -group.clientWidth) {
        position = 0
      }

      marqueeElement.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

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
    <section className="py-16 bg-dark/95 text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Guest <span className="text-coral">Reviews</span>
        </h2>
        <p className="text-center text-white/70 mt-3">
          Real feedback from taco fans across Reno.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-6 px-4" style={{ willChange: "transform" }}>
          <div className="marquee-review-group flex gap-6">
            {reviews.map((review) => (
              <article
                key={`${review.name}-${review.date}`}
                className="marquee-review flex-shrink-0 w-80 md:w-96 bg-white text-dark rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{review.name}</p>
                    <p className="text-sm text-dark/60">{review.date}</p>
                  </div>
                  <div className="text-coral font-semibold" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(review.rating)}
                  </div>
                </div>
                <p
                  className="text-base leading-relaxed text-dark/80 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  “{review.text}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
