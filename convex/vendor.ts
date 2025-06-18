import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { roleValidator } from "./schema";

export const getVendorDetails = query({
	args: { clerkId: v.string() },
	handler: async (ctx, { clerkId }) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();
		if (!user) return null;
		const vendor = await ctx.db
			.query("vendors")
			.withIndex("by_userId", (q) => q.eq("userId", user._id))
			.unique();
		if (!vendor) return null;
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

export const createVendorShop = mutation({
	args: {
		vendorId: v.id("vendors"),
		name: v.string(),
		slug: v.string(),
		description: v.string(),
		bannerImage: v.string(),
		logo: v.string(),
	},
	handler: async (ctx, args) => {
		const vendor = await ctx.db.get(args.vendorId);
		if (!vendor) {
			throw new Error("Vendor not found");
		}

		const existingShop = await ctx.db
			.query("vendorShops")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.first();
		if (existingShop) {
			throw new Error("Shop with this slug already exists");
		}

		const vendorShop = await ctx.db.insert("vendorShops", {
			vendorId: args.vendorId,
			name: args.name,
			slug: args.slug,
			description: args.description,
			logo: args.logo,
			bannerImage: args.bannerImage,
		});

		return vendorShop;
	},
});

export const getCategoryById = query({
	args: {
		id: v.id("categories"),
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	},
});

export const listProductsWithCategoriesByShop = query({
	args: {
		shopId: v.id("vendorShops"),
	},
	async handler(ctx, args) {
		const products = await ctx.db
			.query("products")
			.withIndex("by_shopId", (q) => q.eq("shopId", args.shopId))
			.collect();

		const categoryIds = [
			...new Set(products.flatMap((product) => product.categoryIds)),
		];

		const categories = await Promise.all(
			categoryIds.map((id) => ctx.db.get(id))
		);
		const categoryMap = new Map(
			categories.filter(Boolean).map((cat) => [cat!._id, cat])
		);

		const enrichedProducts = products.map((product) => ({
			...product,
			categories: product.categoryIds.map((id) => categoryMap.get(id)),
		}));

		return enrichedProducts;
	},
});

export const getAllVendors = query({
	args: {},
	handler: async (ctx, args) => {
		const vendors = await ctx.db.query("vendors").collect();

		const enrichedVendors = await Promise.all(
			vendors.map(async (vendor) => {
				const user = await ctx.db
					.query("users")
					.withIndex("by_id", (q) => q.eq("_id", vendor.userId))
					.unique();

				const shops = await ctx.db
					.query("vendorShops")
					.withIndex("by_vendorId", (q) =>
						q.eq("vendorId", vendor._id)
					)
					.collect();

				return {
					...vendor,
					firstName: user?.firstName ?? "",
					lastName: user?.lastName ?? "",
					email: user?.email ?? "",
					shops,
				};
			})
		);

		return enrichedVendors;
	},
});
