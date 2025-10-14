
"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Send, HandCoins, BarChart, FileJson, Copy, PiggyBank } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import type { Account } from '@/types/account';
import { format } from 'date-fns';


interface Transaction {
  id: string;
  type: string; // Changed from 'in' | 'out' to string to support more types
  from?: string;
  to?: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  description: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-background/80 border border-border rounded-lg shadow-lg">
                <p className="label font-bold">{`${label}`}</p>
                <p className="intro text-primary">{`Usage: ${payload[0].value.toLocaleString()} VSD`}</p>
            </div>
        );
    }
    return null;
};

export function DashboardClient() {
  const { isLoading: isAuthLoading } = useProtectedRoute();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  
  const accountRef = useMemoFirebase(() => user && firestore ? doc(firestore, 'accounts', user.uid) : null, [firestore, user]);
  const transactionsRef = useMemoFirebase(() => user && firestore ? collection(firestore, 'accounts', user.uid, 'transactions') : null, [firestore, user]);

  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountRef);
  const { data: transactions, isLoading: areTransactionsLoading } = useCollection<Transaction>(transactionsRef);

  const isLoading = isAuthLoading || isAccountLoading;

  const handleCopyToClipboard = () => {
    if (account?.walletAddress) {
      navigator.clipboard.writeText(account.walletAddress);
      toast({
        title: "Copied to Clipboard!",
        description: "Your VSD wallet address has been copied.",
      });
    }
  };
  
  const activityData = React.useMemo(() => {
    if (!transactions) return [];
    
    const monthlyUsage = transactions
        .filter(tx => tx.type !== 'in' && tx.status === 'Completed') // Assuming 'in' is for incoming
        .reduce((acc, tx) => {
            const month = format(new Date(tx.date), 'MMM yyyy');
            acc[month] = (acc[month] || 0) + tx.amount;
            return acc;
        }, {} as Record<string, number>);
        
    return Object.entries(monthlyUsage)
        .map(([month, value]) => ({ month, value }))
        .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  }, [transactions]);

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-2">My Dashboard</h1>
        <p className="text-base sm:text-lg text-muted-foreground">Welcome to your VSD Network banking suite.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardDescription>Total VSD Balance</CardDescription>
                {isLoading ? (
                  <Skeleton className="h-14 w-64 mt-2" />
                ) : (
                  <CardTitle className="text-4xl md:text-5xl font-bold">{account?.vsdBalance.toLocaleString() || '0.00'} <span className="text-xl text-primary">VSD</span></CardTitle>
                )}
              </div>
              <HandCoins className="h-12 w-12 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center">
                 {isLoading ? (
                    <Skeleton className="h-5 w-full" />
                 ) : (
                    <>
                        <span>{account?.walletAddress}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={handleCopyToClipboard}>
                        <Copy className="h-4 w-4" />
                        </Button>
                    </>
                 )}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="btn-hover-effect w-full" onClick={() => toast({ title: "Feature Coming Soon", description: "Sending VSD will be enabled shortly."})}><Send className="mr-2 h-4 w-4" />Send</Button>
              <Button variant="outline" className="btn-hover-effect w-full" onClick={() => toast({ title: "Feature Coming Soon", description: "Receiving VSD is active at your wallet address."})}>Receive</Button>
            </CardFooter>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart className="h-6 w-6" />Activity Overview</CardTitle>
              <CardDescription>A live look at your VSD token usage over the last months.</CardDescription>
            </CardHeader>
            <CardContent>
                {areTransactionsLoading ? <Skeleton className="h-[250px] w-full" /> : activityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart data={activityData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))', radius: 'var(--radius)'}} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="VSD Spent" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-[250px]">
                        <p className="text-muted-foreground">No transaction data available to display chart.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PiggyBank className="h-6 w-6"/>Staking</CardTitle>
              <CardDescription>Earn rewards for participating in the network.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Staked Amount</p>
                <p className="text-2xl font-bold">0 VSD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated APY</p>
                <p className="text-2xl font-bold text-green-400">~8.75%</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full btn-hover-effect" onClick={() => toast({ title: "Feature Coming Soon", description: "The staking portal will be available after the presale."})}>Stake Now</Button>
            </CardFooter>
          </Card>
          <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileJson className="h-5 w-5" />My Contracts</CardTitle>
              <CardDescription>Status of your smart contracts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">No active contracts found.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full btn-hover-effect" onClick={() => toast({ title: "Feature Coming Soon", description: "The Smart Contract Engine is in development."})}>Create New Contract</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="hidden sm:table-cell">From/To</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {areTransactionsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell colSpan={5}>
                            <Skeleton className="h-5 w-full" />
                        </TableCell>
                    </TableRow>
                ))
              ) : transactions && transactions.length > 0 ? (
                transactions?.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className={`flex items-center gap-2 ${tx.type === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'in' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      <span className="capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{tx.type === 'in' ? tx.from : tx.to}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell className={`font-medium ${tx.type === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'in' ? '+' : '-'}{tx.amount.toLocaleString()} VSD
                  </TableCell>
                  <TableCell className="text-right">
                     <span className={`px-2 py-1 text-xs rounded-full ${tx.status === 'Completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))) : (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                        No transactions yet.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    
    