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
import {
	Headphones,
	LogOut,
	Package,
	ShoppingCart,
	Tags,
	User,
} from "lucide-react";

export default function NavbarUserSection({
	isLoaded,
	isSignedIn,
}: {
	isLoaded: boolean;
	isSignedIn: boolean | undefined;
}) {
	const { user } = useUser();

	return (
		<NavigationMenuList className="flex items-center gap-5 mr-3">
			<NavigationMenuItem>
				<Pill className="py-2">
					<ShoppingCart className="size-6 stroke-3" />0
				</Pill>
			</NavigationMenuItem>
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
    const {signOut} = useClerk()
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
						<Tags /> Wishlist
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User /> Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Headphones /> Help Center
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
