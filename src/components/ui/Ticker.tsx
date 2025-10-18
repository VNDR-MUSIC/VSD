
'use client';

import { DollarSign, Cpu, ArrowRightLeft, Database, Shield } from 'lucide-react';
import React from 'react';
import { siteConfig } from '@/config/site';

const tickerItems = [
    {
        Icon: DollarSign,
        label: 'VSD Presale Price',
        value: '$0.01',
        valueColor: 'text-green-400'
    },
    {
        Icon: Database,
        label: 'Total Supply',
        value: '1,000,000,000 VSD',
    },
    {
        Icon: Shield,
        label: 'Token Standard',
        value: 'ERC-20',
    },
    {
        Icon: ArrowRightLeft,
        label: 'Conversion Rate',
        value: `1 VSD = ${siteConfig.tokenValues.CONVERSION_RATE} LITE`,
        valueColor: 'text-yellow-400'
    },
    {
        Icon: Cpu,
        label: 'Powered by',
        value: 'IMG Services AI',
    },
    {
        Icon: null,
        label: 'Partner Highlight',
        value: 'VNDR Music',
    },
     {
        Icon: null,
        label: 'Partner Highlight',
        value: 'Blaque Tech',
    },
      {
        Icon: null,
        label: 'Partner Highlight',
        value: 'Audio.Exchange',
    },
];

const TickerItem = ({ Icon, label, value, valueColor = 'text-foreground' }: { Icon: React.ElementType | null, label: string, value: string, valueColor?: string }) => (
    <div className="flex items-center space-x-4 mx-6">
        {Icon && <Icon className="h-5 w-5 text-primary shrink-0" />}
        <div className="flex items-baseline space-x-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
            <span className={`font-bold font-mono text-sm whitespace-nowrap ${valueColor}`}>{value}</span>
        </div>
    </div>
);

export function Ticker() {
    // Duplicate the items to create a seamless loop
    const doubledItems = [...tickerItems, ...tickerItems];

    return (
        <div className="relative w-full overflow-hidden bg-background/80 backdrop-blur-sm border-y border-border py-2">
            <div className="flex animate-marquee hover:pause">
                {doubledItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <TickerItem {...item} />
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
                    animation: marquee 80s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
