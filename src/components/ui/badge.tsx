import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

const categoryStyles = {
	Smartphones: { bgColor: "#e11d48" },
	Laptops: { bgColor: "#2563eb" },
	Computers: { bgColor: "#059669" },
	Tablets: { bgColor: "#a16207" },
	Smartwatches: { bgColor: "#9a3412" },
	Cameras: { bgColor: "#4d7c0f" },
	Headphones: { bgColor: "#8B4513" },
	"Gaming Consoles": { bgColor: "#4f46e5" },
	Televisions: { bgColor: "#B22222" },
};

const orderStatusStyles = {
	pending: { bgColor: "#b45309" },
	processing: { bgColor: "#ea580c" },
	shipped: { bgColor: "#0891b2" },
	delivered: { bgColor: "#16a34a" }, // Blue
	cancelled: { bgColor: "#dc2626" }, // Red
};

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	category?: keyof typeof categoryStyles;
	orderStatus?: keyof typeof orderStatusStyles;
}

function Badge({
	className,
	variant,
	category,
	orderStatus,
	...props
}: BadgeProps) {
	const categoryStyle = category ? categoryStyles[category] : null;
	const orderStatusStyle = orderStatus
		? orderStatusStyles[orderStatus]
		: null;

	const dynamicStyles = categoryStyle
		? { backgroundColor: categoryStyle.bgColor }
		: orderStatusStyle
		? { backgroundColor: orderStatusStyle.bgColor }
		: {};

	return (
		<div
			className={cn(badgeVariants({ variant }), className)}
			style={dynamicStyles}
			{...props}
		/>
	);
}

export { Badge };
