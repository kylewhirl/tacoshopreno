"use client"

import type React from "react"
import { useInView } from "@/hooks/use-in-view"

type AnimationVariant = "fade-in" | "fade-in-up"

interface AnimatedInViewProps {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: AnimationVariant
}

export default function AnimatedInView({
  as = "div",
  children,
  className = "",
  delay = 0,
  variant = "fade-in-up",
}: AnimatedInViewProps) {
  const Component = as
  const { ref, isInView } = useInView()

  const baseClasses = "opacity-0"
  const offsetClasses = variant === "fade-in-up" ? "translate-y-4" : ""
  const inViewClasses = isInView
    ? variant === "fade-in-up"
      ? "opacity-100 translate-y-0 motion-safe:animate-fade-in-up"
      : "opacity-100 motion-safe:animate-fade-in"
    : ""

  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${offsetClasses} ${inViewClasses} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
