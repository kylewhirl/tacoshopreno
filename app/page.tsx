import Image from "next/image"
import { MapPin, Phone, Clock, MenuIcon } from "lucide-react"
import MenuSection from "@/components/menu-section"
import ContactMap from "@/components/contact-map"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageMarquee from "@/components/image-marquee"
import CTAButton from "@/components/cta-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/feature.png.webp"
            alt="Mexican food background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-dark/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">Authentic Mexican Cuisine</h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md">
            Experience the true flavors of Mexico at Taco Shop in Reno, Nevada
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="#menu" variant="primary" className="w-full sm:w-auto">
              <MenuIcon className="w-5 h-5 mr-2 inline-block" />
              View Our Menu
            </CTAButton>
            <CTAButton href="tel:+17755077515" variant="secondary" className="w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2 inline-block" />
              Call to Order
            </CTAButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white" id="about">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            Fresh & Authentic <span className="text-coral">Mexican Food</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-dark mb-6">
                At Taco Shop, we pride ourselves on serving the most authentic Mexican cuisine in Reno. Our recipes have
                been passed down through generations, bringing the true flavors of Mexico to your plate.
              </p>
              <p className="text-lg text-dark mb-6">
                We use only the freshest ingredients, locally sourced when possible, to create delicious tacos,
                burritos, and more that will transport your taste buds straight to Mexico.
              </p>
              <div className="flex items-center space-x-4 text-green">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p>Tuesday - Saturday: 11:00 AM - 9:00 PM</p>
                  <p>Sunday & Monday: Closed</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Taco Shop Restaurant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Marquee Section */}
      <ImageMarquee />

      {/* Menu Section */}
      <section className="py-16 px-4 bg-blue/10" id="menu">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            Our <span className="text-coral">Menu</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/menu.jpeg" alt="Taco Shop Menu" fill className="object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-coral mb-4">Authentic Mexican Cuisine</h3>
              <p className="text-lg text-dark mb-6">
                Our menu features a variety of traditional Mexican dishes, from tacos and burritos to quesadillas and
                more. Each item is prepared with care using authentic recipes and the freshest ingredients.
              </p>
              <p className="text-lg text-dark">
                Can't decide what to order? Try our customer favorites: Carnitas Tacos, Pastor Tacos, or our famous
                Nachos!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <MenuSection
              title="TACOS"
              description="Soft corn tortillas, choice of salsa: roja, verde or pico"
              pricing="2 for $7 or 3 for $9"
              items={[
                { name: "Carnitas", description: "Crispy pork, onions, cilantro" },
                { name: "Pastor", description: "Marinated pork, grilled onion & pineapple, cilantro" },
                { name: "Chorizo", description: "Onions, cilantro" },
                { name: "Cheeseburger", description: "American cheese, lettuce, tomato, onion, house spread" },
                { name: "Chicken", description: "Onions, cilantro" },
                { name: "Asada", description: "Onions, cilantro" },
                { name: "Crispy Fish Taco", description: "Cabbage slaw, avocado crema" },
                { name: "Veggie", description: "Fried cauliflower, green apple, green pepper, onions & cilantro" },
              ]}
            />

            <MenuSection
              title="NOT TACOS"
              description="Sub any meat +$1"
              items={[
                {
                  name: "Burrito",
                  price: "$9.50",
                  description: "Chicken, cheese, black beans, rice, corn, pico de gallo, chips + salsa",
                },
                {
                  name: "Nachos",
                  price: "$10.25",
                  description:
                    "Chicken, cheese, black beans, corn, pico de gallo, avocado crema, sour cream, jalapeños",
                },
                {
                  name: "Quesadilla",
                  price: "$9",
                  description: "Chicken, green & red peppers, cheese, onions, chipotle sauce, sour cream, salsa, corn",
                },
                {
                  name: "3 Taquitos",
                  price: "$7.50",
                  description: "Chicken, tomato sauce, lettuce, cotija, sour cream",
                },
                {
                  name: "Torta",
                  price: "$9",
                  description:
                    "Choice of chicken, asada, pastor or carnitas, onion, lettuce, tomato, avocado, queso fresco, sour cream, jalapeños",
                },
              ]}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <MenuSection
              title="SIDES"
              items={[
                { name: "Wholly Guacamole", price: "$8", description: "Choice of regular or mex" },
                { name: "Chips & Dips", price: "$4", description: "Choice of verde or rojo w/pico de gallo" },
                { name: "Black Beans", price: "$4" },
                { name: "Rice", price: "$4" },
                { name: "Sliced Avocado", price: "$1" },
                { name: "Sour Cream", price: "50 cents" },
                { name: "Cheese", price: "$1" },
              ]}
            />

            <MenuSection
              title="DRINKS"
              items={[
                {
                  name: "Soda",
                  price: "$3",
                  description:
                    "Can or bottled coke, diet coke, 7up, sprite, sidral, sangria, jarritos, (fruit punch, pineapple, mandarin, lime, strawberry or tamarind)",
                },
                { name: "Bottled Water", price: "$2" },
                { name: "Mineral Water", price: "$3" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-16 px-4 bg-white" id="contact">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            Find <span className="text-coral">Us</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-coral mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Address</p>
                    <p className="text-dark">811 S Center St, Reno, NV 89501</p>
                    <p className="text-dark">Cheney Street Alley</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Phone</p>
                    <p className="text-dark">(775) 507-7515</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Hours</p>
                    <p className="text-dark">Monday: Closed</p>
                    <p className="text-dark">Tuesday - Saturday: 11:00 AM - 9:00 PM</p>
                    <p className="text-dark">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-dark mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/tacoshopreno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue hover:text-blue/80"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com/tacoshopreno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue hover:text-blue/80"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <ContactMap address="811 S Center St, Reno, NV 89501" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
