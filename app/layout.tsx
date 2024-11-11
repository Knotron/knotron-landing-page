import type { Metadata } from "next";
import localFont from "next/font/local";
import { Silkscreen } from "next/font/google";
import { Electrolize } from "next/font/google";
import AudioPlayer from "./components/ui/AudioPlayer";
import "./globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
});

const electrolize = Electrolize({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-electrolize",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Knotron",
  description: "The AI-Powered Workspace",
  icons: {
    icon: '/vercel.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased`}
      >
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}