import type { Metadata } from "next";
import "./globals.css";
import { METADATA_META_DESCRIPTION, METADATA_OGP_IMAGES_PATH, METADATA_SITE_NAME, METADATA_SITE_URL, METADATA_TITLE } from "@/lib/const";

// headタグのメタデータ
// TODO: 他に必要なメタタグがないか確認する
export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_META_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: METADATA_SITE_URL,
    title: METADATA_TITLE,
    description: METADATA_META_DESCRIPTION,
    siteName: METADATA_SITE_NAME,
    images: METADATA_OGP_IMAGES_PATH
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
