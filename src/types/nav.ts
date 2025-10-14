
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label?: string;
  description?: string;
  subItems?: Omit<NavItem, 'subItems'>[]; // Allow for one level of nesting
};
