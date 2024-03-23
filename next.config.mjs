import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


const __dirname = dirname(fileURLToPath(import.meta.url));


/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  },

  eslint: {
    ignoreDuringBuilds: false
  },

  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true
  },
  logging: {
    fetches: {
      fullUrl: false
    }
  },
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true
  },

  experimental: {
    optimizePackageImports: [],
    typedRoutes: true
  }
};


export default nextConfig;
