"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <Image src="/images/icon.svg" alt="Taco Shop Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold text-coral">Taco Shop</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-dark hover:text-coral font-medium transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-dark hover:text-coral font-medium transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
            >
              About
            </a>
            <a
              href="#menu"
              className="text-dark hover:text-coral font-medium transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
            >
              Menu
            </a>
            <a
              href="#contact"
              className="text-dark hover:text-coral font-medium transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
            >
              Contact
            </a>
            <a
              href="tel:+17755077515"
              className="bg-coral hover:bg-coral/80 text-white px-4 py-2 rounded-full font-medium transition duration-300 transform-gpu hover:-translate-y-0.5"
            >
              (775) 507-7515
            </a>
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-dark hover:text-coral focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-coral hover:bg-coral/10 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-coral hover:bg-coral/10 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-coral hover:bg-coral/10 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
              onClick={toggleMenu}
            >
              Menu
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-coral hover:bg-coral/10 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <a
              href="tel:+17755077515"
              className="block px-3 py-2 rounded-md text-base font-medium bg-coral text-white hover:bg-coral/80 transition-transform duration-200 transform-gpu hover:-translate-y-0.5"
              onClick={toggleMenu}
            >
              Call Us: (775) 507-7515
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
