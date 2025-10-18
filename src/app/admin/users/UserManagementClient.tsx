'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function UserManagementClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">User Management</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Network Users</CardTitle>
                    <CardDescription>View, search, and manage user accounts and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>User management interface coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
