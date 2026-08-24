"use client";

import { ProductImage } from "./product-image";
import { Icon } from "./ui-icon";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart: () => void;
};

export function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1">
      {/* Image section */}
      <div className="relative grid aspect-[1.1] place-items-center overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 transition-all duration-200">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-md">
            <span className="size-1.5 rounded-full bg-white/70" />
            {product.badge}
          </span>
        )}

        <ProductImage product={product} />
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category label */}
        <div className="flex items-center gap-2">
          <p className="text-label text-primary/70">
            {product.category}
          </p>
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-tight text-neutral-900 sm:text-base">
          {product.name}
        </h3>

        {/* Compatibility - Simplified */}
        <p className="mt-2 line-clamp-1 text-xs text-neutral-500">
          Compatible: <span className="font-medium text-neutral-700">{product.modelCompatibility[0]}</span>
          {product.modelCompatibility.length > 1 && ` +${product.modelCompatibility.length - 1}`}
        </p>

        {/* Stock status - Real and visual */}
        <div className="mt-3 flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-success" />
          <span className="text-xs font-medium text-neutral-600">
            En stock
          </span>
        </div>

        {/* Price - More prominent */}
        <div className="mt-auto pt-4 flex items-baseline gap-1">
          <span className="text-price">{product.price}</span>
          <span className="text-xs font-semibold text-neutral-500">DH</span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onAddToCart}
          className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md active:scale-95 sm:text-sm"
        >
          <Icon name="bag" className="size-4" />
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}