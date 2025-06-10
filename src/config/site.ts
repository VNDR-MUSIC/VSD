
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, CircleDollarSign, Network, Code, Briefcase, HelpCircle } from 'lucide-react';

export const siteConfig = {
  name: "VSD Network",
  description: "Centralized dashboard for VSD token information, ecosystem projects, and developer resources for our decentralized stablecoin platform.",
  mainNav: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Token", href: "/token", icon: CircleDollarSign },
    { title: "Ecosystem", href: "/ecosystem", icon: Network },
    { title: "For Businesses", href: "/for-businesses", icon: Briefcase },
    // { title: "AI Contract Gen", href: "/smart-contract-generator", icon: FileText }, // Removed
    { title: "Developers", href: "/developers", icon: Code },
    { title: "FAQ", href: "/faq", icon: HelpCircle },
  ] satisfies NavItem[],
  footerNav: [
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "For Businesses", href: "/for-businesses" },
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon'>[],
};
