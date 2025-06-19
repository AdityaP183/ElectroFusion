import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllWishlistProducts = query({
	args: {},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		// Get the user's wishlist (should be a single wishlist per user)
		const wishlist = await ctx.db
			.query("wishlists")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique(); // Changed from collect() to unique() since there should be one wishlist per user

		if (!wishlist || !wishlist.products.length) return [];

		// Get all products from the wishlist and filter out nulls in one step
		const wishlistProductsPromises = wishlist.products.map(
			async (productId) => {
				const product = await ctx.db.get(productId);
				return product;
			}
		);

		const wishlistProducts = await Promise.all(wishlistProductsPromises);

		// Process only valid (non-null) products
		const wishlistProductsWithCategories = [];

		for (const product of wishlistProducts) {
			if (!product) continue; // Skip null products

			// At this point, product is guaranteed to be non-null
			// Process only valid (non-null) products
			const wishlistProductsWithCategories = [];

			for (const product of wishlistProducts) {
				if (!product) continue; // Skip null products

				// Compute discounted price
				const discountedPrice =
					product.isDiscounted && product.discountPercent
						? product.originalPrice *
						  (1 - product.discountPercent / 100)
						: product.originalPrice;

				// Get categories with parent information
				const categories = await Promise.all(
					product.categoryIds.map(async (categoryId) => {
						const category = await ctx.db.get(categoryId);
						if (!category) return null;

						if (category.parentId) {
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

				wishlistProductsWithCategories.push({
					...product,
					discountedPrice: parseFloat(discountedPrice.toFixed(2)),
					categories: categories.filter(Boolean),
				});
			}

			return wishlistProductsWithCategories;
		}
	},
});

export const addToWishlist = mutation({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		// Check if user already has a wishlist
		const existingWishlist = await ctx.db
			.query("wishlists")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (existingWishlist) {
			if (existingWishlist.products.includes(args.productId)) {
				return "Already in wishlist";
			}

			await ctx.db.patch(existingWishlist._id, {
				products: [...existingWishlist.products, args.productId],
			});
		} else {
			await ctx.db.insert("wishlists", {
				userId: dbUser._id,
				products: [args.productId],
			});
		}

		await ctx.db.patch(args.productId, { isWishlisted: true });

		return "Added to wishlist";
	},
});

export const removeFromWishlist = mutation({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		const existingWishlist = await ctx.db
			.query("wishlists")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (!existingWishlist) {
			return "Wishlist not found";
		}

		if (!existingWishlist.products.includes(args.productId)) {
			return "Product not in wishlist";
		}

		const updatedProducts = existingWishlist.products.filter(
			(productId) => productId !== args.productId
		);

		await ctx.db.patch(existingWishlist._id, {
			products: updatedProducts,
		});

		await ctx.db.patch(args.productId, {
			isWishlisted: false,
		});

		return "Removed from wishlist";
	},
});
