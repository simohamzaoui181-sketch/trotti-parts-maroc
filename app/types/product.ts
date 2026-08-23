export type ProductCategory =
  | "Pneus"
  | "Chambres à air"
  | "Freins"
  | "Contrôleurs"
  | "Chargeurs"
  | "Écrans"
  | "Accélérateurs"
  | "Accessoires";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand?: string;
  modelCompatibility: string[];
  image: string;
  gallery?: string[];
  visual:
    | "tube"
    | "tire"
    | "brakes"
    | "controller"
    | "controller48"
    | "charger"
    | "throttle"
    | "display";
  maxStock: number;
  featured?: boolean;
  badge?: string;
  active: boolean;
};

export type Category = {
  name: ProductCategory;
  icon: string;
  color: string;
  description?: string;
};
