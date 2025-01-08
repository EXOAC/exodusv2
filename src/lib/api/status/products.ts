// src/lib/api/status/products.ts
import axios from 'axios';
export async function fetchProducts() {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
}

export async function getProduct(productId: string) {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
}

export async function createProduct(product: { name: string; status: string; icon: string; description?: string }) {
  try {
    const response = await axios.post('/api/products', product);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
}

export async function updateProduct(productId: string, updates: Partial<{ name: string; status: string; icon: string; description: string }>) {
  try {
    const response = await axios.put(`/api/products/${productId}`, updates);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
}

export async function deleteProduct(productId: string) {
  try {
    await axios.delete(`/api/products/${productId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
}
