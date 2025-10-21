import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Mr. MealPrep - Planul tău alimentar optimizat de AI",
  description: "Macro-uri atinse fără calcule. Coș gata de livrare în 1 minut.",
  manifest: "/manifest.json",
  themeColor: "#f97316",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MealPrep",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <TooltipProvider>
          <div className="min-h-screen bg-background pb-nav-safe">
            <main className="container mx-auto px-4 py-6 max-w-7xl">
              {children}
            </main>
            <BottomNav />
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}

