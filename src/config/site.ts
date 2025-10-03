
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, BrainCircuit, Network, Code, Briefcase, HelpCircle, FileText, Zap, ShieldAlert, TrendingUp, HandCoins, UserSquare, Banknote, Signal, ShoppingCart, Music, Shield, Gift, Settings } from 'lucide-react';

export const siteConfig = {
  name: "VSD Network",
  description: "The official utility token and AI service hub for the Independent Music Group (IMG). Access exclusive AI tools (IMG Services), stake VSD for rewards, and participate in governance.",
  tokenValues: {
    CONVERSION_RATE: 1, // 1 VSD Lite = 1 VSD. Centralizing this value.
  },
  mainNav: [
    { title: "Home", href: "/", icon: LayoutDashboard },
    // The Dashboard link is now part of the user dropdown in the header
    // { title: "Dashboard", href: "/dashboard", icon: UserSquare, description: "Your personal banking suite" },
    { title: "Network Status", href: "/network-status", icon: Signal, description: "Live API Connections" },
    { title: "VSD Token", href: "/token", icon: BrainCircuit, description: "Utility, Tokenomics, Presale" },
    { title: "Buy Tokens", href: "/buy", icon: ShoppingCart, description: "Purchase VSD with a card" },
    { title: "Ecosystem", href: "/ecosystem", icon: Network, description: "AI Tools & Partner dApps" },
    { title: "Developers", href: "/developers", icon: Code, description: "Whitepaper, SDKs, Build" },
    { title: "Compliance", href: "/compliance", icon: ShieldAlert, description: "Regulatory Approach" },
    { title: "FAQ", href: "/faq", icon: HelpCircle, description: "Frequently Asked Questions"},
    // Admin link should be conditionally shown based on user role, but for now it's here for access.
    { title: "Admin", href: "/admin", icon: Shield },
  ] satisfies NavItem[],
  footerNav: [
    { title: "Whitepaper", href: "/developers/documentation" },
    { title: "Network Status", href: "/network-status" },
    { title: "Compliance", href: "/compliance" },
    { title: "API Reference", href: "/developers/api-reference" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon' | 'description'>[],
   secondaryNav: [
    { title: "Audio Exchange Demo", href: "/audio-exchange", icon: Music },
    { title: "Earn VSD Tokens", href: "/earn", icon: Gift },
  ] satisfies NavItem[],
  userNav: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Settings", href: "/settings", icon: Settings },
  ] satisfies NavItem[],
};
