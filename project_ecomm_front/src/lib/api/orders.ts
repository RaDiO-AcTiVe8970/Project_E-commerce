import apiClient from './client';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  commission: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  commission: number;
  createdAt: string;
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
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

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface CreateOrderDto {
  subtotal: number;
  commission: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface UserStats {
  orders: number;
  spent: number;
  wishlist: number;
  reviews: number;
}

export const ordersApi = {
  // Create a new order
  create: async (data: CreateOrderDto): Promise<Order> => {
    const response = await apiClient.post('/orders', data);
    return response.data;
  },

  // Get current user's orders
  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get('/orders/my-orders');
    return response.data;
  },

  // Get user statistics
  getStats: async (): Promise<UserStats> => {
    const response = await apiClient.get('/orders/stats');
    return response.data;
  },

  // Get order by ID
  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status
  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};
