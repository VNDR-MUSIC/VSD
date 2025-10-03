'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Wallet, Mail } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { useToast } from "@/hooks/use-toast";
import type { Metadata } from 'next';

// Metadata is defined for reference, but this is a Client Component.
// For SEO, this page would ideally have a Server Component parent setting the metadata.
export const metadata: Metadata = {
  title: 'User Settings | VSD Network',
  description: 'Manage your VSD Network profile, wallet information, and notification preferences to stay updated on your account activity.',
};

// Mock user data
const user = {
    name: 'Satoshi Nakamoto',
    email: 'satoshi@vsd.network',
    walletAddress: '0xVSD...a1B2c3D4e5F6',
    avatar: 'https://indiemedia.llc/vsdlogo.jpg'
};

const notificationSettings = [
    { id: 'balanceChanges', label: 'Balance Changes', description: 'Get notified about token transfers and staking rewards.' },
    { id: 'promotions', label: 'Promotional Announcements', description: 'Receive updates on new features and special offers.' },
    { id: 'governance', label: 'Governance Alerts', description: 'Stay informed about new proposals and voting periods.' },
    { id: 'security', label: 'Security Alerts', description: 'Receive alerts for login activity and other security events.' },
];

export default function SettingsPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        // In a real app, you would save the settings to a backend.
        toast({
            title: "Settings Saved",
            description: "Your notification preferences have been updated.",
        });
    };

    return (
        <div className="space-y-12 py-8">
            <header className="text-center">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">User Settings</h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Manage your profile information and notification preferences.
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Card */}
                <Card className="md:col-span-1 shadow-lg bg-card/80 backdrop-blur-sm">
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4 border-2 border-primary/50">
                           <AvatarImage src={user.avatar} alt={user.name} />
                           <AvatarFallback><Logo size={96} /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                         <div className="flex items-center gap-3">
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-xs truncate">{user.walletAddress}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Card */}
                <Card className="md:col-span-2 shadow-lg bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Bell className="h-7 w-7 text-primary" />
                            <CardTitle className="font-headline text-2xl">Notification Preferences</CardTitle>
                        </div>
                        <CardDescription>
                            Choose what you want to be notified about.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {notificationSettings.map(setting => (
                             <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div>
                                    <h4 className="font-semibold">{setting.label}</h4>
                                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                                </div>
                                <Switch id={setting.id} defaultChecked={setting.id !== 'security'} />
                            </div>
                        ))}
                    </CardContent>
                     <CardFooter className="border-t px-6 py-4">
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
