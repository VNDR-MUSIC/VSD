
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, CircleDollarSign, Network, Code, Briefcase, HelpCircle } from 'lucide-react'; // Removed Sparkles

export const siteConfig = {
  name: "VSD Network",
  description: "Centralized dashboard for VSD product information, ecosystem projects, and developer resources.",
  mainNav: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Product", href: "/token", icon: CircleDollarSign }, // Changed "Token" to "Product"
    { title: "Ecosystem", href: "/ecosystem", icon: Network },
    { title: "For Businesses", href: "/for-businesses", icon: Briefcase },
    { title: "Developers", href: "/developers", icon: Code },
    // Removed "AI Contract Gen"
    { title: "FAQ", href: "/faq", icon: HelpCircle },
  ] satisfies NavItem[],
  footerNav: [
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "For Businesses", href: "/for-businesses" },
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon'>[],
};
