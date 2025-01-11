import { ChartLine, LayoutDashboard, Package, PackagePlus, PackageSearch, ShoppingBag, ShoppingCart, Store, Users } from "lucide-react";
import { SidebarNestedItem } from "./types/component-type";

export const loginHeroTexts = [
	{
		line1: "Welcome Back",
		line2: "Continue Exploring",
	},
	{
		line1: "Your Next Adventure",
		line2: "Awaits You",
	},
	{
		line1: "Quick & Easy",
		line2: "Access to Top Brands",
	},
];

export const registerHeroTexts = [
	{
		line1: "Seamless Shopping",
		line2: "Personalized for You",
	},
	{
		line1: "Your One-Stop",
		line2: "Electronics Hub",
	},
	{
		line1: "Discover New Tech",
		line2: "Shop from Anywhere",
	},
];

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

export const adminSidebarItems: SidebarNestedItem[] = [
    {
		name: "Dashboard",
		path: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Sales",
		path: "/admin/sales",
		icon: ChartLine,
	},
	{
		name: "Products",
		path: "/admin/products",
		icon: Package,
	},
	{
		name: "Orders",
		path: "/admin/orders",
		icon: ShoppingCart,
	},
	{
		name: "Vendors",
		path: "/admin/vendors",
		icon: Store,
	},
	{
		name: "Customers",
		path: "/admin/customers",
		icon: Users,
	},
]

export const vendorSidebarItems: SidebarNestedItem[] = [
    {
		name: "Dashboard",
		path: "/vendor/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Sales",
		path: "/vendor/sales",
		icon: ChartLine,
	},
	{
		name: "Products",
		icon: Package,
		children: [
			{
				name: "All Products",
				path: "/vendor/products",
				icon: PackageSearch,
			},
			{
				name: "Add Products",
				path: "/vendor/products/add",
				icon: PackagePlus,
			},
		],
	},
	{
		name: "Orders",
		icon: ShoppingCart,
		children: [
			{
				name: "All Orders",
				path: "/vendor/orders",
				icon: ShoppingCart,
			},
			{
				name: "Manage Orders",
				path: "/vendor/orders/manage",
				icon: ShoppingBag,
			},
		],
	},
]

export const categories = [
    "Smartphones",
    "Laptops",
    "Computers",
    "Tablets",
    "Smartwatches",
    "Cameras",
    "Headphones",
    "Gaming Consoles",
    "Televisions",
] as const

export type Category = typeof categories[number];