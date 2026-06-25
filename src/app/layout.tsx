import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CurrencyProvider } from "@/hooks/useCurrency";
import LenisProvider from "@/components/animation/LenisProvider";
import { SiteModeProvider, SiteMode } from "@/hooks/useSiteMode";
import QueryProvider from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Outfit, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "iGigster | UGC & Short-Form Video Gig Marketplace",
  description: "Connect with verified UGC creators, editors, and motion designers for TikTok, Instagram Reels, and YouTube Shorts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialMode = (cookieStore.get("igigster_mode")?.value as SiteMode) || "brand";
  const theme = (cookieStore.get("igigster_theme")?.value as 'dark' | 'light') || "dark";

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${theme}-theme ${inter.variable} ${outfit.variable} ${playfair.variable} ${dancingScript.variable}`}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} 
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var path = window.location.pathname;
                  var isDashboard = path.indexOf('/creator') === 0 || 
                                    path.indexOf('/brand') === 0 || 
                                    path.indexOf('/admin') === 0;
                  if (!isDashboard) {
                    document.body.classList.remove('dark-theme');
                    document.body.classList.add('light-theme');
                    document.body.style.setProperty('background-color', '#fafaf9', 'important');
                    document.body.style.setProperty('color', '#1c1917', 'important');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider initialTheme={theme}>
          <SiteModeProvider initialMode={initialMode}>
            <CurrencyProvider>
              <QueryProvider>
                <LenisProvider>
                  {children}
                </LenisProvider>
              </QueryProvider>
            </CurrencyProvider>
          </SiteModeProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}


