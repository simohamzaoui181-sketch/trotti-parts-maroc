import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActiveProducts, getProductBySlug } from "../../lib/product-helpers";
import { ProductImage } from "../../components/product-image";
import { contact } from "../../data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getActiveProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable | Trotti Parts Maroc",
    };
  }

  return {
    title: `${product.name} | Trotti Parts Maroc`,
    description: `${product.name} à ${product.price} DH. Disponible au Maroc. Compatible avec ${product.modelCompatibility.join(", ")}.`,
    alternates: {
      canonical: `https://trotti-parts-maroc.vercel.app/produits/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je veux commander : ${product.name} - ${product.price} DH`
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#075985] transition hover:text-[#064b70]"
        >
          <span>←</span>
          Retour aux produits
        </Link>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:grid-cols-2 lg:gap-12">

          {/* Product Image */}
          <div className="flex flex-col">
            <div className="grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-[#f1f7fa] to-[#e3f2fd] p-6 sm:p-8">
              <ProductImage product={product} />
            </div>

            {/* Gallery placeholder for future */}
            <div className="mt-4 flex gap-2">
              <div className="size-12 rounded-lg border-2 border-[#075985] bg-gradient-to-br from-[#f1f7fa] to-[#e3f2fd]" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="size-12 rounded-lg border border-slate-200 bg-slate-100 opacity-50" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badge */}
              {product.badge && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#075985]/10 px-4 py-2">
                  <span className="size-2 rounded-full bg-[#1faa59]" />
                  <span className="text-xs font-bold text-[#075985]">{product.badge}</span>
                </div>
              )}

              {/* Category */}
              <p className="text-xs font-bold uppercase tracking-widest text-[#087bb6]">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              {product.description && (
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {product.description}
                </p>
              )}

              {/* Price section */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#075985]">
                  {product.price}
                </span>
                <span className="text-lg font-bold text-slate-600">DH</span>
              </div>

              {/* Stock status */}
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 border border-emerald-200">
                <span className="size-3 rounded-full bg-emerald-600" />
                <span className="text-sm font-bold text-emerald-900">
                  En stock et prêt à expédier
                </span>
              </div>

              {/* Brand info */}
              {product.brand && (
                <p className="mt-4 text-sm text-slate-600">
                  <span className="font-bold text-slate-900">Marque:</span> {product.brand}
                </p>
              )}

              {/* Compatible models */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-black text-slate-900">
                  Modèles compatibles
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.modelCompatibility.map((model) => (
                    <li key={model} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="size-1.5 rounded-full bg-[#075985]" />
                      {model}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-lg bg-sky-50 p-3 text-center">
                  <span className="text-sm text-[#075985]">✓</span>
                  <span className="text-xs font-semibold text-slate-700">Garantie 6-12 mois</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-center">
                  <span className="text-sm text-emerald-600">✓</span>
                  <span className="text-xs font-semibold text-slate-700">Testée & approuvée</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-center">
                  <span className="text-sm text-amber-600">✓</span>
                  <span className="text-xs font-semibold text-slate-700">Support 7j/7</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-6 py-4 text-base font-black text-white shadow-lg transition-all duration-200 hover:bg-[#168a47] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              Commander sur WhatsApp
            </a>

            <p className="mt-3 text-center text-xs text-slate-500">
              Réponse rapide • Support en français
            </p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-6 text-center">
            <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-sky-100 text-[#075985]">
              📦
            </div>
            <h3 className="font-bold text-slate-900">Expédition rapide</h3>
            <p className="mt-2 text-sm text-slate-600">24h - 48h partout au Maroc</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-6 text-center">
            <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              ✓
            </div>
            <h3 className="font-bold text-slate-900">Qualité garantie</h3>
            <p className="mt-2 text-sm text-slate-600">Pièces testées et fiables</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-6 text-center">
            <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              💬
            </div>
            <h3 className="font-bold text-slate-900">Support réactif</h3>
            <p className="mt-2 text-sm text-slate-600">Questions? Contactez-nous</p>
          </div>
        </div>
      </section>
    </main>
  );
}