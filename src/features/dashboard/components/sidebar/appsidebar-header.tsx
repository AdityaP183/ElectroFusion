import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Role } from "../../../../../convex/schema";

interface Props {
	role: Role;
}

export default function AppSidebarHeader({ role }: Props) {
	return role === "admin" ? <AdminHeader /> : <VendorHeader />;
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

function VendorHeader() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<HeaderCard avatarStyle="/logo.svg" />
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
