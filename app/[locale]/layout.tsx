import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Site",
  });
  const title = t("title");
  const description = t("description");
  const twitterDescription = t("twitterDescription");

  return {
    metadataBase: new URL("https://briansalazar.dev"),
    title: {
      default: title,
      template: "%s — Brian Salazar",
    },
    description,
    openGraph: {
      title,
      description,
      url: `https://briansalazar.dev/${params.locale}`,
      siteName: "Brian Salazar",
      images: ["/images/og-image.png"],
      locale: params.locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
      images: ["/images/og-image.png"],
    },
  };
}

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
