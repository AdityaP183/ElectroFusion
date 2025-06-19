import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const BentoCard = ({
	name,
	className = "",
	background,
	Icon,
	description,
}: {
	name: string;
	className?: string;
	background: ReactNode;
	Icon: LucideIcon;
	description: string;
}) => (
	<div
		key={name}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
			// light styles
			"bg-black [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			// dark styles
			"transform-gpu bg-secondary/50  dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			className
		)}
	>
		<div className="flex items-center justify-center w-full h-full">
			{background}
		</div>
		<div className="absolute bottom-0 z-10 flex flex-col gap-1 p-6 transition-all duration-300 pointer-events-none transform-gpu group-hover:-translate-y-10">
			<Icon className="w-12 h-12 transition-all duration-300 ease-in-out origin-left transform-gpu text-primary-foreground group-hover:scale-75" />
			<h3 className="text-xl font-semibold text-foreground">{name}</h3>
			<p className="max-w-lg text-muted-foreground">{description}</p>
		</div>
		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard };
