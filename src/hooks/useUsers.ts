import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export interface User {
  _id: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'banned';
  balance: number;
  createdAt: Date;
  lastLoginAt?: Date;
}

export function useUsers() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/admin/users');
      return data as User[];
    }
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, ...data }: Partial<User> & { id: string }) => {
      const { data: updatedData } = await api.patch(`/admin/users/${id}`, data);
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const banUser = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/admin/users/${id}/ban`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const unbanUser = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/admin/users/${id}/unban`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return {
    users,
    isLoading,
    updateUser,
    banUser,
    unbanUser
  };
}