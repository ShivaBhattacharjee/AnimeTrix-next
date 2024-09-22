"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useContext, useEffect, useRef } from "react";

function usePreviousValue<T>(value: T): T | undefined {
	const prevValue = useRef<T>();

	useEffect(() => {
		prevValue.current = value;
		return () => {
			prevValue.current = undefined;
		};
	});

	return prevValue.current;
}

function FrozenRouter(props: { children: React.ReactNode }) {
	const context = useContext(LayoutRouterContext);
	const prevContext = usePreviousValue(context) || null;

	const segment = useSelectedLayoutSegment();
	const prevSegment = usePreviousValue(segment);

	const changed =
		segment !== prevSegment &&
		segment !== undefined &&
		prevSegment !== undefined;

	return (
		<LayoutRouterContext.Provider value={changed ? prevContext : context}>
			{props.children}
		</LayoutRouterContext.Provider>
	);
}

interface LayoutTransitionProps {
	children: React.ReactNode;
	className?: React.ComponentProps<typeof motion.div>["className"];
	style?: React.ComponentProps<typeof motion.div>["style"];
	initial: React.ComponentProps<typeof motion.div>["initial"];
	animate: React.ComponentProps<typeof motion.div>["animate"];
	exit: React.ComponentProps<typeof motion.div>["exit"];
}

export function LayoutTransition({
	children,
	className,
	style,
	initial,
	animate,
	exit,
}: LayoutTransitionProps) {
	const segment = useSelectedLayoutSegment();

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				className={className}
				style={style}
				key={segment}
				initial={initial}
				animate={animate}
				exit={exit}
			>
				<FrozenRouter>{children}</FrozenRouter>
			</motion.div>
		</AnimatePresence>
	);
}
