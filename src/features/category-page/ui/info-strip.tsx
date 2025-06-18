"use client";

import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, slugToText } from "@/lib/utils";
import { ChevronsRightIcon, HomeIcon } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function InfoStrip() {
	const params = useParams();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isBrowse = pathname.includes("/shop/browse");
	const browseType = searchParams.get("type") || undefined;

	const category = (params.category as string) || undefined;
	const subcategory = (params.subcategory as string) || undefined;

	return (
		<div className="mt-4 mb-6 space-y-2">
			<ShowBreadCrumb
				isBrowsePage={isBrowse}
				browseType={browseType}
				pathname={pathname}
				category={category}
				subcategory={subcategory}
			/>
			<div>
				<h1 className="text-2xl">
					Browse{" "}
					<span className="font-semibold">
						{!isBrowse
							? "Categories"
							: browseType
							? slugToText(browseType)
							: ""}
					</span>
				</h1>
			</div>
		</div>
	);
}

interface ShowBreadCrumbProps {
	pathname: string;
	isBrowsePage: boolean;
	browseType?: string;
	category?: string | undefined;
	subcategory?: string | undefined;
}

function ShowBreadCrumb({
	isBrowsePage,
	browseType,
	pathname,
	category,
	subcategory,
}: ShowBreadCrumbProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/* Deafult Home */}
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

				{/* Showing this if on /shop/browse */}
				{isBrowsePage && browseType && (
					<>
						<BreadcrumbSeparator>
							<ChevronsRightIcon className="size-4" />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink
								href={`/shop/browse?type=${browseType}`}
							>
								<Badge
									variant="outline"
									className="bg-primary/10 hover:bg-primary/30 text-foreground border-foreground/30 rounded-full capitalize"
								>
									{slugToText(browseType)}
								</Badge>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</>
				)}

				{/* Showing this if on /shop/category/[category] */}
				{!isBrowsePage && category && (
					<>
						<BreadcrumbSeparator>
							<ChevronsRightIcon className="size-4" />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/shop/category/${category}`}>
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

				{/* Showing this if on /shop/category/[category]/[subcategory] */}
				{!isBrowsePage && category && subcategory && (
					<>
						<BreadcrumbSeparator>
							<ChevronsRightIcon className="size-4" />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink
								href={`/shop/category/${category}/${subcategory}`}
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
	);
}
