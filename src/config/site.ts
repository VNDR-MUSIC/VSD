
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, BrainCircuit, Network, Code, Briefcase, HelpCircle, FileText, Zap, ShieldAlert, TrendingUp, HandCoins, UserSquare, Banknote, Signal } from 'lucide-react';

export const siteConfig = {
  name: "VSD Network",
  description: "The official hub for the VSD utility token and IMG Banking System. Access your wallet, explore the ecosystem, and build the future of decentralized finance and AI.",
  mainNav: [
    { title: "Home", href: "/", icon: LayoutDashboard },
    { title: "Dashboard", href: "/dashboard", icon: UserSquare, description: "Your personal banking suite" },
    { title: "Network Status", href: "/network-status", icon: Signal, description: "Live API Connections" },
    { title: "VSD Token", href: "/token", icon: BrainCircuit, description: "Utility, Tokenomics, Presale" },
    { title: "Ecosystem", href: "/ecosystem", icon: Network, description: "AI Tools & Partner dApps" },
    { title: "For Businesses", href: "/for-businesses", icon: Briefcase, description: "Leverage VSD AI" },
    { title: "Developers", href: "/developers", icon: Code, description: "Whitepaper, SDKs, Build" },
    { title: "FAQ", href: "/faq", icon: HelpCircle },
  ] satisfies NavItem[],
  footerNav: [
    { title: "Whitepaper", href: "/developers/documentation" },
    { title: "Network Status", href: "/network-status" },
    { title: "Compliance", href: "/compliance" },
    { title: "API Reference", href: "/developers/api-reference" },
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon' | 'description'>[],
};
