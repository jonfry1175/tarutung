import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-subang-display",
  weight: ["400", "500", "600"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-subang-body",
});

export const metadata: Metadata = {
  title: "Subang 360 | Dari Pegunungan ke Pesisir",
  description:
    "Jelajahi wisata, kuliner, dan budaya Kabupaten Subang dalam pengalaman panorama interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
