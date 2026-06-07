import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/ui/smooth-scroll-provider";
import "../index.css"; // Global styles

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "igigster | Premium DTC Creator Matchmaking Platform",
  description: "Connect directly with vetted micro-creators, students, and influencers. Zero agency markup. Pay exact creator rates.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${sourceSerif.variable} min-h-screen bg-brand-bg flex flex-col justify-between overflow-x-hidden font-sans`}>
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
