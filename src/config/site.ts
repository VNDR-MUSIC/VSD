
import type { NavItem } from '@/types/nav';
import { LayoutDashboard, BrainCircuit, Network, Code, Briefcase, HelpCircle, FileText, Zap } from 'lucide-react'; // Added BrainCircuit, Zap

export const siteConfig = {
  name: "VSD Network",
  description: "Official Hub for the VSD Utility Token. Discover its AI-powered ecosystem, participate in the presale, and access developer resources.",
  mainNav: [
    { title: "Home", href: "/", icon: LayoutDashboard },
    { title: "VSD Token", href: "/token", icon: BrainCircuit, description: "Utility, Tokenomics, Presale" }, // Updated icon & desc
    { title: "Ecosystem", href: "/ecosystem", icon: Network, description: "AI Tools & Partner dApps" },
    { title: "For Businesses", href: "/for-businesses", icon: Briefcase, description: "Leverage VSD AI" },
    { title: "AI Contract Gen", href: "/smart-contract-generator", icon: FileText, description: "Generate Solidity with AI" },
    { title: "Developers", href: "/developers", icon: Code, description: "Whitepaper, SDKs, Build" },
    { title: "FAQ", href: "/faq", icon: HelpCircle },
  ] satisfies NavItem[],
  footerNav: [
    { title: "Whitepaper", href: "/developers/documentation" }, // Added Whitepaper link
    { title: "Terms of Service", href: "#" }, // Placeholder
    { title: "Privacy Policy", href: "#" }, // Placeholder
    { title: "FAQ", href: "/faq" },
  ] satisfies Omit<NavItem, 'icon' | 'description'>[],
};
