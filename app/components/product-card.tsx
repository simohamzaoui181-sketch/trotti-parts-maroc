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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-200 hover:shadow-2xl">
      {/* Image section */}
      <div className="relative grid aspect-[1.2] place-items-center overflow-hidden bg-gradient-to-br from-[#f1f7fa] to-[#e3f2fd] p-4 sm:p-5 transition-all duration-200">
        {product.badge && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#075985] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg transition-all duration-200">
            <span className="size-1 rounded-full bg-white/60" />
            {product.badge}
          </span>
        )}

        <ProductImage product={product} />
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category */}
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#087bb6]">
            {product.category}
          </p>
        </div>

        {/* Title */}
        <h3 className="mt-2 line-clamp-2 text-sm font-black leading-tight text-slate-900 sm:text-base">
          {product.name}
        </h3>

        {/* Stock status */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-600" />
            En stock
          </span>
        </div>

        {/* Compatibility */}
        <p className="mt-3 line-clamp-2 min-h-8 text-xs leading-4 text-slate-600">
          <span className="font-bold text-slate-700">Compatible:</span>{" "}
          <span className="text-slate-500">
            {product.modelCompatibility.slice(0, 2).join(" · ")}
            {product.modelCompatibility.length > 2 && " ..."}
          </span>
        </p>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-xl font-black text-[#075985]">
            {product.price}
          </span>
          <span className="text-xs font-bold text-slate-600">DH</span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onAddToCart}
          className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#075985] px-3 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#064b70] hover:shadow-lg active:scale-95 sm:text-sm"
        >
          <Icon name="bag" className="size-4" />
          Ajouter
        </button>
      </div>
    </article>
  );
}