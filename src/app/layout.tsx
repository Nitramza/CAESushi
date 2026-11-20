import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import { siteData, siteUrl, withBasePath } from "@/data/siteData";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const siteBaseUrl = new URL(`${siteUrl}/`);
const socialImage = new URL(withBasePath(siteData.heroImage), siteBaseUrl).toString();
const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sushi estilo culichi en San Andrés Cholula | CAE Sushi",
    template: "%s | CAE Sushi",
  },
  description: siteData.description,
  keywords: [
    "sushi en San Andrés Cholula",
    "sushi culichi",
    "restaurante de sushi en Cholula",
    "rollos de sushi en Puebla",
    "CAE Sushi",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Sushi estilo culichi en San Andrés Cholula | CAE Sushi",
    description: siteData.description,
    type: "website",
    locale: "es_MX",
    siteName: siteData.name,
    url: siteUrl,
    images: [
      {
        url: socialImage,
        alt: "Sushi estilo culichi preparado por CAE Sushi en San Andrés Cholula",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushi estilo culichi en San Andrés Cholula | CAE Sushi",
    description: siteData.description,
    images: [socialImage],
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  url: siteUrl,
  name: siteData.name,
  description: siteData.description,
  image: socialImage,
  servesCuisine: siteData.servesCuisine,
  telephone: siteData.phone,
  address: {
    "@type": "PostalAddress",
    ...siteData.addressParts,
  },
  geo: {
    "@type": "GeoCoordinates",
    ...siteData.geo,
  },
  openingHoursSpecification: siteData.openingHoursSpecification.map((hours) => ({
    "@type": "OpeningHoursSpecification",
    ...hours,
  })),
  priceRange: siteData.priceRange,
  hasMenu: new URL(withBasePath("/#menu"), siteBaseUrl).toString(),
  sameAs: [siteData.facebookUrl, siteData.instagramUrl],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        {analyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}