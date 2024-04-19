import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import SideBar from "../components/shared/navigation/SideBar";
import TopNavbar from "../components/shared/navigation/TopNavbar";

import "./globals.css";

import Footer from "@/components/shared/Footer";
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
        images: [{ url: "https://i.pinimg.com/736x/60/63/da/6063da107454d50c1d7786cc2c2bac75.jpg", alt: "Animetrix Banner" }],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <body className={inter.className}>
                <section>
                    <ProfileProvider>
                        <UserProvider>
                            <Toaster position="top-right" />
                            <NextTopLoader color="#fff" initialPosition={0.08} crawlSpeed={200} height={3} crawl={true} easing="ease" speed={200} zIndex={1600} showAtBottom={false} />
                            <main className="min-h-screen w-full text-white bg-black">
                                <TopNavbar />
                                <SideBar />
                                <ScrollToTop />
                                <section className="flex relative flex-col ml-0 md:ml-20 lg:ml-52 ">
                                    {children}
                                    <Analytics />
                                    <Footer />
                                </section>
                            </main>
                        </UserProvider>
                    </ProfileProvider>
                </section>
            </body>
        </html>
    );
}
