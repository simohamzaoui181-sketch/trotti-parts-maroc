import type { MetadataRoute } from "next";
import { getActiveProducts } from "./lib/product-helpers";

const BASE_URL = "https://trotti-parts-maroc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = getActiveProducts().map((product) => ({
    url: `${BASE_URL}/produits/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productUrls,
  ];
}