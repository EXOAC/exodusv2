// Product Types
export type ProductStatus = 'undetected' | 'detected' | 'updating' | 'testing' | 'closed';

export const PRODUCT_STATUSES: ProductStatus[] = [
  'undetected',
  'detected',
  'updating',
  'testing',
  'closed'
];
export type Status = typeof PRODUCT_STATUSES[number];

export interface ProductCardProps {
  name: string;
  href: string;
  description: string;
  status: 'undetected' | 'detected' | 'testing' | 'updating' | 'closed';
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  categoryId: string;
  features: string[];
  requirements: string[];
  status: ProductStatus;
  pricing: Array<{
    period: string;
    price: number;
    buttonId: string;
  }>;
  images: string[];
  isActive: boolean;
  order: number;
  lastUpdated: Date;
  createdAt: Date;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon: 'Shield' | 'Target' | 'Crosshair' | 'Gamepad2';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}