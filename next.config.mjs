/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"], // Permite imágenes de Spotify
  },
};

export default nextConfig;