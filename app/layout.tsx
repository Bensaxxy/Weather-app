import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import AutoThemeProvider from "@/app/components/AutoThemeProvider";

// DM Sans with multiple weights
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});

// Bricolage Grotesque with weight 700 only
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description:
    "A simple weather application built with Next.js and Tailwind CSS",
  manifest: "/manifest.json", // 🔑 add manifest here
  themeColor: "#2563eb", // 🔑 set theme color for mobile browser UI
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 🔑 Extra meta tags for PWA + iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <AutoThemeProvider />
        {children}
      </body>
    </html>
  );
}
