import type { Product } from "../types/product";
import { findProductById, validateStock } from "./product-helpers";

/**
 * Cart item type - references product by ID
 */
export type CartItem = {
  productId: string;
  quantity: number;
};

/**
 * Cart type
 */
export type Cart = CartItem[];

/**
 * Get full product details for a cart item
 */
export function getCartItemProduct(
  cartItem: CartItem
): (Product & { quantity: number }) | null {
  const product = findProductById(cartItem.productId);
  if (!product) return null;
  return { ...product, quantity: cartItem.quantity };
}

/**
 * Get all cart items with full product details
 */
export function getCartWithProducts(cart: Cart): Array<Product & { quantity: number }> {
  return cart
    .map((item) => getCartItemProduct(item))
    .filter((item): item is Product & { quantity: number } => item !== null);
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(cart: Cart): number {
  return cart.reduce((total, item) => {
    const product = findProductById(item.productId);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
}

/**
 * Calculate cart item count
 */
export function getCartCount(cart: Cart): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Add product to cart (or increment quantity)
 */
export function addToCart(
  cart: Cart,
  productId: string,
  quantity: number = 1
): { cart: Cart; error?: string } {
  const validation = validateStock(productId, quantity);

  if (!validation.valid) {
    return { cart, error: validation.message };
  }

  const existingIndex = cart.findIndex((item) => item.productId === productId);

  if (existingIndex >= 0) {
    const newQuantity = cart[existingIndex].quantity + quantity;
    const newValidation = validateStock(productId, newQuantity);

    if (!newValidation.valid) {
      return { cart, error: newValidation.message };
    }

    return {
      cart: cart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: newQuantity }
          : item
      ),
    };
  }

  return { cart: [...cart, { productId, quantity }] };
}

/**
 * Remove product from cart
 */
export function removeFromCart(cart: Cart, productId: string): Cart {
  return cart.filter((item) => item.productId !== productId);
}

/**
 * Update cart item quantity
 */
export function updateCartQuantity(
  cart: Cart,
  productId: string,
  newQuantity: number
): { cart: Cart; error?: string } {
  if (newQuantity <= 0) {
    return { cart: removeFromCart(cart, productId) };
  }

  const validation = validateStock(productId, newQuantity);

  if (!validation.valid) {
    return { cart, error: validation.message };
  }

  return {
    cart: cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ),
  };
}

/**
 * Clear entire cart
 */
export function clearCart(): Cart {
  return [];
}

/**
 * Validate entire cart against current product inventory
 * Returns: valid items (product exists and is active), invalid items (to remove)
 */
export function validateCart(cart: Cart): {
  validCart: Cart;
  invalidProductIds: string[];
} {
  const validCart: Cart = [];
  const invalidProductIds: string[] = [];

  cart.forEach((item) => {
    const product = findProductById(item.productId);

    if (!product || !product.active) {
      invalidProductIds.push(item.productId);
      return;
    }

    const validation = validateStock(item.productId, item.quantity);
    if (validation.valid) {
      validCart.push(item);
    } else {
      // Keep item but with reduced quantity if still valid
      if (validation.maxAvailable > 0) {
        validCart.push({ productId: item.productId, quantity: validation.maxAvailable });
      } else {
        invalidProductIds.push(item.productId);
      }
    }
  });

  return { validCart, invalidProductIds };
}

/**
 * Generate WhatsApp message from cart
 */
export function generateWhatsAppMessage(
  cart: Cart,
  total: number
): string {
  const cartWithProducts = getCartWithProducts(cart);

  if (cartWithProducts.length === 0) {
    return "Bonjour TROTTI PARTS MAROC, je souhaite commander des pièces.";
  }

  const items = cartWithProducts
    .map(
      (item) =>
        `• ${item.name} — ${item.quantity} × ${item.price} DH = ${
          item.quantity * item.price
        } DH`
    )
    .join("\n");

  return `Bonjour TROTTI PARTS MAROC 👋

Je souhaite commander :

${items}

💰 Total : ${total} DH

Merci de me confirmer la disponibilité et les frais de livraison.`;
}
