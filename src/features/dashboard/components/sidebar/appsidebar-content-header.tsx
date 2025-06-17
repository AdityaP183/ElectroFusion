"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/app-data";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";

export default function AppSidebarContentHeader() {
	const { user } = useUser();
	const dbUser = useQuery(api.users.getUser, {
		userId: user?.id || "",
	});

	const pathname = usePathname();

	if (!dbUser) return null;

	// Function to find matching route and build breadcrumb path
	const getBreadcrumbPath = () => {
		const currentSidebarData =
			sidebarData[dbUser?.role as "admin" | "vendor"];
		const allItems = [
			...currentSidebarData.navMain,
			...currentSidebarData.others,
		];

		// Handle root path
		if (pathname === "/") {
			return [{ title: "Dashboard", href: "/" }];
		}

		const breadcrumbPath = [];

		// Find matching parent and child items
		for (const item of allItems) {
			// Check if current path matches parent item
			if (
				pathname === item.href ||
				pathname.startsWith(item.href + "/")
			) {
				breadcrumbPath.push({ title: item.title, href: item.href });

				// Check for child items if parent has items
				if (item.items) {
					for (const childItem of item.items) {
						if (pathname === childItem.href) {
							breadcrumbPath.push({
								title: childItem.title,
								href: childItem.href,
							});
							break;
						}
					}
				}
				break;
			}
		}

		// If no exact match found, create breadcrumbs from path segments
		if (breadcrumbPath.length === 0) {
			const segments = pathname.split("/").filter(Boolean);
			let currentPath = "";

			segments.forEach((segment, index) => {
				currentPath += "/" + segment;
				const title =
					segment.charAt(0).toUpperCase() +
					segment.slice(1).replace(/-/g, " ");
				breadcrumbPath.push({ title, href: currentPath });
			});
		}

		return breadcrumbPath;
	};

	const breadcrumbPath = getBreadcrumbPath();

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbPath.map((crumb, index) => (
							<div key={crumb.href} className="flex items-center">
								{index > 0 && (
									<BreadcrumbSeparator className="hidden md:block" />
								)}
								<BreadcrumbItem className="hidden md:block">
									{index === breadcrumbPath.length - 1 ? (
										<BreadcrumbPage>
											{crumb.title}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink href={crumb.href}>
											{crumb.title}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</div>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
