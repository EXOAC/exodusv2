import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export interface Order {
  _id: string;
  userId: string;
  productId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  period: '2h' | 'day' | 'week' | 'month';
  paymentMethod: 'card' | 'crypto' | 'paypal';
  transactionId?: string;
  expiresAt: Date;
  createdAt: Date;
}

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders/my');
      return data as Order[];
    }
  });

  const createOrder = useMutation({
    mutationFn: async (newOrder: Omit<Order, '_id' | 'userId' | 'createdAt' | 'expiresAt'>) => {
      const { data } = await api.post('/orders', newOrder);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  return {
    orders,
    isLoading,
    createOrder
  };
}