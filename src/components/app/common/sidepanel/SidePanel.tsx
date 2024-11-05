import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	ChevronRight,
	ChevronsUpDown,
	Cog,
	Database,
	Home,
	LogOut,
} from "lucide-react";
import { SidebarNestedItem } from "@/types/component.type";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tempUser } from "@/lib/app-data";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SidePanel = ({
	sidebarItems,
	setIsLoggingOut,
}: {
	sidebarItems: SidebarNestedItem[];
	sidebarContent?: React.ReactNode | undefined;
	setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<Sidebar
			collapsible="icon"
			className="group=[[data-collapsible=icon]]:w-[350px]"
		>
			{/*------- Sidebar Header --------*/}
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

			{/*------- Sidebar Content --------*/}
			<SidebarContent className="mt-4">
				{sidebarItems && (
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu className="gap-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-[0.5rem__0.5rem_0]">
								{sidebarItems.map((item) => {
									if (
										item.children &&
										item.children.length > 0
									) {
										return (
											<Collapsible
												key={item.name}
												asChild
												defaultOpen={pathname.includes(
													item.name.toLowerCase()
												)}
												className="group/collapsible"
											>
												<SidebarMenuItem>
													<CollapsibleTrigger asChild>
														<SidebarMenuButton
															tooltip={item.name}
															className={`text-xl active:bg-secondary [&>svg]:size-[18px] ${
																pathname ===
																	item.path ||
																item.children?.some(
																	(child) =>
																		pathname ===
																		child.path
																)
																	? "group-data-[collapsible=icon]:bg-secondary hover:bg-secondary"
																	: "hover:bg-secondary/60"
															}`}
															tooltipStyling="bg-secondary bg-opacity-80 text-primary"
														>
															{item.icon && (
																<item.icon className="w-7 h-7" />
															)}
															<span>
																{item.name}
															</span>
															<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
														</SidebarMenuButton>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<SidebarMenuSub>
															{item.children?.map(
																(subItem) => (
																	<SidebarMenuSubItem
																		key={
																			subItem.name
																		}
																	>
																		<SidebarMenuSubButton
																			asChild
																			className={`${
																				item.path ||
																				subItem.path ===
																					pathname
																					? "bg-secondary hover:bg-secondary"
																					: "hover:bg-secondary/60"
																			}`}
																		>
																			<Link
																				to={
																					subItem.path ||
																					"/"
																				}
																			>
																				<span>
																					{
																						subItem.name
																					}
																				</span>
																			</Link>
																		</SidebarMenuSubButton>
																	</SidebarMenuSubItem>
																)
															)}
														</SidebarMenuSub>
													</CollapsibleContent>
												</SidebarMenuItem>
											</Collapsible>
										);
									}

									return (
										<SidebarMenuItem key={item.name}>
											<SidebarMenuButton
												asChild
												className={`text-xl active:bg-secondary [&>svg]:size-[18px] py-4  ${
													pathname === item.path
														? "bg-secondary hover:bg-secondary"
														: "hover:bg-secondary/60"
												}`}
												tooltip={item.name}
												tooltipStyling="bg-secondary bg-opacity-80 text-primary"
											>
												<Link to={item.path || "/"}>
													{item.icon && (
														<item.icon className="w-7 h-7" />
													)}
													<span>{item.name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>

			{/*------- Sidebar Footer --------*/}
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
									{tempUser.role === "admin" && (
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
									)}
									<DropdownMenuItem
										onClick={() =>
											navigate(
												`/${tempUser.role}/settings`,
												{
													replace: true,
												}
											)
										}
									>
										<Cog />
										Settings
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => setIsLoggingOut(true)}
								>
									<LogOut />
									Log out
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
