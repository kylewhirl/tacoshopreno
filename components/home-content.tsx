"use client"

import Image from "next/image"
import { Clock, MapPin, MenuIcon, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageMarquee from "@/components/image-marquee"
import ReviewsMarquee from "@/components/reviews-marquee"
import CTAButton from "@/components/cta-button"
import ContactMap from "@/components/contact-map"
import MenuDisplay from "@/components/menu-display"
import AnimatedInView from "@/components/animated-in-view"
import { useSiteContent } from "@/hooks/use-site-content"
import type { SiteContent } from "@/lib/site-content"

interface HomeContentProps {
  initialContent: SiteContent
}

export default function HomeContent({ initialContent }: HomeContentProps) {
  const { content } = useSiteContent(initialContent)
  const { hero, about, important, contact, socialLinks, menu } = content

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="images/feature.png.webp" alt="Exterior of Taco Shop in Reno" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-dark/40"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <AnimatedInView as="p" className="text-sm uppercase tracking-[0.3rem] text-white/70 mb-4" variant="fade-in">
            {important.announcement}
          </AnimatedInView>
          <AnimatedInView
            as="h1"
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            delay={80}
          >
            {hero.title}
          </AnimatedInView>
          <AnimatedInView
            as="p"
            className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md"
            delay={160}
          >
            {hero.subtitle}
          </AnimatedInView>
          <AnimatedInView as="p" className="text-base text-white/80 mb-8" delay={240} variant="fade-in">
            {important.highlight}
          </AnimatedInView>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              <MenuIcon className="w-5 h-5 mr-2 inline-block" />
              {hero.primaryCta.label}
            </CTAButton>
            <CTAButton href={hero.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2 inline-block" />
              {hero.secondaryCta.label}
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="about">
        <div className="container mx-auto max-w-6xl">
          <AnimatedInView as="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            {about.heading} <span className="text-coral">{about.highlight}</span>
          </AnimatedInView>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {about.paragraphs.map((paragraph, index) => (
                <AnimatedInView
                  as="p"
                  key={`about-${index}`}
                  className="text-lg text-dark mb-6"
                  delay={100 + index * 80}
                  variant="fade-in"
                >
                  {paragraph}
                </AnimatedInView>
              ))}
              <AnimatedInView as="div" className="flex items-center space-x-4 text-green" variant="fade-in">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="font-medium">Hours</p>
                  {contact.hours.map((entry) => (
                    <p key={`${entry.label}-${entry.value}`}>{entry.label}: {entry.value}</p>
                  ))}
                </div>
              </AnimatedInView>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="images/patio.webp"
                alt="Taco Shop patio seating"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <ImageMarquee />

      <section className="py-16 px-4 bg-blue/10" id="menu">
        <div className="container mx-auto max-w-6xl">
          <AnimatedInView as="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            Our <span className="text-coral">Menu</span>
          </AnimatedInView>

          <MenuDisplay sections={menu.sections} />
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="contact">
        <div className="container mx-auto max-w-6xl">
          <AnimatedInView as="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            Find <span className="text-coral">Us</span>
          </AnimatedInView>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:shadow-xl">
              <AnimatedInView as="h3" className="text-2xl font-bold text-coral mb-6">
                Contact Information
              </AnimatedInView>

              <AnimatedInView as="div" className="space-y-4" variant="fade-in">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Address</p>
                    {contact.addressLines.map((line) => (
                      <p key={line} className="text-dark">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Phone</p>
                    <p className="text-dark">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-green mt-1" />
                  <div>
                    <p className="font-medium text-lg">Hours</p>
                    {contact.hours.map((entry) => (
                      <p key={`contact-${entry.label}-${entry.value}`} className="text-dark">
                        {entry.label}: {entry.value}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedInView>

              <div className="mt-8">
                <AnimatedInView as="h4" className="text-xl font-bold text-dark mb-4" variant="fade-in">
                  Follow Us
                </AnimatedInView>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue hover:text-blue/80 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactMap address={contact.addressLines[0] ?? "811 S Center St, Reno, NV 89501"} />
          </div>
        </div>
      </section>

      <ReviewsMarquee />

      <Footer contact={contact} important={important} socialLinks={socialLinks} />
    </div>
  )
}
