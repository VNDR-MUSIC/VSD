
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

interface Account {
  walletAddress: string;
  vsdBalance: number;
}

interface Transaction {
  id: string;
  type: 'in' | 'out';
  from?: string;
  to?: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  description: string;
}

const mockPortfolioData = [
  { month: 'Jan', value: 125.00 },
  { month: 'Feb', value: 120.50 },
  { month: 'Mar', value: 135.20 },
  { month: 'Apr', value: 132.80 },
  { month: 'May', value: 145.90 },
  { month: 'Jun', value: 155.00 },
];

export function DashboardClient() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const accountRef = useMemoFirebase(() => user && firestore ? doc(firestore, 'accounts', user.uid) : null, [firestore, user]);
  const transactionsRef = useMemoFirebase(() => user && firestore ? collection(firestore, 'accounts', user.uid, 'transactions') : null, [firestore, user]);

  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountRef);
  const { data: transactions, isLoading: areTransactionsLoading } = useCollection<Transaction>(transactionsRef);

  const isLoading = isUserLoading || isAccountLoading;

  const handleCopyToClipboard = () => {
    if (account?.walletAddress) {
      navigator.clipboard.writeText(account.walletAddress);
      toast({
        title: "Copied to Clipboard!",
        description: "Your VSD wallet address has been copied.",
      });
    }
  };

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
              <CardDescription>Illustrative chart of your VSD token usage over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={mockPortfolioData}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} VSD`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    cursor={{fill: 'hsl(var(--accent))', radius: 'var(--radius)'}}
                    formatter={(value) => [`${(value as number).toFixed(2)} VSD`, 'Usage']}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="VSD Spent" />
                </RechartsBarChart>
              </ResponsiveContainer>
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
                <p className="text-2xl font-bold">5,000 VSD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated APY</p>
                <p className="text-2xl font-bold text-green-400">8.75%</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full btn-hover-effect" onClick={() => toast({ title: "Feature Coming Soon", description: "The staking portal will be available after the presale."})}>Manage Staking</Button>
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
              ) : (
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
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
