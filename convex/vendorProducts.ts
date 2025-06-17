import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
