import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SmoothScrollProvider from "@/components/ui/smooth-scroll-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-grow pt-[80px]">
        {children}
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
