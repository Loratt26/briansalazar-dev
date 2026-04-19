import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://briansalazar.dev"),
  title: {
    default: "Brian Salazar — Support, Product, and Building",
    template: "%s — Brian Salazar",
  },
  description:
    "Head of Support at Penida.io. Bridge between customers and product. Portfolio of shipped work and prototypes.",
  openGraph: {
    title: "Brian Salazar — Support, Product, and Building",
    description:
      "Head of Support at Penida.io. Bridge between customers and product. Portfolio of shipped work and prototypes.",
    url: "https://briansalazar.dev",
    siteName: "Brian Salazar",
    images: ["/images/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Salazar — Support, Product, and Building",
    description:
      "Head of Support at Penida.io. Bridge between customers and product.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
