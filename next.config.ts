import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // 高速な minify
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 本番では console を削除
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript エラー時にビルドを止める
  },
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: "@use './src/styles/_global' as *;",

  }
};

export default nextConfig;
