import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addToCart = mutation({
	args: {
		productId: v.id("products"),
		quantity: v.number(),
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

		const existingCart = await ctx.db
			.query("cart")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (existingCart) {
			const existingItem = existingCart.items.find(
				(item) => item.productId === args.productId
			);

			let updatedItems;
			if (existingItem) {
				// Increment quantity by args.quantity
				updatedItems = existingCart.items.map((item) =>
					item.productId === args.productId
						? { ...item, quantity: item.quantity + args.quantity }
						: item
				);
			} else {
				// Add new item with specified quantity
				updatedItems = [
					...existingCart.items,
					{ productId: args.productId, quantity: args.quantity },
				];
			}

			await ctx.db.patch(existingCart._id, { items: updatedItems });
		} else {
			// Create a new cart with initial quantity
			await ctx.db.insert("cart", {
				userId: dbUser._id,
				items: [{ productId: args.productId, quantity: args.quantity }],
			});
		}

		await ctx.db.patch(args.productId, { isInCart: true });

		return "Added to cart";
	},
});

export const removeFromCart = mutation({
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

		const existingCart = await ctx.db
			.query("cart")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (!existingCart) return "Cart not found";

		const existingItem = existingCart.items.find(
			(item) => item.productId === args.productId
		);

		if (!existingItem) return "Item not in cart";

		let updatedItems;
		if (existingItem.quantity > 1) {
			// Decrement quantity
			updatedItems = existingCart.items.map((item) =>
				item.productId === args.productId
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
		} else {
			// Remove item completely
			updatedItems = existingCart.items.filter(
				(item) => item.productId !== args.productId
			);
		}

		await ctx.db.patch(existingCart._id, { items: updatedItems });
		await ctx.db.patch(args.productId, { isInCart: false });

		return "Removed from cart";
	},
});

export const getCartWithProducts = query({
	args: {
	},
	handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		const clerkId = identity.subject;
		const dbUser = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!dbUser) return null;

		const cart = await ctx.db
			.query("cart")
			.withIndex("by_userId", (q) => q.eq("userId", dbUser._id))
			.unique();

		if (!cart) return [];

		const itemsWithProductDetails = await Promise.all(
			cart.items.map(async (item) => {
				const product = await ctx.db.get(item.productId);
				return {
					productId: item.productId,
					quantity: item.quantity,
					product, // full product document
				};
			})
		);

		return itemsWithProductDetails;
	},
});
