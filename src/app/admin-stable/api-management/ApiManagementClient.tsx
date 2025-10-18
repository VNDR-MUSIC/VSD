'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Copy, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { CreateTenantDialog } from './CreateTenantDialog';
import { useAdminProxy } from '@/firebase';
import type { Tenant } from '@/types/tenant';

const TenantRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
        <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
    </TableRow>
)

export function ApiManagementClient() {
    useProtectedRoute({ adminOnly: true });
    const { toast } = useToast();
    const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

    const { data: tenants, isLoading, error } = useAdminProxy<Tenant>('tenants');

    const handleCopy = (apiKey: string) => {
        navigator.clipboard.writeText(apiKey);
        setCopiedKey(apiKey);
        toast({ title: "API Key Copied!" });
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">API Management</h1>
                <CreateTenantDialog />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Connected Tenants</CardTitle>
                    <CardDescription>Manage API keys and access for integrated partner applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-destructive">Error: {error}</p>}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">API Key</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Created</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({length: 3}).map((_, i) => <TenantRowSkeleton key={i} />)
                            ) : tenants && tenants.length > 0 ? (
                                tenants.map((tenant) => (
                                <TableRow key={tenant.id}>
                                    <TableCell className="font-medium">{tenant.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs text-muted-foreground">{tenant.apiKey.substring(0, 12)}...</span>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(tenant.apiKey)}>
                                                {copiedKey === tenant.apiKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={tenant.status === 'Active' ? 'default' : 'secondary'}>{tenant.status}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">{formatDistanceToNow(new Date(tenant.createdAt), { addSuffix: true })}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleCopy(tenant.apiKey)}>Copy API Key</DropdownMenuItem>
                                                <DropdownMenuItem disabled>{tenant.status === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                                <DropdownMenuItem disabled className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No tenants found. Create one to get started.
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
