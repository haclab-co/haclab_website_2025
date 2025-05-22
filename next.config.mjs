/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: true,
  },
  // Configure Cloudflare Pages specific settings
  output: 'standalone',
  // Ensure all dynamic routes use the Edge Runtime
  serverComponents: true,
};

export default nextConfig;
