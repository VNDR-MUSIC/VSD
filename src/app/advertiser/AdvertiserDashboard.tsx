
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Home,
  BarChart2,
  Eye,
  HandCoins,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { Account } from '@/types/account';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Advertisement {
    id: string;
    title: string;
    type: 'video' | 'url';
    url: string;
    reward: number;
    status: 'Active' | 'Paused';
    createdAt: string;
    clicks: number;
}

const TableRowSkeleton = ({ cells }: { cells: number }) => (
    <TableRow>
        {Array.from({ length: cells }).map((_, i) => (
            <TableCell key={i}>
                <Skeleton className="h-5 w-full" />
            </TableCell>
        ))}
    </TableRow>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-background/80 border border-border rounded-lg shadow-lg">
                <p className="label font-bold">{`${label}`}</p>
                <p className="intro text-primary">{`Clicks: ${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};


export function AdvertiserDashboard() {
  useProtectedRoute({ advertiserOnly: true });
  const firestore = useFirestore();
  const { user } = useUser();

  const advertisementsQuery = useMemoFirebase(
    () => user && firestore ? query(collection(firestore, 'advertisements'), where('advertiserId', '==', user.uid)) : null,
    [firestore, user]
  );
  
  const { data: advertisements, isLoading: advertisementsLoading } = useCollection<Advertisement>(advertisementsQuery);

  const totalClicks = advertisements?.reduce((acc, ad) => acc + (ad.clicks || 0), 0) || 0;
  const totalRewardPaid = advertisements?.reduce((acc, ad) => acc + (ad.clicks || 0) * ad.reward, 0) || 0;

  const chartData = React.useMemo(() => {
    if (!advertisements) return [];
    return advertisements.map(ad => ({
        name: ad.title.slice(0, 15) + (ad.title.length > 15 ? '...' : ''),
        clicks: ad.clicks || 0
    })).sort((a,b) => b.clicks - a.clicks);
  }, [advertisements]);

  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdvertiserHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                 <h1 className="font-headline text-2xl font-semibold">Advertiser Dashboard</h1>
                 <p className="text-muted-foreground">An overview of your campaign performance.</p>
              </div>
               <Button size="sm" className="h-8 gap-1" disabled>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Campaign (soon)
                    </span>
                </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks / Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {advertisementsLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>}
                        <p className="text-xs text-muted-foreground">Total interactions across all campaigns</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rewards Paid</CardTitle>
                        <HandCoins className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {advertisementsLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{totalRewardPaid.toLocaleString()} <span className="text-base text-yellow-400">VSD Lite</span></div>}
                        <p className="text-xs text-muted-foreground">Total VSD Lite distributed to users</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {advertisementsLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{advertisements?.filter(ad => ad.status === 'Active').length || 0}</div>}
                        <p className="text-xs text-muted-foreground">Currently running ad campaigns</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Campaigns</CardTitle>
                        <CardDescription>
                            Your list of active and paused advertisement campaigns.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campaign</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Clicks</TableHead>
                                    <TableHead className="text-right">Reward</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {advertisementsLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} cells={5} />)
                                ) : advertisements && advertisements.length > 0 ? (
                                    advertisements.map((ad) => (
                                        <TableRow key={ad.id}>
                                            <TableCell className="font-medium">{ad.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={ad.status === 'Active' ? 'default' : 'secondary'}>
                                                    {ad.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-bold">{(ad.clicks || 0).toLocaleString()}</TableCell>
                                            <TableCell className="text-right text-yellow-400">{ad.reward.toLocaleString()} Lite</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem disabled>View Analytics</DropdownMenuItem>
                                                        <DropdownMenuItem disabled>{ad.status === 'Active' ? 'Pause' : 'Activate'}</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive" disabled>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">No campaigns found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Clicks per Campaign</CardTitle>
                        <CardDescription>A summary of user interactions with your campaigns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {advertisementsLoading ? <Skeleton className="h-[250px] w-full" /> : chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} interval={0} />
                                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', radius: 'var(--radius)' }} />
                                <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4, fill: "hsl(var(--primary))"}} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        ) : (
                             <div className="flex items-center justify-center h-[250px]">
                                <p className="text-muted-foreground">No click data available.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

        </main>
      </div>
  );
}

function AdvertiserHeader() {
    const { user, isUserLoading } = useUser();
    const pathname = usePathname();

    const navItems = [
        { href: "/advertiser", label: "Dashboard", icon: Home },
    ];

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <Logo size={32} />
                    <span className="font-bold hidden sm:inline-block">Advertiser Portal</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
                    <ul className="flex items-center space-x-4 lg:space-x-6">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link 
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="ml-auto flex items-center gap-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                               {isUserLoading ? (
                                <Skeleton className="h-8 w-8 rounded-full" />
                               ) : user ? (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
                                    </Avatar>
                               ) : (
                                 <Avatar className="h-8 w-8">
                                     <AvatarFallback>U</AvatarFallback>
                                 </Avatar>
                               )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                           {user ? (
                            <>
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild><Link href="/dashboard">User Dashboard</Link></DropdownMenuItem>
                                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </>
                           ) : (
                             <DropdownMenuItem asChild>
                                <Link href="/login">Login</Link>
                             </DropdownMenuItem>
                           )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
