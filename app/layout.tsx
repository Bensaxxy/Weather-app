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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <AutoThemeProvider />
        {children}
      </body>
    </html>
  );
}
