// placeOrder.ts (Convex Mutation)
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const placeOrder = mutation({
	args: {
		items: v.array(
			v.object({
				productId: v.id("products"),
				quantity: v.number(),
				price: v.float64(),
				totalPrice: v.float64(),
			})
		),
	},
	handler: async (ctx, { items }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		// 1. Create Order
		const orderId = await ctx.db.insert("order", {
			userId: dbUser._id,
			items,
			orderStatus: "placed",
		});

		// 2. Group items by vendor and calculate totals
		const vendorMap: Record<string, typeof items> = {};
		const vendorTotals: Record<string, number> = {};
		let totalOrderAmount = 0;

		for (const item of items) {
			const product = await ctx.db.get(item.productId);
			if (!product) throw new Error("Product not found");

			// Update product's purchaseCount and reduce stock
			await ctx.db.patch(item.productId, {
				purchaseCount: (product.purchaseCount || 0) + item.quantity,
				stock: Math.max(0, product.stock - item.quantity),
			});

			// Add to total order amount
			totalOrderAmount += item.totalPrice;

			// Get vendor from product's shop
			const shop = await ctx.db.get(product.shopId);
			if (!shop) throw new Error("Shop not found for product");

			const vendorId = shop.vendorId;
			const key = vendorId.toString();

			// Group items by vendor
			if (!vendorMap[key]) {
				vendorMap[key] = [];
				vendorTotals[key] = 0;
			}

			vendorMap[key].push(item);
			vendorTotals[key] += item.totalPrice;
		}

		// 3. Insert Vendor Sales (80% of their portion)
		for (const [vendorIdStr, vendorItems] of Object.entries(vendorMap)) {
			const vendorId = vendorIdStr as Id<"vendors">;
			const vendorTotalAmount = vendorTotals[vendorIdStr];
			const vendorEarning = vendorTotalAmount * 0.8; // 80% of vendor's sales

			await ctx.db.insert("vendorSales", {
				vendorId,
				orderId,
				items: vendorItems,
				vendorEarning,
			});
		}

		// 4. Insert Admin Sales (20% of total order amount)
		const adminEarning = totalOrderAmount * 0.2;

		await ctx.db.insert("adminSales", {
			orderId,
			createdAt: Date.now(),
			totalAmount: adminEarning,
			items,
		});

		// 5. Clear user's cart after successful order
		const userCart = await ctx.db
			.query("cart")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (userCart) {
			await ctx.db.patch(userCart._id, {
				items: [],
			});
		}

		return orderId;
	},
});

export const listOrders = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		return await ctx.db
			.query("order")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.order("desc")
			.collect();
	},
});

export const getVendorOrders = query({
	args: {
		shopId: v.id("vendorShops"),
	},
	handler: async (ctx, { shopId }) => {
		const productQuery = ctx.db
			.query("products")
			.filter((q) =>
				q.eq(q.field("shopId"), shopId ?? q.field("shopId"))
			);

		const allProducts = await productQuery.collect();
		const vendorProductIds = allProducts
			.filter((p) => p.shopId) // redundant safety
			.map((p) => p._id);

		if (vendorProductIds.length === 0) return [];

		// 2. Get all orders (could filter by time if needed)
		const allOrders = await ctx.db.query("order").collect();

		// 3. Filter orders containing at least one matching product
		const filteredOrders = allOrders.filter((order) =>
			order.items.some((item) =>
				vendorProductIds.some(
					(vpid) => vpid.toString() === item.productId.toString()
				)
			)
		);

		return filteredOrders;
	},
});

export const getAllOrders = query({
	args: {},
	handler: async (ctx) => {
		const productQuery = ctx.db.query("products");

		const allProducts = await productQuery.collect();
		const vendorProductIds = allProducts
			.filter((p) => p.shopId) // redundant safety
			.map((p) => p._id);

		if (vendorProductIds.length === 0) return [];

		// 2. Get all orders (could filter by time if needed)
		const allOrders = await ctx.db.query("order").collect();

		// 3. Filter orders containing at least one matching product
		const filteredOrders = allOrders.filter((order) =>
			order.items.some((item) =>
				vendorProductIds.some(
					(vpid) => vpid.toString() === item.productId.toString()
				)
			)
		);

		return filteredOrders;
	},
});

export const updateOrderStatus = mutation({
	args: {
		orderId: v.id("order"),
		status: v.string(),
	},
	handler: async (ctx, { orderId, status }) => {
		const order = await ctx.db.get(orderId);
		if (!order) {
			throw new Error("Order not found");
		}

		// Update order status
		await ctx.db.patch(orderId, {
			orderStatus: status,
		});

		return { success: true };
	},
});
