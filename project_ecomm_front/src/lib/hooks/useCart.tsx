'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  shop: string;
  inStock: boolean;
  maxStock?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  proceedToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(i => i.productId === item.productId);
      
      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + (item.quantity || 1);
        const maxStock = item.maxStock || 999;
        
        if (newQuantity > maxStock) {
          toast({
            title: 'Cannot add more',
            description: `Only ${maxStock} items available in stock`,
            variant: 'destructive',
          });
          return prevItems;
        }

        toast({
          title: 'Cart updated',
          description: `${item.name} quantity updated`,
        });

        return prevItems.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: newQuantity }
            : i
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          id: `cart-${Date.now()}-${Math.random()}`,
          quantity: item.quantity || 1,
        };

        toast({
          title: 'Added to cart',
          description: `${item.name} has been added to your cart`,
        });

        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find(i => i.id === itemId);
      if (item) {
        toast({
          title: 'Removed from cart',
          description: `${item.name} has been removed from your cart`,
        });
      }
      return prevItems.filter(i => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const maxStock = item.maxStock || 999;
          if (quantity > maxStock) {
            toast({
              title: 'Stock limit reached',
              description: `Only ${maxStock} items available`,
              variant: 'destructive',
            });
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add some items to your cart before checking out',
        variant: 'destructive',
      });
      return;
    }

    // Check if user is authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to continue to checkout',
        variant: 'destructive',
      });
      router.push('/auth/login');
      return;
    }

    router.push('/checkout');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
