"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, FileJson, Banknote, ShieldQuestion } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

import { 
    generateImageFromHub,
    generateContractFromHub,
    createTransactionOnHub,
    type GenerateImageResponse,
    type GenerateContractResponse,
    type CreateTransactionResponse
} from '@/lib/vsd-hub-client';

// Schemas for forms
const imageFormSchema = z.object({ hint: z.string().min(10, "Hint must be at least 10 characters.") });
const contractFormSchema = z.object({ description: z.string().min(20, "Description must be at least 20 characters.") });
const transactionFormSchema = z.object({
  fromAddress: z.string().startsWith('0x', "Must be a valid address.").length(42, "Address must be 42 characters."),
  toAddress: z.string().startsWith('0x', "Must be a valid address.").length(42, "Address must be 42 characters."),
  amount: z.coerce.number().positive("Amount must be positive."),
  description: z.string().optional(),
});

type ImageFormData = z.infer<typeof imageFormSchema>;
type ContractFormData = z.infer<typeof contractFormSchema>;
type TransactionFormData = z.infer<typeof transactionFormSchema>;

export default function HubIntegrationPage() {
    const { toast } = useToast();
    
    // State for Image Generation
    const [isImageLoading, setIsImageLoading] = React.useState(false);
    const [imageResult, setImageResult] = React.useState<GenerateImageResponse | null>(null);

    // State for Contract Generation
    const [isContractLoading, setIsContractLoading] = React.useState(false);
    const [contractResult, setContractResult] = React.useState<GenerateContractResponse | null>(null);

    // State for Transaction Creation
    const [isTransactionLoading, setIsTransactionLoading] = React.useState(false);
    const [transactionResult, setTransactionResult] = React.useState<CreateTransactionResponse | null>(null);

    const imageForm = useForm<ImageFormData>({ resolver: zodResolver(imageFormSchema), defaultValues: { hint: "" } });
    const contractForm = useForm<ContractFormData>({ resolver: zodResolver(contractFormSchema), defaultValues: { description: "" } });
    const transactionForm = useForm<TransactionFormData>({ 
        resolver: zodResolver(transactionFormSchema),
        defaultValues: { fromAddress: '0xVSD...SenderAddress0000000000000000000000', toAddress: '0xIMG...RecipientAddress000000000000000000', description: "Test transaction", amount: 100 }
    });

    const handleGenerateImage = async (data: ImageFormData) => {
        setIsImageLoading(true);
        setImageResult(null);
        try {
            const result = await generateImageFromHub(data.hint);
            setImageResult(result);
            toast({ title: "Success!", description: "Image generated from the Hub." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Image Generation Failed", description: error.message });
        } finally {
            setIsImageLoading(false);
        }
    };

    const handleGenerateContract = async (data: ContractFormData) => {
        setIsContractLoading(true);
        setContractResult(null);
        try {
            const result = await generateContractFromHub(data.description);
            setContractResult(result);
            toast({ title: "Success!", description: "Smart contract generated from the Hub." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Contract Generation Failed", description: error.message });
        } finally {
            setIsContractLoading(false);
        }
    };
    
    const handleCreateTransaction = async (data: TransactionFormData) => {
        setIsTransactionLoading(true);
        setTransactionResult(null);
        try {
            const result = await createTransactionOnHub(data);
            setTransactionResult(result);
            toast({ title: "Success!", description: "Mock transaction processed by the Hub." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Transaction Failed", description: error.message });
        } finally {
            setIsTransactionLoading(false);
        }
    };

    return (
        <div className="space-y-12 py-8">
            <header className="text-center">
                <ShieldQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Hub API Integration Test</h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                    This page visually confirms the API connections to the VSD Network Hub, acting as a client to the hub's services.
                </p>
            </header>
            
            <Separator />
            
            {/* Image Generation Card */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <Zap className="h-7 w-7 text-primary" />
                        <CardTitle className="font-headline text-2xl">1. Generate Image from Hub</CardTitle>
                    </div>
                    <CardDescription>Test the `/api/generate-image` endpoint.</CardDescription>
                </CardHeader>
                <Form {...imageForm}>
                    <form onSubmit={imageForm.handleSubmit(handleGenerateImage)}>
                        <CardContent>
                             <FormField
                                control={imageForm.control}
                                name="hint"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Image Hint</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., A futuristic AI banking interface on a holographic screen" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={isImageLoading}>
                                {isImageLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate Image
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
                {(isImageLoading || imageResult) && (
                    <CardContent>
                        <Separator className="my-4"/>
                        <h3 className="text-lg font-semibold mb-2">Result:</h3>
                        {isImageLoading ? <Skeleton className="w-full h-[400px] rounded-md" /> : null}
                        {imageResult?.imageDataUri && (
                            <Image src={imageResult.imageDataUri} alt="Generated from Hub" width={512} height={512} className="rounded-md border shadow-md" unoptimized />
                        )}
                    </CardContent>
                )}
            </Card>

            {/* Contract Generation Card */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <FileJson className="h-7 w-7 text-primary" />
                        <CardTitle className="font-headline text-2xl">2. Generate Smart Contract from Hub</CardTitle>
                    </div>
                    <CardDescription>Test the `/api/generate-contract` endpoint.</CardDescription>
                </CardHeader>
                 <Form {...contractForm}>
                    <form onSubmit={contractForm.handleSubmit(handleGenerateContract)}>
                        <CardContent>
                             <FormField
                                control={contractForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Contract Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., An ERC721 NFT contract named 'Hub Access Pass' with symbol 'HAP', mintable only by the owner." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={isContractLoading}>
                                {isContractLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate Contract
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
                 {(isContractLoading || contractResult) && (
                    <CardContent>
                        <Separator className="my-4"/>
                        <h3 className="text-lg font-semibold mb-4">Result:</h3>
                         {isContractLoading ? <Skeleton className="w-full h-[200px] rounded-md" /> : null}
                        {contractResult && (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-primary">Generated Code:</h4>
                                    <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto text-xs"><code>{contractResult.contractCode}</code></pre>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary">Explanation:</h4>
                                    <p className="text-muted-foreground text-sm">{contractResult.explanation}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                )}
            </Card>

            {/* Transaction Card */}
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <Banknote className="h-7 w-7 text-primary" />
                        <CardTitle className="font-headline text-2xl">3. Create Mock Transaction on Hub</CardTitle>
                    </div>
                    <CardDescription>Test the `/api/transactions` endpoint.</CardDescription>
                </CardHeader>
                 <Form {...transactionForm}>
                    <form onSubmit={transactionForm.handleSubmit(handleCreateTransaction)}>
                        <CardContent className="space-y-4">
                            <FormField control={transactionForm.control} name="fromAddress" render={({ field }) => (<FormItem><FormLabel>From Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={transactionForm.control} name="toAddress" render={({ field }) => (<FormItem><FormLabel>To Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={transactionForm.control} name="amount" render={({ field }) => (<FormItem><FormLabel>Amount (VSD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={transactionForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={isTransactionLoading}>
                                {isTransactionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Process Transaction
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
                 {(isTransactionLoading || transactionResult) && (
                    <CardContent>
                        <Separator className="my-4"/>
                        <h3 className="text-lg font-semibold mb-2">Result:</h3>
                        {isTransactionLoading ? <Skeleton className="w-full h-[150px] rounded-md" /> : null}
                        {transactionResult && (
                           <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto text-xs"><code>{JSON.stringify(transactionResult, null, 2)}</code></pre>
                        )}
                    </CardContent>
                )}
            </Card>

        </div>
    );
}
