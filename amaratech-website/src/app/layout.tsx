import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { ScrollProgress } from "@/components/common/ScrollReveal";
import SmoothScroll from "@/components/common/SmoothScroll";
import PenguinMascot from "@/components/common/PenguinMascot";
import ServiceWorkerRegister from "@/components/common/ServiceWorkerRegister";

export const viewport: Viewport = {
  themeColor: "#C81E1E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "AmaraTech IT Solutions | Cybersecurity & Cloud Services",
  description: "Enterprise-grade cybersecurity and IT solutions. Microsoft Azure partner, 24/7 threat monitoring, CMMC/HIPAA compliance. Serving businesses worldwide.",
  keywords: ["cybersecurity", "IT solutions", "cloud services", "Microsoft Azure", "compliance", "HIPAA", "CMMC"],
  authors: [{ name: "AmaraTech IT Solutions" }],
  creator: "AmaraTech IT Solutions",
  publisher: "AmaraTech IT Solutions",
  icons: {
    icon: [
      { url: "/logo/Artboard- Amaratech4x.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/Artboard- Amaratech4x.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo/Artboard- Amaratech4x.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo/Artboard- Amaratech4x.png",
  },
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://amaratechit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amaratechit.com",
    siteName: "AmaraTech IT Solutions",
    title: "AmaraTech IT Solutions | Cybersecurity & Cloud Services",
    description: "Enterprise-grade cybersecurity and IT solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmaraTech IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmaraTech IT Solutions | Cybersecurity & Cloud Services",
    description: "Enterprise-grade cybersecurity and IT solutions.",
    creator: "@amaratechit",
    site: "@amaratechit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AmaraTech IT Solutions",
    "url": "https://amaratechit.com",
    "logo": "https://amaratechit.com/logo/Artboard- Amaratech4x.png",
    "description": "Enterprise-grade cybersecurity and IT solutions",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8865 Stanford Blvd, Suite 202 #1003",
      "addressLocality": "Columbia",
      "addressRegion": "MD",
      "postalCode": "21045",
      "addressCountry": "US"
    },
    "telephone": "+1-410-855-2206",
    "sameAs": [
      "https://www.facebook.com/AmaraTechITSolutions/",
      "https://www.linkedin.com/company/amaratech-it-solutions/",
      "https://twitter.com/amaratechit",
      "https://github.com/AmaraTech-IT-Solutions"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "itemOffered": [
        { "@type": "Service", "name": "Cybersecurity Services" },
        { "@type": "Service", "name": "Microsoft Azure Solutions" },
        { "@type": "Service", "name": "Cloud Solutions" },
        { "@type": "Service", "name": "IT Consulting" }
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="AmaraTech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AmaraTech" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#C81E1E" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/logo/Artboard- Amaratech4x.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ServiceWorkerRegister />
          <LoadingScreen>
            <SmoothScroll />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <PenguinMascot position="bottom-right" />
          </LoadingScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
