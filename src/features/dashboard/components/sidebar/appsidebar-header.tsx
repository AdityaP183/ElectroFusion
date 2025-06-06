"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Role } from "../../../../../convex/schema";
import { useQueryState } from "nuqs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type VendorDoc = Doc<"vendors">;
type VendorShopDoc = Doc<"vendorShops">;

type VendorWithShops =
	| (VendorDoc & {
			shops: VendorShopDoc[];
	  })
	| null;

interface Props {
	role: Role;
	vendorData?: VendorWithShops;
}

export default function AppSidebarHeader({ role, vendorData }: Props) {
	const [activeShopId, setActiveShopId] = useQueryState("activeShop", {
		defaultValue: "",
		shallow: false,
	});

	useEffect(() => {
		if (vendorData?.shops && vendorData.shops.length > 0 && !activeShopId) {
			setActiveShopId(vendorData.shops[0]._id);
		}
	}, [vendorData, activeShopId, setActiveShopId]);

	return role === "admin" ? (
		<AdminHeader />
	) : (
		<VendorHeader
			shops={vendorData?.shops}
			activeShop={activeShopId}
			setActiveShop={setActiveShopId}
		/>
	);
}

function AdminHeader() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<HeaderCard avatarStyle="/logo.svg" />
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

interface VendorHeaderProps {
	shops?: VendorShopDoc[];
	activeShop: string;
	setActiveShop: (shop: string) => void;
}

function VendorHeader({ shops, activeShop, setActiveShop }: VendorHeaderProps) {
	const isMobile = useIsMobile();
	const currentShop = shops?.find((shop) => shop._id === activeShop);
	const hasShops = shops && shops.length > 0;

	if (!hasShops) return <VendorNoShops />;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="bg-secondary">
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<Avatar className="w-6 h-6">
									<AvatarImage
										src={currentShop?.logo || "/logo.svg"}
									/>
								</Avatar>
							</div>
							<div className="grid flex-1 text-left text-xl leading-tight">
								<span className="truncate font-bold">
									{currentShop?.name}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Shops
						</DropdownMenuLabel>
						{shops &&
							shops.map((shop, index) => (
								<DropdownMenuItem
									key={shop._id}
									onClick={() => setActiveShop(shop._id)}
									className="gap-2 p-2"
								>
									<div className="flex size-6 items-center justify-center rounded-md border">
										<Avatar className="w-6 h-6">
											<AvatarImage
												src={shop.logo || "/logo.svg"}
											/>
										</Avatar>
									</div>
									{shop.name}
								</DropdownMenuItem>
							))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">
								Add team
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function HeaderCard({ avatarStyle }: { avatarStyle: string }) {
	return (
		<Card className="p-0 border-none bg-accent rounded-md">
			<div className="flex items-center gap-2 p-2">
				<Avatar className="w-6 h-6">
					<AvatarImage src={avatarStyle} />
				</Avatar>
				<span className="text-xl font-bold mb-0.5">ElectroFusion</span>
			</div>
		</Card>
	);
}

function VendorNoShops() {
	return (
		<Card className="p-1 border-none bg-accent rounded-md">
			<div className="flex items-center justify-center border-2 border-dashed rounded-md gap-2 py-0.5">
				<Plus className="w-6 h-6" />
				<span className="text-xl font-bold mb-0.5">Add Shop</span>
			</div>
		</Card>
	);
}

export function HeaderLoader() {
	return (
		<Card className="p-0 border-none bg-accent rounded-md">
			<div className="flex items-center gap-2 p-2">
				<div className="w-6 h-6 rounded-md animate-pulse bg-gray-600" />
				<div className="h-5 rounded-md w-full mb-0.5 animate-pulse bg-gray-600" />
			</div>
		</Card>
	);
}
