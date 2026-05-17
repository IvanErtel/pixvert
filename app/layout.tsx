import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider";
import I18nProvider from "@/components/I18nProvider";
import SubscriptionProvider from "@/components/SubscriptionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixvert — Convert Images Instantly",
  description: "Free, fast, and private image converter. Convert PNG, JPG, WebP, HEIC and more. Your files never leave your device.",
  openGraph: {
    title: "Pixvert — Convert Images Instantly",
    description: "Free, fast, and private. Convert images between PNG, JPG, WebP, HEIC formats. 100% local processing.",
    type: "website",
  },
  verification: {
    google: "0al6DrjUKZNRWFRY95IGj3q-enUoNyrs9Zx5Db6Scb0",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pixvert",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SubscriptionProvider>
            <I18nProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <AdBanner />
              <Analytics />
            </I18nProvider>
          </SubscriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
