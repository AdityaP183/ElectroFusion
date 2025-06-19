import {
	ClipboardList,
	Cog,
	LayoutDashboard,
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
				href: "/vendors",
				icon: Users,
				items: [
					{
						id: "all-vendors",
						title: "All Vendors",
						href: "/all",
					},
					{
						id: "new-vendor",
						title: "Vendor Applications",
						href: "/applications",
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
						href: "/all",
					},
					{
						id: "new-category",
						title: "Add Category",
						href: "/new",
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
				href: "/products",
				icon: Package,
				items: [
					{
						id: "all-products",
						title: "All Products",
						href: "/all",
					},
					{
						id: "new-product",
						title: "Add Product",
						href: "/new",
					},
				],
			},
			{
				id: "orders",
				title: "Orders",
				href: "/orders",
				icon: ClipboardList,
			},
		],
		others: [
			{
				id: "settings",
				title: "Settings",
				href: "/settings",
				icon: Cog,
			},
		],
	},
};

export const reviewsData = [
	{
		name: "Sophia",
		username: "@sophia123",
		body: "Absolutely fantastic! Highly recommended for everyone.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Liam",
		username: "@liam45",
		body: "I’ve never been so impressed before. This is game-changing.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Emma",
		username: "@emma_blogs",
		body: "Wow! This exceeded all my expectations. Truly awesome.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Noah",
		username: "@noah_tweets",
		body: "Perfect in every way! I can’t believe how great it is.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Olivia",
		username: "@olivia_writes",
		body: "Incredible! I’ve been recommending it to all my friends.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Elijah",
		username: "@elijah_on",
		body: "Amazing quality and super easy to use. I love it!",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Ava",
		username: "@ava_styles",
		body: "I’m blown away by how good this is. Truly amazing!",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Lucas",
		username: "@lucas_now",
		body: "Brilliant design and functionality. Couldn't ask for more.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Mia",
		username: "@mia_inspo",
		body: "It’s just perfect. Exactly what I needed. Thanks!",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "James",
		username: "@james_day",
		body: "Never seen anything like it. It’s a must-have.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Isabella",
		username: "@bella123",
		body: "This has completely changed the way I do things. Love it!",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Benjamin",
		username: "@benji_reviews",
		body: "Top-notch quality! I can’t recommend it enough.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Charlotte",
		username: "@charlie_world",
		body: "Such a fantastic experience! I’m truly amazed.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Henry",
		username: "@henry_tech",
		body: "Great value for money. Highly impressed with this.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Amelia",
		username: "@amelia_dream",
		body: "Wow, just wow! This is on another level entirely.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "Alexander",
		username: "@alex_codes",
		body: "The attention to detail here is extraordinary. Love it!",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Evelyn",
		username: "@eve_daily",
		body: "Simply the best! I can’t stop talking about it.",
		img: "https://avatar.iran.liara.run/public/girl",
	},
	{
		name: "William",
		username: "@will_pro",
		body: "This has set a new benchmark for quality. Excellent!",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Harper",
		username: "@harper_art",
		body: "Stunning! This has made my life so much easier.",
		img: "https://avatar.iran.liara.run/public/boy",
	},
	{
		name: "Ethan",
		username: "@ethan_live",
		body: "A total game-changer. I’ll be using this for years!",
		img: "https://avatar.iran.liara.run/public/boy",
	},
];
