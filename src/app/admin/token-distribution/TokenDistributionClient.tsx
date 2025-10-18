
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function TokenDistributionClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Token Distribution</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>VSD & VSD Lite Distribution</CardTitle>
                    <CardDescription>Oversee token rewards, automated rules, and distribution analytics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Token distribution management interface coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
