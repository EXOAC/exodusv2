export const productStatuses = ['undetected', 'detected', 'testing', 'updating', 'closed'] as const;
export type ProductStatus = typeof productStatuses[number]; // Автоматически создаёт тип на основе массива

export interface StatusConfig {
  icon: React.ComponentType;
  text: string;
  color: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

export interface ProductStatusEntry {
  id: string;
  name: string;
  status: ProductStatus;
  icon: string;
  last_updated: string;
  active_users: number;
  count_updated: string;
}


export interface BaseStatusItem {
  name: string;
  status: ProductStatus;
  icon: string;
  lastUpdated: string;
  activeUsers: number;
  countUpdated: string;
  href: string;
}

export interface StatusData {
  products: BaseStatusItem[];
}