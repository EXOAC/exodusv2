import { formatDistanceToNow } from 'date-fns';
import type { ProductStatusEntry, StatusHistoryEntry } from './types';
import type { ProductStatus } from '../../types/status';

const mockProducts: ProductStatusEntry[] = [
  {
    id: '1',
    name: 'HWID Spoofer',
    status: 'undetected',
    icon: 'https://imgur.com/mKEurLU.jpg',
    last_updated: new Date().toISOString(),
    lastUpdated: formatDistanceToNow(new Date(), { addSuffix: true }),
    active_users: 892,
    count_updated: new Date().toISOString(),
    countUpdated: formatDistanceToNow(new Date(), { addSuffix: true }),
    href: '/products/hwid'
  },
  {
    id: '2',
    name: 'Apex External',
    status: 'undetected',
    icon: 'https://imgur.com/UuZHXyo.jpg',
    last_updated: new Date().toISOString(),
    lastUpdated: formatDistanceToNow(new Date(), { addSuffix: true }),
    active_users: 78,
    count_updated: new Date().toISOString(),
    countUpdated: formatDistanceToNow(new Date(), { addSuffix: true }),
    href: '/products/apex'
  }
];

export function getMockProducts(): Promise<ProductStatusEntry[]> {
  return Promise.resolve(mockProducts);
}

export function updateMockStatus(productName: string, status: ProductStatus): Promise<void> {
  const product = mockProducts.find(p => p.name === productName);
  if (product) {
    product.status = status;
    product.last_updated = new Date().toISOString();
    product.lastUpdated = formatDistanceToNow(new Date(), { addSuffix: true });
  }
  return Promise.resolve();
}