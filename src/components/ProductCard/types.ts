import { LucideIcon } from 'lucide-react';

export type Status = 'undetected' | 'detected' | 'testing' | 'updating' | 'closed';

export interface StatusConfig {
  icon: LucideIcon;
  text: string;
  color: string;
  hoverColor: string;
}

export interface ProductCardProps {
  name: string;
  href: string;
  description: string;
  status: Status;
  image: string;
}