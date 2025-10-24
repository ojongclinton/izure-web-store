import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';
import { TAX_RATE } from '@/constants';

interface CartStore {
  cart: Cart;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  setShippingCost: (cost: number) => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addItem: (product, variant, quantity = 1) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(
          (item) =>
            item.productId === product.id && item.variantId === variant.id
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          // Update existing item quantity
          newItems = cart.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            quantity,
            product,
            variant,
          };
          newItems = [...cart.items, newItem];
        }

        set({ cart: { ...cart, items: newItems } });
        get().calculateTotals();
      },

      removeItem: (itemId) => {
        const { cart } = get();
        const newItems = cart.items.filter((item) => item.id !== itemId);
        set({ cart: { ...cart, items: newItems } });
        get().calculateTotals();
      },

      updateQuantity: (itemId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const newItems = cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ cart: { ...cart, items: newItems } });
        get().calculateTotals();
      },

      clearCart: () => {
        set({ cart: initialCart });
      },

      calculateTotals: () => {
        const { cart } = get();
        const subtotal = cart.items.reduce(
          (sum, item) => sum + (item.variant.price || item.product.price) * item.quantity,
          0
        );
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + cart.shipping;

        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            total,
          },
        });
      },

      setShippingCost: (cost) => {
        const { cart } = get();
        set({ cart: { ...cart, shipping: cost } });
        get().calculateTotals();
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
