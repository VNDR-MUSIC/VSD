
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


// Mock Data
const users = [
  {
    id: 'usr_1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    wallet: '0x123...abc',
    vsdBalance: 150000,
    status: 'Active',
    joined: '2024-05-01',
  },
  {
    id: 'usr_2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    wallet: '0x456...def',
    vsdBalance: 75000,
    status: 'Active',
    joined: '2024-05-02',
  },
  {
    id: 'usr_3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    wallet: '0x789...ghi',
    vsdBalance: 10000,
    status: 'Suspended',
    joined: '2024-05-03',
  },
  {
    id: 'usr_4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    wallet: '0xabc...123',
    vsdBalance: 500000,
    status: 'Active',
    joined: '2024-05-04',
  },
];

const transactions = [
    { id: 'txn_1', type: 'Mint (Stripe)', user: 'Alice Johnson', amount: 1000, date: '2 hours ago', status: 'Completed' },
    { id: 'txn_2', type: 'Transfer', user: 'Bob Williams', amount: 500, date: '5 hours ago', status: 'Completed' },
    { id: 'txn_3', type: 'Burn (Refund)', user: 'Charlie Brown', amount: 200, date: '1 day ago', status: 'Completed' },
    { id: 'txn_4', type: 'API Spend', user: 'Diana Prince', amount: 75, date: '2 days ago', status: 'Completed' },
];

const tenants = [
    { id: 'ten_1', name: 'Audio Exchange (AUDEX)', domain: 'audex.vsd.network', apiKey: 'vsd_key_...xyz', status: 'Active', createdAt: '2024-04-15' },
    { id: 'ten_2', name: 'Indie Videos TV (IVTV)', domain: 'ivtv.vsd.network', apiKey: 'vsd_key_...abc', status: 'Active', createdAt: '2024-04-20' },
    { id: 'ten_3', name: 'MIU', domain: 'miu.vsd.network', apiKey: 'vsd_key_...def', status: 'Inactive', createdAt: '2024-05-10' },
];


export default function AdminDashboardPage() {
  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminHeader />
        <main className="flex-1 p-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between mb-6">
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
            
            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total VSD Supply</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,000,000,000</div>
                        <p className="text-xs text-muted-foreground">Fixed total supply</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,500</div>
                         <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transaction Volume (24h)</CardTitle>
                        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250,834 VSD</div>
                         <p className="text-xs text-muted-foreground">+19% from yesterday</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Integrated Tenants</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tenants.length}</div>
                        <p className="text-xs text-muted-foreground">Live partner integrations</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area with Tabs */}
             <Tabs defaultValue="users">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="tenants">Tenants</TabsTrigger>
                        <TabsTrigger value="transactions">Activity</TabsTrigger>
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
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="font-medium">{user.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {user.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-mono">
                                {user.wallet}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant={user.status === 'Active' ? 'default' : 'destructive'}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {user.joined}
                              </TableCell>
                              <TableCell className="text-right">{user.vsdBalance.toLocaleString()} VSD</TableCell>
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
                          ))}
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
                          {tenants.map((tenant) => (
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
                              <TableCell className="hidden md:table-cell">{tenant.createdAt}</TableCell>
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
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                 <TabsContent value="transactions">
                    <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                           <CardDescription>
                            An audit log of the most recent ledger activities.
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
                                  {transactions.map(tx => (
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
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell className="text-right">{tx.amount.toLocaleString()} VSD</TableCell>
                                    </TableRow>
                                  ))}
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd handle form submission to your backend here.
    // For this demo, we'll just show a success toast and close the dialog.
    toast({
      title: "Tenant Created (Mock)",
      description: "A new tenant has been registered and an API key has been generated.",
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
    const [user] = useAuthState(auth);
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: Home },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/transactions", label: "Transactions", icon: Wallet },
        { href: "/admin/keys", label: "API Keys", icon: KeyRound },
        { href: "/admin/promotions", label: "Promotions", icon: Gift },
    ];

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <Logo size={32} />
                    <span className="font-bold hidden sm:inline-block">VSD Admin</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                     {navItems.map(item => (
                         <Link 
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                         >
                            {item.label}
                         </Link>
                     ))}
                </nav>
                <div className="ml-auto flex items-center gap-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                               {user && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'Admin'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
                                    </Avatar>
                               )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

    