"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { Icon } from "./ui-icon";
import { categories, products, type ProductCategory } from "../data/store";

const allCategories = "Toutes les catégories";

export function ShopSection() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | typeof allCategories>(allCategories);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return products.filter((product) => {
      const matchesCategory = selectedCategory === allCategories || product.category === selectedCategory;
      const searchableText = [product.name, product.category, ...product.compatibleModels].join(" ").toLocaleLowerCase("fr");
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [query, selectedCategory]);

  function addToCart() { setCartCount((count) => count + 1); }

  return (
    <section id="produits" className="border-y border-slate-100 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center"><p className="section-eyebrow">La boutique</p><h2 className="section-title">Toutes nos pièces</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">Trouvez rapidement la pièce adaptée à votre modèle de trottinette électrique.</p></div>
        <div className="mt-9 rounded-2xl border border-slate-100 bg-[#f8fbfd] p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative block flex-1"><span className="sr-only">Rechercher un produit</span><Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Rechercher une pièce ou un modèle..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#087bb6] focus:ring-2 focus:ring-sky-100" /></label>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 lg:min-w-36"><span>{filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}</span>{cartCount > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 font-bold text-[#075985]"><Icon name="bag" className="size-3.5" /> {cartCount}</span>}</div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button onClick={() => setSelectedCategory(allCategories)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition ${selectedCategory === allCategories ? "bg-[#075985] text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>Toutes</button>
            {categories.map((category) => <button key={category.name} onClick={() => setSelectedCategory(category.name)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition ${selectedCategory === category.name ? "bg-[#075985] text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{category.name}</button>)}
          </div>
        </div>
        {filteredProducts.length ? <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">{filteredProducts.map((product) => <ProductCard key={product.name} product={product} onAddToCart={addToCart} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center"><Icon name="search" className="mx-auto size-7 text-slate-400" /><h3 className="mt-3 font-bold text-slate-800">Aucun produit trouvé</h3><p className="mt-1 text-sm text-slate-500">Essayez un autre mot-clé ou une autre catégorie.</p><button onClick={() => { setQuery(""); setSelectedCategory(allCategories); }} className="mt-4 text-sm font-bold text-[#087bb6]">Réinitialiser les filtres</button></div>}
      </div>
    </section>
  );
}
