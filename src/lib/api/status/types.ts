import type { ProductStatus } from '../../../types/status';

export interface StatusHistoryEntry {
  id: string;
  product_id: string;
  old_status: ProductStatus;
  new_status: ProductStatus;
  changed_at: string;
  changedAt?: string;
}

export interface ProductStatusEntry {
  id: string;
  name: string;
  status: ProductStatus;
  icon: string;
  last_updated: string;
  lastUpdated: string;
  active_users: number;
  count_updated: string;
  countUpdated: string;
  href: string;
}