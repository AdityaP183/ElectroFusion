"use client";

import { useParams, usePathname } from "next/navigation";
import { ChevronsRightIcon, HomeIcon, LucideIcon } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { cn } from "@/lib/utils";

export default function InfoStrip() {
	const params = useParams();
	const pathname = usePathname();

	const category = params.category || undefined;
	const subcategory = params.subcategory || undefined;

	return (
		<div className="mt-4 mb-6 space-y-2">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">
							<Badge
								variant="outline"
								className="text-muted-foreground hover:text-foreground rounded-full"
							>
								<HomeIcon className="size-4 mr-1" />
								Home
							</Badge>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{category && (
						<>
							<BreadcrumbSeparator>
								<ChevronsRightIcon className="size-4" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/shop/category/${category}`}
								>
									<Badge
										variant="outline"
										className={cn(
											"text-muted-foreground hover:text-foreground rounded-full capitalize",
											pathname ===
												`/shop/category/${category}` &&
												"bg-primary/10 hover:bg-primary/30 text-foreground border-foreground/30"
										)}
									>
										{category === "all"
											? "All Categories"
											: category}
									</Badge>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
					{subcategory && (
						<>
							<BreadcrumbSeparator>
								<ChevronsRightIcon className="size-4" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/shop/category/${category}`}
								>
									<Badge
										variant="outline"
										className={cn(
											"text-muted-foreground hover:text-foreground rounded-full capitalize",
											pathname ===
												`/shop/category/${category}/${subcategory}` &&
												"bg-primary/10 hover:bg-primary/30 text-foreground border-foreground/30"
										)}
									>
										{subcategory}
									</Badge>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>

			<div>
				<h1 className="text-2xl font-semibold">Browse By Categories</h1>
			</div>
		</div>
	);
}
