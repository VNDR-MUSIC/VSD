'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function ApiManagementClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">API Management</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Connected Tenants</CardTitle>
                    <CardDescription>Manage API keys and access for integrated partner applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>API management interface coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
