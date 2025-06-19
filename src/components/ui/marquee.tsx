import { cn } from "@/lib/utils";

interface MarqueeProps {
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	vertical?: boolean;
	repeat?: number;
	[key: string]: unknown;
}

function Marquee({
	className,
	reverse,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	...props
}: MarqueeProps) {
	return (
		<div
			{...props}
			className={cn(
				"group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
				{
					"flex-row": !vertical,
					"flex-col": vertical,
				},
				className
			)}
		>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn(
							"flex shrink-0 justify-around [gap:var(--gap)]",
							{
								"animate-marquee flex-row": !vertical,
								"animate-marquee-vertical flex-col": vertical,
								"group-hover:[animation-play-state:paused]":
									pauseOnHover,
								"[animation-direction:reverse]": reverse,
							}
						)}
					>
						{children}
					</div>
				))}
		</div>
	);
}

const MarqueeCard = ({
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				"dark:border-border dark:bg-secondary/50 dark:hover:bg-accent"
			)}
		>
			<div className="flex flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 from-30% via-80% via-emerald-600 to-100% to-pink-600"/>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium">
						{name}
					</figcaption>
					<p className="text-xs font-medium text-muted-foreground">
						{username}
					</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};

export { Marquee, MarqueeCard };
