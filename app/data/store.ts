export const contact = { whatsapp: "212781575905", displayWhatsapp: "212 781575905" };

export const categories = [
  { name: "Pneus", icon: "wheel", color: "bg-orange-100" }, { name: "Chambres à air", icon: "tube", color: "bg-sky-100" },
  { name: "Freins", icon: "brake", color: "bg-red-100" }, { name: "Contrôleurs", icon: "chip", color: "bg-violet-100" },
  { name: "Chargeurs", icon: "bolt", color: "bg-amber-100" }, { name: "Écrans", icon: "screen", color: "bg-cyan-100" },
  { name: "Accélérateurs", icon: "handle", color: "bg-emerald-100" }, { name: "Accessoires", icon: "tool", color: "bg-pink-100" },
] as const;

export type ProductCategory = (typeof categories)[number]["name"];

export type Product = {
  name: string;
  price: number;
  stock: string;
  visual: "tube" | "tire" | "brakes" | "controller" | "controller48" | "charger" | "throttle" | "display";
  image: string;
  category: ProductCategory;
  compatibleModels: string[];
  badge?: string;
};

export const products: Product[] = [
  { name: "Pneu Tubeless 80/65-6", price: 120, stock: "En stock", visual: "tire", image: "/products/pneu-tubeless-8065-6.png", category: "Pneus", compatibleModels: ["Ninebot G30", "Kugoo M4"], badge: "Meilleure vente" },
  { name: "Levier de frein Xiaomi", price: 40, stock: "En stock", visual: "brakes", image: "/products/levier-frein-xiaomi.png", category: "Freins", compatibleModels: ["Xiaomi M365", "Ninebot ES"] },
  { name: "Chargeur LiitoKala 42V/2A", price: 110, stock: "En stock", visual: "charger", image: "/products/chargeur-42v-2a.png", category: "Chargeurs", compatibleModels: ["Xiaomi M365", "Pro 2"], badge: "Nouveau" },
  { name: "Dashboard Xiaomi M365 Pro / Pro 1", price: 120, stock: "En stock", visual: "display", image: "/products/dashboard-m365-pro.png", category: "Écrans", compatibleModels: ["Xiaomi M365", "Pro 2"] },
  { name: "Dashboard Xiaomi Pro 2 / Essential / Xiaomi 3", price: 120, stock: "En stock", visual: "display", image: "/products/dashboard-pro2-essential.png", category: "Écrans", compatibleModels: ["Kugoo M4", "Kaabo Mantis"] },
  { name: "Feu arrière Xiaomi Pro 2", price: 25, stock: "En stock", visual: "display", image: "/products/feu-arriere-pro2.png", category: "Accessoires", compatibleModels: ["Universel"] },
];

export const serviceHighlights = [
  { title: "Livraison au Maroc", text: "Vos pièces expédiées partout dans le pays.", icon: "truck" }, { title: "Prix compétitifs", text: "Le bon prix, sans compromis sur la qualité.", icon: "tag" },
  { title: "Stock local", text: "Des références disponibles sans attendre.", icon: "box" }, { title: "Commande WhatsApp", text: "Simple, rapide et accompagnée par un expert.", icon: "whatsapp" },
  { title: "Tarifs professionnels", text: "Des prix adaptés pour les commandes en quantité.", icon: "tools" },
] as const;
