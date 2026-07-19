import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

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
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
