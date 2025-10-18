'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function ActivityLogsClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Activity Logs</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>System & API Activity</CardTitle>
                    <CardDescription>Search and filter logs for API usage, token transactions, and other system events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Activity log interface coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
