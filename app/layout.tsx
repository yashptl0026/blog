import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AESTHETE — High-End Editorial & Design Blog",
  description: "A hybrid editorial and minimalist blogging platform showcasing visual stories, shoppable curations, and modular design insights.",
  openGraph: {
    title: "AESTHETE — High-End Editorial & Design Blog",
    description: "A hybrid editorial and minimalist blogging platform showcasing visual stories, shoppable curations, and modular design insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="bg-editorial-bg text-editorial-text selection:bg-editorial-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
