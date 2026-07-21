import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@locator/webpack-loader",
            options: { env: "development" },
          },
        ],
      });
    }

    return config;
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
