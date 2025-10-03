
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users2,
  DollarSign,
  BarChart3,
  ArrowRightLeft,
  Settings,
  Home,
  Users,
  Wallet,
  KeyRound,
  Gift,
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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/Logo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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


export default function AdminDashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <div className="flex-1">
                <h1 className="font-headline text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                        <CardTitle className="text-sm font-medium">API Calls (24h)</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">Rate limit at 60% capacity</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area with Tabs */}
             <Tabs defaultValue="users">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="transactions">Activity</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Create User
                            </span>
                        </Button>
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
      </div>
    </SidebarProvider>
  );
}


function AdminSidebar() {
    const [user] = useAuthState(auth);
    return (
        <Sidebar side="left" className="border-r" collapsible="icon">
            <SidebarHeader>
                <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                    <a href="/"><Logo size={32} /></a>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" isActive tooltip="Dashboard">
                             <Home />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Users">
                             <Users />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Transactions">
                             <Wallet />
                             <span>Transactions</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="API Keys">
                            <KeyRound />
                             <span>API Keys</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Promotions">
                            <Gift />
                             <span>Promotions</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-12 p-2 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                           {user && (
                                <>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'Admin'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
                                    </Avatar>
                                     <div className="flex flex-col items-start truncate group-data-[collapsible=icon]:hidden">
                                        <span className="text-sm font-medium truncate">{user.displayName}</span>
                                        <span className="text-xs text-muted-foreground truncate">Admin</span>
                                    </div>
                                </>
                           )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mb-2" side="right" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
