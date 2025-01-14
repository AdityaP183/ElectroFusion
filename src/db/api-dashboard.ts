import { adminDashboard, dashboardData } from "@/lib/types/component-type";
import { dbTable, supabase } from "./config";
import { Order } from "@/lib/types/order-types";

async function getVendorDashboard(
	vendorId: string | undefined
): Promise<dashboardData> {
	if (!vendorId) throw new Error("Vendor ID is required.");

	try {
		const dashboardData: Record<string, unknown> = {};

		// Total Orders
		const { data: ordersData, error: ordersError } = await supabase
			.from(dbTable.orders)
			.select("*", { count: "exact" })
			.eq("vendor_id", vendorId)
			.order("ordered_on", { ascending: true });

		if (ordersError) throw new Error(ordersError.message);
		dashboardData.totalOrders = ordersData?.length || 0;

		// Total Revenue
		if (ordersData) {
			dashboardData.totalRevenue = ordersData.reduce(
				(sum, order) => sum + order.total_price,
				0
			);
		} else {
			dashboardData.totalRevenue = 0;
		}

		// Total Products
		const { data: productsData, error: productsError } = await supabase
			.from(dbTable.products)
			.select("id, categories, stock, productName")
			.eq("createdBy", vendorId);

		if (productsError) throw new Error(productsError.message);
		dashboardData.totalProducts = productsData?.length || 0;

		// Total Unique Customers
		if (ordersData) {
			const allCustomers = ordersData.flatMap(
				(order) => order.customer_id
			);
			const uniqueCustomers = new Set(allCustomers);
			dashboardData.totalCustomers = uniqueCustomers.size;
		} else {
			dashboardData.totalCustomers = 0;
		}

		// Total Unique Categories
		if (productsData) {
			const allCategories = productsData.flatMap(
				(product) => product.categories
			);
			const uniqueCategories = new Set(allCategories);
			dashboardData.totalCategories = uniqueCategories.size;
		} else {
			dashboardData.totalCategories = 0;
		}

		// Top 10 orders
		if (ordersData) {
			dashboardData.topOrders = ordersData.slice(0, 10);
		} else {
			dashboardData.topOrders = [];
		}

		// Top 10 Products with low stock
		if (productsData) {
			dashboardData.lowStockProducts = productsData.sort(
				(a, b) => a.stock - b.stock
			);
		} else {
			dashboardData.lowStockProducts = [];
		}

		// Top 15 Orders for line graph
		if (ordersData) {
			const top15orders = ordersData.slice(0, 15).map((order) => {
				const amount =
					order.discounted_price !== 0
						? order.discounted_price
						: order.total_price;

				return {
					id: order.id,
					ordered_on: order.ordered_on,
					amount,
				};
			});
			dashboardData.top15Orders = top15orders;
		} else {
			dashboardData.top15Orders = [];
		}

		return {
			totalRevenue: dashboardData.totalRevenue as number,
			totalOrders: dashboardData.totalOrders as number,
			totalProducts: dashboardData.totalProducts as number,
			totalCategories: dashboardData.totalCategories as number,
			totalCustomers: dashboardData.totalCustomers as number,
			topOrders: dashboardData.topOrders as Order[],
			lowStockProducts: dashboardData.lowStockProducts as {
				id: number;
				productName: string;
				stock: number;
			}[],
			top15Orders: dashboardData.top15Orders as {
				id: number;
				ordered_on: string;
				amount: number;
			}[],
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				"Error fetching vendor dashboard data:",
				error.message
			);
			throw error;
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unknown error occurred");
		}
	}
}

async function getAdminDashboard(): Promise<adminDashboard> {
	try {
		const dashboardData: Record<string, unknown> = {};

		// Total Orders
		const { data: ordersData, error: ordersError } = await supabase
			.from(dbTable.orders)
			.select("*", { count: "exact" })
			.order("ordered_on", { ascending: true });

		if (ordersError) throw new Error(ordersError.message);
		dashboardData.totalOrders = ordersData?.length || 0;

		// Total Revenue
		if (ordersData) {
			dashboardData.totalRevenue = ordersData.reduce(
				(sum, order) => sum + order.total_price,
				0
			);
		} else {
			dashboardData.totalRevenue = 0;
		}

		// Total Products
		const { data: productsData, error: productsError } = await supabase
			.from(dbTable.products)
			.select("id, categories, productName, rating");

		if (productsError) throw new Error(productsError.message);
		dashboardData.totalProducts = productsData?.length || 0;

		// Top 10 Orders
		if (ordersData) {
			dashboardData.topOrders = ordersData.slice(0, 10);
		} else {
			dashboardData.topOrders = [];
		}

		// Top 10 Products with Low Stock
		if (productsData) {
			dashboardData.topRatedProducts = productsData
				.sort((a, b) => b.rating - a.rating)
				.slice(0, 10);
		} else {
			dashboardData.topRatedProducts = [];
		}

		// Top 15 Orders for Line Graph
		if (ordersData) {
			const top15orders = ordersData.slice(0, 15).map((order) => {
				const amount =
					order.discounted_price !== 0
						? order.discounted_price
						: order.total_price;

				return {
					id: order.id,
					ordered_on: order.ordered_on,
					amount,
				};
			});
			dashboardData.top15Orders = top15orders;
		} else {
			dashboardData.top15Orders = [];
		}

		return {
			totalRevenue: dashboardData.totalRevenue as number,
			totalOrders: dashboardData.totalOrders as number,
			totalProducts: dashboardData.totalProducts as number,
			topOrders: dashboardData.topOrders as Order[],
			topRatedProducts: dashboardData.topRatedProducts as {
				id: number;
				productName: string;
				rating: number;
			}[],
			top15Orders: dashboardData.top15Orders as {
				id: number;
				ordered_on: string;
				amount: number;
			}[],
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				"Error fetching admin dashboard data:",
				error.message
			);
			throw error;
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unknown error occurred");
		}
	}
}

export { getVendorDashboard, getAdminDashboard };
