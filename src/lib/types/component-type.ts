import { LucideIcon } from "lucide-react";

export type SidebarItem = {
	name: string;
	path?: string;
	icon?: LucideIcon;
};

export type SidebarNestedItem = SidebarItem & {
	children?: SidebarItem[];
};
