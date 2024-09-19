/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: 'export',
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    appDir: true, // to allow query parameters through the URL:
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

module.exports = nextConfig;
