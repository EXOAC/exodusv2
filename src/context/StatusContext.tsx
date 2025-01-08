// src/context/StatusContext.tsx
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProductStatus } from '../types/status';
import { getProductStatuses, updateProductStatus } from '../lib/api/status';
import type { ProductStatusEntry } from '../lib/api/status/types';

interface StatusContextType {
  products: ProductStatusEntry[];
  updateProductStatus: (productName: string, newStatus: ProductStatus) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProductStatuses,
    retry: 1
  });

  const mutation = useMutation({
    mutationFn: ({ productName, status }: { productName: string; status: ProductStatus }) =>
      updateProductStatus(productName, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const handleStatusUpdate = async (productName: string, newStatus: ProductStatus) => {
    await mutation.mutateAsync({ productName, status: newStatus });
  };

  return (
    <StatusContext.Provider value={{
      products,
      updateProductStatus: handleStatusUpdate,
      isLoading,
      error: error as Error | null
    }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within StatusProvider');
  }
  return context;
}