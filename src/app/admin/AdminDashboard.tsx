
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users2,
  DollarSign,
  ArrowRightLeft,
  Globe,
  Video,
  ExternalLink,
  FileText,
  ShieldCheck,
  ShieldOff,
  Clock,
  Map,
  ArrowRight,
  RefreshCw,
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useUser, useMemoFirebase, updateDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, query, where, arrayUnion, orderBy, getDocs, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { Account } from '@/types/account';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { format } from 'date-fns';


interface Transaction {
    id: string;
    type: string;
    user: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

interface Tenant {
    id: string;
    name: string;
    domain: string;
    apiKey: string;
    status: 'Active' | 'Inactive';
    createdAt: string;
}

interface Advertisement {
    id: string;
    title: string;
    type: 'video' | 'url';
    url: string;
    reward: number;
    status: 'Active' | 'Paused';
    createdAt: string;
    advertiserId: string;
    clicks: number;
}

interface AdvertiserApplication {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    companyName: string;
    website: string;
    businessDescription: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}

interface ApiLog {
    id: string;
    timestamp: string;
    status: 'Success' | 'Failure';
    tenantId?: string;
    tenantName?: string;
    endpoint: string;
    message: string;
}


const StatCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-2/4" />
      </CardHeader>
      <CardContent>
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
)

const TableRowSkeleton = ({ cells }: { cells: number }) => (
    <TableRow>
        {Array.from({ length: cells }).map((_, i) => (
            <TableCell key={i}>
                <Skeleton className="h-5 w-full" />
            </TableCell>
        ))}
    </TableRow>
)

