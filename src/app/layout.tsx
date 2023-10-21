import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../components/shared/navigation/SideBar";
import TopNavbar from "../components/shared/navigation/TopNavbar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Animetrix - Your Premier Source for Free Anime Downloads and Streaming",
    description: "Discover the ultimate anime experience at Animetrix! Enjoy free anime downloads and streaming of the latest series and timeless classics. Dive into our vast collection now!",
    openGraph: {
        images: "https://media.discordapp.net/attachments/1079039236302446705/1148974653155594302/IMG_20230906_190222_412.jpg?width=1080&height=567",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-black w-full text-white max-w-[2500px] m-auto`}>
                <Toaster position="top-right" />
                <TopNavbar />
                <SideBar />
                <ScrollToTop />
                <main className="flex relative flex-col ml-0 md:ml-20 lg:ml-52 ">
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
