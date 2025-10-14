
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

// --- Mock Data ---
const connectedServices = [
  {
    id: 'aiear',
    name: 'AiEar Integration',
    endpoint: 'https://api.aiear.com/v1/vsd-gateway',
    status: 'Operational',
    lastHeartbeat: '2 minutes ago',
    latency: '85ms',
    version: '1.2.1',
  },
  {
    id: 'promohub',
    name: 'PromoHub Gateway',
    endpoint: 'https://api.promohub.ai/vsd/hook',
    status: 'Operational',
    lastHeartbeat: '45 seconds ago',
    latency: '110ms',
    version: '2.0.0',
  },
  {
    id: 'indie-artist-portal',
    name: 'Indie Artist Portal',
    endpoint: 'https://portal.indiemusic.dev/api/payouts',
    status: 'Pending Handshake',
    lastHeartbeat: '3 hours ago',
    latency: 'N/A',
    version: '1.0.0-beta',
  },
  {
    id: 'creative-vault',
    name: 'Creative Vault Storage',
    endpoint: 'https://storage.creativevault.io/auth/vsd',
    status: 'Disconnected',
    lastHeartbeat: '1 day ago',
    latency: 'N/A',
    version: '0.9.5',
  },
  {
    id: 'vsd-staking-validator',
    name: 'Mainnet Staking Validator',
    endpoint: 'node-validator-1.vsd.network:8545',
    status: 'Operational',
    lastHeartbeat: '5 seconds ago',
    latency: '32ms',
    version: '3.1.4',
  },
];
// --- End Mock Data ---

const StatusIndicator = ({ status }: { status: string }) => {
  const baseClasses = "h-3 w-3 rounded-full mr-2 inline-block";
  if (status === 'Operational') {
    return <span className={`${baseClasses} bg-green-500 animate-pulse`}></span>;
  }
  if (status === 'Pending Handshake') {
    return <span className={`${baseClasses} bg-yellow-500`}></span>;
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
            Connected API Endpoints
          </CardTitle>
          <CardDescription>
            This table shows the real-time (simulated) connection status of all services authorized to interact with the VSD Bank API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Service / Project Name</TableHead>
                  <TableHead>Endpoint URL</TableHead>
                  <TableHead className="w-[180px]">Status</TableHead>
                  <TableHead className="w-[150px] text-center">Last Heartbeat</TableHead>
                  <TableHead className="w-[120px] text-center">Avg. Latency</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectedServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {service.name}
                      <Badge variant="secondary" className="ml-2">{service.version}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{service.endpoint}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <StatusIndicator status={service.status} />
                        <span className={
                          service.status === 'Operational' ? 'text-green-400' :
                          service.status === 'Pending Handshake' ? 'text-yellow-400' :
                          'text-red-400'
                        }>
                          {service.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{service.lastHeartbeat}</TableCell>
                    <TableCell className="text-center font-mono text-primary/80">{service.latency}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" disabled>
                        <View className="mr-2 h-4 w-4" />
                        Logs
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-green-400">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The service is connected and responding to API calls correctly.</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-yellow-400">
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The service is configured but has not yet successfully completed a handshake or heartbeat.</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-red-400">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              Disconnected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The service is failing health checks or is not reachable by the VSD Bank API.</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

