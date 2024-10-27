import {
	Categories,
	DashboardOverview,
	Orders,
	Products,
	SidebarItem,
	UserCount,
	Vendors,
} from "@/types/component.type";
import { User } from "@/types/component.type";
import { faker } from "@faker-js/faker";
import {
	ChartLine,
	LayoutDashboard,
	Package,
	ShoppingCart,
	Store,
	TicketPercent,
	Users,
} from "lucide-react";

export const tempUser: User = {
	id: "8d3902ed0efcb0fb1ef884c3",
	username: "iambatman18",
	email: "iambatman@google.com",
	role: "admin",
	password: "testuser",
	first_name: "Bruce",
	last_name: "Wayne",
	avatar: "",
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

export const salesData = Array.from({ length: 20 }, () => {
	// const date = new Date();
	// date.setHours(date.getHours() - (11 - index));

	// const hours = date.getHours() % 12 || 12; // 12-hour format
	// const period = date.getHours() < 12 ? "AM" : "PM"; // Determine AM/PM
	// const time = `${hours}:00 ${period}`; // Construct time string

	// const sales = Math.floor(Math.random() * 1000); // Generate random sales
	// const profit = Math.floor(Math.random() * sales); // Generate profit that is less than sales

	return {
        id: faker.database.mongodbObjectId(),
		date: faker.date.past().toISOString(),
		sales: faker.number.int({ min: 100, max: 1000 }),
		profit: faker.number.int({ min: 100, max: 1000 }),
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
	"Smartphones & Accessories",
	"Computers & Laptops",
	"Audio & Headphones",
	"Wearable Technology",
	"Cameras & Photography",
	"TVs & Home Entertainment",
	"Gaming Consoles & Accessories",
	"Smart Home Devices",
	"Computer Components & Storage",
	"Home Appliances & Kitchen Gadgets",
];

export const categoriesData: Categories[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.database.mongodbObjectId(),
		name: faker.helpers.arrayElement(categoriesName),
		itemsSold: Math.floor(Math.random() * 1300),
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
		price: parseFloat(faker.commerce.price()),
		category: faker.helpers.arrayElement(categoriesName),
		stock: Math.floor(Math.random() * 100),
		image: faker.helpers.arrayElement(productsImages),
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
