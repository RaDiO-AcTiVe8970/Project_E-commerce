'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { cartApi, CartItem as ApiCartItem } from '@/lib/api/cart';
import { useAuth } from './useAuth';

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
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  proceedToCheckout: () => void;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to transform API cart item to UI cart item
function transformCartItem(apiItem: ApiCartItem): CartItem {
  return {
    id: apiItem.id,
    productId: apiItem.productId,
    name: apiItem.product.title,
    price: apiItem.product.price,
    quantity: apiItem.quantity,
    image: apiItem.product.images[0] || 'https://via.placeholder.com/400',
    shop: apiItem.product.shop.name,
    inStock: apiItem.product.inventory > 0,
    maxStock: apiItem.product.inventory,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Load cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated, user]);

  const refreshCart = async () => {
    try {
      setLoading(true);
      const cart = await cartApi.getCart();
      setItems(cart.items.map(transformCartItem));
    } catch (error: any) {
      console.error('Failed to load cart:', error);
      // If unauthorized, clear cart
      if (error.response?.status === 401) {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to add items to cart',
        variant: 'destructive',
      });
      router.push('/auth/login');
      return;
    }

    try {
      setLoading(true);
      await cartApi.addItem({
        productId: item.productId,
        quantity: item.quantity || 1,
      });
      
      await refreshCart();
      
      toast({
        title: 'Added to cart',
        description: `${item.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add item to cart',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const item = items.find(i => i.id === itemId);
      
      await cartApi.removeItem(itemId);
      await refreshCart();
      
      if (item) {
        toast({
          title: 'Removed from cart',
          description: `${item.name} has been removed from your cart`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to remove item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setLoading(true);
      await cartApi.updateQuantity(itemId, { quantity });
      await refreshCart();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update quantity',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartApi.clearCart();
      setItems([]);
      
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to clear cart',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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

    if (!isAuthenticated) {
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
        loading,
        refreshCart,
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

