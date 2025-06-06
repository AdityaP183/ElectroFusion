import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import AppSidebarHeader, { HeaderLoader } from "./appsidebar-header";
import AppSidebarUserControls from "./appsidebar-user-controls";
import AppSidebarLinks from "./appsidebar-links";

export default async function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const userId = (await currentUser())?.id;
	const dbUser = await fetchQuery(api.users.getUser, {
		userId: userId || "",
	});

	if (!dbUser) return null;

	const vendor = await fetchQuery(api.vendor.getVendorDetailsWithShops, {
		userId: dbUser._id,
	});

	return (
		<Sidebar collapsible="icon" {...props} className="relative group">
			<SidebarHeader>
				<AppSidebarHeader role={dbUser.role} vendorData={vendor} />
			</SidebarHeader>
			<SidebarContent>
				<AppSidebarLinks role={dbUser.role} />
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarUserControls dbUser={dbUser} />
			</SidebarFooter>
		</Sidebar>
	);
}

export function AppSidebarLoading() {
	return (
		<>
			<SidebarHeader>
				<HeaderLoader />
			</SidebarHeader>
			<SidebarContent></SidebarContent>
			<SidebarFooter></SidebarFooter>
		</>
	);
}
