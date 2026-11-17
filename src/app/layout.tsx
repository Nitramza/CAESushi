import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { siteData } from "@/data/siteData";
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

const description =
  "Sushi estilo culichi en San Andrés Cholula. Explora la carta de CAE Sushi y pide tus favoritos por WhatsApp.";

export const metadata: Metadata = {
  title: "CAE Sushi | Sushi en San Andrés Cholula",
  description,
  openGraph: {
    title: "CAE Sushi | Sushi en San Andrés Cholula",
    description,
    type: "website",
    locale: "es_MX",
    siteName: siteData.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "CAE Sushi | Sushi en San Andrés Cholula",
    description,
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "SushiRestaurant",
  name: siteData.name,
  servesCuisine: "Sushi",
  address: {
    "@type": "PostalAddress",
    ...siteData.addressParts,
  },
  sameAs: [siteData.instagramUrl],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        {children}
      </body>
    </html>
  );
}