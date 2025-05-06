import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'movies.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
