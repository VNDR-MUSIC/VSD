
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Account } from '@/types/account';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, MoreHorizontal, UserCog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AdvertiserApplication {
    id: string;
    userId: string;
    userName: string;
    companyName: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}

const UserRowSkeleton = () => (
    <TableRow>
        <TableCell><div className="flex items-center gap-2"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-5 w-32" /></div></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
        <TableCell className="hidden sm:table-cell text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
    </TableRow>
);

export function UserManagementClient() {
    useProtectedRoute({ adminOnly: true });
    const firestore = useFirestore();
    const { toast } = useToast();

    const accountsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'accounts') : null, [firestore]);
    const applicationsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'advertiserApplications') : null, [firestore]);

    const { data: accounts, isLoading: accountsLoading } = useCollection<Account>(accountsQuery);
    const { data: applicationsData, isLoading: applicationsLoading } = useCollection<AdvertiserApplication>(applicationsQuery);

    const applications = React.useMemo(() => {
        return applicationsData?.sort((a,b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()) || [];
    }, [applicationsData]);

    const handleApplication = async (application: AdvertiserApplication, newStatus: 'approved' | 'rejected') => {
        if (!firestore) return;

        try {
            // Update the application status
            const appRef = doc(firestore, 'advertiserApplications', application.id);
            updateDocumentNonBlocking(appRef, { status: newStatus });

            // If approved, update the user's role
            if (newStatus === 'approved') {
                const userAccountRef = doc(firestore, 'accounts', application.userId);
                // To prevent duplicates, we need to read the user doc first.
                // For simplicity in this non-blocking UI, we'll just assume we add it.
                // A robust solution would use a transaction or a Cloud Function to handle this array update.
                const userDoc = accounts?.find(acc => acc.uid === application.userId);
                if (userDoc && !userDoc.roles.includes('advertiser')) {
                    const updatedRoles = [...userDoc.roles, 'advertiser'];
                    updateDocumentNonBlocking(userAccountRef, { roles: updatedRoles });
                }
            }

            toast({
                title: `Application ${newStatus}`,
                description: `${application.userName}'s application has been ${newStatus}.`,
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: error.message || 'An error occurred.',
            });
        }
    };


    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">User Management</h1>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Advertiser Applications</CardTitle>
                    <CardDescription>Review and approve applications from users wishing to become advertisers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="hidden sm:table-cell">Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicationsLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}><Skeleton className="h-8 w-full" /></TableCell>
                                </TableRow>
                            ) : applications.length > 0 ? (
                                applications.map(app => (
                                    <TableRow key={app.id}>
                                        <TableCell>{app.userName}</TableCell>
                                        <TableCell>{app.companyName}</TableCell>
                                        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                                            {format(new Date(app.submittedAt), 'PPp')}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={app.status === 'pending' ? 'destructive' : app.status === 'approved' ? 'default' : 'secondary'}>{app.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {app.status === 'pending' ? (
                                                <>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-400" onClick={() => handleApplication(app, 'approved')}>
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400" onClick={() => handleApplication(app, 'rejected')}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Processed</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No applications found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>All Network Users</CardTitle>
                    <CardDescription>View, search, and manage all user accounts in the ecosystem.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="hidden sm:table-cell text-right">VSD Balance</TableHead>
                                <TableHead className="text-right">VSD Lite</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accountsLoading ? (
                                Array.from({length: 5}).map((_, i) => <UserRowSkeleton key={i} />)
                            ) : accounts && accounts.length > 0 ? (
                                accounts.map((account) => (
                                    <TableRow key={account.uid}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={account.photoURL || undefined} />
                                                    <AvatarFallback>{account.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{account.displayName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{account.email}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                            {account.roles?.map(role => (
                                                <Badge key={role} variant={role === 'admin' ? 'default' : 'secondary'}>{role}</Badge>
                                            ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-right font-mono">{account.vsdBalance.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-mono text-yellow-400">{account.vsdLiteBalance.toLocaleString()}</TableCell>
                                         <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem disabled><UserCog className="mr-2 h-4 w-4"/>Edit Roles</DropdownMenuItem>
                                                    <DropdownMenuItem disabled className="text-destructive">Suspend User</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                   </Table>
                </CardContent>
            </Card>
        </>
    );
}
