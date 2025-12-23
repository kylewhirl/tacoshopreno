import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const title = "Taco Shop | Authentic Mexican Cuisine in Reno"
const description =
  "Taco Shop in downtown Reno serves fresh, authentic Mexican food including tacos, burritos, nachos, and more. Dine in, order ahead, or call (775) 507-7515."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://kylewhirl.com/tacoshopreno"),
  openGraph: {
    title,
    description,
    url: "https://tacoshopreno.com",
    siteName: "Taco Shop",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/feature.png.webp",
        width: 1200,
        height: 630,
        alt: "Exterior of Taco Shop in Reno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/feature.png.webp"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
