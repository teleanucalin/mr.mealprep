import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr. Mealprep",
  description:
    "Planuri alimentare personalizate și coș gata de comandă pentru un stil de viață activ.",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Mr. Mealprep",
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className="bg-surface-base text-text-default font-sans antialiased"
        suppressHydrationWarning
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
