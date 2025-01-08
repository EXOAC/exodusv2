import { Shield, Target, Crosshair, Gamepad2 } from 'lucide-react';

export const CATEGORY_ICONS = {
  Shield,
  Target,
  Crosshair,
  Gamepad2
} as const;

export type CategoryIcon = keyof typeof CATEGORY_ICONS;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon: CategoryIcon;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}