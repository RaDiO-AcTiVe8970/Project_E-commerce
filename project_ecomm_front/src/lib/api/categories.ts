import apiClient from './client';

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${slug}`);
    return response.data;
  },
};
