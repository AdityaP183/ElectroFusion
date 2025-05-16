"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function MarqueeBackground({
	images,
	className,
}: {
	images: string[];
	className?: string;
}) {
	const chunkSize = Math.ceil(images.length / 4);
	const chunks = Array.from({ length: 4 }, (_, colIndex) => {
		const start = colIndex * chunkSize;
		return images.slice(start, start + chunkSize);
	});

	return <div>MarqueeBackground</div>;
}
