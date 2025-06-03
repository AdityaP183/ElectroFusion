"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/app-data";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavItemProps, SidebarSubLink, SubNavItemProps } from "@/lib/app-types";

interface Props{
    role: string
}

export default function AppSidebarLinks({ role }: Props) {
	const sidebarLinks = role === "admin" ? sidebarData.admin : sidebarData.vendor;
	const pathname = usePathname();

	const { openSections, toggleSection } = useSidebarState(
		pathname,
		sidebarLinks.navMain,
		sidebarLinks.others
	);

	return (
		<>
			<SidebarGroup className="group-data-[collapsible=icon]:p-0">
				<SidebarGroupLabel>Platform</SidebarGroupLabel>
				<SidebarMenu>
					{sidebarLinks.navMain.map((link) => (
						<NavItem
							key={link.id}
							link={link}
							pathname={pathname}
							isOpen={!!openSections[link.id]}
							onToggle={() => toggleSection(link.id)}
						/>
					))}
				</SidebarMenu>
			</SidebarGroup>
			<SidebarGroup className="group-data-[collapsible=icon]:p-0">
				<SidebarGroupLabel>Others</SidebarGroupLabel>
				<SidebarMenu>
					{sidebarLinks.others.map((link) => (
						<NavItem
							key={link.id}
							link={link}
							pathname={pathname}
							isOpen={!!openSections[link.id]}
							onToggle={() => toggleSection(link.id)}
						/>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}

function NavItem({ link, pathname, isOpen, onToggle }: NavItemProps) {
	const Icon = link.icon;
	const isActive =
		pathname === link.href || pathname.startsWith(`${link.href}/`);

	// If this is a submenu parent
	if (link.items?.length) {
		const isGroupActive = link.items.some(
			(item) =>
				pathname === item.href || pathname.startsWith(`${item.href}/`)
		);

		return (
			<Collapsible
				asChild
				className="group/collapsible"
				open={isOpen}
				onOpenChange={onToggle}
			>
				<SidebarMenuItem>
					<CollapsibleTrigger asChild>
						<SidebarMenuButton
							tooltip={link.title}
							className={cn(
								"transition-colors duration-200",
								isGroupActive &&
									"bg-accent text-accent-foreground"
							)}
						>
							{Icon && (
								<Icon
									className={cn(
										"flex-shrink-0 transition-colors duration-200",
										isGroupActive &&
											"text-accent-foreground"
									)}
								/>
							)}
							<span>{link.title}</span>
							<ChevronRight
								className={cn(
									"ml-auto transition-transform duration-200",
									isOpen && "rotate-90"
								)}
							/>
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<SidebarMenuSub>
							{link.items.map((subItem: SidebarSubLink) => (
								<SubNavItem
									key={subItem.id}
									subItem={subItem}
									pathname={pathname}
								/>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		);
	}

	// Regular link item
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				tooltip={link.title}
				asChild
				className={cn(
					"transition-colors duration-200",
					isActive && "bg-accent text-accent-foreground"
				)}
			>
				<Link href={link.href}>
					{Icon && (
						<Icon
							className={cn(
								"flex-shrink-0 transition-colors duration-200",
								isActive && "text-accent-foreground"
							)}
						/>
					)}
					<span>{link.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

export function SubNavItem({ subItem, pathname }: SubNavItemProps) {
	const isActive =
		pathname === subItem.href || pathname.startsWith(`${subItem.href}/`);

	return (
		<SidebarMenuSubItem>
			<SidebarMenuSubButton
				asChild
				className={cn(
					"transition-colors duration-200",
					isActive && "bg-accent text-accent-foreground"
				)}
			>
				<Link href={subItem.href}>
					<span>{subItem.title}</span>
				</Link>
			</SidebarMenuSubButton>
		</SidebarMenuSubItem>
	);
}
