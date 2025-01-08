// src/lib/api/auth/index.ts
import axios from 'axios';
export * from '../auth'; // Re-exporting all functions from auth.ts

export async function signIn(email: string, password: string) {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to sign in');
  }
}

export async function signOut() {
  try {
    await axios.post('/api/auth/logout');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to sign out');
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get('/api/auth/user');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get current user');
  }
}