import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

import { LayoutTransition } from "@/components/providers/layout-transition";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/navigation/header";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { UserProvider } from "@/context/getUserDetails";
import { ProfileProvider } from "@/hooks/useprofile";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Animetrix - Your Premier Source for Free Anime Downloads and Streaming",
    description: "Discover the ultimate anime experience at Animetrix! Enjoy free anime downloads and streaming of the latest series and timeless classics. Dive into our vast collection now!",
    manifest: "/manifest.json",
    icons: { apple: "/logo.png" },
    themeColor: "#000",
    openGraph: {
        images: [
            {
                url: "https://i.pinimg.com/736x/60/63/da/6063da107454d50c1d7786cc2c2bac75.jpg",
                alt: "Animetrix Banner",
            },
        ],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <body className={inter.className}>
                <section>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        <LayoutTransition initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ProfileProvider>
                                <UserProvider>
                                    <Toaster position="top-right" />
                                    <NextTopLoader color="linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)" initialPosition={0.1} crawlSpeed={250} height={4} crawl={true} easing="ease-in-out" speed={300} zIndex={2000} showAtBottom={false} />

                                    <main className="min-h-screen w-full flex flex-col">
                                        <ScrollToTop />
                                        <Header />
                                        <section className="flex-1 flex-grow">{children}</section>
                                        <Analytics />
                                        <Footer />
                                    </main>
                                </UserProvider>
                            </ProfileProvider>
                        </LayoutTransition>
                    </ThemeProvider>
                </section>
            </body>
        </html>
    );
}
