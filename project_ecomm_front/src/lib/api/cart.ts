import apiClient from './client';

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    inventory: number;
    images: string[];
    isActive: boolean;
    shop: {
      id: string;
      name: string;
      logo: string | null;
      isVerified: boolean;
    };
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export const cartApi = {
  // Add item to cart
  addItem: async (data: AddToCartDto): Promise<CartItem> => {
    const response = await apiClient.post('/cart', data);
    return response.data;
  },

  // Get user's cart
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Update cart item quantity
  updateQuantity: async (itemId: string, data: UpdateCartItemDto): Promise<CartItem> => {
    const response = await apiClient.patch(`/cart/${itemId}`, data);
    return response.data;
  },

  // Remove item from cart
  removeItem: async (itemId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },
};
