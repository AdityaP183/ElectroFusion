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
				items: [
					{
						id: "all-orders",
						title: "All Orders",
						href: "/all",
					},
					{
						id: "pending-orders",
						title: "Pending",
						href: "/pending",
					},
					{
						id: "completed-orders",
						title: "Completed",
						href: "/completed",
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
};

export const allProducts = [
	{
		_creationTime: 1749650902413.1138,
		_id: "jn74a5csscgsrskctdbyvvvndh7hn07a",
		categories: [
			{
				_creationTime: 1749650022689.0093,
				_id: "j972edx9zmj0pj5ey027gncgwn7hna05",
				name: "Wireless",
				parentId: "j977xdpwtrhgbnbd04pqwe33yh7hnn2k",
				slug: "wireless",
			},
		],
		categoryIds: ["j972edx9zmj0pj5ey027gncgwn7hna05"],
		description:
			"Industry-leading noise canceling headphones with up to 30 hours of battery life and superb audio quality.",
		discountEndDate: "1750255616125",
		discountPercent: 15,
		discountStartDate: "1749650816125",
		images: [
			{
				altText: "Sony WH-1000XM5 front view",
				isPrimary: true,
				sortOrder: 1,
				url: "https://res.cloudinary.com/aditya1837/image/upload/v1750162079/ElectroFusion/vendor-shops/h6hxpfm2mhizeblqrtua.webp",
			},
		],
		isActive: false,
		isDiscounted: true,
		isFeatured: true,
		name: "Sony WH-1000XM5 Wireless Headphones",
		originalPrice: 399.99,
		purchaseCount: 1200,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "sony-wh-1000xm5-wireless-headphones",
		stock: 5,
		viewCount: 9800,
	},
	{
		_creationTime: 1749650902413.114,
		_id: "jn707s7n6rgqftncbbw2t0hnw97hm90k",
		categories: [
			{
				_creationTime: 1747408190185.6816,
				_id: "j97c5nfrj51z332b7ce11vd3857g14gy",
				name: "Mouse",
				parentId: "j97ax254a53fwgk7h0jajgk9jn7g1q21",
				slug: "mouse",
			},
		],
		categoryIds: ["j97c5nfrj51z332b7ce11vd3857g14gy"],
		description:
			"Ergonomic mouse with MagSpeed scrolling and customizable buttons, perfect for productivity.",
		discountEndDate: "1750082816125",
		discountPercent: 10,
		discountStartDate: "1749650816125",
		images: [
			{
				altText: "Logitech MX Master 3S",
				isPrimary: true,
				sortOrder: 1,
				url: "https://elitehubs.com/cdn/shop/products/910-006561-image-02-600x600-1.webp?v=1683977728",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: false,
		name: "Logitech MX Master 3S",
		originalPrice: 99.99,
		purchaseCount: 970,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "logitech-mx-master-3s",
		stock: 85,
		viewCount: 5100,
	},
	{
		_creationTime: 1749650902413.1143,
		_id: "jn7aw45xyvs13m6337xz3bnf5x7hns0c",
		categories: [
			{
				_creationTime: 1747337792240.271,
				_id: "j97efxt4zytekq93y5e10e6vdx7fzjhe",
				name: "Business Laptops",
				parentId: "j97a7mpq72ztfpzq4taj9hyaz57fymmm",
				slug: "business-laptops",
			},
			{
				_creationTime: 1747337792240.2712,
				_id: "j97e6ytxtqrsdzz1zmz9xcbrmd7fzjc2",
				name: "Student Laptops",
				parentId: "j97a7mpq72ztfpzq4taj9hyaz57fymmm",
				slug: "student-laptops",
			},
		],
		categoryIds: [
			"j97a7mpq72ztfpzq4taj9hyaz57fymmm",
			"j97efxt4zytekq93y5e10e6vdx7fzjhe",
			"j97e6ytxtqrsdzz1zmz9xcbrmd7fzjc2",
		],
		description:
			"Lightweight and powerful laptop with the Apple M2 chip, Retina display, and all-day battery life.",
		images: [
			{
				altText: "MacBook Air M2",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg",
			},
		],
		isActive: false,
		isDiscounted: false,
		isFeatured: true,
		name: "Apple MacBook Air M2 13-inch",
		originalPrice: 1199.99,
		purchaseCount: 350,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "apple-macbook-air-m2-13",
		stock: 45,
		viewCount: 8800,
	},
	{
		_creationTime: 1749652785634.6335,
		_id: "jn7b9sbkfr3xdfh6jen89pfgyx7hm61v",
		categories: [
			{
				_creationTime: 1747407784355.5762,
				_id: "j970hx1q8be3adf5k3024vhy8h7g0ed4",
				name: "4K Monitors",
				parentId: "j97ethcvkrm3hecej7pgssjb6h7g0c3w",
				slug: "4k-monitors",
			},
		],
		categoryIds: ["j970hx1q8be3adf5k3024vhy8h7g0ed4"],
		description:
			"27-inch 4K UHD IPS monitor with HDR10 and USB-C, ideal for designers and developers.",
		discountEndDate: "1750257444199",
		discountPercent: 10,
		discountStartDate: "1749652644199",
		images: [
			{
				altText: "LG UltraFine 4K Monitor",
				isPrimary: true,
				sortOrder: 1,
				url: "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/ee581b8d-6d39-4746-b018-87a5416b8b9e/md07516743-zoom-01-v1-jpg",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: true,
		name: "LG UltraFine 27UN850-W 27” 4K Monitor",
		originalPrice: 549.99,
		purchaseCount: 430,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "lg-ultrafine-27un850",
		stock: 120,
		viewCount: 6800,
	},
	{
		_creationTime: 1749652785634.635,
		_id: "jn71yfscretzrnamzc1qskkza17hm2nd",
		categories: [
			{
				_creationTime: 1749650022689.0095,
				_id: "j977k6z0ade2dtnrwmhyyqk2hn7hny4g",
				name: "TWS (True Wireless Stereo)",
				parentId: "j977xdpwtrhgbnbd04pqwe33yh7hnn2k",
				slug: "tws",
			},
		],
		categoryIds: ["j977k6z0ade2dtnrwmhyyqk2hn7hny4g"],
		description:
			"True wireless earbuds with 42-hour playback, low latency gaming mode, and IPX4 rating.",
		discountEndDate: "1749998244199",
		discountPercent: 25,
		discountStartDate: "1749652644199",
		images: [
			{
				altText: "boAt Airdopes 141",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/61KNJav3S9L._SL1500_.jpg",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: false,
		name: "boAt Airdopes 141",
		originalPrice: 29.99,
		purchaseCount: 3000,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "boat-airdopes-141",
		stock: 400,
		viewCount: 12000,
	},
	{
		_creationTime: 1749652785634.6338,
		_id: "jn75athyayd1ncw0gm2vcrzngs7hn9bd",
		categories: [
			{
				_creationTime: 1747408190185.6829,
				_id: "j9713ar41rg6m7tfxfm0fjv8597g0b0d",
				name: "Motherboards",
				parentId: "j97f500h3822r1fzhks6tg1smd7g01y6",
				slug: "motherboards",
			},
		],
		categoryIds: ["j9713ar41rg6m7tfxfm0fjv8597g0b0d"],
		description:
			"High-end AM5 motherboard with PCIe 5.0, WiFi 6E, DDR5, and advanced overclocking features.",
		images: [
			{
				altText: "ASUS ROG X670E Hero Motherboard",
				isPrimary: true,
				sortOrder: 1,
				url: "https://elitehubs.com/cdn/shop/products/38400_500_2.jpg?v=1695312330",
			},
		],
		isActive: true,
		isDiscounted: false,
		isFeatured: true,
		name: "ASUS ROG Crosshair X670E Hero",
		originalPrice: 599.99,
		purchaseCount: 210,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "asus-rog-x670e-hero",
		stock: 50,
		viewCount: 3900,
	},
	{
		_creationTime: 1749652785634.634,
		_id: "jn72zp6c8rmmp6m429wa3p61hh7hnhzs",
		categories: [
			{
				_creationTime: 1747408190185.6829,
				_id: "j9713ar41rg6m7tfxfm0fjv8597g0b0d",
				name: "Motherboards",
				parentId: "j97f500h3822r1fzhks6tg1smd7g01y6",
				slug: "motherboards",
			},
		],
		categoryIds: ["j9713ar41rg6m7tfxfm0fjv8597g0b0d"],
		description:
			"Intel LGA1700 motherboard supporting DDR5, PCIe 5.0, and 2.5G LAN for high-performance builds.",
		discountEndDate: "1750084644199",
		discountPercent: 15,
		discountStartDate: "1749652644199",
		images: [
			{
				altText: "MSI MPG Z790 Motherboard",
				isPrimary: true,
				sortOrder: 1,
				url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc1.neweggimages.com%2FProductImageCompressAll1280%2F13-144-563-13.jpg&f=1&nofb=1&ipt=dcd10a5612489fc74a3d657b011cf2e9d502e9ba9feac89d52fad9af7c2fd8df",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: false,
		name: "MSI MPG Z790 Carbon WiFi",
		originalPrice: 349.99,
		purchaseCount: 330,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "msi-z790-carbon-wifi",
		stock: 80,
		viewCount: 5100,
	},
	{
		_creationTime: 1749652785634.6355,
		_id: "jn75qkxs7qbdgss6eeqfv2xyt17hnqkv",
		categories: [
			{
				_creationTime: 1749650022689.0095,
				_id: "j977k6z0ade2dtnrwmhyyqk2hn7hny4g",
				name: "TWS (True Wireless Stereo)",
				parentId: "j977xdpwtrhgbnbd04pqwe33yh7hnn2k",
				slug: "tws",
			},
		],
		categoryIds: ["j977k6z0ade2dtnrwmhyyqk2hn7hny4g"],
		description:
			"TWS earbuds with Adaptive Transparency, improved ANC, and MagSafe charging case.",
		images: [
			{
				altText: "AirPods Pro 2nd Gen",
				isPrimary: true,
				sortOrder: 1,
				url: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple_AirPods-Pro_New-Design_102819_big.jpg.large.jpg",
			},
		],
		isActive: true,
		isDiscounted: false,
		isFeatured: true,
		name: "Apple AirPods Pro (2nd Gen)",
		originalPrice: 249,
		purchaseCount: 4800,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "airpods-pro-2",
		stock: 150,
		viewCount: 22000,
	},
	{
		_creationTime: 1749652785634.6343,
		_id: "jn7bbrrs6ayqz34pg7p5hgzt4h7hmcx3",
		categories: [
			{
				_creationTime: 1747408190185.6826,
				_id: "j978dbgbkxd9b3xc9fdfdca84h7g0vx3",
				name: "Graphic Cards (GPU)",
				parentId: "j97f500h3822r1fzhks6tg1smd7g01y6",
				slug: "graphic-cards-gpu",
			},
		],
		categoryIds: ["j978dbgbkxd9b3xc9fdfdca84h7g0vx3"],
		description:
			"Latest RTX 4070 Ti Super with 16GB GDDR6X and DLSS 3.5 support for high-end gaming and content creation.",
		images: [
			{
				altText: "RTX 4070 Ti Super GPU",
				isPrimary: true,
				sortOrder: 1,
				url: "https://cdn.arstechnica.net/wp-content/uploads/2024/01/IMG_1526.jpeg",
			},
		],
		isActive: true,
		isDiscounted: false,
		isFeatured: true,
		name: "NVIDIA GeForce RTX 4070 Ti Super",
		originalPrice: 799.99,
		purchaseCount: 140,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "rtx-4070ti-super",
		stock: 45,
		viewCount: 3600,
	},
	{
		_creationTime: 1749652785634.6357,
		_id: "jn7bbp90yp93vksned0bysfx317hnbg9",
		categories: [
			{
				_creationTime: 1747407784355.5762,
				_id: "j970hx1q8be3adf5k3024vhy8h7g0ed4",
				name: "4K Monitors",
				parentId: "j97ethcvkrm3hecej7pgssjb6h7g0c3w",
				slug: "4k-monitors",
			},
		],
		categoryIds: ["j970hx1q8be3adf5k3024vhy8h7g0ed4"],
		description:
			"VA panel with HDR10, 95% DCI-P3, and Brightness Intelligence Plus for eye comfort.",
		images: [
			{
				altText: "BenQ 4K EW3270U Monitor",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/81NDaQ+kO1L._AC_UF1000,1000_QL80_.jpg",
			},
		],
		isActive: true,
		isDiscounted: false,
		isFeatured: false,
		name: "BenQ EW3270U 32-inch 4K Monitor",
		originalPrice: 399,
		purchaseCount: 270,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "benq-ew3270u",
		stock: 65,
		viewCount: 5100,
	},
	{
		_creationTime: 1749652785634.6345,
		_id: "jn79516jtmkcsjx018mc5evakh7hm6xt",
		categories: [
			{
				_creationTime: 1747408190185.6826,
				_id: "j978dbgbkxd9b3xc9fdfdca84h7g0vx3",
				name: "Graphic Cards (GPU)",
				parentId: "j97f500h3822r1fzhks6tg1smd7g01y6",
				slug: "graphic-cards-gpu",
			},
		],
		categoryIds: ["j978dbgbkxd9b3xc9fdfdca84h7g0vx3"],
		description:
			"Compact and powerful RTX 4060 with 8GB GDDR6, ideal for budget gaming PCs.",
		discountEndDate: "1749911844199",
		discountPercent: 10,
		discountStartDate: "1749652644199",
		images: [
			{
				altText: "Zotac RTX 4060 GPU",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/81Xv-d9WTmL._AC_SL1500_.jpg",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: false,
		name: "Zotac Gaming GeForce RTX 4060 Twin Edge",
		originalPrice: 299.99,
		purchaseCount: 410,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "zotac-rtx-4060",
		stock: 100,
		viewCount: 7000,
	},
	{
		_creationTime: 1749652785634.6348,
		_id: "jn7bzspb56v00a7jppf1fg90j97hn4gj",
		categories: [
			{
				_creationTime: 1747407784355.5762,
				_id: "j970hx1q8be3adf5k3024vhy8h7g0ed4",
				name: "4K Monitors",
				parentId: "j97ethcvkrm3hecej7pgssjb6h7g0c3w",
				slug: "4k-monitors",
			},
		],
		categoryIds: ["j970hx1q8be3adf5k3024vhy8h7g0ed4"],
		description:
			"All-in-one 4K monitor with built-in Smart TV apps, webcam, and USB-C hub support.",
		discountEndDate: "1750171044199",
		discountPercent: 20,
		discountStartDate: "1749652644199",
		images: [
			{
				altText: "Samsung M8 Smart Monitor",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/91-fxLrMAjL._AC_SL1500_.jpg",
			},
		],
		isActive: true,
		isDiscounted: true,
		isFeatured: true,
		name: "Samsung Smart Monitor M8 32” 4K",
		originalPrice: 699.99,
		purchaseCount: 360,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "samsung-m8-smart-monitor",
		stock: 70,
		viewCount: 6100,
	},
	{
		_creationTime: 1749652785634.6353,
		_id: "jn705q0gdqtydv07drazm62dmd7hnygp",
		categories: [
			{
				_creationTime: 1749650022689.0095,
				_id: "j977k6z0ade2dtnrwmhyyqk2hn7hny4g",
				name: "TWS (True Wireless Stereo)",
				parentId: "j977xdpwtrhgbnbd04pqwe33yh7hnn2k",
				slug: "tws",
			},
		],
		categoryIds: ["j977k6z0ade2dtnrwmhyyqk2hn7hny4g"],
		description:
			"Industry-leading noise cancellation, 30-hour battery life, and premium audio quality.",
		images: [
			{
				altText: "Sony WH-1000XM5",
				isPrimary: true,
				sortOrder: 1,
				url: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
			},
		],
		isActive: true,
		isDiscounted: false,
		isFeatured: true,
		name: "Sony WH-1000XM5 Noise Cancelling Headphones",
		originalPrice: 399.99,
		purchaseCount: 500,
		shopId: "jd769pers71w05wa09a3kezzr17hjn7g",
		slug: "sony-wh-1000xm5",
		stock: 90,
		viewCount: 8700,
	},
];
