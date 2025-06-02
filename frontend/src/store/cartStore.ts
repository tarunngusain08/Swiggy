import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '../types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  itemsCount: number;
  totalAmount: number;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      itemsCount: 0,
      totalAmount: 0,

      addItem: (item: MenuItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          const updatedItems = currentItems.map((cartItem) => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
          
          set((state) => ({ 
            items: updatedItems,
            itemsCount: state.itemsCount + 1,
            totalAmount: state.totalAmount + item.price,
            isOpen: true
          }));
        } else {
          set((state) => ({ 
            items: [...currentItems, { ...item, quantity: 1 }],
            itemsCount: state.itemsCount + 1,
            totalAmount: state.totalAmount + item.price,
            isOpen: true
          }));
        }
      },

      removeItem: (itemId: string) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find((item) => item.id === itemId);
        
        if (!itemToRemove) return;
        
        const updatedItems = currentItems.filter((item) => item.id !== itemId);
        
        set((state) => ({ 
          items: updatedItems,
          itemsCount: state.itemsCount - itemToRemove.quantity,
          totalAmount: state.totalAmount - (itemToRemove.price * itemToRemove.quantity)
        }));
      },

      updateItemQuantity: (itemId: string, quantity: number) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find((item) => item.id === itemId);
        
        if (!itemToUpdate) return;
        
        // Don't allow negative or zero quantities
        if (quantity < 1) return;
        
        const quantityDifference = quantity - itemToUpdate.quantity;
        
        const updatedItems = currentItems.map((item) => 
          item.id === itemId ? { ...item, quantity } : item
        );
        
        set((state) => ({ 
          items: updatedItems,
          itemsCount: state.itemsCount + quantityDifference,
          totalAmount: state.totalAmount + (itemToUpdate.price * quantityDifference)
        }));
      },

      clearCart: () => {
        set({ 
          items: [],
          itemsCount: 0,
          totalAmount: 0
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      }
    }),
    {
      name: 'cart-storage', // key in localStorage
      partialize: (state) => ({
        items: state.items,
        itemsCount: state.itemsCount,
        totalAmount: state.totalAmount
      }),
    }
  )
);