"use client";

import { Github, Heart, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "../ui/icons";

import { Button } from "@/components/ui/button";
import { navItems } from "@/constants";

const socialMediaLinks = [
    {
        icon: <Github className="h-5 w-5" />,
        url: "https://github.com/ShivaBhattacharjee/AnimeTrix-next",
        label: "GitHub",
    },
    {
        icon: <Instagram className="h-5 w-5" />,
        url: "https://www.instagram.com/animetrix.200/",
        label: "Instagram",
    },
];

export default function Footer() {
    const location = usePathname();

    if (location.includes("/waifu")) {
        return null;
    }

    return (
        <footer className="bg-background border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="flex flex-col items-center lg:items-start">
                        <Icons.aniflix className="flex items-center justify-center" />
                        <p className="text-sm text-muted-foreground text-center lg:text-left">Baka, Aho, Hachiman!</p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item, idx) => (
                                <Link key={idx} href={item.url} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex gap-4">
                            {socialMediaLinks.map((link, indx) => (
                                <Button key={indx} variant="outline" size="icon" asChild>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                        {link.icon}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground max-w-3xl mx-auto">AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only a user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.</p>
                    <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
                        <p>Made with</p>
                        <Heart className="h-4 w-4 mx-1 text-red-500" />
                        <p>by AnimeTrix Team</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
