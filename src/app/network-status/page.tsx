
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Signal, ServerCrash, Clock, View, Users } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Account } from '@/types/account';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Tenant {
    id: string;
    name: string;
    domain: string;
    status: 'Active' | 'Inactive';
    createdAt: string;
}

const StatusIndicator = ({ status }: { status: string }) => {
  const baseClasses = "h-3 w-3 rounded-full mr-2 inline-block";
  if (status === 'Active') {
    return <span className={`${baseClasses} bg-green-500 animate-pulse`}></span>;
  }
  return <span className={`${baseClasses} bg-red-500`}></span>;
};

const TopHoldersCard = () => {
    const firestore = useFirestore();
    
    // Create a query to get top 5 accounts by vsdBalance
    const topHoldersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
            collection(firestore, 'accounts'),
            orderBy('vsdBalance', 'desc'),
            limit(5)
        );
    }, [firestore]);

    const { data: topHolders, isLoading } = useCollection<Account>(topHoldersQuery);

    return (
        <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Top 5 VSD Holders
                </CardTitle>
                <CardDescription>
                    A real-time leaderboard of the top wallet balances in the network. This data is for informational purposes only.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead>Holder</TableHead>
                            <TableHead className="text-right">Balance (VSD)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-5 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-5 w-1/2 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : topHolders && topHolders.length > 0 ? (
                            topHolders.map((holder, index) => (
                                <TableRow key={holder.uid}>
                                    <TableCell className="font-bold text-lg text-primary">{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={holder.photoURL ?? undefined} alt={holder.displayName ?? 'User'} />
                                                <AvatarFallback>{holder.displayName?.charAt(0) ?? '?'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{holder.displayName}</div>
                                                <div className="text-xs text-muted-foreground font-mono truncate">{holder.walletAddress}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-lg">{holder.vsdBalance.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                    No holder data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


export default function NetworkStatusPage() {
  const firestore = useFirestore();
  const tenantsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'tenants') : null, [firestore]);
  const { data: tenants, isLoading: tenantsLoading } = useCollection<Tenant>(tenantsQuery);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <Signal className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Network Status</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Live operational status of the IMG Banking Hub and all integrated twin projects and services.
        </p>
      </header>

      <Separator />
      
      <TopHoldersCard />

      <Separator />

      <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wifi className="h-6 w-6" />
            Connected Tenants
          </CardTitle>
          <CardDescription>
            This table shows all registered services authorized to interact with the VSD Bank API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Tenant Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead className="w-[180px]">Status</TableHead>
                  <TableHead className="w-[150px] text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenantsLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-1/2 ml-auto" /></TableCell>
                        </TableRow>
                    ))
                ) : (
                tenants?.map((tenant) => (
                  <TableRow key={tenant.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {tenant.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{tenant.domain}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <StatusIndicator status={tenant.status} />
                        <span className={tenant.status === 'Active' ? 'text-green-400' : 'text-red-400'}>
                          {tenant.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                        {formatDistanceToNow(new Date(tenant.createdAt), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
