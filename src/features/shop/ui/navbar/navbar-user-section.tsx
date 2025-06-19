"use client";

import UserButtonSkeleton from "@/components/loading-skeletons/user-button-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Pill } from "@/components/ui/pill";
import { useClerk, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Cog, LogOut, Package, ShoppingCart, Tags } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";

export default function NavbarUserSection({
	isLoaded,
	isSignedIn,
}: {
	isLoaded: boolean;
	isSignedIn: boolean | undefined;
}) {
	const { user } = useUser();
	const dbUser = useQuery(api.users.getUser, { userId: user?.id || "" });

	return (
		<NavigationMenuList className="flex items-center gap-5 mr-3">
			<NavigationMenuItem>
				<Pill className="py-2">
					<ShoppingCart className="size-6 stroke-3" />0
				</Pill>
			</NavigationMenuItem>
			{isLoaded &&
				isSignedIn &&
				dbUser &&
				(dbUser.role === "admin" || dbUser.role === "vendor") && (
					<NavigationMenuItem>
						<Link
							href={`/dashboard/${user?.id}`}
							className="cursor-pointer"
						>
							<Button className="bg-secondary/80 border-border border rounded-full text-foreground hover:bg-secondary/30 cursor-pointer">
								Dashboard
							</Button>
						</Link>
					</NavigationMenuItem>
				)}
			{isLoaded ? (
				isSignedIn && (
					<UserButton>
						<Button variant="outline">
							<Avatar shape="circle" className="w-7 h-7">
								<AvatarImage src={user?.imageUrl} />
								<AvatarFallback>
									{user?.firstName}
								</AvatarFallback>
							</Avatar>
							{user?.firstName}
						</Button>
					</UserButton>
				)
			) : (
				<UserButtonSkeleton />
			)}
		</NavigationMenuList>
	);
}

function UserButton({ children }: { children: React.ReactNode }) {
	const { signOut } = useClerk();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="rounded-full px-2">
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60 glass p-1.5 bg-popover/60">
				<DropdownMenuGroup className="grid grid-cols-2 gap-2 *:bg-accent mb-2 *:cursor-pointer">
					<DropdownMenuItem>
						<Package /> Orders
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShoppingCart /> Cart
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href={"/shop/wishlists"}
							className="flex items-center gap-2"
						>
							<Tags /> Wishlist
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link
						href={"/shop/settings"}
						className="flex items-center gap-2"
					>
						<Cog /> Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
