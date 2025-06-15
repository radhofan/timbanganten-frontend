import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    // JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
  },
};

export default nextConfig;
