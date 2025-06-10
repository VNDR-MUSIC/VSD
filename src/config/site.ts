
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, CircleDollarSign, Network, Code, Sparkles, Briefcase, HelpCircle } from 'lucide-react';

export const siteConfig = {
  name: "VSD Network",
  description: "Centralized dashboard for VSD token information, ecosystem projects, and developer resources.",
  mainNav: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Token", href: "/token", icon: CircleDollarSign },
    { title: "Ecosystem", href: "/ecosystem", icon: Network },
    { title: "For Businesses", href: "/for-businesses", icon: Briefcase },
    { title: "Developers", href: "/developers", icon: Code },
    { title: "AI Contract Gen", href: "/smart-contract-generator", icon: Sparkles, label: "New" },
    { title: "FAQ", href: "/faq", icon: HelpCircle },
    // The VSD Token Info link that pointed to /vsd-token-info has been removed.
  ] satisfies NavItem[],
  footerNav: [
    { title: "Terms of Service", href: "#" }, // Placeholder link
    { title: "Privacy Policy", href: "#" }, // Placeholder link
    { title: "For Businesses", href: "/for-businesses" },
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon'>[],
};
