import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WishlistItem, Product } from '@/types';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product, userId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, userId) => {
        const { items } = get();
        const exists = items.some((item) => item.productId === product.id);

        if (!exists) {
          const newItem: WishlistItem = {
            id: `${userId}-${product.id}`,
            userId,
            productId: product.id,
            product,
            addedAt: new Date(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.productId !== productId) });
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
