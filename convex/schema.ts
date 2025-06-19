import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export type Role = "admin" | "vendor" | "customer";
export type VendorVerificationStatus = "pending" | "approved" | "rejected";

export const roleValidator = v.union(
	v.literal("admin"),
	v.literal("vendor"),
	v.literal("customer")
);

export const vendorVerificationStatusValidator = v.union(
	v.literal("pending"),
	v.literal("approved"),
	v.literal("rejected")
);

export default defineSchema({
	users: defineTable({
		email: v.string(),
		clerkId: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		imageUrl: v.optional(v.string()),
		role: roleValidator,
	}).index("by_clerkId", ["clerkId"]),

	categories: defineTable({
		name: v.string(),
		slug: v.string(),
		parentId: v.optional(v.id("categories")),
	}).index("by_slug", ["slug"]),

	vendors: defineTable({
		userId: v.id("users"),
		contactEmail: v.string(),
		contactPhone: v.string(),
	}).index("by_userId", ["userId"]),

	vendorApplications: defineTable({
		userId: v.id("users"),
		contactEmail: v.string(),
		contactPhone: v.string(),
		comment: v.string(),
	}).index("by_userId", ["userId"]),

	vendorShops: defineTable({
		vendorId: v.id("vendors"),
		name: v.string(),
		slug: v.string(),
		description: v.string(),
		bannerImage: v.string(),
		logo: v.string(),
	})
		.index("by_vendorId", ["vendorId"])
		.index("by_slug", ["slug"]),

	products: defineTable({
		name: v.string(),
		slug: v.string(),
		description: v.string(),

		// Pricing
		originalPrice: v.float64(),
		isDiscounted: v.boolean(),
		discountPercent: v.optional(v.float64()),
		discountStartDate: v.optional(v.string()),
		discountEndDate: v.optional(v.string()),
		stock: v.number(),

		// Images and Media
		image: v.string(),

		// Status and Visibility
		isActive: v.boolean(),
		isFeatured: v.boolean(),

		// Analytics
		viewCount: v.optional(v.number()),
		purchaseCount: v.optional(v.number()),

		// Organization
		isWishlisted: v.optional(v.boolean()),
		isInCart: v.optional(v.boolean()),
		shopId: v.id("vendorShops"),
		categoryIds: v.array(v.id("categories")),
	})
		.index("by_shopId", ["shopId"])
		.index("by_slug", ["slug"])
		.index("by_isActive", ["isActive"])
		.index("by_isFeatured", ["isFeatured"])
		.index("by_categoryIds", ["categoryIds"]),

	wishlists: defineTable({
		userId: v.id("users"),
		products: v.array(v.id("products")),
	}).index("by_userId", ["userId"]),

	cart: defineTable({
		userId: v.id("users"),
		items: v.array(
			v.object({
				productId: v.id("products"),
				quantity: v.number(),
			})
		),
	}).index("by_userId", ["userId"]),

	productReviews: defineTable({
		productId: v.id("products"),
		userId: v.id("users"),
		rating: v.float64(),
		comment: v.string(),
	}),

	order: defineTable({
		userId: v.id("users"),
		items: v.array(
			v.object({
				productId: v.id("products"),
				quantity: v.number(),
				price: v.float64(),
				totalPrice: v.float64(),
			})
		),
		orderStatus: v.string(),
	}).index("by_userId", ["userId"]),

	vendorSales: defineTable({
		vendorId: v.id("vendors"),
		orderId: v.optional(v.id("order")),
		vendorEarning: v.float64(),
		items: v.array(
			v.object({
				productId: v.id("products"),
				quantity: v.number(),
				price: v.float64(),
				totalPrice: v.float64(),
			})
		),
	}),

	adminSales: defineTable({
		orderId: v.optional(v.id("order")),
		vendorId: v.optional(v.id("vendors")),
		createdAt: v.number(),
		totalAmount: v.float64(),
		items: v.array(
			v.object({
				productId: v.id("products"),
				quantity: v.number(),
				price: v.float64(),
				totalPrice: v.float64(),
			})
		),
	}),
});
