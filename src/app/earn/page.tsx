
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Coins, Video, Link as LinkIcon, ArrowRightLeft, Gift, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from '@/config/site';

const MOCK_LITE_BALANCE = 575.50;
const MOCK_VSD_BALANCE = 12845.78;
const { CONVERSION_RATE } = siteConfig.tokenValues; // Dynamic conversion rate

const mockTasks = [
  {
    id: 'task-1',
    title: 'Watch the VSD Whitepaper Explained Video',
    reward: 50,
    icon: Video,
    type: 'video',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Example link
  },
  {
    id: 'task-2',
    title: 'Visit our Partner: AiEar',
    reward: 25,
    icon: LinkIcon,
    type: 'link',
    href: '#'
  },
  {
    id: 'task-3',
    title: 'Read the Developer Integration Guide',
    reward: 30,
    icon: LinkIcon,
    type: 'link',
    href: '/developers/integration'
  }
];


export default function EarnPage() {
  const { toast } = useToast();
  const [liteBalance, setLiteBalance] = useState(MOCK_LITE_BALANCE);
  const [vsdBalance, setVsdBalance] = useState(MOCK_VSD_BALANCE);
  const [conversionAmount, setConversionAmount] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const handleTaskComplete = (task: typeof mockTasks[0]) => {
    if (completedTasks.includes(task.id)) {
      toast({
        variant: "destructive",
        title: "Task Already Completed",
        description: "You have already earned rewards for this task.",
      });
      return;
    }
    
    setLiteBalance(prev => prev + task.reward);
    setCompletedTasks(prev => [...prev, task.id]);

    toast({
      title: "Task Complete!",
      description: `You've earned ${task.reward} VSD Lite tokens!`,
    });
    
    // For link tasks, open in a new tab
    if (task.href && task.type === 'link') {
        window.open(task.href, '_blank');
    }
  };

  const handleConversion = async () => {
    const amount = parseFloat(conversionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a positive number.' });
      return;
    }
    if (amount > liteBalance) {
      toast({ variant: 'destructive', title: 'Insufficient Balance', description: 'You cannot convert more VSD Lite than you have.' });
      return;
    }

    setIsConverting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const vsdReceived = amount / CONVERSION_RATE;
    setLiteBalance(prev => prev - amount);
    setVsdBalance(prev => prev + vsdReceived);
    setConversionAmount('');

    toast({
      title: "Conversion Successful",
      description: `You converted ${amount} VSD Lite to ${vsdReceived.toLocaleString()} VSD.`,
    });
    setIsConverting(false);
  };

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <Gift className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Earn & Convert VSD Tokens</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete simple tasks to earn VSD Lite tokens, then convert them to official VSD tokens.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Balances Card */}
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Balances</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center p-4 rounded-md bg-muted/50">
                <span className="text-muted-foreground">VSD Lite Balance</span>
                <span className="font-bold text-2xl text-yellow-400">{liteBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Main VSD Balance</span>
                <span className="font-bold text-2xl text-primary">{vsdBalance.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Card */}
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ArrowRightLeft /> Convert VSD Lite to VSD</CardTitle>
            <CardDescription>{CONVERSION_RATE} VSD Lite = 1 VSD</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <label htmlFor="convert-amount" className="text-sm font-medium text-muted-foreground">Amount to Convert</label>
                <Input
                    id="convert-amount"
                    type="number"
                    placeholder={`Max: ${liteBalance.toFixed(2)}`}
                    value={conversionAmount}
                    onChange={(e) => setConversionAmount(e.target.value)}
                    className="mt-1"
                />
             </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleConversion} disabled={isConverting}>
                {isConverting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ArrowRightLeft className="h-4 w-4 mr-2" />}
                {isConverting ? 'Converting...' : 'Convert Now'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <section>
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center mb-8">Complete Tasks to Earn VSD Lite</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockTasks.map(task => (
                <Card key={task.id} className="flex flex-col shadow-md">
                    <CardHeader>
                        <div className="flex items-center space-x-3 mb-2">
                           <task.icon className="h-7 w-7 text-primary" />
                           <CardTitle className="text-lg">{task.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                            <span className="text-muted-foreground">Reward</span>
                            <span className="font-bold text-lg text-yellow-400">+{task.reward} VSD Lite</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" onClick={() => handleTaskComplete(task)} disabled={completedTasks.includes(task.id)}>
                            {completedTasks.includes(task.id) ? 'Completed' : 'Complete Task'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>

    </div>
  );
}
