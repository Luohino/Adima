import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adima - Premium Educational Platform",
  description: "Access quality educational courses, webinars, and certificates with Adima's innovative learning platform.",
  keywords: ["Adima", "Education", "Courses", "Webinars", "Certificates", "Learning"],
  authors: [{ name: "Adima Team" }],
  icons: {
    icon: "/adima-logo.png",
  },
  openGraph: {
    title: "Adima - Premium Educational Platform",
    description: "Access quality educational courses, webinars, and certificates",
    url: "https://adima.com",
    siteName: "Adima",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adima - Premium Educational Platform",
    description: "Access quality educational courses, webinars, and certificates",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
