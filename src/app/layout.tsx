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
    openGraph: {
        images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <body className={inter.className}>
                <section>
                    <ProfileProvider>
                        <UserProvider>
                            <Toaster position="top-right" />
                            <NextTopLoader color="#fff" initialPosition={0.08} crawlSpeed={200} height={3} crawl={true} showSpinner={true} easing="ease" speed={200} zIndex={1600} showAtBottom={false} />
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
