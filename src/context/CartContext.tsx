import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (itemToAdd: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === itemToAdd.id &&
          item.selectedSize === itemToAdd.selectedSize &&
          item.selectedColor === itemToAdd.selectedColor
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id &&
            item.selectedSize === itemToAdd.selectedSize &&
            item.selectedColor === itemToAdd.selectedColor
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        );
      } else {
        return [...prevItems, itemToAdd];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity: quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        openCart,
        closeCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


