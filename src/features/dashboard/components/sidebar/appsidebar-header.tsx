import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Role } from "../../../../../convex/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Props {
	role: string;
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
