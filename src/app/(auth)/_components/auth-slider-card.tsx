"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AuthCardSliderText } from "@/lib/app-types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

interface AuthSliderCardProps {
	currentIndex: number;
	textData: AuthCardSliderText[];
	className?: string;
}

export default function AuthSliderCard({
	currentIndex,
	textData,
	className,
}: AuthSliderCardProps) {
	return (
		<Card
			className={cn(
				"relative flex-1 w-full h-auto overflow-hidden",
				className
			)}
		>
			<div className="absolute top-0 left-0 bottom-0 right-0 items-center px-5 py-24 bg-[radial-gradient(155%_130%_at_50%_0%,_#000_40%,_hsl(var(--foreground))_100%)]"></div>
			<div className="absolute flex items-center justify-between top-2 left-2 right-2 z-[1]">
				<div className="flex items-center gap-1 p-1 text-sm rounded-full top-1 left-1 bg-secondary/60 glass font-ox">
					<Avatar shape="circle" className="w-7 h-7">
						<AvatarImage src="./logo.svg" />
					</Avatar>
					<h4>ElectroFusion</h4>
				</div>
				<Link
					href="/"
					className="flex items-center gap-1 px-2 py-1 text-sm transition-colors rounded-full right-1 bg-secondary/60 hover:bg-secondary/80 top-1"
				>
					Back to site
					<ArrowRight className="w-4 h-4" />
				</Link>
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
								{textData[currentIndex].title}
							</h1>
							<h1 className="mt-2 text-2xl font-light text-muted-foreground">
								{textData[currentIndex].subtitle}
							</h1>
						</div>
					</motion.div>
				</AnimatePresence>

				<div className="flex items-center justify-center gap-3 mt-20">
					{textData.map((_, index) => (
						<div
							key={index}
							className="relative w-10 h-2 overflow-hidden rounded-full bg-primary"
						>
							<motion.div
								key={`${currentIndex}-${index}`}
								initial={{ width: 0 }}
								animate={{
									width:
										index === currentIndex
											? "100%"
											: "100%",
									opacity: currentIndex >= index ? 1 : 0,
								}}
								transition={{
									duration: index === currentIndex ? 6 : 0,
									ease: "linear",
								}}
								className="absolute top-0 left-0 h-2 rounded-full bg-primary-foreground"
							/>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}
