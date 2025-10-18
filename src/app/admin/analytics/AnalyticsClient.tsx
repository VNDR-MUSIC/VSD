
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function AnalyticsClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Ecosystem Analytics</CardTitle>
                    <CardDescription>Visualize key metrics for token distribution, API usage, and user growth.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Analytics charts and graphs coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
