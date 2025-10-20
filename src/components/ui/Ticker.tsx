
'use client';

import { DollarSign, Cpu, ArrowRightLeft, Database, Users, Coins } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Account } from '@/types/account';
import { Skeleton } from './skeleton';
import { useBlockchainData } from '@/hooks/use-blockchain-data';

interface Leaderboard {
    updatedAt: string;
    topHolders: Account[];
}

const TickerItem = ({ Icon, label, value, valueColor = 'text-foreground', isLoading }: { Icon: React.ElementType, label: string, value: string, valueColor?: string, isLoading?: boolean }) => (
    <div className="flex items-center space-x-4 mx-6">
        <Icon className="h-5 w-5 text-primary shrink-0" />
        <div className="flex items-baseline space-x-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
            {isLoading ? (
                <Skeleton className="h-5 w-24" />
            ) : (
                <span className={`font-bold font-mono text-sm whitespace-nowrap ${valueColor}`}>{value}</span>
            )}
        </div>
    </div>
);

export function Ticker() {
    const firestore = useFirestore();
    const leaderboardDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'leaderboards', 'topHolders') : null, [firestore]);
    const { data: leaderboard, isLoading: isLeaderboardLoading } = useDoc<Leaderboard>(leaderboardDocRef);
    const { data: blockchainData, isLoading: isBlockchainLoading } = useBlockchainData();

    const accounts = leaderboard?.topHolders;
    const circulatingVSD = React.useMemo(() => accounts?.reduce((sum, acc) => sum + (acc.vsdBalance || 0), 0) ?? 0, [accounts]);
    const circulatingVSDLite = React.useMemo(() => accounts?.reduce((sum, acc) => sum + (acc.vsdLiteBalance || 0), 0) ?? 0, [accounts]);

    const tickerItems = [
        {
            Icon: DollarSign,
            label: 'Presale Price',
            value: '$0.01',
            valueColor: 'text-green-400'
        },
        {
            Icon: Database,
            label: 'Circulating VSD',
            value: circulatingVSD.toLocaleString(),
        },
        {
            Icon: Coins,
            label: 'Circulating VSD Lite',
            value: circulatingVSDLite.toLocaleString(),
            valueColor: 'text-yellow-400'
        },
        {
            Icon: Users,
            label: 'Total Holders',
            value: (blockchainData?.holders ?? '--').toLocaleString(),
            isLoading: isBlockchainLoading,
        },
        {
            Icon: Cpu,
            label: 'Powered by',
            value: 'IMG Services AI',
        },
    ];

    // Duplicate the items to create a seamless loop
    const doubledItems = [...tickerItems, ...tickerItems];
    const isLoading = isLeaderboardLoading || isBlockchainLoading;

    return (
        <Link href="/token" className="block relative w-full overflow-hidden bg-background/80 backdrop-blur-sm border-y border-border py-2 cursor-pointer group" suppressHydrationWarning>
            <div className="flex animate-marquee group-hover:pause">
                {doubledItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <TickerItem {...item} isLoading={isLoading} />
                        {index < doubledItems.length - 1 && <div className="border-l border-border/50 h-6 self-center" />}
                    </React.Fragment>
                ))}
            </div>
            <style jsx>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .group:hover .animate-marquee, .group:focus-within .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </Link>
    );
}
