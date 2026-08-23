import type { Product, ProductCategory } from "../types/product";
import { products } from "../data/products";

/**
 * Find a product by its ID
 */
export function findProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Find a product by its slug (for URL routes)
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Get all active products
 */
export function getActiveProducts(): Product[] {
  return products.filter((p) => p.active);
}

/**
 * Get featured products (for homepage display)
 */
export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((p) => p.featured);
}

/**
 * Filter products by category
 */
export function getProductsByCategory(
  category: ProductCategory
): Product[] {
  return getActiveProducts().filter((p) => p.category === category);
}

/**
 * Search products by query string
 * Searches in: name, description, category, modelCompatibility
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return getActiveProducts();

  const q = query.trim().toLowerCase();
  return getActiveProducts().filter((product) => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.brand,
      ...product.modelCompatibility,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(q);
  });
}

/**
 * Filter products by category and search query
 */
export function filterProducts(
  category: ProductCategory | null,
  query: string
): Product[] {
  let filtered = getActiveProducts();

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.brand,
        ...product.modelCompatibility,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }

  return filtered;
}

/**
 * Get products compatible with a specific model
 */
export function getProductsByModel(model: string): Product[] {
  return getActiveProducts().filter((p) =>
    p.modelCompatibility.some((m) =>
      m.toLowerCase().includes(model.toLowerCase())
    )
  );
}

/**
 * Validate if a quantity can be added to cart (stock check)
 */
export function validateStock(
  productId: string,
  requestedQuantity: number
): { valid: boolean; maxAvailable: number; message?: string } {
  const product = findProductById(productId);

  if (!product) {
    return { valid: false, maxAvailable: 0, message: "Produit introuvable" };
  }

  if (!product.active) {
    return {
      valid: false,
      maxAvailable: 0,
      message: "Ce produit n'est plus disponible",
    };
  }

  if (requestedQuantity <= 0) {
    return {
      valid: false,
      maxAvailable: 0,
      message: "Quantité invalide",
    };
  }

  if (requestedQuantity > product.maxStock) {
    return {
      valid: false,
      maxAvailable: product.maxStock,
      message: `Stock limité à ${product.maxStock} article(s) pour ${product.name}`,
    };
  }

  return { valid: true, maxAvailable: product.maxStock };
}

/**
 * Get product count by category
 */
export function getProductCountByCategory(
  category: ProductCategory
): number {
  return getProductsByCategory(category).length;
}

/**
 * Get total active products count
 */
export function getTotalProductCount(): number {
  return getActiveProducts().length;
}
