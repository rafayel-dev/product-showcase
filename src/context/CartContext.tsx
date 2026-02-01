import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('product_showcase_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('product_showcase_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems]);

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
            ? { ...item, quantity: Math.min(10, item.quantity + itemToAdd.quantity) }
            : item
        );
      } else {
        return [...prevItems, { ...itemToAdd, quantity: Math.min(10, itemToAdd.quantity) }];
      }
    });
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCartItems((prevItems) => prevItems.filter((item) =>
      !(item.id === productId &&
        (size ? item.selectedSize === size : true) &&
        (color ? item.selectedColor === color : true))
    ));
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

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    const validQuantity = Math.min(10, Math.max(1, quantity));
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId &&
            (size ? item.selectedSize === size : true) &&
            (color ? item.selectedColor === color : true)) {
            return { ...item, quantity: validQuantity };
          }
          return item;
        })
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


