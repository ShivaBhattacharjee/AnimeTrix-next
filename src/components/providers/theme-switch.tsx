"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ThemeSwitch() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function onThemeChange() {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}

	return (
		<>
			<div className="flex items-center justify-center">
				<Button
					aria-label="toogle theme"
					size={"icon"}
					variant={"ghost"}
					type="button"
					onClick={onThemeChange}
					className="flex flex-col items-center justify-center ml-1 overflow-hidden font-medium duration-200 ease-in-out rounded-full sm:p-4 hover:bg-overlay"
				>
					<AnimatePresence mode="wait">
						{resolvedTheme === "light" && (
							<motion.span
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								key="theme1"
							>
								<Moon
									aria-label="Dark"
									className={`w-5 h-5 transition-all duration-300 ease-in-out transform`}
								/>
							</motion.span>
						)}
						{resolvedTheme === "dark" && (
							<motion.span
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								key="theme2"
							>
								<Sun
									aria-label="Light"
									className={`w-5 h-5 transition-all duration-300 ease-in-out transform`}
								/>
							</motion.span>
						)}
					</AnimatePresence>
				</Button>
			</div>
		</>
	);
}
