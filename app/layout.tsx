import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { cn } from "@/lib/utils";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NestUz",
  description: "NestUz is a real estate platform designed to simplify the process of finding and purchasing properties. Instead of searching through multiple websites or social media pages, users can explore available houses, apartments, and villas in one place, compare options, view detailed information, and submit purchase requests directly to property owners. The platform helps buyers save time by providing organized property listings, advanced search capabilities, detailed property pages, and a simple ordering process. For administrators, it offers a centralized dashboard to manage properties, categories, and customer orders efficiently, making property management faster and more organized. NestUz creates a seamless connection between property owners and potential buyers, reducing manual communication and making the real estate experience more convenient, transparent, and user-friendly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", roboto.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
