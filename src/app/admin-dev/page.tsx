
import type { Metadata } from 'next';
import { AdminDashboardDev } from '@/app/admin-dev/AdminDashboardDev';

export const metadata: Metadata = {
  title: 'Admin Dashboard (Dev) | VSD Network',
  description: 'Development version of the admin dashboard.',
};

export default function AdminDashboardDevPage() {
  return <AdminDashboardDev />;
}
