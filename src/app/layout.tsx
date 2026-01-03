import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noulie's World | Ballet Princess",
  description: "Welcome to Noulie's World - An exclusive magical kingdom for a 2-year-old ballet princess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased bg-background`}>
        <SmoothScrollProvider>
          {/* Noise texture overlay */}
          <div className="noise-overlay" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
