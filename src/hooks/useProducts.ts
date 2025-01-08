import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Product } from '../types/product';
import toast from 'react-hot-toast';

export function useProducts() {
  const queryClient = useQueryClient();

  // Fetching products
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products');
      return data;
    },
    
  });

  // Creating a product
  const createProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create product: ${error.response?.data?.message || error.message}`);
    },
  });

  // Updating a product
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const { data: response } = await api.patch(`/admin/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update product: ${error.response?.data?.message || error.message}`);
    },
  });

  // Deleting a product
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete product: ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    products,
    isLoading,
    error,
    refetch,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
}
