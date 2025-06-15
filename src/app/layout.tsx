import type { Metadata } from 'next';

// TODO: メタデータ変更
export const metadata: Metadata = {
  title: 'SF25 official web site',
  description: 'meta descriptionです。',
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
