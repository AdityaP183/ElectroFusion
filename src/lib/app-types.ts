import { LucideIcon } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";

export type AuthCardSliderText = {
	title: string;
	subtitle: string;
};

export type CategoryWithChildren = Doc<"categories"> & {
	children: CategoryWithChildren[];
};

export interface SidebarItemBase {
	id: string;
	title: string;
	icon?: LucideIcon;
}

export interface SidebarLink extends SidebarItemBase {
	href: string;
	items?: SidebarSubLink[];
}

export interface SidebarSubLink {
	id: string;
	title: string;
	href: string;
}

export interface NavItemProps {
	link: SidebarLink;
	pathname: string;
	isOpen: boolean;
	onToggle: () => void;
}

export interface SubNavItemProps {
	subItem: SidebarSubLink;
	pathname: string;
}

export type UploadedFile = {
	imgFile: File;
	img: string;
	name: string;
};
