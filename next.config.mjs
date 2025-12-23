/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/tacoshopreno",
  assetPrefix: "/tacoshopreno",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
