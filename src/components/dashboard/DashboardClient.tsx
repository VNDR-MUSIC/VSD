
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Send, HandCoins, BarChart, FileJson, Copy, PiggyBank, Loader2, Search, Gift, Coins } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useCollection, useFirestore, useUser, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { doc, collection, runTransaction, increment } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import type { Account } from '@/types/account';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Transaction {
  id: string;
  type: string;
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
  const [searchQuery, setSearchQuery] = React.useState('');
  
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
        .filter(tx => tx.type !== 'in' && tx.status === 'Completed')
        .reduce((acc, tx) => {
            const month = format(new Date(tx.date), 'MMM yyyy');
            acc[month] = (acc[month] || 0) + tx.amount;
            return acc;
        }, {} as Record<string, number>);
        
    return Object.entries(monthlyUsage)
        .map(([month, value]) => ({ month, value }))
        .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [transactions]);
  
  const filteredTransactions = React.useMemo(() => {
    if (!transactions) return [];
    if (!searchQuery) return transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lowercasedQuery = searchQuery.toLowerCase();
    return transactions.filter(tx => 
        (tx.description && tx.description.toLowerCase().includes(lowercasedQuery)) ||
        (tx.from && tx.from.toLowerCase().includes(lowercasedQuery)) ||
        (tx.to && tx.to.toLowerCase().includes(lowercasedQuery)) ||
        tx.amount.toString().includes(lowercasedQuery)
    ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery]);

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
                  <CardTitle className="text-4xl md:text-5xl font-bold">{(account?.vsdBalance ?? 0).toLocaleString()} <span className="text-xl text-primary">VSD</span></CardTitle>
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
              <SendVsdDialog userAccount={account} />
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
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest account activity.</CardDescription>
          </div>
           <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="w-full rounded-lg bg-background pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
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
              ) : filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions?.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className={`flex items-center gap-2 ${tx.type.includes('in') ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type.includes('in') ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      <span className="capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{tx.type.includes('in') ? tx.from : tx.to}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell className={`font-medium ${tx.type.includes('in') ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type.includes('in') ? '+' : '-'}{tx.amount.toLocaleString()} {tx.type.includes('Lite') ? 'VSD Lite' : 'VSD'}
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
                        {searchQuery ? 'No transactions match your search.' : 'No transactions yet.'}
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

function SendVsdDialog({ userAccount }: { userAccount: Account | null }) {
    const { toast } = useToast();
    const [isOpen, React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [tokenType, setTokenType] = React.useState<'vsd' | 'vsd-lite'>('vsd');
    const firestore = useFirestore();
    const { user } = useUser();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userAccount || !firestore || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'User account not found.' });
            return;
        }

        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const toAddress = formData.get('toAddress') as string;
        const amount = Number(formData.get('amount'));
        const description = formData.get('description') as string;

        if (!toAddress || !amount || amount <= 0) {
            toast({ variant: 'destructive', title: 'Invalid input', description: 'Please fill out all fields correctly.' });
            setIsLoading(false);
            return;
        }
        
        const balanceToCheck = tokenType === 'vsd' ? userAccount.vsdBalance : userAccount.vsdLiteBalance;
        
        if (amount > balanceToCheck) {
            toast({ variant: 'destructive', title: `Insufficient ${tokenType.toUpperCase()} balance`, description: `You do not have enough ${tokenType.toUpperCase()} to complete this transaction.` });
            setIsLoading(false);
            return;
        }

        try {
            // This is a simplified mock. A real implementation would require finding the recipient user by wallet address.
            const fromRef = doc(firestore, 'accounts', user.uid);
            
            // For simplicity, we just log the transaction on the sender's side
            const fromTxCollection = collection(fromRef, 'transactions');
            const newTx = {
                type: 'out',
                status: 'Completed' as const,
                amount,
                date: new Date().toISOString(),
                user: userAccount.displayName,
                accountId: userAccount.uid,
                from: userAccount.walletAddress,
                to: toAddress,
                description: description || `Transfer to ${toAddress.slice(0, 10)}...`
            };
            await addDocumentNonBlocking(fromTxCollection, newTx);
            
            // Update sender's balance
            const balanceField = tokenType === 'vsd' ? 'vsdBalance' : 'vsdLiteBalance';
            await runTransaction(firestore, async (transaction) => {
                transaction.update(fromRef, { [balanceField]: increment(-amount) });
            });


            toast({
                title: 'Transaction Submitted',
                description: `Sent ${amount} ${tokenType === 'vsd' ? 'VSD' : 'VSD Lite'} to ${toAddress}.`,
            });
            setIsOpen(false);

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Transaction Failed',
                description: error.message || 'An unexpected error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="btn-hover-effect w-full"><Send className="mr-2 h-4 w-4" />Send</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="font-headline">Send Tokens</DialogTitle>
                        <DialogDescription>
                            Transfer VSD or VSD Lite to another user's wallet address.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <RadioGroup defaultValue="vsd" onValueChange={(value: 'vsd' | 'vsd-lite') => setTokenType(value)} className="grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="vsd" id="vsd" className="peer sr-only" />
                                <Label
                                htmlFor="vsd"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                <Coins className="mb-3 h-6 w-6" />
                                VSD
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="vsd-lite" id="vsd-lite" className="peer sr-only" />
                                <Label
                                htmlFor="vsd-lite"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                <Gift className="mb-3 h-6 w-6" />
                                VSD Lite
                                </Label>
                            </div>
                        </RadioGroup>
                        <div className="space-y-2">
                            <Label htmlFor="toAddress">Recipient Wallet Address</Label>
                            <Input id="toAddress" name="toAddress" placeholder="0x..." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount ({tokenType.toUpperCase()})</Label>
                            <Input id="amount" name="amount" type="number" step="any" min="0.01" placeholder="100.00" required />
                             <p className="text-xs text-muted-foreground">
                                Your balance: {tokenType === 'vsd' 
                                    ? `${(userAccount?.vsdBalance ?? 0).toLocaleString()} VSD` 
                                    : `${(userAccount?.vsdLiteBalance ?? 0).toLocaleString()} VSD Lite`}
                            </p>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="description">Description (Optional)</Label>
                            <Input id="description" name="description" placeholder="e.g., Payment for services" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Processing...' : `Send ${tokenType.toUpperCase()}`}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
