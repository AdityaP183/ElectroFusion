import { Table } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
	name: string;
	path: string;
	icon?: LucideIcon;
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
	totalUsers: DashboardOverviewItem;
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
	| { data?: unknown; type: "line" };

export type SalesType = {
	id?: string;
	date: string;
	sales: number;
	profit: number;
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
	itemsSold: number;
};

export type Products = {
	id: string;
	productName: string;
	category: string;
	stock: number;
	price: number;
	image: string;
};

export type UserRoles = "admin" | "vendor" | "customer" | undefined;

export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	address?: string;
	phone_number?: string;
	role: UserRoles;
	avatar?: string;
};

export type Vendors = {
	id: string;
	owner: User;
	store_name: string;
	store_description?: string;
	store_logo?: string;
	store_address?: string;
	monthly_sales?: number;
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