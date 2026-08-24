"use client";

import { ProductImage } from "./product-image";
import { Icon } from "./ui-icon";
import { useState } from "react";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart: () => void;
};

export function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 active:scale-95"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
        border: isHovered ? "2px solid rgba(10, 124, 196, 0.4)" : "1px solid rgba(10, 124, 196, 0.1)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(10, 124, 196, 0.25), 0 0 30px rgba(31, 170, 89, 0.1), inset 0 0 20px rgba(255,255,255,0.5)"
          : "0 10px 25px rgba(0,0,0,0.08), 0 0 15px rgba(10, 124, 196, 0.1)",
        transform: isHovered ? "translateY(-8px) perspective(1000px)" : "translateY(0)",
      }}
    >
      {/* Premium image section with gradient background */}
      <div
        className="relative grid aspect-[1.1] place-items-center overflow-hidden p-4 transition-all duration-300"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(10, 124, 196, 0.15) 0%, rgba(31, 170, 89, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(15, 23, 42, 0.05) 0%, rgba(10, 124, 196, 0.08) 100%)"
        }}
      >
        {/* Shine effect overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              animation: "shine 2s infinite",
              pointerEvents: "none"
            }}
          />
        )}

        {/* Badge with premium styling */}
        {product.badge && (
          <span
            className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-lg transition-all duration-200 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #075985 0%, #0a7cc4 100%)",
              boxShadow: isHovered
                ? "0 0 20px rgba(10, 124, 196, 0.6), 0 5px 15px rgba(10, 124, 196, 0.3)"
                : "0 5px 15px rgba(10, 124, 196, 0.2)"
            }}
          >
            <span className="size-1.5 rounded-full bg-white/70 animate-pulse" />
            {product.badge}
          </span>
        )}

        <ProductImage product={product} />
      </div>

      {/* Premium content section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category label */}
        <div className="flex items-center gap-2">
          <p className="text-label" style={{
            background: "linear-gradient(135deg, #075985 0%, #0a7cc4 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {product.category}
          </p>
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-tight text-neutral-900 sm:text-base">
          {product.name}
        </h3>

        {/* Compatibility */}
        <p className="mt-2 line-clamp-1 text-xs text-neutral-500">
          Compatible: <span className="font-medium text-neutral-700">{product.modelCompatibility[0]}</span>
          {product.modelCompatibility.length > 1 && ` +${product.modelCompatibility.length - 1}`}
        </p>

        {/* Stock status with glow */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className="size-2.5 rounded-full bg-accent-success transition-all duration-300"
            style={{
              boxShadow: isHovered ? "0 0 12px rgba(31, 170, 89, 0.8)" : "0 0 0px rgba(31, 170, 89, 0)"
            }}
          />
          <span className="text-xs font-medium text-neutral-600">
            En stock
          </span>
        </div>

        {/* Price with premium styling */}
        <div className="mt-auto pt-4 flex items-baseline gap-1">
          <span
            className="text-2xl font-black transition-all duration-300"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, #075985 0%, #0a7cc4 100%)"
                : "linear-gradient(135deg, #075985 0%, #075985 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: isHovered ? "drop-shadow(0 0 8px rgba(10, 124, 196, 0.4))" : "none"
            }}
          >
            {product.price}
          </span>
          <span className="text-xs font-semibold text-neutral-500">DH</span>
        </div>

        {/* Premium gradient button */}
        <button
          type="button"
          onClick={onAddToCart}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-white shadow-md transition-all duration-200 active:scale-95 group/btn"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, #0a7cc4 0%, #075985 100%)"
              : "linear-gradient(135deg, #075985 0%, #053d5a 100%)",
            boxShadow: isHovered
              ? "0 10px 25px rgba(10, 124, 196, 0.4), 0 0 20px rgba(31, 170, 89, 0.2)"
              : "0 5px 15px rgba(10, 124, 196, 0.2)",
          }}
        >
          <Icon name="bag" className="size-4.5 transition-transform group-hover/btn:scale-110" />
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}