import apiClient from './client';

export interface Shop {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  logo: string | null;
  commissionRate: number;
  stripeAccountId: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopDto {
  name: string;
  description?: string;
  logo?: string;
  category?: string;
  website?: string;
  phoneNumber?: string;
  businessAddress?: string;
}

export const shopsApi = {
  create: async (data: CreateShopDto): Promise<Shop> => {
    const response = await apiClient.post<Shop>('/shops', data);
    return response.data;
  },

  getById: async (id: string): Promise<Shop> => {
    const response = await apiClient.get<Shop>(`/shops/${id}`);
    return response.data;
  },

  getByUserId: async (userId: string): Promise<Shop> => {
    const response = await apiClient.get<Shop>(`/shops/user/${userId}`);
    return response.data;
  },

  verify: async (id: string): Promise<Shop> => {
    const response = await apiClient.patch<Shop>(`/shops/${id}/verify`);
    return response.data;
  },
};
