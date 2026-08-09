"use client";

import Image from "next/image";
import { useState } from "react";
import { type Product } from "../data/store";

export function ProductImage({ product }: { product: Product }) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSource = hasImageError ? "/products/product-placeholder.svg" : product.image;

  return <Image src={imageSource} alt={hasImageError ? "Image produit bientôt disponible" : product.name} fill unoptimized={hasImageError} sizes="(max-width: 479px) 100vw, (max-width: 1023px) 33vw, 25vw" className="object-contain p-4" onError={() => setHasImageError(true)} />;
}
