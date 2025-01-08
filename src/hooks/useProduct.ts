import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { Product } from '../types/product';

export function useProduct(productId: string | undefined) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) return null;
      const { data } = await api.get<Product>(`/products/${productId}`);
      return data;
    },
    enabled: !!productId
  });

  return {
    product,
    isLoading
  };
}