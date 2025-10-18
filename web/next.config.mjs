/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3002/:path*',
        },
      ]
    },
    webpack(config, { isServer }) {
      if (!isServer) {
        config.experiments = { ...config.experiments, asyncWebAssembly: true }
        config.resolve.fallback = {
          fs: false,
        };
      }

      config.ignoreWarnings = [{
        module: /typeorm/,
        message: /Module not found|dependency is an expression/
      }]

      return config
    }
};

export default nextConfig;
