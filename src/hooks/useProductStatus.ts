import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { ProductStatus } from '../types/product';

interface StatusUpdate {
  productId: string;
  status: ProductStatus;
}

export function useProductStatus() {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async ({ productId, status }: StatusUpdate) => {
      const { data } = await api.patch(`/products/${productId}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  return {
    updateStatus
  };
}