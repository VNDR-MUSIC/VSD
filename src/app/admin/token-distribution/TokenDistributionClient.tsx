
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAdminProxy, adminProxyWrite, adminProxyCreate } from '@/firebase';
import type { Account } from '@/types/account';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, ChevronsUpDown, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export function TokenDistributionClient() {
    useProtectedRoute({ adminOnly: true });
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [tokenType, setTokenType] = React.useState<'vsd' | 'vsdLite'>('vsdLite');
    const [description, setDescription] = React.useState('');
    const [open, setOpen] = React.useState(false)
    
    const { data: accounts, isLoading: accountsLoading } = useAdminProxy<Account>('accounts');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser || !amount || !description) {
            toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a user and enter an amount and description.' });
            return;
        }

        setIsLoading(true);
        const numericAmount = Number(amount);
        const targetAccount = accounts?.find(acc => acc.uid === selectedUser);
        
        if (!targetAccount) {
            toast({ variant: 'destructive', title: 'User Not Found' });
            setIsLoading(false);
            return;
        }

        try {
            const balanceField = tokenType === 'vsd' ? 'vsdBalance' : 'vsdLiteBalance';
            const currentBalance = targetAccount[balanceField] || 0;
            const newBalance = currentBalance + numericAmount;

            await adminProxyWrite('accounts', selectedUser, { [balanceField]: newBalance });
            
            const transactionData = {
                type: `in ${tokenType === 'vsd' ? 'VSD' : 'VSD Lite'}`,
                status: 'Completed',
                amount: numericAmount,
                date: new Date().toISOString(),
                accountId: selectedUser,
                description: `Admin Airdrop: ${description}`,
                from: 'VSD Network Treasury',
                to: targetAccount.walletAddress,
                user: targetAccount.displayName,
            };
            await adminProxyCreate(`accounts/${selectedUser}/transactions`, transactionData);
            
            toast({
                title: 'Airdrop Successful',
                description: `Sent ${numericAmount.toLocaleString()} ${tokenType === 'vsd' ? 'VSD' : 'VSD Lite'} to ${targetAccount.displayName}.`
            });
            
            // Reset form
            setSelectedUser('');
            setAmount('');
            setDescription('');

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Airdrop Failed',
                description: error.message || 'An unknown error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Token Distribution</h1>
            </div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Manual Airdrop</CardTitle>
                        <CardDescription>Directly distribute VSD or VSD Lite tokens to a user account. This action is logged.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {accountsLoading ? <Skeleton className="h-40 w-full" /> : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="user-select">Select User</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                            >
                                            {selectedUser
                                                ? accounts?.find((acc) => acc.uid === selectedUser)?.displayName
                                                : "Select a user to receive tokens..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search user..." />
                                                <CommandList>
                                                    <CommandEmpty>No user found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {accounts?.map((acc) => (
                                                        <CommandItem
                                                            key={acc.uid}
                                                            value={`${acc.displayName} ${acc.email}`}
                                                            onSelect={() => {
                                                                setSelectedUser(acc.uid)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedUser === acc.uid ? "opacity-100" : "opacity-0"
                                                            )}
                                                            />
                                                            {acc.displayName} ({acc.email})
                                                        </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="e.g., 1000"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                     <div className="space-y-2">
                                        <Label>Token Type</Label>
                                        <RadioGroup onValueChange={(v: 'vsd' | 'vsdLite') => setTokenType(v)} defaultValue={tokenType} className="flex items-center space-x-4 pt-2">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="vsdLite" id="vsdLite" />
                                                <Label htmlFor="vsdLite">VSD Lite</Label>
                                            </div>
                                             <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="vsd" id="vsd" />
                                                <Label htmlFor="vsd">VSD</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="description">Reason / Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="e.g., Community reward for bug report"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading || accountsLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             <Send className="mr-2 h-4 w-4" />
                            Send Airdrop
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
