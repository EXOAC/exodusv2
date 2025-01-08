export type ProductStatus = 'undetected' | 'detected' | 'updating' | 'testing' | 'closed';

// Export as value, not type
export const PRODUCT_STATUSES = [
  'undetected',
  'detected',
  'updating',
  'testing',
  'closed'
] as const;

export interface ProductPricing {
  period: '2h' | 'day' | 'week' | 'month';
  price: number;
  buttonId: string;
  digisellerUrl?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  categoryId: string;
  features: string[];
  requirements: string[];
  status: ProductStatus;
  pricing: ProductPricing[];
  images: string[];
  isActive: boolean;
  order: number;
  lastUpdated: Date;
  createdAt: Date;
  link: string;
}