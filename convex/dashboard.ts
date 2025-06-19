import { query } from "./_generated/server";
import { v } from "convex/values";
import { format } from "date-fns";

export const getDashboardStats = query({
	args: {},
	handler: async (ctx) => {
		// Total Revenue (sum of adminSales + vendorSales)
		const adminSales = await ctx.db.query("adminSales").collect();
		const vendorSales = await ctx.db.query("vendorSales").collect();

		const totalRevenue =
			adminSales.reduce((acc, sale) => acc + sale.totalAmount, 0) +
			vendorSales.reduce(
				(acc, sale) => acc + (sale.vendorEarning ?? 0),
				0
			);

		// New Customers (users with role = "customer")
		const users = await ctx.db.query("users").collect();
		const newCustomers = users.filter((u) => u.role === "customer").length;

		// Active Accounts (users with any placed order)
		const orders = await ctx.db.query("order").collect();
		const activeAccounts = new Set(orders.map((o) => o.userId)).size;

		// Growth Rate (dummy formula: % change in orders month over month)
		const now = Date.now();
		const oneMonth = 30 * 24 * 60 * 60 * 1000;
		const ordersThisMonth = orders.filter(
			(o) => now - o._creationTime < oneMonth
		).length;
		const ordersLastMonth = orders.filter(
			(o) =>
				now - o._creationTime >= oneMonth &&
				now - o._creationTime < 2 * oneMonth
		).length;

		const growthRate =
			ordersLastMonth === 0
				? ordersThisMonth > 0
					? 100
					: 0
				: ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;

		return {
			totalRevenue,
			newCustomers,
			activeAccounts,
			growthRate,
		};
	},
});

export const getSalesChartData = query({
	args: {
		range: v.union(v.literal("7d"), v.literal("30d"), v.literal("90d")),
		role: v.union(v.literal("admin"), v.literal("vendor")),
	},
	handler: async (ctx, { range, role }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		// Step 1: Determine date range
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Normalize to start of day

		let days = 90;
		if (range === "30d") days = 30;
		if (range === "7d") days = 7;

		const startDate = new Date(today);
		startDate.setDate(today.getDate() - (days - 1)); // include today
		const startTimestamp = startDate.getTime();

		const dailyTotals: Record<string, number> = {};

		if (role === "admin") {
			const adminSales = await ctx.db
				.query("adminSales")
				.filter((q) => q.gte(q.field("createdAt"), startTimestamp))
				.collect();

			for (const sale of adminSales) {
				const created = new Date(sale.createdAt);
				created.setHours(0, 0, 0, 0);
				const dayKey = created.toISOString().split("T")[0];

				dailyTotals[dayKey] =
					(dailyTotals[dayKey] || 0) + sale.totalAmount;
			}
		} else if (role === "vendor") {
			const vendor = await ctx.db
				.query("vendors")
				.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
				.unique();

			if (!vendor) return null;

			const vendorSales = await ctx.db
				.query("vendorSales")
				.filter((q) => q.eq(q.field("vendorId"), vendor._id))
				.collect();

			for (const sale of vendorSales) {
				if (sale._creationTime >= startTimestamp) {
					const created = new Date(sale._creationTime);
					created.setHours(0, 0, 0, 0);
					const dayKey = created.toISOString().split("T")[0];

					dailyTotals[dayKey] =
						(dailyTotals[dayKey] || 0) + sale.vendorEarning;
				}
			}
		}

		// Step 3: Generate full date range array
		const result = [];
		for (let i = 0; i < days; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			const dayKey = date.toISOString().split("T")[0];

			result.push({
				date: dayKey,
				total: dailyTotals[dayKey] || 0,
				label: date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				}),
			});
		}

		return result;
	},
});
