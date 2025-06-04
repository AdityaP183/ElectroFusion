import {
	ClipboardList,
	Cog,
	LayoutDashboard,
	Lightbulb,
	Package,
	LucideIcon,
	Tags,
	Flame,
	TrendingUp,
	Award,
	Users,
} from "lucide-react";

export const signInHeroTexts = [
	{
		title: "Welcome Back",
		subtitle: "Your Tech Journey Continues",
	},
	{
		title: "Explore Smarter",
		subtitle: "With Every Login",
	},
	{
		title: "Access the Latest",
		subtitle: "Top Brands in One Click",
	},
];

export const signUpHeroTexts = [
	{
		title: "Start Your Smart Life",
		subtitle: "With Curated Tech Picks",
	},
	{
		title: "Join the Future",
		subtitle: "Of Electronics Shopping",
	},
	{
		title: "Your Gateway to Innovation",
		subtitle: "Begins Here",
	},
];

export const navbarLinks: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export const navBrowseLinks = [
	{
		title: "Latest Collections",
		slug: "latest-collections",
		icon: Flame,
	},
	{
		title: "Trending",
		slug: "trending",
		icon: TrendingUp,
	},
	{
		title: "Best Sellers",
		slug: "best-sellers",
		icon: Award,
	},
];

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

export const sidebarData = {
	admin: {
		navMain: [
			{
				id: "dashboard",
				title: "Dashboard",
				href: "/",
				icon: LayoutDashboard,
			},
			{
				id: "vendors",
				title: "Vendors",
				href: "/",
				icon: Users,
				items: [
					{
						id: "all-vendors",
						title: "All Vendors",
						href: "/",
					},
					{
						id: "new-vendor",
						title: "Vendor Applications",
						href: "/",
					},
				],
			},
			{
				id: "categories",
				title: "Categories",
				href: "/categories",
				icon: Tags,
				items: [
					{
						id: "all-categories",
						title: "All Categories",
						href: "/categories/all",
					},
					{
						id: "new-category",
						title: "Add Category",
						href: "/categories/new",
					},
				],
			},
		],
		others: [
			{
				id: "settings",
				title: "Settings",
				href: "/settings",
				icon: Cog,
			},
			{
				id: "actions",
				title: "Actions",
				href: "/actions",
				icon: Lightbulb,
				items: [
					{
						id: "applications",
						title: "Applications",
						href: "/actions/applications",
					},
					{
						id: "announcements",
						title: "Announcements",
						href: "/actions/announcements",
					},
					{
						id: "report-query",
						title: "Report Query",
						href: "/actions/report-query",
					},
				],
			},
		],
	},
	vendor: {
		navMain: [
			{
				id: "dashboard",
				title: "Dashboard",
				href: "/",
				icon: LayoutDashboard,
			},
			{
				id: "products",
				title: "Products",
				href: "/dashboard/products",
				icon: Package,
				items: [
					{
						id: "all-products",
						title: "All Products",
						href: "/products/all",
					},
					{
						id: "new-product",
						title: "Add Product",
						href: "/products/new",
					},
				],
			},
			{
				id: "orders",
				title: "Orders",
				href: "/orders",
				icon: ClipboardList,
				items: [
					{
						id: "all-orders",
						title: "All Orders",
						href: "/orders/all",
					},
					{
						id: "pending-orders",
						title: "Pending",
						href: "/orders/pending",
					},
					{
						id: "completed-orders",
						title: "Completed",
						href: "/orders/completed",
					},
				],
			},
		],
		others: [
			{
				id: "settings",
				title: "Settings",
				href: "/settings",
				icon: Cog,
			},
			{
				id: "actions",
				title: "Actions",
				href: "/actions",
				icon: Lightbulb,
				items: [
					{
						id: "applications",
						title: "Applications",
						href: "/actions/applications",
					},
					{
						id: "announcements",
						title: "Announcements",
						href: "/actions/announcements",
					},
					{
						id: "report-query",
						title: "Report Query",
						href: "/actions/report-query",
					},
				],
			},
		],
	},
};
