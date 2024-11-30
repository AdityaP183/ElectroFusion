import { Table } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
	name: string;
	path?: string;
	icon?: LucideIcon;
};

export type SidebarNestedItem = SidebarItem & {
	children?: SidebarItem[];
};

export type DashboardOverviewItem = {
	id: string;
	title: string;
	value: number;
	comparsion: {
		type: "increase" | "decrease";
		value: number;
	};
};

export type DashboardDuration = "half-day" | "week" | "month" | "year";

export type DashboardOverview = {
	totalUsers?: DashboardOverviewItem;
	totalNewUsers?: DashboardOverviewItem;
	totalRevenue: DashboardOverviewItem;
	totalProducts: DashboardOverviewItem;
	totalProfit: DashboardOverviewItem;
};

export type UserCount = {
	label: string;
	customers: {
		label: string;
		value: number;
	};
	vendors: {
		label: string;
		value: number;
	};
};

export type ChartConfig = {
	[key: string]: {
		label: string;
		color: string;
	};
};

export type ChartWrapperProps =
	| { data: UserCount; type: "radial" }
	| { data: SalesType[]; type: "bar" }
	| { data: SalesType[]; type: "area" }
	| { data: Categories[]; type: "vertical-bar" };

export type SalesType = {
	id?: string;
	date: string;
	sales: number;
	profit: number;
	discount: number;
};

export type Orders = {
	id: string;
	date: string;
	productName: string;
	customer: string;
	vendor: string;
	price: string;
	status: "pending" | "processing" | "shipped" | "delivered";
};

export type Categories = {
	id: string;
	name: string;
	sold: number;
};

export type Products = {
	id: string;
	productName: string;
	category: string;
	stock: number;
	price: number;
	image: string;
	times_ordered: number;
	description?: string;
	discountedPrice: number;
};

export type UserRoles = "admin" | "vendor" | "customer" | undefined;
export type UserAddress = {
	address: string;
	city: string;
	state: string;
	postalCode: string;
};

export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	address?: UserAddress;
	role: UserRoles;
	avatar?: string;
	createdAt?: string;
};

export type Vendors = {
	id: string;
	owner: User;
	store_name: string;
	store_description?: string;
	store_logo?: string;
	store_address?: string;
};

export type TableWrapperProps<TData> = {
	table: Table<TData>;
	columnsLength: number;
	height?: number;
	tableHeaderStyle?: string;
	tableCellStyle?: string;
};

export type CouponT = {
	id: string;
	code: string;
	discount: number;
	category: string;
	description: string;
	expire_date: string;
};

export type CustomerReview = {
	id: string;
	customer_name: string;
	avatar?: string;
	review: string;
	rating: number;
	date: string;
};

export type ProductInfo = {
	id: string;
	productName: string;
	rating: {
		stars: number;
		count: number;
	};
	isDiscounted: boolean;
	originalPrice: number;
	discountedPercent?: number;
	stock: number;
	category: string[];
	description: string;
	image: string;
};

export type ProductCardType = {
	width?: number | string;
	height?: number | string;
	borderRadius?: number | string;
	image: string;
	title: string;
	description?: string;
	price: number;
	isWishlist?: boolean;
};