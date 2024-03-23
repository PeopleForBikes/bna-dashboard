import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


const __dirname = dirname(fileURLToPath(import.meta.url));


/** @type {import('next').NextConfig} */
const nextConfig = {
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
  }
};


export default nextConfig;
