"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronsUpDown, Home, Link, LogOut } from "lucide-react";
import { Doc } from "../../../../../convex/_generated/dataModel";

interface Props {
	dbUser: Doc<"users">;
}

export default function AppSidebarUserControls({ dbUser }: Props) {
	const { isLoaded, isSignedIn } = useUser();
	const { signOut } = useClerk();
	const { isMobile } = useSidebar();

	if (!isLoaded || !isSignedIn) return null;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="bg-secondary">
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={dbUser.imageUrl}
									alt={dbUser.firstName}
								/>
								<AvatarFallback className="rounded-lg">
									{dbUser.firstName[0]}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{dbUser.firstName}
								</span>
								<span className="truncate text-xs uppercase font-bold text-muted-foreground">
									{dbUser.role}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-[14.8rem] rounded-lg"
						side={isMobile ? "bottom" : "top"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={dbUser.imageUrl}
										alt={dbUser.firstName}
									/>
									<AvatarFallback className="rounded-lg">
										{dbUser.firstName[0]}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{dbUser.firstName +
											" " +
											dbUser.lastName}
									</span>
									<span className="truncate text-xs">
										{dbUser.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link
									href={"/shop"}
									className="flex items-center gap-2"
								>
									<Home />
									Go Home
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
