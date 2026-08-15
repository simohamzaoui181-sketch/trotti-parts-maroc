import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trotti-parts-maroc.vercel.app"),
  title: {
    default: "Trotti Parts Maroc | Pièces pour trottinettes électriques",
    template: "%s | Trotti Parts Maroc",
  },
  description:
    "Pièces et accessoires pour trottinettes électriques au Maroc : pneus, freins, chargeurs, dashboards et accessoires. Commande rapide sur WhatsApp.",
  keywords: [
    "pièces trottinettes Maroc",
    "pièces trottinette électrique Maroc",
    "pneus trottinette Maroc",
    "chargeur trottinette Maroc",
    "Xiaomi M365 Maroc",
    "Trotti Parts Maroc",
  ],
  authors: [{ name: "Trotti Parts Maroc" }],
  creator: "Trotti Parts Maroc",
  publisher: "Trotti Parts Maroc",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://trotti-parts-maroc.vercel.app/",
    siteName: "Trotti Parts Maroc",
    title: "Trotti Parts Maroc | Pièces pour trottinettes électriques",
    description:
      "Pièces et accessoires pour trottinettes électriques disponibles au Maroc.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Trotti Parts Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trotti Parts Maroc | Pièces pour trottinettes électriques",
    description:
      "Pièces et accessoires pour trottinettes électriques au Maroc.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}