import type React from "react"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export default function CTAButton({ href, children, variant = "primary", className = "" }: CTAButtonProps) {
  const baseClasses =
    "font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center transform-gpu hover:-translate-y-0.5 active:translate-y-0"

  const variantClasses = {
    primary: "bg-coral text-white hover:bg-coral/80",
    secondary: "bg-green text-white hover:bg-green/80",
    accent: "bg-blue text-white hover:bg-blue/80",
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  // Check if the href is a phone number
  const isPhoneNumber = href.startsWith("tel:")

  if (isPhoneNumber) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} className={buttonClasses}>
      {children}
    </a>
  )
}
