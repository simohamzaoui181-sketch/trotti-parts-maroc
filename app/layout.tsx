import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trotti Parts Maroc | Pièces pour trottinettes électriques",
  description: "Pièces et accessoires de trottinettes électriques disponibles rapidement au Maroc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="fr"><body>{children}</body></html>;
}
