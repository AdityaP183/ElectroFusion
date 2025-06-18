import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getFeaturedProductsWithCategories = query({
	args: {
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const { limit = 50 } = args;

		// Get featured products that are active
		const featuredProducts = await ctx.db
			.query("products")
			.withIndex("by_isFeatured", (q) => q.eq("isFeatured", true))
			.filter((q) => q.eq(q.field("isActive"), true))
			.take(limit);

		// Enrich products with category data
		const productsWithCategories = await Promise.all(
			featuredProducts.map(async (product) => {
				// Get all categories for this product
				const categories = await Promise.all(
					product.categoryIds.map(async (categoryId) => {
						const category = await ctx.db.get(categoryId);

						// If category has a parent, get parent data too
						if (category?.parentId) {
							const parentCategory = await ctx.db.get(
								category.parentId
							);
							return {
								...category,
								parent: parentCategory,
							};
						}

						return category;
					})
				);

				// Filter out any null categories (in case of deleted categories)
				const validCategories = categories.filter(Boolean);

				// Calculate current price based on discount
				const currentPrice =
					product.isDiscounted && product.discountPercent
						? product.originalPrice *
						  (1 - product.discountPercent / 100)
						: product.originalPrice;

				// Check if discount is currently active
				const now = new Date().toISOString();
				const isDiscountActive =
					product.isDiscounted &&
					(!product.discountStartDate ||
						now >= product.discountStartDate) &&
					(!product.discountEndDate ||
						now <= product.discountEndDate);

				return {
					...product,
					categories: validCategories,
					currentPrice,
					isDiscountActive,
					// Calculate savings amount
					savingsAmount:
						isDiscountActive && product.discountPercent
							? product.originalPrice *
							  (product.discountPercent / 100)
							: 0,
				};
			})
		);

		return productsWithCategories;
	},
});

export const createProduct = mutation({
	args: {
		shopId: v.id("vendorShops"),
		name: v.string(),
		slug: v.string(),
		description: v.string(),
		originalPrice: v.number(),
		isDiscounted: v.boolean(),
		discountPercent: v.optional(v.number()),
		discountStartDate: v.optional(v.string()),
		discountEndDate: v.optional(v.string()),
		stock: v.number(),
		image: v.string(),
		isActive: v.boolean(),
		isFeatured: v.boolean(),
		categoryIds: v.array(v.id("categories")),
	},
	handler: async (ctx, args) => {
		const {
			shopId,
			name,
			slug,
			description,
			originalPrice,
			isDiscounted,
			discountPercent,
			discountStartDate,
			discountEndDate,
			stock,
			image,
			isActive,
			isFeatured,
			categoryIds,
		} = args;

		return await ctx.db.insert("products", {
			shopId,
			name,
			slug,
			description,
			originalPrice,
			isDiscounted,
			discountPercent,
			discountStartDate,
			discountEndDate,
			stock,
			image,
			isActive,
			isFeatured,
			categoryIds,
		});
	},
});

export const getProductById = query({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, args) => {
		const { productId } = args;

		const product = await ctx.db.get(productId);
		if (!product) return null;

		const categories = await Promise.all(
			product.categoryIds.map(async (categoryId) => {
				const category = await ctx.db.get(categoryId);
				if (!category) return null;

				// Get parent category if exists
				let parent = null;
				if (category.parentId) {
					parent = await ctx.db.get(category.parentId);
				}

				return {
					...category,
					parent,
				};
			})
		);

		return {
			...product,
			categories: categories.filter(Boolean),
		};
	},
});

export const getFilteredProducts = query({
	args: {
		paginationOpts: paginationOptsValidator,
		vendorId: v.id("vendors"),
		shopId: v.id("vendorShops"),
		search: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		try {
			const { paginationOpts, vendorId, shopId, search } = args;

			// Verify ownership
			const shop = await ctx.db.get(shopId);
			if (!shop || shop.vendorId !== vendorId) {
				return {
					page: [],
					isDone: true,
					continueCursor: null,
				};
			}

			// Get all products for the shop
			const result = await ctx.db
				.query("products")
				.withIndex("by_shopId", (q) => q.eq("shopId", shopId))
				.collect();

			// Search filter
			let filteredPage = result;
			if (search) {
				const s = search.toLowerCase();
				filteredPage = result.filter(
					(p) =>
						p.name.toLowerCase().includes(s) ||
						(p.description &&
							p.description.toLowerCase().includes(s))
				);
			}

			// Manual pagination
			const start = paginationOpts?.cursor
				? parseInt(paginationOpts.cursor)
				: 0;
			const limit = paginationOpts?.numItems ?? 10;
			const page = filteredPage.slice(start, start + limit);
			const nextCursor =
				start + limit >= filteredPage.length
					? null
					: String(start + limit);

			return {
				page,
				isDone: nextCursor === null,
				continueCursor: nextCursor,
			};
		} catch (error) {
			console.error("Error in getFilteredProducts:", error);
			return {
				page: [],
				isDone: true,
				continueCursor: null,
			};
		}
	},
});

export const updateProduct = mutation({
	args: {
		productId: v.id("products"),
		data: v.object({
			name: v.optional(v.string()),
			slug: v.optional(v.string()),
			description: v.optional(v.string()),
			originalPrice: v.optional(v.float64()),
			isDiscounted: v.optional(v.boolean()),
			discountPercent: v.optional(v.float64()),
			discountStartDate: v.optional(v.string()),
			discountEndDate: v.optional(v.string()),
			stock: v.optional(v.number()),
			isActive: v.optional(v.boolean()),
			categoryIds: v.optional(v.array(v.id("categories"))),
		}),
	},
	handler: async (ctx, { productId, data }) => {
		const existingProduct = await ctx.db.get(productId);
		if (!existingProduct) {
			throw new Error("Product not found");
		}

		// Build update object by including only defined keys
		const updatePayload: Partial<typeof existingProduct> = {};
		for (const key in data) {
			const value = data[key as keyof typeof data];
			if (value !== undefined) {
				(updatePayload as any)[key] = value;
			}
		}

		const product = await ctx.db.patch(productId, updatePayload);

		return product;
	},
});

export const deleteProduct = mutation({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, { productId }) => {
		const product = await ctx.db.delete(productId);
		return product;
	},
});
