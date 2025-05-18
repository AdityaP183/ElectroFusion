"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";
import { CategoryWithChildren } from "@/lib/app-types";

export default function NavbarCategories({
	categories,
}: {
	categories: CategoryWithChildren[] | undefined;
}) {
	if (!categories) {
		return (
			<div className="w-[400px] md:w-[500px] lg:w-[700px] p-4 flex items-center justify-center">
				<div className="h-6 w-6 animate-spin border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	}

	return (
		<div className="w-[400px] md:w-[500px] lg:w-[700px] p-4">
			<div className="flex items-center justify-between mb-2">
				<h2 className="font-semibold text-lg">All Categories</h2>
				<Pill>
					<Link
						href="/shop/category/all"
						className="text-xs text-primary hover:text-primary/80 hover:underline"
					>
						View All
					</Link>
				</Pill>
			</div>
			<Separator className="mb-4" />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
				{categories.map((category) => (
					<CategoryItem key={category._id} category={category} />
				))}
			</div>
		</div>
	);
}

function CategoryItem({ category }: { category: CategoryWithChildren }) {
	const hasChildren = category.children && category.children.length > 0;

	return (
		<div className="mb-3">
			<div className="flex items-center group">
				<Link
					href={`/shop/category/${category.slug}`}
					className={cn(
						"font-medium text-sm truncate hover:text-primary transition-colors hover:underline",
						hasChildren ? "max-w-[80%]" : "max-w-full"
					)}
				>
					{category.name}
				</Link>
			</div>

			{hasChildren && (
				<ul className="ml-5 mt-1 border-l pl-2 border-border/40 space-y-1">
					{category.children.map((child) => (
						<li key={child._id} className="flex items-center group">
							<Link
								href={`/shop/category/${category.slug}/${child.slug}`}
								className="text-xs text-muted-foreground truncate max-w-[90%] group-hover:text-primary transition-colors group-hover:underline"
							>
								{child.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
