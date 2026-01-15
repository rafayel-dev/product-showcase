import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
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


