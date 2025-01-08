import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Category } from '../types/category';
import toast from 'react-hot-toast';

export function useCategories() {
  const queryClient = useQueryClient();

  // Fetch categories - using public endpoint
  const { 
    data: categories, 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data } = await api.get<Category[]>('/categories');
        return data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    }
  });

  // Admin mutations
  const createCategory = useMutation({
    mutationFn: async (newCategory: Partial<Category>) => {
      const { data } = await api.post('/admin/categories', newCategory);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    }
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Category> & { id: string }) => {
      const { data: updatedData } = await api.patch(`/admin/categories/${id}`, data);
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    }
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    }
  });

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  };
}