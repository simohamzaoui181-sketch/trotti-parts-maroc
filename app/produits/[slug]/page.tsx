import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "../../data/store";
import { ProductImage } from "../../components/product-image";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Produit introuvable | Trotti Parts Maroc",
    };
  }

  return {
    title: `${product.name} | Trotti Parts Maroc`,
    description: `${product.name} à ${product.price} DH. Disponible au Maroc. Compatible avec ${product.compatibleModels.join(", ")}.`,
    alternates: {
      canonical: `https://trotti-parts-maroc.vercel.app/produits/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je veux commander : ${product.name} - ${product.price} DH`
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <a
          href="/"
          className="mb-6 inline-flex text-sm font-bold text-[#075985] hover:underline"
        >
          ← Retour aux produits
        </a>

        <div className="grid gap-8 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          <div className="grid min-h-[350px] place-items-center rounded-2xl bg-[#f1f7fa] p-8">
            <ProductImage product={product} />
          </div>

          <div className="flex flex-col justify-center">
            {product.badge && (
              <span className="mb-3 w-fit rounded-full bg-[#075985] px-3 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}

            <p className="text-xs font-bold uppercase tracking-wider text-[#087bb6]">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-black text-[#075985]">
              {product.price}{" "}
              <span className="text-base font-bold">DH</span>
            </p>

            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#178246]">
              <span className="size-2 rounded-full bg-[#1faa59]" />
              {product.stock}
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-700">
                Modèles compatibles
              </p>

              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {product.compatibleModels.map((model) => (
                  <li key={model}>• {model}</li>
                ))}
              </ul>
            </div>

            <a
              href={`https://wa.me/${"212781575905"}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#075985] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#064b70]"
            >
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}