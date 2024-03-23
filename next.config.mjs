/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use the CDN in production and localhost for development.
  // assetPrefix: process.env.IS_PROD === 'true'
  //   ? 'https://cdn.mycdn.com'
  //   : undefined,

  // https://nextjs.org/docs/app/api-reference/next-config-js/compress#changing-the-compression-algorithm
  // For self-hosting this will need to be updated
  compress: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  },
  // distDir: 'build',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false
  },

  // Only load the modules you are actually using, while still giving you the convenience of
  // writing import statements with many named exports.
  experimental: {
    optimizePackageImports: [],
    turbotrace: {
      // control the log level of the turbotrace, default is `error`
      logLevel: 'error',

      // control if the log of turbotrace should contain the details of the analysis, default is `false`
      logDetail: false,

      /**
       * show all log messages without limit
       * turbotrace only show 1 log message for each categories by default
       */
      // logAll: false,

      /**
       * control the context directory of the turbotrace
       * files outside of the context directory will not be traced
       * set the `experimental.outputFileTracingRoot` has the same effect
       * if the `experimental.outputFileTracingRoot` and this option are both set, the `experimental.turbotrace.contextDirectory` will be used
       */
      // contextDirectory?: string

      /**
       * if there is `process.cwd()` expression in your code, you can set this option to tell `turbotrace` the value of `process.cwd()` while tracing.
       * for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
       */
      // processCwd?: string

      // control the maximum memory usage of the `turbotrace`, in `MB`, default is `6000`.
      memoryLimit: 6000
    },
    typedRoutes: true
  },

  // generateBuildId: async () => {
  //   // This could be anything, using the latest git hash
  //   return process.env.GIT_HASH;
  // },
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true
  },

  // handle cache
  // cacheHandler: require.resolve('./cache-handler.js'),
  // cacheMaxMemorySize: 0, // disable default in-memory caching

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
