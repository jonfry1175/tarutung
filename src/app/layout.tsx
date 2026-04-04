import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarutung Atlas Starter",
  description:
    "Starter Next.js untuk website kota Tarutung dengan Tailwind, shadcn/ui, Leaflet, Three.js, TypeScript, dan Notion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
