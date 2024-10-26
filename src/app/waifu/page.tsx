"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "./_model-data/data";

export default function WaifuSelection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredWaifus = data.filter((waifu) => 
      waifu.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (waifu.anime && waifu.anime.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (!mounted) {
        return null;
    }

    return (
        <section className="min-h-screen p-4 mb-40">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Select Your Waifu</CardTitle>
                    <CardDescription className="text-center text-lg">Discover your favorite anime characters</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-6">
                        <Input type="text" placeholder="Search by name or anime..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow" />
                        <Button size="icon">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredWaifus.map((waifu, index) => (
                            <Link href={`/waifu/${waifu.name}/${waifu.anime}`} key={index} className="group">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
                                    <div className="relative w-full pt-[100%] rounded-lg overflow-hidden shadow-lg">
                                        <img src={waifu.picture} alt={waifu.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <h3 className="font-semibold truncate">{waifu.name}</h3>
                                        <p className="text-sm text-muted-foreground truncate">{waifu.anime}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">More coming soon...</p>
                </CardFooter>
            </Card>
        </section>
    );
}
