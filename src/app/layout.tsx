import type { Metadata } from "next";
import { CurrencyProvider } from "@/hooks/useCurrency";
import LenisProvider from "@/components/animation/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "iGigster | UGC & Short-Form Video Gig Marketplace",
  description: "Connect with verified UGC creators, editors, and motion designers for TikTok, Instagram Reels, and YouTube Shorts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Dancing+Script:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CurrencyProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

