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
		shopId: v.id("vendorShops"),
		categoryIds: v.array(v.id("categories")),
	})
		.index("by_shopId", ["shopId"])
		.index("by_slug", ["slug"])
		.index("by_isActive", ["isActive"])
		.index("by_isFeatured", ["isFeatured"])
		.index("by_categoryIds", ["categoryIds"]),
});
