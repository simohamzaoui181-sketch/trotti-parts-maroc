"use client";

import { ProductImage } from "./product-image";
import { Icon } from "./ui-icon";
import { contact, type Product } from "../data/store";

type ProductCardProps = { product: Product; onAddToCart: () => void };

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const whatsappMessage = `Bonjour TROTTI PARTS MAROC, je souhaite commander : ${product.name} (${product.price} DH).`;
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative grid aspect-[1.16] place-items-center overflow-hidden bg-[#f1f7fa] p-5">
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#075985] px-2.5 py-1 text-[10px] font-bold text-white">{product.badge}</span>}
        <ProductImage product={product} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087bb6]">{product.category}</p>
        <h3 className="mt-1.5 text-[15px] font-extrabold leading-5 text-slate-900">{product.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#178246]"><span className="size-1.5 rounded-full bg-[#1faa59]" /> {product.stock}</p>
        <p className="mt-3 min-h-8 text-[11px] leading-4 text-slate-500"><span className="font-bold text-slate-600">Compatible :</span> {product.compatibleModels.join(" · ")}</p>
        <p className="mt-4 text-lg font-black text-[#075985]">{product.price} <span className="text-xs">DH</span></p>
        <div className="mt-4 grid gap-2">
          <button onClick={onAddToCart} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#075985] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#064b70]"><Icon name="bag" className="size-4" /> Ajouter au panier</button>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#1faa59]/35 bg-[#f1fbf5] px-3 py-2.5 text-xs font-bold text-[#178246] transition hover:bg-[#ddf6e6]"><Icon name="whatsapp" className="size-4" /> Commander sur WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
