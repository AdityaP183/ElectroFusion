import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import AppSidebarHeader from "./appsidebar-header";
import AppSidebarUserControls from "./appsidebar-user-controls";
import AppSidebarLinks from "./appsidebar-links";
import { ChevronsLeft } from "lucide-react";
// import ShopHeader from "./shop-header";
// import SidebarUser from "./sidebar-user";
// import { SidebarLinks } from "./sidebar-links";

export default async function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	// const userId = (await currentUser())?.id;
	// const dbUser = await fetchQuery(api.users.getUser, { userId: userId || "" });
	const user = {
		_creationTime: 1747508590183.354,
		_id: "j57bya8rh756m856s2nrk93yf17g2j3e",
		clerkId: "user_2xEgLNzjCMYE20BYUrq5K45PTvX",
		email: "adityaprasad1828@gmail.com",
		firstName: "Aditya",
		imageUrl:
			"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeEVnTEtiUElSOTRVODRLQnpKeUNhYnhyczEifQ",
		lastName: "Prasad",
		role: "admin",
	};

	return (
		<Sidebar collapsible="icon" {...props} className="relative group">
			<SidebarHeader>
				<AppSidebarHeader role={user.role} />
			</SidebarHeader>
			<SidebarContent>
				<AppSidebarLinks role={user.role} />
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarUserControls dbUser={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
