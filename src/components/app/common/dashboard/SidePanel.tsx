import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems, tempUser } from "@/lib/app-data";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
	const navigate = useNavigate();

	return (
		<Sidebar className="bg-secondary">
			<SidebarHeader>
				{/* <div className="flex items-center gap-3 p-2">
					<Avatar shape="square" className="w-8 h-8">
						<AvatarImage src="/logo.svg" />
					</Avatar>
					<h1 className="hidden text-2xl font-bold lg:block font-ox data-[state=collapsed]:hidden">
						ElectroFusion
					</h1>
				</div> */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
						>
							<div className="flex items-center gap-3 p-2">
								<Avatar shape="square" className="w-8 h-8">
									<AvatarImage src="/logo.svg" />
								</Avatar>
								<h1 className="hidden text-2xl font-bold lg:block font-ox data-[state=collapsed]:hidden">
									ElectroFusion
								</h1>
							</div>
							{/* <ChevronsUpDown className="ml-auto" /> */}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{sidebarItems.map((item) => (
						<SidebarMenuItem key={item.name}>
							{item.icon && <item.icon />}
							{item.name}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="hover:bg-secondary"
								>
									<Avatar className="w-8 h-8 rounded-lg">
										<AvatarImage
											src={
												tempUser.avatar ||
												"https://shorturl.at/vIjhF"
											}
											alt={tempUser.first_name}
										/>
										<AvatarFallback className="rounded-lg">
											{tempUser.first_name[0]}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-sm leading-tight text-left">
										<span className="font-semibold truncate">
											{`${tempUser.first_name} ${tempUser.last_name}`}
										</span>
										<span className="text-xs capitalize truncate text-muted-foreground">
											{tempUser.role}
										</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								align="start"
								side="bottom"
								sideOffset={4}
							>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/${tempUser.role}/settings`, {
											replace: true,
										});
									}}
								>
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										navigate("/", { replace: true });
									}}
								>
									Back to Site
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
export default SidePanel;
