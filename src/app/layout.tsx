import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Fraunces, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/i18n/provider";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "@/lib/i18n/dict";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Villaage — discover places worth living in",
  description:
    "A Pinterest-inspired marketplace for homes, vacation rentals and architectural estates. Curated by leading real-estate agents across 25 cities.",
  keywords: [
    "real estate",
    "vacation rental",
    "property marketplace",
    "Pinterest for homes",
    "villaage",
    "luxury property",
  ],
  authors: [{ name: "Villaage" }],
  openGraph: {
    title: "Villaage — discover places worth living in",
    description:
      "A Pinterest-inspired marketplace for homes, vacation rentals and architectural estates.",
    siteName: "Villaage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villaage",
    description:
      "A Pinterest-inspired marketplace for homes, vacation rentals and architectural estates.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const localeRaw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale =
    localeRaw === "fa" || localeRaw === "en" ? localeRaw : DEFAULT_LOCALE;
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} ${vazirmatn.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LocaleProvider initialLocale={locale}>
            {children}
            <Toaster />
            <Sonner richColors position="bottom-right" />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
