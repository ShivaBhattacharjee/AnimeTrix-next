"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const listenToScroll = () => {
            const hidden = 500;
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (winScroll > hidden) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        if (typeof globalThis !== "undefined") {
            globalThis.addEventListener("scroll", listenToScroll);
            return () => {
                globalThis.removeEventListener("scroll", listenToScroll);
            };
        }
    }, []);

    return (
        <>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                        ease: "easeIn",
                    }}
                    className={`fixed flex items-center justify-center transform transition-all duration-300 hover:scale-110 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2 md:p-2.5 dark:shadow-black/50 shadow-lg right-5 md:bottom-20 bottom-10 z-50`}
                >
                    <ChevronUp onClick={goToBtn} className="text-white w-6 h-6 md:w-8 md:h-8 cursor-pointer animate-bounce duration-700" />
                </motion.div>
            )}
        </>
    );
};

export default ScrollToTop;
