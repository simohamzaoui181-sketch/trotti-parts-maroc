import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://trotti-parts-maroc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Trotti Parts Maroc | Pièces pour trottinettes électriques",
    template: "%s | Trotti Parts Maroc",
  },

  description:
    "Trotti Parts Maroc propose des pièces et accessoires pour trottinettes électriques au Maroc : pneus, freins, chargeurs, dashboards et accessoires. Commande rapide sur WhatsApp.",

  keywords: [
    "Trotti Parts Maroc",
    "pièces trottinette Maroc",
    "pièces trottinette électrique Maroc",
    "pneus trottinette Maroc",
    "chargeur trottinette Maroc",
    "frein trottinette Maroc",
    "dashboard Xiaomi M365 Maroc",
    "Xiaomi M365 Maroc",
    "Ninebot Maroc",
  ],

  authors: [
    {
      name: "Trotti Parts Maroc",
    },
  ],

  creator: "Trotti Parts Maroc",
  publisher: "Trotti Parts Maroc",
  applicationName: "Trotti Parts Maroc",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: siteUrl,
    siteName: "Trotti Parts Maroc",

    title:
      "Trotti Parts Maroc | Pièces pour trottinettes électriques",

    description:
      "Pièces et accessoires pour trottinettes électriques disponibles au Maroc. Pneus, freins, chargeurs, dashboards et accessoires.",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Trotti Parts Maroc - Pièces pour trottinettes électriques",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Trotti Parts Maroc | Pièces pour trottinettes électriques",

    description:
      "Pièces et accessoires pour trottinettes électriques au Maroc.",

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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  category: "ecommerce",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}