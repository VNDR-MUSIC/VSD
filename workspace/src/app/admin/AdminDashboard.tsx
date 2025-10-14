
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users2,
  DollarSign,
  ArrowRightLeft,
  Home,
  Users,
  Wallet,
  KeyRound,
  Gift,
  Globe,
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
import { Logo } from '@/components/icons/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import type { WithId } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


interface Account {
  uid: string;
  displayName: string;
  email: string;
  walletAddress: string;
  vsdBalance: number;
  status: 'Active' | 'Suspended';
  joined: string;
  isAdmin?: boolean;
}

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
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  // Public collections - can be fetched by anyone
  const tenantsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'tenants'): null, [firestore]);
  const globalTransactionsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'transactions'): null, [firestore]);

  // Private collection - only fetch if user is logged in
  const accountsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'accounts') : null, [firestore, user]);
  
  const { data: tenants, isLoading: tenantsLoading } = useCollection<Tenant>(tenantsQuery);
  const { data: transactions, isLoading: transactionsLoading } = useCollection<Transaction>(globalTransactionsQuery);
  
  // Pass the conditional query to useCollection
  const { data: users, isLoading: usersLoading } = useCollection<Account>(accountsQuery);

  const totalVsdInCirculation = users?.reduce((acc, user) => acc + user.vsdBalance, 0) || 0;

  const areUsersReady = !isUserLoading && !usersLoading;

  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminHeader />
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
              {(isUserLoading || usersLoading) ? <StatCardSkeleton /> : (
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
               {(isUserLoading || usersLoading) ? <StatCardSkeleton /> : (
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
                        <TabsTrigger value="transactions">Global Activity</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                       <AddTenantDialog />
                    </div>
                </div>
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>Users</CardTitle>
                      <CardDescription>
                        Manage all users and their balances in the VSD ecosystem. Requires authentication.
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
                          {isUserLoading ? (
                            Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cells={6} />)
                          ) : !user ? (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                                    Please log in to view user data.
                                </TableCell>
                            </TableRow>
                          ) : usersLoading ? (
                             Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cells={6} />)
                          ) : (
                            users?.map((userAccount) => (
                            <TableRow key={userAccount.uid}>
                              <TableCell>
                                <div className="font-medium">{userAccount.displayName}</div>
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
      </div>
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


function AdminHeader() {
    const { user, isUserLoading } = useUser();
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: Home },
    ];

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <Logo size={32} />
                    <span className="font-bold hidden sm:inline-block">VSD Admin</span>
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
                                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'Admin'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
                                    </Avatar>
                               ) : (
                                 <Avatar className="h-8 w-8">
                                     <AvatarFallback>A</AvatarFallback>
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
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
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
