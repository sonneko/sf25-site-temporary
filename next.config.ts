import EnvManager from '@/lib/EnvManager';
import type { NextConfig } from 'next';

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: EnvManager.isProductEnv(), // 本番では console を削除
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript エラー時にビルドを止める
  },
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: "@use './src/styles/_global' as *;",
  },
  basePath: EnvManager.isDevEnv() ? '/sf25-site-temporary' : '',
  assetPrefix: EnvManager.isDevEnv() ? '/sf25-site-temporary' : '',
};

export default nextConfig;
