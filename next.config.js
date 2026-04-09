/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary — imágenes del proyecto
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Unsplash — imágenes placeholder
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
