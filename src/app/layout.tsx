import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fira_Code, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingProvider from "@/context/LoadingContext";
import PageTransition from "@/components/ui/PageTransition";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import TawkToChat from "@/components/ui/TawkToChat";
import { TAWKTO_CONFIG } from "@/config/tawkto";
import { ANALYTICS_CONFIG } from "@/config/analytics";

// Font definitions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haclab Company Limited - Custom Software Development in Uganda",
  description: "Haclab Company Limited is a leading software development company based in Kampala, Uganda, providing modern IT solutions including web development, mobile app development, and custom software for businesses across Uganda and East Africa.",
  keywords: "software development, web development, mobile app development, custom software, IT solutions, Uganda, Kampala, Entebbe, Jinja, Mukono, Wakiso, Mbarara, Gulu, East Africa, software company Uganda",
  icons: {
    icon: [
      { url: '/assets/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/assets/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'mask-icon', url: '/assets/images/favicon/safari-pinned-tab.svg', color: '#E41E26' },
    ],
  },
  manifest: '/assets/images/favicon/site.webmanifest',
  alternates: {
    canonical: 'https://haclab.co',
  },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://haclab.co',
    title: 'Haclab Company Limited - Custom Software Development in Uganda',
    description: 'Leading software development company in Kampala, Uganda providing web development, mobile apps, and custom software solutions for businesses across Uganda and East Africa.',
    siteName: 'Haclab Company Limited',
    images: [
      {
        url: 'https://haclab.co/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Haclab Company Limited - Software Development in Uganda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haclab Company Limited - Software Development in Uganda',
    description: 'Leading software development company in Kampala, Uganda providing web development, mobile apps, and custom software solutions.',
    images: ['https://haclab.co/assets/images/og-image.jpg'],
    creator: '@HaclabCo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
  category: 'technology',
  metadataBase: new URL('https://haclab.co'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${jetbrainsMono.variable} antialiased bg-dark-bg text-white`}
      >
        <LoadingProvider>
          {/* SEO Schema Components */}
          <OrganizationSchema />
          <LocalBusinessSchema />
          <WebsiteSchema />

          {/* Google Analytics */}
          {ANALYTICS_CONFIG.enabled && (
            <GoogleAnalytics
              id={ANALYTICS_CONFIG.trackingId}
              options={ANALYTICS_CONFIG.options}
            />
          )}

          <Header />
          <PageTransition>
            <main>
              {children}
            </main>
          </PageTransition>
          <Footer />

          {/* Tawk.to Live Chat Widget */}
          {TAWKTO_CONFIG.enabled && (
            <TawkToChat
              propertyId={TAWKTO_CONFIG.propertyId}
              widgetId={TAWKTO_CONFIG.widgetId}
              customization={TAWKTO_CONFIG.customization}
            />
          )}
        </LoadingProvider>
      </body>
    </html>
  );
}
