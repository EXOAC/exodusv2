import axios from 'axios';
import type { BaseStatusItem, ProductStatus } from '../../types/status';

/**
 * Получение всех статусов продуктов.
 */
export async function fetchStatuses(): Promise<BaseStatusItem[]> {
  try {
    const response = await axios.get('/api/status');
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format: Expected an array');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch statuses:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch statuses');
  }
}

/**
 * Получение списка продуктов со статусами.
 */
export async function getProductStatuses(): Promise<BaseStatusItem[]> {
  try {
    const response = await axios.get('/api/products');
    console.log('API Response:', response.data); // Лог данных для проверки
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format: Expected an array');
    }

    return response.data.map((product) => ({
      id: product.id,
      name: product.name,
      status: product.status,
      icon: product.icon,
      lastUpdated: product.last_updated,
      activeUsers: product.active_users,
      countUpdated: product.count_updated,
      href: product.href,
    }));
  } catch (error: any) {
    console.error('Failed to fetch product statuses:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch product statuses');
  }
}

/**
 * Получение истории статусов для продукта.
 * @param productId - ID продукта
 */
export async function getStatusHistory(productId: string): Promise<any[]> {
  try {
    const response = await axios.get(`/api/products/${productId}/history`);
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format: Expected an array');
    }
    return response.data.map((item) => ({
      id: item.id,
      status: item.status,
      message: item.message,
      timestamp: item.timestamp,
    }));
  } catch (error: any) {
    console.error(`Failed to fetch status history for product ID ${productId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to fetch status history');
  }
}

/**
 * Обновление статуса продукта.
 * @param productId - ID продукта
 * @param newStatus - Новый статус
 */
export async function updateProductStatus(
  productId: string,
  newStatus: ProductStatus
): Promise<BaseStatusItem> {
  try {
    const response = await axios.put(`/api/products/${productId}/status`, { status: newStatus });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update status for product ID ${productId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to update product status');
  }
}

/**
 * Создание нового статуса для продукта.
 * @param product - Объект продукта
 */
export async function createStatus(product: { name: string; status: ProductStatus; icon: string }): Promise<BaseStatusItem> {
  try {
    const response = await axios.post('/api/products', product);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create status:', error);
    throw new Error(error.response?.data?.message || 'Failed to create status');
  }
}

/**
 * Удаление статуса продукта.
 * @param productId - ID продукта
 */
export async function deleteProductStatus(productId: string): Promise<void> {
  try {
    await axios.delete(`/api/products/${productId}`);
  } catch (error: any) {
    console.error(`Failed to delete product status for ID ${productId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to delete product status');
  }
}
