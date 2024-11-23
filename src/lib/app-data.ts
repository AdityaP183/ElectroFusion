import {
	Categories,
	CouponT,
	CustomerReview,
	DashboardOverview,
	Orders,
	ProductInfo,
	Products,
	SidebarItem,
	SidebarNestedItem,
	UserCount,
	Vendors,
} from "@/types/component.type";
import { User } from "@/types/component.type";
import { faker } from "@faker-js/faker";
import {
	ChartLine,
	LayoutDashboard,
	Package,
	PackagePlus,
	PackageSearch,
	ShoppingBag,
	ShoppingCart,
	Store,
	TicketPercent,
	Users,
} from "lucide-react";

export const tempUser: User = {
	id: "8d3902ed0efcb0fb1ef884c3",
	username: "iambatman18",
	email: "iambatman@google.com",
	role: "vendor",
	password: "testuser",
	first_name: "Bruce",
	last_name: "Wayne",
	avatar: "",
	address: {
		address: faker.location.streetAddress(false),
		city: faker.location.city(),
		state: faker.location.state(),
		postalCode: faker.location.zipCode({
			format: "######",
		}),
	},
};

export const sidebarItems: SidebarItem[] = [
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
	{
		name: "Coupons",
		path: "/admin/coupons",
		icon: TicketPercent,
	},
];

export const dashboardOverviewData: DashboardOverview = {
	totalUsers: {
		id: "users",
		title: "Total Users",
		value: 20300,
		comparsion: {
			type: "increase",
			value: 3.5,
		},
	},
	totalProducts: {
		id: "products",
		title: "Total Products",
		value: 13920,
		comparsion: {
			type: "decrease",
			value: 5.1,
		},
	},
	totalRevenue: {
		id: "revenue",
		title: "Total Revenue",
		value: 319200,
		comparsion: {
			type: "increase",
			value: 2.5,
		},
	},
	totalProfit: {
		id: "profit",
		title: "Total Profit",
		value: 39200,
		comparsion: {
			type: "decrease",
			value: 1.2,
		},
	},
};

export const userCountData: UserCount = {
	label: "users",
	customers: { label: "customers", value: 16300 },
	vendors: { label: "vendors", value: 4000 },
};

export const salesData = Array.from({ length: 24 }, () => {
	const hour = faker.number.int({ min: 0, max: 11 }); // 12 AM to 11 AM
	const minute = faker.number.int({ min: 0, max: 59 }); // Random minute

	// Format the time as "hh:mm AM/PM"
	const formattedTime = new Date()
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
			hourCycle: "h12",
		})
		.replace(
			/\d{1,2}:\d{2} (AM|PM)/,
			(_, ampm) =>
				`${hour === 0 ? 12 : hour}:${minute
					.toString()
					.padStart(2, "0")} ${ampm}`
		);
	return {
		id: faker.database.mongodbObjectId(),
		date: formattedTime,
		sales: faker.number.int({ min: 1000, max: 2000 }),
		profit: faker.number.int({ min: 800, max: 1000 }),
		discount: faker.number.int({ min: 100, max: 500 }),
	};
});

export const ordersData: Orders[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.database.mongodbObjectId(),
		date: faker.date.past().toISOString(),
		productName: faker.commerce.productName(),
		customer: faker.person.fullName(),
		vendor: faker.company.name(),
		price: faker.commerce.price(),
		status: faker.helpers.arrayElement([
			"pending",
			"processing",
			"shipped",
			"delivered",
		]),
	};
});

const categoriesName = [
	"Smartphones",
	"Computers",
	"Laptops",
	"Headphones",
	"Cameras",
	"Home Entertainment",
	"Gaming Consoles",
	"Smart Home Devices",
	"Computer Components",
	"Storage Devices",
	"Home Appliances",
	" Kitchen Gadgets",
];

export const categoriesData: Categories[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.database.mongodbObjectId(),
		name: faker.helpers.arrayElement(categoriesName),
		sold: Math.floor(Math.random() * 1300),
	};
});

const productsImages = [
	"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
	"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
	"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
	"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
	"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
	"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
	"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
	"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
	"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
	"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
	"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
	"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
	"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
	"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
	"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
	"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
	"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
	"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
	"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
	"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
];

export const productsData: Products[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.database.mongodbObjectId(),
		productName: faker.commerce.productName(),
		price: parseFloat(faker.commerce.price({ min: 1000, max: 100000 })),
		category: faker.helpers.arrayElement(categoriesName),
		stock: Math.floor(Math.random() * 100),
		image: faker.helpers.arrayElement(productsImages),
		times_ordered: Math.floor(Math.random() * 100),
		description: faker.commerce.productDescription(),
		discountedPrice: parseFloat(
			faker.commerce.price({ min: 500, max: 1000 })
		),
	};
});

