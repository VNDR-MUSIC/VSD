
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function NotificationsClient() {
    useProtectedRoute({ adminOnly: true });

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Notifications</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>Alerts for new API connections, token distribution milestones, and system errors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Notification center coming soon.</p>
                </CardContent>
            </Card>
        </>
    );
}
