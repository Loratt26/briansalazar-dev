import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