export const vendorsData: Vendors[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.database.mongodbObjectId(),
		owner: {
			id: faker.database.mongodbObjectId(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			password: faker.internet.password(),
			role: "vendor",
		},
		store_name: faker.company.name(),
		store_description: faker.commerce.productDescription(),
		monthly_sales: Math.floor(Math.random() * 10000),
	};
});

export const customersData: Array<User & { orders: number }> = Array.from(
	{ length: 20 },
	() => {
		return {
			id: faker.database.mongodbObjectId(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			password: faker.internet.password(),
			role: "customer",
			orders: Math.floor(Math.random() * 100),
		};
	}
);

const couponsDesc = [
	"Black Friday Discount",
	"Summer Sale",
	"Winter Sale",
	"New Year Sale",
	"Halloween Sale",
	"Christmas Sale",
	"Thanksgiving Sale",
	"Easter Sale",
	"Valentine's Day Sale",
	"Mother's Day Sale",
];

export const couponsData: CouponT[] = Array.from({ length: 5 }, () => {
	const number = String(Math.floor(Math.random() * 50)).padStart(2, "0");
	const code =
		faker.helpers.arrayElement([
			"OFF",
			"SALE",
			"GET",
			"DISCOUNT",
			"FREE",
			"REDUCE",
		]) + number;

	return {
		id: faker.database.mongodbObjectId(),
		code,
		discount: Math.floor(Math.random() * 50),
		category: faker.helpers.arrayElement([
			"Phones",
			"Laptops",
			"Headphones",
			"Watches",
			"Tablets",
		]),
		description: faker.helpers.arrayElement(couponsDesc),
		expire_date: faker.date.future().toISOString(),
	};
});

//* --------------------- Vendors Data -----------------------
export const vendorData: Vendors = {
	id: "8d3902ed0efcb0fb1ef884c3",
	owner: tempUser,
	store_name: "Satan's Classic",
	store_address: "Test Store Address",
	monthly_sales: 2000000,
};

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
				name: "Add Orders",
				path: "/vendor/orders/add",
				icon: ShoppingBag,
			},
		],
	},
];

export const vendorsOverviewData: DashboardOverview = {
	totalNewUsers: {
		id: "users",
		title: "New Customers",
		value: 300,
		comparsion: {
			type: "increase",
			value: 3.5,
		},
	},
	totalProducts: {
		id: "products",
		title: "Products Sold",
		value: 1920,
		comparsion: {
			type: "decrease",
			value: 1.3,
		},
	},
	totalRevenue: {
		id: "revenue",
		title: "Revenue Generated",
		value: 319200,
		comparsion: {
			type: "increase",
			value: 2.5,
		},
	},
	totalProfit: {
		id: "profit",
		title: "Profit Gained",
		value: 39200,
		comparsion: {
			type: "increase",
			value: 2.5,
		},
	},
};

const customerAvatars = [
	"https://avatar.iran.liara.run/public/75",
	"https://avatar.iran.liara.run/public/69",
	"https://avatar.iran.liara.run/public/91",
	"https://avatar.iran.liara.run/public/87",
	"https://avatar.iran.liara.run/public/56",
	"https://avatar.iran.liara.run/public/39",
	"https://avatar.iran.liara.run/public/43",
	"https://avatar.iran.liara.run/public/8",
	"https://avatar.iran.liara.run/public/20",
	"https://avatar.iran.liara.run/public/32",
];

export const customerReviews: CustomerReview[] = Array.from(
	{ length: 20 },
	() => {
		return {
			id: faker.database.mongodbObjectId(),
			customer_name: faker.person.fullName(),
			avatar: faker.helpers.arrayElement(customerAvatars),
			review: faker.lorem.paragraph({ min: 1, max: 3 }),
			rating: Math.floor(Math.random() * 5),
			date: faker.date.past().toISOString(),
		};
	}
);

export const productData: ProductInfo = {
	id: faker.database.mongodbObjectId(),
	productName:
		"Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)",
	image: "/assets/phone.jpg",
	// image: "",
	rating: {
		stars: Math.floor(Math.random() * 5),
		count: Math.floor(Math.random() * 100),
	},
	isDiscounted: faker.datatype.boolean(),
	originalPrice: Math.floor(Math.random() * 120000),
	stock: Math.floor(Math.random() * 100),
	category: ["Smartphones", "Android"],
	description: faker.lorem.paragraphs(5),
};

productData.discountedPercent = productData.isDiscounted
	? faker.helpers.arrayElement([5, 10, 15, 20, 25, 40])
	: undefined;

export const cartOrders = () => productsData.slice(4, 7);
