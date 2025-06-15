import type { Metadata } from 'next';
import ConstantsManager from '../lib/ConstantsManager';
import 'normalize.css';

// TODO: メタデータ変更
export const metadata: Metadata = {
  title: ConstantsManager.get('head-title'),
  description: ConstantsManager.get('head-description'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
