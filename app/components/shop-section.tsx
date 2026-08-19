"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { Icon } from "./ui-icon";
import {
  categories,
  contact,
  products,
  type Product,
  type ProductCategory,
} from "../data/store";

const allCategories = "Toutes les catégories";

type CartItem = {
  product: Product;
  quantity: number;
};

export function ShopSection() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | typeof allCategories>(allCategories);

  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("fr");

    return products.filter((product) => {
      const categoryOK =
        selectedCategory === allCategories ||
        product.category === selectedCategory;

      const text = [
        product.name,
        product.category,
        ...product.compatibleModels,
      ]
        .join(" ")
        .toLocaleLowerCase("fr");

      return categoryOK && (!q || text.includes(q));
    });
  }, [query, selectedCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cart-updated", { detail: { count: cartCount } }),
    );
  }, [cartCount]);

  function addToCart(product: Product) {
    setCart((current) => {
      const exists = current.find(
        (item) => item.product.name === product.name,
      );

      if (exists) {
        return current.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productName: string, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function orderOnWhatsApp() {
    if (cart.length === 0) return;

    const items = cart
      .map(
        (item) =>
          `• ${item.product.name} — ${item.quantity} × ${item.product.price} DH = ${
            item.quantity * item.product.price
          } DH`,
      )
      .join("\n");

    const message = `Bonjour TROTTI PARTS MAROC 👋

Je souhaite commander :

${items}

💰 Total : ${cartTotal} DH

Merci de me confirmer la disponibilité et les frais de livraison.`;

    const url = `https://wa.me/${
      contact.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="produits"
      className="border-y border-slate-100 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">
          <p className="section-eyebrow">La boutique</p>
          <h2 className="section-title">Toutes nos pièces</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Trouvez rapidement la pièce adaptée à votre modèle de
            trottinette électrique.
          </p>
        </div>

        <div className="mt-9 rounded-2xl border border-slate-100 bg-[#f8fbfd] p-3 shadow-sm sm:p-4">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <label className="relative block flex-1">
              <span className="sr-only">Rechercher un produit</span>

              <Icon
                name="search"
                className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="product-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Rechercher une pièce ou un modèle..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#087bb6] focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 lg:min-w-36">
              <span>
                {filteredProducts.length} produit
                {filteredProducts.length > 1 ? "s" : ""}
              </span>

              {cartCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 font-bold text-[#075985]">
                  <Icon name="bag" className="size-3.5" />
                  {cartCount}
                </span>
              )}
            </div>

          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory(allCategories)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${
                selectedCategory === allCategories
                  ? "bg-[#075985] text-white"
                  : "bg-white text-slate-600 hover:bg-sky-50"
              }`}
            >
              Toutes
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${
                  selectedCategory === category.name
                    ? "bg-[#075985] text-white"
                    : "bg-white text-slate-600 hover:bg-sky-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div id="cart-section" className="mt-8 rounded-2xl border border-sky-100 bg-[#f8fbfd] p-5 shadow-sm">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087bb6]">
                  Votre panier
                </p>

                <h3 className="mt-1 text-lg font-black text-slate-900">
                  {cartCount} article{cartCount > 1 ? "s" : ""} — {cartTotal} DH
                </h3>
              </div>

              <button
                type="button"
                onClick={orderOnWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 py-3 text-xs font-bold text-white hover:bg-[#168a47]"
              >
                <Icon name="whatsapp" className="size-4" />
                Commander sur WhatsApp
              </button>

            </div>

            <div className="mt-5 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.product.name}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {item.product.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.product.price} DH × {item.quantity}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.product.name, -1)}
                      className="grid size-8 place-items-center rounded-lg border border-slate-200 font-bold"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-sm font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => changeQuantity(item.product.name, 1)}
                      className="grid size-8 place-items-center rounded-lg border border-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
