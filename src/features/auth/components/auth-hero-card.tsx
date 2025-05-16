"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuthCardSliderText } from "@/lib/app-types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AuthHeroCard({
	texts,
}: {
	texts: AuthCardSliderText[];
}) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative flex-1 w-full h-auto overflow-hidden rounded-xl">
			<div className="absolute top-0 left-0 bottom-0 right-0 items-center px-5 py-24 bg-radial-[100%_90%_at_48%_-10%] from-purple-600 from-40% to-black to-100%"></div>
			<div className="absolute flex items-center justify-between top-2 left-2 right-2 z-[1]">
				<div className="flex items-center gap-1 p-1 text-sm rounded-full top-1 left-1 bg-secondary/60 glass font-ox">
					<Avatar shape="circle" className="w-7 h-7">
						<AvatarImage src="./logo.svg" />
					</Avatar>
					<h4>ElectroFusion</h4>
				</div>
			</div>
			<div className="absolute left-0 right-0 text-center bottom-10">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
						className="flex flex-col w-full gap-3"
					>
						<div>
							<h1 className="text-4xl font-medium tracking-wider">
								{texts[currentIndex].title}
							</h1>
							<h1 className="mt-2 text-2xl font-light text-muted-foreground">
								{texts[currentIndex].subtitle}
							</h1>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