export function AdminDashboard() {
  const { isLoading: isAuthLoading, isCheckingRoles, isAdmin } = useProtectedRoute({ adminOnly: true });
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [isUpdatingLeaderboard, setIsUpdatingLeaderboard] = React.useState(false);

  const tenantsQuery = useMemoFirebase(() => firestore && user ? collection(firestore, 'tenants') : null, [firestore, user]);
  const advertisementsQuery = useMemoFirebase(() => firestore && user ? collection(firestore, 'advertisements') : null, [firestore, user]);
  const applicationsQuery = useMemoFirebase(() => firestore && isAdmin ? query(collection(firestore, 'advertiserApplications'), where('status', '==', 'pending')) : null, [firestore, isAdmin]);
  
  // Admin-only queries, now dependent on `isAdmin` flag from the protected route hook
  const accountsQuery = useMemoFirebase(() => firestore && isAdmin ? collection(firestore, 'accounts') : null, [firestore, isAdmin]);
  const globalTransactionsQuery = useMemoFirebase(() => firestore && isAdmin ? query(collection(firestore, 'transactions'), orderBy('date', 'desc')) : null, [firestore, isAdmin]);
  const apiLogsQuery = useMemoFirebase(() => firestore && isAdmin ? query(collection(firestore, 'api_logs'), orderBy('timestamp', 'desc')) : null, [firestore, isAdmin]);
  
  const { data: tenants, isLoading: tenantsLoading } = useCollection<Tenant>(tenantsQuery);
  const { data: transactions, isLoading: transactionsLoading } = useCollection<Transaction>(globalTransactionsQuery);
  const { data: users, isLoading: usersLoading } = useCollection<Account>(accountsQuery);
  const { data: advertisements, isLoading: advertisementsLoading } = useCollection<Advertisement>(advertisementsQuery);
  const { data: applications, isLoading: applicationsLoading } = useCollection<AdvertiserApplication>(applicationsQuery);
  const { data: apiLogs, isLoading: apiLogsLoading } = useCollection<ApiLog>(apiLogsQuery);

  const totalVsdInCirculation = users?.reduce((acc, user) => acc + user.vsdBalance, 0) || 0;

  const handleApplicationAction = (applicationId: string, userId: string, action: 'approve' | 'reject') => {
    if (!firestore) return;

    const appRef = doc(firestore, 'advertiserApplications', applicationId);
    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    updateDocumentNonBlocking(appRef, { status: newStatus });

    if (action === 'approve') {
      const userAccountRef = doc(firestore, 'accounts', userId);
      updateDocumentNonBlocking(userAccountRef, {
        roles: arrayUnion('advertiser')
      });
    }

    toast({
      title: `Application ${newStatus}`,
      description: `The application has been successfully ${newStatus}.`,
    });
  };

  const handleUpdateLeaderboard = async () => {
    if (!firestore || !isAdmin) return;

    setIsUpdatingLeaderboard(true);
    toast({ title: 'Updating Leaderboard...', description: 'Fetching top holders and writing to the leaderboard document.' });

    try {
        const topHoldersQuery = query(
            collection(firestore, 'accounts'),
            orderBy('vsdBalance', 'desc'),
            limit(5)
        );

        const snapshot = await getDocs(topHoldersQuery);
        const topHolders = snapshot.docs.map(d => d.data() as Account);

        const leaderboardRef = doc(firestore, 'leaderboards', 'topHolders');
        await setDocumentNonBlocking(leaderboardRef, {
            topHolders: topHolders,
            updatedAt: new Date().toISOString()
        });

        toast({ title: 'Leaderboard Updated', description: 'The public leaderboard has been successfully updated.' });
    } catch (error: any) {
        console.error("Failed to update leaderboard:", error);
        toast({ variant: 'destructive', title: 'Leaderboard Update Failed', description: error.message });
    } finally {
        setIsUpdatingLeaderboard(false);
    }
  };


  if (isAuthLoading || !user || isCheckingRoles) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                 <h1 className="font-headline text-2xl font-semibold">Admin Dashboard</h1>
                 <p className="text-muted-foreground">An overview of the VSD network.</p>
              </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {(usersLoading) ? <StatCardSkeleton /> : (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">VSD in Circulation</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalVsdInCirculation.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total VSD held by users</p>
                    </CardContent>
                </Card>
              )}
               {(usersLoading) ? <StatCardSkeleton /> : (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{users?.length || 0}</div>
                         <p className="text-xs text-muted-foreground">Total registered accounts</p>
                    </CardContent>
                </Card>
               )}
                {transactionsLoading ? <StatCardSkeleton /> : (
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{transactions?.length || 0}</div>
                         <p className="text-xs text-muted-foreground">All-time transaction count</p>
                    </CardContent>
                </Card>
                )}
                 {tenantsLoading ? <StatCardSkeleton /> : (
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Integrated Tenants</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tenants?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">Live partner integrations</p>
                    </CardContent>
                </Card>
                 )}
            </div>

            <Tabs defaultValue="users">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="tenants">Tenants</TabsTrigger>
                        <TabsTrigger value="advertisements">Advertisements</TabsTrigger>
                        <TabsTrigger value="applications">Advertiser Applications <Badge className="ml-2">{applications?.length || 0}</Badge></TabsTrigger>
                        <TabsTrigger value="api_logs">API Access Log</TabsTrigger>
                        <TabsTrigger value="transactions">Global Activity</TabsTrigger>
                         <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={handleUpdateLeaderboard}
                          disabled={isUpdatingLeaderboard}
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${isUpdatingLeaderboard ? 'animate-spin' : ''}`} />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {isUpdatingLeaderboard ? 'Updating...' : 'Update Leaderboard'}
                          </span>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="h-8 gap-1">
                          <Link href="/admin/integration-prompt">
                            <FileText className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Get Integration Prompt
                            </span>
                          </Link>
                        </Button>
                       <AddAdvertisementDialog />
                       <AddTenantDialog />
                    </div>
                </div>
                 <TabsContent value="roadmap">
                    <Card>
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Roadmap Management</CardTitle>
                        <CardDescription>
                            Drag and drop tasks to manage your project goals. This board is ready to be connected to your project management tool.
                            <Button variant="link" asChild><Link href="/admin/roadmap">Go to Full Roadmap Page <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">The roadmap management interface is available on the <Link href="/admin/roadmap" className="text-primary hover:underline">dedicated roadmap page</Link>.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>Users</CardTitle>
                      <CardDescription>
                        Manage all users and their balances in the VSD ecosystem.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Wallet Address
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date Joined
                            </TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usersLoading ? (
                             Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cells={6} />)
                          ) : (
                            users?.map((userAccount) => (
                            <TableRow key={userAccount.uid}>
                              <TableCell>
                                <div className="font-medium">{userAccount.displayName}
                                    {userAccount.roles?.includes('admin') && <Badge variant="destructive" className="ml-2">Admin</Badge>}
                                    {userAccount.roles?.includes('advertiser') && <Badge variant="secondary" className="ml-2">Advertiser</Badge>}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {userAccount.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-mono">
                                {userAccount.walletAddress}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant={userAccount.status === 'Active' ? 'default' : 'destructive'}>
                                  {userAccount.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(userAccount.joined).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">{userAccount.vsdBalance.toLocaleString()} VSD</TableCell>
                              <TableCell className="text-right">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Adjust Balance</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tenants">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tenants</CardTitle>
                      <CardDescription>
                        Manage all integrated websites and their API keys.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tenant Name</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                             <TableHead><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tenantsLoading ? (
                             Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} cells={5} />)
                          ) : (
                            tenants?.map((tenant) => (
                            <TableRow key={tenant.id}>
                              <TableCell className="font-medium">{tenant.name}</TableCell>
                              <TableCell>
                                <a href={`https://${tenant.domain}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {tenant.domain}
                                </a>
                               </TableCell>
                              <TableCell>
                                <Badge variant={tenant.status === 'Active' ? 'default' : 'secondary'}>
                                  {tenant.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{new Date(tenant.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Rotate API Key</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">Revoke Access</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="advertisements">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advertisements</CardTitle>
                            <CardDescription>
                                Manage "earn" campaigns for users. Add videos or URLs for users to interact with for VSD Lite rewards.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Reward</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden md:table-cell">Clicks</TableHead>
                                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {advertisementsLoading ? (
                                        Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} cells={7} />)
                                    ) : (
                                        advertisements?.map((ad) => (
                                            <TableRow key={ad.id}>
                                                <TableCell className="font-medium">{ad.title}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="gap-1">
                                                        {ad.type === 'video' ? <Video className="h-3 w-3"/> : <ExternalLink className="h-3 w-3"/>}
                                                        {ad.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-bold text-yellow-400">{ad.reward.toLocaleString()} VSD Lite</TableCell>
                                                <TableCell>
                                                    <Badge variant={ad.status === 'Active' ? 'default' : 'secondary'}>
                                                        {ad.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{(ad.clicks || 0).toLocaleString()}</TableCell>
                                                <TableCell className="hidden md:table-cell">{new Date(ad.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>{ad.status === 'Active' ? 'Pause' : 'Activate'}</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="applications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advertiser Applications</CardTitle>
                            <CardDescription>
                                Review and approve pending applications from potential advertisers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="hidden md:table-cell">Submitted At</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applicationsLoading ? (
                                        Array.from({ length: 2 }).map((_, i) => <TableRowSkeleton key={i} cells={5} />)
                                    ) : applications && applications.length > 0 ? (
                                        applications.map((app) => (
                                            <TableRow key={app.id}>
                                                <TableCell>
                                                    <div className="font-medium">{app.companyName}</div>
                                                    <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline">{app.website}</a>
                                                </TableCell>
                                                <TableCell>
                                                     <div className="font-medium">{app.userName}</div>
                                                     <div className="text-xs text-muted-foreground">{app.userEmail}</div>
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                                    {app.businessDescription}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => handleApplicationAction(app.id, app.userId, 'approve')}>
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive" onClick={() => handleApplicationAction(app.id, app.userId, 'reject')}>
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">No pending applications.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="api_logs">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Access Log</CardTitle>
                            <CardDescription>
                                A real-time log of all incoming requests to the VSD Network API endpoints.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tenant</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead className="text-right">Timestamp</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiLogsLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cells={4} />)
                                    ) : apiLogs && apiLogs.length > 0 ? (
                                        apiLogs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell>
                                                    <Badge variant={log.status === 'Success' ? 'default' : 'destructive'} className="gap-1">
                                                        {log.status === 'Success' ? <ShieldCheck className="h-3 w-3" /> : <ShieldOff className="h-3 w-3" />}
                                                        {log.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-medium">{log.tenantName || 'Unknown'}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{log.message}</TableCell>
                                                <TableCell className="text-right text-xs text-muted-foreground">
                                                    {format(new Date(log.timestamp), 'PPpp')}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">No API logs found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="transactions">
                    <Card>
                        <CardHeader>
                          <CardTitle>Recent Global Activity</CardTitle>
                           <CardDescription>
                            An audit log of the most recent ledger activities across the network.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>User</TableHead>
                                      <TableHead>Type</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Date</TableHead>
                                      <TableHead className="text-right">Amount</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {transactionsLoading ? (
                                     Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cells={5} />)
                                  ) : (
                                    transactions?.map(tx => (
                                       <TableRow key={tx.id}>
                                        <TableCell>
                                            <div className="font-medium">{tx.user}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{tx.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                             <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'}>{tx.status}</Badge>
                                        </TableCell>
                                        <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{tx.amount.toLocaleString()} VSD</TableCell>
                                    </TableRow>
                                  )))}
                              </TableBody>
                          </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
  );
}

function AddAdvertisementDialog() {
    const { toast } = useToast();
    const { user } = useUser();
    const [isOpen, setIsOpen] = React.useState(false);
    const firestore = useFirestore();
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      if (!user) {
        toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to create a campaign.' });
        return;
      }

      const formData = new FormData(event.currentTarget);
      const title = formData.get('title') as string;
      const type = formData.get('type') as 'video' | 'url';
      const url = formData.get('url') as string;
      const reward = Number(formData.get('reward'));
      const advertiserId = formData.get('advertiserId') as string;
      
      if (!title || !type || !url || !reward || reward <= 0 || !advertiserId) {
        toast({ variant: 'destructive', title: 'Missing fields', description: 'Please fill out all fields with valid values.' });
        return;
      }
      
      const adId = title.toLowerCase().replace(/\s+/g, '-').slice(0, 20) + `-${Date.now()}`;
      const newAdvertisement: Omit<Advertisement, 'id'> = {
        advertiserId,
        title,
        type,
        url,
        reward,
        clicks: 0,
        status: "Active",
        createdAt: new Date().toISOString(),
      };
  
      if (!firestore) {
          toast({ variant: 'destructive', title: 'Firestore not available', description: 'Cannot create advertisement.' });
          return;
      }
  
      const docRef = doc(firestore, 'advertisements', adId);
  
      setDocumentNonBlocking(docRef, newAdvertisement, { merge: true });
  
      toast({
        title: "Advertisement Campaign Created",
        description: `Campaign "${title}" is now active. The budget has been debited from the advertiser's account (simulation).`,
      });
      setIsOpen(false);
      (event.target as HTMLFormElement).reset();
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Ad
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Advertisement</DialogTitle>
              <DialogDescription>
                Create a new campaign on behalf of an advertiser. The reward budget will be debited from their account balance.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" placeholder="e.g., Watch Our New Trailer" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="advertiserId" className="text-right">
                  Advertiser ID
                </Label>
                <Input id="advertiserId" name="advertiserId" placeholder="User UID of the advertiser" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Type</Label>
                 <RadioGroup defaultValue="video" name="type" className="col-span-3 flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="r-video" />
                        <Label htmlFor="r-video">Video</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="url" id="r-url" />
                        <Label htmlFor="r-url">URL</Label>
                    </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input id="url" name="url" placeholder="https://youtube.com/watch?v=..." className="col-span-3" required type="url" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reward" className="text-right">
                  Reward
                </Label>
                <Input id="reward" name="reward" placeholder="e.g., 50" type="number" min="1" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Campaign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}

function AddTenantDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const firestore = useFirestore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const domain = formData.get('domain') as string;
    
    if (!name || !domain) {
      toast({ variant: 'destructive', title: 'Missing fields', description: 'Please fill out all fields.' });
      return;
    }
    
    const tenantId = name.toLowerCase().replace(/\s+/g, '-');
    const newTenant: Omit<Tenant, 'id'> = {
      name,
      domain,
      status: "Active",
      apiKey: `vsd_key_${crypto.randomUUID()}`, // In production, generate this securely on the backend
      createdAt: new Date().toISOString(),
    };

    if (!firestore) {
        toast({ variant: 'destructive', title: 'Firestore not available', description: 'Cannot create tenant.' });
        return;
    }

    const docRef = doc(firestore, 'tenants', tenantId);

    setDocumentNonBlocking(docRef, newTenant, { merge: true });

    toast({
      title: "Tenant Creation Initiated",
      description: `Tenant "${name}" is being created.`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Tenant
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Register a new website or service to integrate with the VSD Network. An API key will be generated upon creation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Audio Exchange"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain" className="text-right">
                Domain
              </Label>
              <Input
                id="domain"
                name="domain"
                placeholder="e.g., audex.vsd.network"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Tenant & Generate Key</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
