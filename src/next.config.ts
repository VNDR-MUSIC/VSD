
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'indiemedia.llc',
      },
       {
        protocol: 'https',
        hostname: 'placehold.co',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'async_hooks' on the client-side
      config.resolve.fallback = {
        async_hooks: false,
      };
    }

    return config;
  },
};

export default nextConfig;
