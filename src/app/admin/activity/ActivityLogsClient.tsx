'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ApiLog {
    id: string;
    timestamp: string;
    status: 'Success' | 'Failure';
    tenantId?: string;
    tenantName?: string;
    endpoint: string;
    message: string;
}

const LogRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
        <TableCell className="text-right hidden sm:table-cell"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
    </TableRow>
);

export function ActivityLogsClient() {
    useProtectedRoute({ adminOnly: true });
    const firestore = useFirestore();
    const [searchQuery, setSearchQuery] = React.useState('');

    const logsQuery = useMemoFirebase(
        () => firestore ? query(collection(firestore, 'api_logs'), orderBy('timestamp', 'desc')) : null,
        [firestore]
    );
    const { data: logs, isLoading } = useCollection<ApiLog>(logsQuery);

    const filteredLogs = React.useMemo(() => {
        if (!logs) return [];
        if (!searchQuery) return logs;
        
        const lowercasedQuery = searchQuery.toLowerCase();
        return logs.filter(log =>
            log.tenantName?.toLowerCase().includes(lowercasedQuery) ||
            log.endpoint.toLowerCase().includes(lowercasedQuery) ||
            log.message.toLowerCase().includes(lowercasedQuery) ||
            log.status.toLowerCase().includes(lowercasedQuery)
        );
    }, [logs, searchQuery]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Activity Logs</h1>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search logs..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>System & API Activity</CardTitle>
                    <CardDescription>A real-time log of all incoming requests to protected VSD Network API endpoints.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tenant</TableHead>
                                <TableHead>Endpoint</TableHead>
                                <TableHead className="hidden md:table-cell">Message</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right hidden sm:table-cell">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => <LogRowSkeleton key={i} />)
                            ) : filteredLogs && filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium">{log.tenantName || 'N/A'}</TableCell>
                                        <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{log.message}</TableCell>
                                        <TableCell>
                                            <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>{log.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right hidden sm:table-cell text-muted-foreground text-xs">
                                            {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No logs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
