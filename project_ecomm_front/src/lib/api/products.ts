import apiClient from './client';

export interface Product {
  id: string;
  shopId: string;
  title: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  reviews?: any[];
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  categorySlug?: string;
  shopId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  images?: string[];
  isActive?: boolean;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface SellerAnalytics {
  shop: {
    id: string;
    name: string;
    isVerified: boolean;
  };
  stats: {
    totalProducts: number;
    activeProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockCount: number;
    totalReviews: number;
  };
}

export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    if (filters?.categorySlug) params.append('categorySlug', filters.categorySlug);
    if (filters?.shopId) params.append('shopId', filters.shopId);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<ProductsResponse>(`/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  getMyProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/my-products');
    return response.data;
  },

  getAnalytics: async (): Promise<SellerAnalytics> => {
    const response = await apiClient.get<SellerAnalytics>('/products/analytics');
    return response.data;
  },

  create: async (data: CreateProductDto): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },

  update: async (id: string, data: UpdateProductDto): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
