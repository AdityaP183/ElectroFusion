import {
	LayoutDashboard,
	Package,
	PackagePlus,
	PackageSearch,
	RotateCcw,
	Shield,
	ShoppingCart,
	Truck,
	Wallet,
} from "lucide-react";
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
		name: "Products",
		path: "/admin/products",
		icon: Package,
	},
	{
		name: "Orders",
		path: "/admin/orders",
		icon: ShoppingCart,
	},
];

export const vendorSidebarItems: SidebarNestedItem[] = [
	{
		name: "Dashboard",
		path: "/vendor/dashboard",
		icon: LayoutDashboard,
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
		path: "/vendor/orders",
	},
];

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
] as const;

export type Category = (typeof categories)[number];

export const orderStatus = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
] as const;

export type OrderStatus = (typeof orderStatus)[number];

export const orderSummaryHeaders = [
	{
		key: "created_at",
		label: "Created At",
	},
	{
		key: "product_id",
		label: "Product ID",
	},
	{
		key: "customer_id",
		label: "Customer ID",
	},
	{
		key: "ordered_on",
		label: "Ordered On",
	},
	{
		key: "total_price",
		label: "Total Price",
	},
	{
		key: "status",
		label: "Status",
	},
	{
		key: "discounted_price",
		label: "Discounted Price",
	},
];

export const homepageBannerData = [
	{
		id: 1,
		dealType: "Today's Deal",
		dealTitle: "Best Tablets Deals of the Day",
		startingFrom: null,
		discount: 38,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-ipad.png",
	},
	{
		id: 2,
		dealType: "Black Friday Deals",
		dealTitle: "Lowest Price since release",
		startingFrom: null,
		discount: 55,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-iphone.png",
	},
	{
		id: 3,
		dealType: null,
		dealTitle: "All New Arrivals of 2024",
		startingFrom: 1599,
		discount: null,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-watches.png",
	},
];

export const featuresOverview = [
	{ title: "Free Delivery", icon: Truck },
	{ title: "Easy Payments", icon: Wallet },
	{ title: "7 days return", icon: RotateCcw },
	{ title: "1 Year Warranty", icon: Shield },
];