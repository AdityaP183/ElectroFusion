"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVendorStore } from "@/store/use-vendor";
import { useUser } from "@clerk/nextjs";
import { ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Role } from "../../../../../convex/schema";

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
	const {
		shops: shopsInStore,
		activeShopId,
		setShops,
		setActiveShop,
	} = useVendorStore();

	useEffect(() => {
		if (vendorData?.shops && vendorData.shops.length > 0) {
			setShops(vendorData.shops);
		}
	}, [vendorData?.shops, setShops]);

	return role === "admin" ? (
		<AdminHeader />
	) : (
		<VendorHeader
			shops={shopsInStore}
			activeShop={activeShopId}
			setActiveShop={setActiveShop}
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
	shops: VendorShopDoc[];
	activeShop: string | null;
	setActiveShop: (shop: string) => void;
}

function VendorHeader({ shops, activeShop, setActiveShop }: VendorHeaderProps) {
	const { user } = useUser();
	const isMobile = useIsMobile();
	const router = useRouter();

	const currentShop = useMemo(() => {
		return shops?.find((shop) => shop._id === activeShop) || null;
	}, [shops, activeShop]);

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
							<div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<Avatar className="w-6 h-6">
									<AvatarImage
										src={currentShop?.logo || "/logo.svg"}
									/>
								</Avatar>
							</div>
							<div className="grid flex-1 text-left text-xl leading-tight">
								<span className="truncate font-bold">
									{currentShop?.name || "Select Shop"}
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
							shops.map((shop) => (
								<DropdownMenuItem
									key={shop._id}
									onClick={() => setActiveShop(shop._id)}
									className="gap-2 p-2"
								>
									<div className="flex size-6 items-center justify-center">
										<Avatar className="w-6 h-6">
											<AvatarImage
												src={shop.logo || "/logo.svg"}
											/>
										</Avatar>
									</div>
									{shop.name}
									{activeShop === shop._id && (
										<span className="ml-auto text-xs text-muted-foreground">
											Active
										</span>
									)}
								</DropdownMenuItem>
							))}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 p-2"
							onClick={() =>
								router.push(`/dashboard/${user?.id}/add-shop`)
							}
						>
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">
								Add shop
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
	const { isLoaded, user } = useUser();

	return (
		<Card className="p-1 border-none bg-accent rounded-md">
			<Link href={isLoaded ? `/dashboard/${user?.id}/add-shop` : "#"}>
				<div className="flex items-center justify-center border-2 border-dashed rounded-md gap-2 py-0.5">
					<Plus className="w-6 h-6" />
					<span className="text-xl font-bold mb-0.5">Add Shop</span>
				</div>
			</Link>
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
