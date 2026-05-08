import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MuseumTour } from "@/components/museum-tour";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindTrack Studio",
  description:
    "A production-style psychology content platform demo with CMS, analytics, QA tracking, and auth-ready architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <MuseumTour />
      </body>
    </html>
  );
}
