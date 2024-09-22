"use client";

import Link from "next/link";
import { ChevronDownCircle, ChevronRight, MenuIcon, Search, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { menuContent, navItems } from "@/constants";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";

import Logout from "@/components/buttons/Logout";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const Header = () => {
    console.log("Hentai onichan!! Why you looking at my source");
    useRouter();
    const [isLogged, setIsLogged] = useState(false);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [expand, setExpand] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const token = getCookie("token");

    useEffect(() => {
        if (token !== undefined) {
            setIsLogged(!isLogged);
        } else {
            setIsLogged(false);
        }
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef?.current && !sidebarRef?.current?.contains(event?.target as Node)) {
                setExpand(false);
            }
        };

        document?.addEventListener("click", handleClickOutside);

        return () => {
            document?.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky z-[1001] top-0 bg-accent/40 backdrop-filter backdrop-blur-md w-full ">
            <nav className="flex flex-row items-center justify-between py-2 w-full px-4 md:px-16">
                <Link href="/" className="group">
                    <div className="flex items-center gap-2">
                        <Icons.aniflix className="flex items-center justify-center group-hover:scale-110 transition-all duration-150 ease-linear" />
                    </div>
                </Link>

                <div className="hidden md:flex ml-8 items-center gap-3 text-muted-foreground">
                    {navItems.map((item, idx) => (
                        <Link href={item.url} key={idx}>
                            <Button className={pathname == item.url ? "bg-accent/70 text-accent-foreground" : ""} variant={"ghost"}>
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground">More</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="relative overflow-hidden rounded-xl border border-neutral-800/75 bg-neutral-950 p-2 shadow-2xl transition-all duration-200 ease-out w-fit">
                                        <div className="relative w-max">
                                            <header className="fade gap-2 flex animate-fadeSm">
                                                {/* Left Grid */}
                                                <ul className="flex w-full max-w-[280px] flex-col gap-2">
                                                    {menuContent[0].leftGrid.map((item, index) => (
                                                        <li key={index}>
                                                            <NavigationMenuLink asChild>
                                                                <a href={item.url} className="group flex w-full shrink-0 items-center gap-6 rounded-lg bg-neutral-900 p-2.5 pr-4 hover:bg-neutral-800">
                                                                    <div className="relative">
                                                                        <div className="absolute left-1.5 top-0 p-4 transition-all duration-200 ease-in-out rounded-lg rotate-[16deg] bg-neutral-400 group-hover:-translate-x-1 group-hover:-rotate-[8deg]"></div>
                                                                        <div className="relative flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 ease-in-out bg-neutral-100 text-neutral-700 group-hover:translate-x-1.5 group-hover:rotate-[16deg]">
                                                                            <item.icon size={25} />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-base font-semibold text-neutral-100">{item.title}</p>
                                                                        <p className="text-sm font-normal text-neutral-400">{item.description}</p>
                                                                    </div>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Right Grid */}
                                                <div className="flex gap-2">
                                                    {menuContent[0].rightGrid.map((item, index) => (
                                                        <NavigationMenuLink key={index} asChild>
                                                            <a href={item.url} className="group relative flex min-h-[264px] items-center gap-6 overflow-hidden rounded-lg bg-neutral-900 hover:bg-neutral-800 w-[220px]">
                                                                <div className="absolute left-0 top-0 h-full w-full opacity-70 transition-transform duration-400 ease-out group-hover:scale-105 group-hover:opacity-100">
                                                                    <img alt={item.title} src={item.image} className="object-cover w-full h-full" />
                                                                </div>
                                                                <div className="z-10 w-full self-end bg-gradient-to-t from-neutral-900 to-neutral-900/0 p-2.5 pr-11 pt-8">
                                                                    <p className="text-base font-semibold text-neutral-100">{item.title}</p>
                                                                    <p className="text-xs text-muted-foreground font-normal">{item.description}</p>
                                                                </div>
                                                                <div className="absolute bottom-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-white/10 text-neutral-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                                                                    <span className="relative flex size-5 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms] *:ease-bounce">
                                                                        <ChevronRight className="absolute -translate-x-5 group-active:translate-x-0 sm:group-hover:translate-x-0" size={20} />
                                                                        <ChevronRight className="group-active:translate-x-5 sm:group-hover:translate-x-5" size={20} />
                                                                    </span>
                                                                </div>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </div>
                                            </header>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto hidden md:block">
                    <div>
                        <div className="flex flex-row items-center gap-3">{/* <ThemeSwitch /> */}</div>
                        <div className="flex items-center justify-center gap-4">
                            <Button size={"icon"} variant={"ghost"}>
                                {/* TODO: search */}
                                <Search />
                            </Button>
                            <Logout />
                        </div>
                    </div>
                </div>

                {/* TODO: mobile nav */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-screen-xl sm:w-[400px] p-0 z-[10001]">
                        <SheetHeader className="px-6 py-4 border-b">
                            <SheetTitle className="text-lg font-bold">
                                <Icons.aniflix className="flex items-center justify-center group-hover:scale-110 transition-all duration-150 ease-linear" />
                            </SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-[calc(100vh-8rem)]">
                            <div className="px-6 py-4">
                                <div className="space-y-4">
                                    {menuContent[0].leftGrid.map((item, idx) => (
                                        <SheetClose asChild key={idx}>
                                            <Button variant={"ghost"}>
                                                <Link href={item.url} className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.url ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}>
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-sm font-semibold mb-3 px-3">More</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {menuContent[0].rightGrid.map((item, index) => (
                                            <SheetClose asChild key={index}>
                                                <Link href={item.url} className="flex flex-col items-center justify-center p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors select-none space-y-1 leading-none no-underline outline-none focus:bg-accent focus:text-accent-foreground h-12 relative z-10 hover:text-white hover:opacity-80">
                                                    <span className="font-medium leading-none vaul-scrollable">{item.title}</span>
                                                    <Image src={item.image} alt="" width={800} height={800} objectFit="cover" className="absolute object-cover inset-0 w-full h-full -z-40 rounded-md brightness-50" />
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="flex items-center justify-between px-6 py-4 border-t">
                            <Button size="icon" variant="ghost">
                                <SearchIcon className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                            <Logout />
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
};

export default Header;
