"use client"

import { useEffect, useRef } from "react"

interface ContactMapProps {
  address: string
}

export default function ContactMap({ address }: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create a URL-encoded address for the Google Maps embed
    const encodedAddress = encodeURIComponent(address)
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`

    if (mapRef.current) {
      const iframe = document.createElement("iframe")
      iframe.src = mapUrl
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.style.border = "0"
      iframe.allowFullscreen = false
      iframe.loading = "lazy"
      iframe.referrerPolicy = "no-referrer-when-downgrade"

      // Clear any existing content and append the iframe
      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(iframe)
    }
  }, [address])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-coral mb-6">Location</h3>
      <div ref={mapRef} className="h-80 w-full rounded-lg overflow-hidden"></div>
    </div>
  )
}
