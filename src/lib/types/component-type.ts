import { LucideIcon } from "lucide-react";
import { Order } from "./order-types";

export type SidebarItem = {
	name: string;
	path?: string;
	icon?: LucideIcon;
};

export type SidebarNestedItem = SidebarItem & {
	children?: SidebarItem[];
};

export type dashboardData = {
	totalOrders: number;
	totalRevenue: number;
	totalProducts: number;
	totalCustomers: number;
	totalVendors?: number;
	totalCategories: number;
	topOrders: Order[];
	lowStockProducts: { id: number; productName: string; stock: number }[];
	top15Orders: { id: number; ordered_on: string; amount: number }[];
};

export type adminDashboard = {
	totalOrders: number;
	totalRevenue: number;
	totalProducts: number;
	topOrders: Order[];
	topRatedProducts: { id: number; productName: string; rating: number }[];
	top15Orders: { id: number; ordered_on: string; amount: number }[];
};
