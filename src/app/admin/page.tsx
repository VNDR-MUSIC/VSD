
import type { Metadata } from 'next';
import { AdminDashboard } from '@/app/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | VSD Network',
  description: 'Manage users, tenants, and view global network activity for the VSD ecosystem.',
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
