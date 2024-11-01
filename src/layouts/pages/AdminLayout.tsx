import TopBar from "@/components/app/common/dashboard/TopBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sidebarItems, tempUser } from "@/lib/app-data";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Cog, Database, Home, LogOut } from "lucide-react";

const AdminLayout = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div className="block w-full h-screen gap-1 md:flex">
			<SidebarProvider>
				<Sidebar
					collapsible="icon"
					className="group=[[data-collapsible=icon]]:w-[350px]"
				>
					<SidebarHeader className="mt-1.5">
						<SidebarMenu>
							<SidebarMenuItem className="group-data-[collapsible=icon]:items-center">
								<div className="flex items-center gap-3 p-2">
									<Avatar shape="square" className="w-8 h-8">
										<AvatarImage src="/logo.svg" />
									</Avatar>
									<span className="text-2xl font-bold font-ox group-data-[collapsible=icon]:hidden">
										ElectroFusion
									</span>
								</div>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarHeader>
					<SidebarContent className="mt-4">
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu className="gap-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-[0.5rem__0.5rem_0]">
									{sidebarItems.map((item) => (
										<SidebarMenuItem key={item.name}>
											<SidebarMenuButton
												asChild
												className={`text-xl group-data-[collapsible=icon]:hover:bg-transparent active:bg-secondary [&>svg]:size-[18px] py-4  ${
													pathname === item.path
														? "bg-secondary hover:bg-secondary"
														: "hover:bg-secondary/60"
												}`}
											>
												<Link to={item.path}>
													{item.icon && (
														<item.icon className="w-7 h-7" />
													)}
													<span>{item.name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SidebarMenu className="group-data-[collapsible=icon]:items-center">
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger
										asChild
										className="hover:bg-secondary/60"
									>
										<SidebarMenuButton
											size="lg"
											className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:outline-none group-data-[collapsible=icon]:border-none"
											variant={"outline"}
										>
											<Avatar className="w-8 h-8 rounded-lg">
												<AvatarImage
													src={
														tempUser.avatar ||
														"https://shorturl.at/vIjhF"
													}
													alt={tempUser.username}
												/>
												<AvatarFallback className="rounded-lg">
													{tempUser.username[0]}
												</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-sm leading-tight text-left">
												<span className="font-semibold truncate">
													{tempUser.username}
												</span>
												<span className="text-xs truncate">
													{tempUser.email}
												</span>
											</div>
											<ChevronsUpDown className="ml-auto size-4" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
										side="bottom"
										align="end"
										sideOffset={4}
									>
										<DropdownMenuLabel className="p-0 font-normal">
											<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
												<Avatar className="w-8 h-8 rounded-lg">
													<AvatarImage
														src={
															tempUser.avatar ||
															"https://shorturl.at/vIjhF"
														}
														alt={tempUser.username}
													/>
													<AvatarFallback className="rounded-lg">
														CN
													</AvatarFallback>
												</Avatar>
												<div className="grid flex-1 text-sm leading-tight text-left">
													<span className="font-semibold truncate">
														{tempUser.username}
													</span>
													<span className="text-xs truncate">
														{tempUser.email}
													</span>
												</div>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem
												onClick={() =>
													navigate("/", {
														replace: true,
													})
												}
											>
												<Home />
												Back to Site
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													window.open(
														"https://cloud.appwrite.io/console/",
														"_blank"
													)
												}
											>
												<Database />
												Database
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													navigate(
														"/admin/settings",
														{ replace: true }
													)
												}
											>
												<Cog />
												Settings
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<LogOut />
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset>
					<Card className="h-screen p-0 rounded-none">
						<CardHeader className="px-3 py-3 border-b md:px-5 border-border">
							<TopBar />
						</CardHeader>
						<CardContent className="h-[calc(100%-80px)] w-full overflow-hidden overflow-y-auto py-0">
							<Outlet />
						</CardContent>
					</Card>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
};

export default AdminLayout;
