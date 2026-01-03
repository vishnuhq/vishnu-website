import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // React Compiler (stable in v16) - automatic memoization
  reactCompiler: true,
};

export default nextConfig;
