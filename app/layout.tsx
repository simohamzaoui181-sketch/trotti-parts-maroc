import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://trotti-parts-maroc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Trotti Parts Maroc | Pièces de trottinette électrique au Maroc",
    template: "%s | Trotti Parts Maroc",
  },

  description:
    "Achetez vos pièces de trottinette électrique au Maroc : pneus, freins, chargeurs, dashboards, contrôleurs et accessoires. Stock local, livraison partout au Maroc et commande rapide sur WhatsApp.",

  keywords: [
    "pièces trottinette Maroc",
    "pièces trottinette électrique Maroc",
    "pièces détachées trottinette Maroc",
    "pneu trottinette Maroc",
    "pneus trottinette électrique Maroc",
    "chargeur trottinette Maroc",
    "frein trottinette Maroc",
    "dashboard trottinette Maroc",
    "contrôleur trottinette Maroc",
    "Xiaomi M365 Maroc",
    "Xiaomi Pro 2 Maroc",
    "Trotti Parts Maroc",
  ],

  authors: [
    {
      name: "Trotti Parts Maroc",
    },
  ],

  creator: "Trotti Parts Maroc",
  publisher: "Trotti Parts Maroc",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "Trotti Parts Maroc",

    title:
      "Trotti Parts Maroc | Pièces de trottinette électrique au Maroc",

    description:
      "Pièces et accessoires pour trottinettes électriques disponibles au Maroc : pneus, freins, chargeurs, dashboards et accessoires. Livraison partout au Maroc.",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Trotti Parts Maroc - Pièces de trottinettes électriques",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Trotti Parts Maroc | Pièces de trottinette électrique au Maroc",

    description:
      "Pièces détachées et accessoires pour trottinettes électriques au Maroc. Livraison partout au Maroc et commande WhatsApp.",

    images: ["/logo.png"],
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
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fr-MA">
      <body>{children}</body>
    </html>
  );
}