"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { Icon } from "./ui-icon";
import { categories, contact } from "../data/products";
import type { ProductCategory } from "../types/product";
import type { Cart } from "../lib/cart-helpers";
import {
  filterProducts,
} from "../lib/product-helpers";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  calculateCartTotal,
  getCartCount,
  getCartWithProducts,
  generateWhatsAppMessage,
  validateCart,
} from "../lib/cart-helpers";

const allCategories = "Toutes les catégories";
const CART_STORAGE_KEY = "trotti-parts-cart-v2";

function serializeCart(cart: Cart): string {
  return JSON.stringify(cart);
}

function deserializeCart(data: string): Cart {
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    const { validCart } = validateCart(
      parsed.map((item: { productId?: string; quantity?: number }) => ({
        productId: String(item.productId || ""),
        quantity: Math.max(0, Math.floor(item.quantity || 0)),
      }))
    );

    return validCart;
  } catch {
    return [];
  }
}

export function ShopSection() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | typeof allCategories>(allCategories);

  const [cart, setCart] = useState<Cart>([]);
  const [mounted, setMounted] = useState(false);
  const [stockError, setStockError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCart(deserializeCart(stored));
      }
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, serializeCart(cart));
    }
  }, [cart, mounted]);

  const filteredProducts = useMemo(() => {
    const category =
      selectedCategory === allCategories ? null : selectedCategory;
    return filterProducts(category, query);
  }, [query, selectedCategory]);

  const cartCount = getCartCount(cart);
  const cartTotal = calculateCartTotal(cart);
  const cartWithProducts = useMemo(
    () => getCartWithProducts(cart),
    [cart]
  );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cart-updated", { detail: { count: cartCount } }),
    );
  }, [cartCount]);

  function handleAddToCart(productId: string) {
    setStockError("");
    const result = addToCart(cart, productId, 1);
    if (result.error) {
      setStockError(result.error);
    } else {
      setCart(result.cart);
    }
  }

  function handleChangeQuantity(productId: string, amount: number) {
    setStockError("");
    const currentItem = cart.find((item) => item.productId === productId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + amount;
    if (newQuantity <= 0) {
      setCart(removeFromCart(cart, productId));
      return;
    }

    const result = updateCartQuantity(cart, productId, newQuantity);
    if (result.error) {
      setStockError(result.error);
    } else {
      setCart(result.cart);
    }
  }

  function handleOrderOnWhatsApp() {
    if (cart.length === 0) return;

    const message = generateWhatsAppMessage(cart, cartTotal);
    const url = `https://wa.me/${
      contact.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="produits"
      className="border-y border-slate-100 bg-white py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <p className="section-eyebrow">La boutique</p>
          <h2 className="section-title">Toutes nos pièces</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Trouvez rapidement la pièce adaptée à votre modèle de trottinette électrique.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mt-8 space-y-3 sm:mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:gap-3">
            {/* Search Input */}
            <label className="relative flex-1">
              <span className="sr-only">Rechercher un produit</span>
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="product-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Rechercher une pièce, marque ou modèle..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-500 focus:border-[#087bb6] focus:ring-2 focus:ring-sky-200"
              />
            </label>

            {/* Results counter */}
            <div className="flex shrink-0 items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 sm:justify-center">
              <span>
                {filteredProducts.length} résultat{filteredProducts.length !== 1 ? "s" : ""}
              </span>
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#075985] px-2.5 py-1 font-bold text-white">
                  <Icon name="bag" className="size-3.5" />
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory(allCategories)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                selectedCategory === allCategories
                  ? "bg-[#075985] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              Toutes
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                  selectedCategory === category.name
                    ? "bg-[#075985] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Error Alert */}
        {stockError && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:px-5">
            <Icon name="alert" className="size-5 text-red-600 shrink-0" />
            <p className="text-sm font-semibold text-red-800">{stockError}</p>
          </div>
        )}

        {/* Cart Section */}
        {cart.length > 0 && (
          <div id="cart-section" className="mt-8 space-y-4 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-5 shadow-sm transition-all duration-300 sm:p-6 lg:p-7 animate-in fade-in slide-in-from-bottom-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#087bb6]">
                  Votre panier
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
                  {cartCount} article{cartCount > 1 ? "s" : ""} · <span className="text-[#075985] transition-all duration-200">{cartTotal} DH</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={handleOrderOnWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#168a47] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 sm:text-base"
              >
                <Icon name="whatsapp" className="size-5" />
                Commander sur WhatsApp
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-2">
              {cartWithProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3.5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 sm:p-4 animate-in fade-in slide-in-from-left-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.price} DH <span className="text-slate-400">×</span> {item.quantity} = <span className="font-semibold text-slate-900">{item.price * item.quantity} DH</span>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => handleChangeQuantity(item.id, -1)}
                      className="grid size-9 place-items-center font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>

                    <span className="w-6 text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleChangeQuantity(item.id, 1)}
                      className="grid size-9 place-items-center font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Products Grid */}
        <div className="mt-10 sm:mt-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
              <Icon name="search" className="mx-auto size-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">Aucun produit trouvé</h3>
              <p className="mt-2 text-sm text-slate-600">
                Essayez une autre recherche ou explorez toutes les catégories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory(allCategories);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#075985] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#064b70]"
              >
                <Icon name="refresh" className="size-4" />
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
