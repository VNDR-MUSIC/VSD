
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Send, HandCoins, BarChart, FileJson, Copy, PiggyBank, Loader2, Search, Gift, Coins, LimitExceededError } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useCollection, useFirestore, useUser, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { doc, collection, runTransaction, increment, query, where, getDocs, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import type { Account } from '@/types/account';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [searchQuery, React.useState('');
  
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

  const canSendTokens = (account?.vsdBalance ?? 0) >= 20;

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
              
                
                    
                         SendVsdDialog userAccount={account} isAllowed={canSendTokens} />
                        
                    
                    {!canSendTokens && (
                        
                            You need at least 20 VSD to send tokens.
                        
                    )}
                
              
              <Button variant="outline" className="btn-hover-effect w-full" onClick={() => toast({ title: "Feature Coming Soon", description: "Receiving VSD is active at your wallet address."})}>Receive</Button>
            </CardFooter>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart className="h-6 w-6" />Activity Overview</CardTitle>
              <CardDescription>A live look at your VSD token usage over the last months.</CardDescription>
            </CardHeader>
            <CardContent>
                {areTransactionsLoading ?  activityData.length > 0 ? (
                  
                    
                      
                      
                      <RechartsTooltip content={} cursor={{fill: 'hsl(var(--accent))', radius: 'var(--radius)'}} />
                      
                    
                  
                ) : (
                    
                        No transaction data available to display chart.
                    
                )}
            </CardContent>
          </Card>
        </div>

        
            
                
                
                Feature on the VSD Network Roadmap.
            
            
                
                    Staked Amount
                    Coming Soon
                
                
                    Estimated APY
                    TBD
                
            
            
                Stake Now (Coming Soon)
            
          
          
                
                
                Feature on the VSD Network Roadmap.
            
            
                Smart contract management is coming soon.
            
            
                Create New Contract (Coming Soon)
            
          
        
      

      
        
          
            
            
                Recent Transactions
                Your latest account activity.
            
          
           
                
                    
                    
                        Search transactions...
                        
                    
                
            
        
        
          
            
              
                
                  Type
                  From/To
                  Description
                  Amount
                  Status
                
              
            
            
              {areTransactionsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    
                        
                            
                        
                    
                ))
              ) : filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions?.map((tx) => (
                
                  
                    
                      
                      
                      
                    
                  
                  {tx.type.includes('in') ? tx.from : tx.to}
                  {tx.description}
                  
                    {tx.type.includes('in') ? '+' : '-'}{tx.amount.toLocaleString()} {tx.type.includes('Lite') ? 'VSD Lite' : 'VSD'}
                  
                  
                     
                      {tx.status}
                    
                  
                
              ))) : (
                 
                    
                        {searchQuery ? 'No transactions match your search.' : 'No transactions yet.'}
                    
                
              )}
            
          
        
      
    
  );
}

function SendVsdDialog({ userAccount, isAllowed }: { userAccount: Account | null, isAllowed: boolean }) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [tokenType, setTokenType] = React.useState('');
    const firestore = useFirestore();
    const { user } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userAccount || !firestore || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'User account not found.' });
            return;
        }

        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const toAddress = formData.get('toAddress');
        const amount = Number(formData.get('amount'));
        const description = formData.get('description');
        const finalDescription = description || `Transfer to ${toAddress.slice(0, 10)}...`;

        if (!toAddress || !amount || amount  userAccount.vsdBalance : userAccount.vsdLiteBalance;
        const balanceField = tokenType === 'vsd' ? 'vsdBalance' : 'vsdLiteBalance';
        
        if (amount > balanceToCheck) {
            toast({ variant: 'destructive', title: `Insufficient ${tokenType.toUpperCase()} balance`, description: `You do not have enough ${tokenType.toUpperCase()} to complete this transaction.` });
            setIsLoading(false);
            return;
        }

        try {
            const accountsRef = collection(firestore, 'accounts');
            const q = query(accountsRef, where('walletAddress', '==', toAddress), limit(1));
            const recipientSnapshot = await getDocs(q);

            if (recipientSnapshot.empty) {
                toast({ variant: 'destructive', title: 'Recipient Not Found', description: 'No user found with that wallet address.' });
                setIsLoading(false);
                return;
            }

            const recipientDoc = recipientSnapshot.docs[0];
            const recipientAccount = recipientDoc.data();

            await runTransaction(firestore, async (transaction) => {
                const fromRef = doc(firestore, 'accounts', user.uid);
                const toRef = doc(firestore, 'accounts', recipientDoc.id);

                // 1. Decrement sender's balance
                transaction.update(fromRef, { [balanceField]: increment(-amount) });
                // 2. Increment recipient's balance
                transaction.update(toRef, { [balanceField]: increment(amount) });
            });

            // 3. Log transaction for sender
            const fromTxCollection = collection(firestore, 'accounts', user.uid, 'transactions');
            await addDocumentNonBlocking(fromTxCollection, {
                type: `out ${tokenType}`,
                status: 'Completed',
                amount,
                date: new Date().toISOString(),
                to: toAddress,
                description: finalDescription
            });
            
            // 4. Log transaction for recipient
            const toTxCollection = collection(firestore, 'accounts', recipientDoc.id, 'transactions');
            await addDocumentNonBlocking(toTxCollection, {
                type: `in ${tokenType}`,
                status: 'Completed',
                amount,
                date: new Date().toISOString(),
                from: userAccount.walletAddress,
                description: finalDescription
            });

            toast({
                title: 'Transaction Successful',
                description: `Sent ${amount} ${tokenType.toUpperCase()} to ${recipientAccount.displayName}.`,
            });
            setIsOpen(false);

        } catch (error) {
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
        
            
                
                    Send
                
            
            
                
                    
                        
                            Send Tokens
                            Transfer VSD or VSD Lite to another user's wallet address.
                        
                    
                    
                        
                            
                                
                                    
                                        
                                            
                                                
                                                    
                                                
                                                VSD
                                            
                                        
                                    
                                    
                                        
                                            
                                                
                                                    
                                                
                                                VSD Lite
                                            
                                        
                                    
                                
                            
                            
                                Recipient Wallet Address
                                
                            
                            
                                Amount ({tokenType.toUpperCase()})
                                
                                 Your balance: {tokenType === 'vsd' 
                                    ? `${(userAccount?.vsdBalance ?? 0).toLocaleString()} VSD` 
                                    : `${(userAccount?.vsdLiteBalance ?? 0).toLocaleString()} VSD Lite`}
                            
                            
                                Description (Optional)
                                
                            
                        
                    
                    
                        
                            {isLoading && }
                            {isLoading ? 'Processing...' : `Send ${tokenType.toUpperCase()}`}
                        
                    
                
            
        
    );
}

    