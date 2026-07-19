import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export', // <--- MAKE SURE THIS IS HERE
  images: {
    unoptimized: true, // <--- MAKE SURE THIS IS HERE
  },
};

export default nextConfig;