import { v } from "convex/values";
import { query } from "./_generated/server";

export const getVendorDetails = query({
	args: { userId: v.id("users") },
	handler: async (ctx, { userId }) => {
		const vendor = await ctx.db
			.query("vendors")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();
		return vendor;
	},
});

export const getVendorDetailsWithShops = query({
	args: { userId: v.id("users") },
	handler: async (ctx, { userId }) => {
		const vendor = await ctx.db
			.query("vendors")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();

		if (!vendor) return null;

		const vendorShops = await ctx.db
			.query("vendorShops")
			.withIndex("by_vendorId", (q) => q.eq("vendorId", vendor._id))
			.collect();

		if (!vendorShops)
			return {
				...vendor,
				shops: [],
			};

		return { ...vendor, shops: vendorShops };
	},
});
