const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: 'export',
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    // Désactive le rendu statique pour toutes les pages
    // Vous pouvez ajuster cela pour cibler uniquement certaines pages si nécessaire
    appDir: true,
    serverActions: true,
    // appDir: true, // to allow query parameters through the URL:
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

// module.exports = nextConfig;
module.exports = withNextIntl(nextConfig);
