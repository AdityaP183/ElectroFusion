// convex/reviews.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createReview = mutation({
	args: {
		productId: v.id("products"),
		rating: v.float64(),
		comment: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		// Get user by clerkId
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();

		if (!user) {
			throw new Error("User not found");
		}

		// Validate rating
		if (args.rating < 1 || args.rating > 5) {
			throw new Error("Rating must be between 1 and 5");
		}

		// Validate comment
		if (args.comment.trim().length < 10) {
			throw new Error(
				"Review comment must be at least 10 characters long"
			);
		}

		if (args.comment.length > 500) {
			throw new Error("Review comment must be less than 500 characters");
		}

		// Check if user already reviewed this product
		const existingReview = await ctx.db
			.query("productReviews")
			.filter((q) =>
				q.and(
					q.eq(q.field("productId"), args.productId),
					q.eq(q.field("userId"), user._id)
				)
			)
			.unique();

		if (existingReview) {
			throw new Error("You have already reviewed this product");
		}

		// Verify product exists
		const product = await ctx.db.get(args.productId);
		if (!product) {
			throw new Error("Product not found");
		}

		// Create the review
		const reviewId = await ctx.db.insert("productReviews", {
			productId: args.productId,
			userId: user._id,
			rating: args.rating,
			comment: args.comment.trim(),
		});

		return reviewId;
	},
});

export const getProductReviewStats = query({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, args) => {
		const reviews = await ctx.db
			.query("productReviews")
			.filter((q) => q.eq(q.field("productId"), args.productId))
			.collect();

		if (reviews.length === 0) {
			return {
				totalReviews: 0,
				averageRating: 0,
				ratingDistribution: {
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
				},
			};
		}

		const totalRating = reviews.reduce(
			(sum, review) => sum + review.rating,
			0
		);
		const averageRating = totalRating / reviews.length;

		const ratingDistribution = reviews.reduce(
			(dist, review) => {
				dist[review.rating as keyof typeof dist]++;
				return dist;
			},
			{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
		);

		return {
			totalReviews: reviews.length,
			averageRating: Math.round(averageRating * 10) / 10,
			ratingDistribution,
		};
	},
});

export const updateReview = mutation({
	args: {
		reviewId: v.id("productReviews"),
		rating: v.number(),
		comment: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		// Get user by clerkId
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();

		if (!user) {
			throw new Error("User not found");
		}

		// Get the review
		const review = await ctx.db.get(args.reviewId);
		if (!review) {
			throw new Error("Review not found");
		}

		// Check if user owns this review
		if (review.userId !== user._id) {
			throw new Error("You can only edit your own reviews");
		}

		// Validate rating
		if (args.rating < 1 || args.rating > 5) {
			throw new Error("Rating must be between 1 and 5");
		}

		// Validate comment
		if (args.comment.trim().length < 10) {
			throw new Error(
				"Review comment must be at least 10 characters long"
			);
		}

		if (args.comment.length > 500) {
			throw new Error("Review comment must be less than 500 characters");
		}

		// Update the review
		await ctx.db.patch(args.reviewId, {
			rating: args.rating,
			comment: args.comment.trim(),
		});

		return args.reviewId;
	},
});

export const deleteReview = mutation({
	args: {
		reviewId: v.id("productReviews"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		// Get user by clerkId
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();

		if (!user) {
			throw new Error("User not found");
		}

		// Get the review
		const review = await ctx.db.get(args.reviewId);
		if (!review) {
			throw new Error("Review not found");
		}

		// Check if user owns this review or is admin
		if (review.userId !== user._id && user.role !== "admin") {
			throw new Error("You can only delete your own reviews");
		}

		// Delete the review
		await ctx.db.delete(args.reviewId);

		return args.reviewId;
	},
});

// Get user's review for a product (to check if they already reviewed)
export const getUserProductReview = query({
	args: {
		productId: v.id("products"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return null;
		}

		// Get user by clerkId
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();

		if (!user) {
			return null;
		}

		// Find user's review for this product
		const review = await ctx.db
			.query("productReviews")
			.filter((q) =>
				q.and(
					q.eq(q.field("productId"), args.productId),
					q.eq(q.field("userId"), user._id)
				)
			)
			.unique();

		return review;
	},
});
