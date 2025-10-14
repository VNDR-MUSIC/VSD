
import type { Metadata } from 'next';
import { AdminDashboard } from '@/app/admin/AdminDashboard';

// This is now a Server Component responsible for metadata.
export const metadata: Metadata = {
  title: 'Admin Dashboard | VSD Network',
  description: 'Manage users, tenants, and view global network activity for the VSD ecosystem.',
};

export default function AdminDashboardPage() {
  // It renders the Client Component which contains all the interactive logic.
  return <AdminDashboard />;
}
