import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export type Role = "admin" | "vendor" | "customer";
export type VendorVerificationStatus = "pending" | "approved" | "rejected";
export type ProductStatus = "draft" | "active" | "inactive" | "outOfStock";

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

export const productStatusValidator = v.union(
	v.literal("draft"),
	v.literal("active"),
	v.literal("inactive"),
	v.literal("outOfStock")
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
		verificationStatus: vendorVerificationStatusValidator,
		verificationNotes: v.optional(v.string()),
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
		discountedPrice: v.optional(v.float64()),
		discountStartDate: v.optional(v.number()),
		discountEndDate: v.optional(v.number()),
		stock: v.int64(),

		// Product Details
		sku: v.optional(v.string()),
		barcode: v.optional(v.string()),
		weight: v.optional(v.float64()),
		dimensions: v.optional(
			v.object({
				length: v.float64(),
				width: v.float64(),
				height: v.float64(),
				unit: v.string(), // "cm", "inch"
			})
		),

		// Images and Media
		images: v.array(
			v.object({
				url: v.string(),
				altText: v.optional(v.string()),
				isPrimary: v.boolean(),
				sortOrder: v.int64(),
			})
		),

		// Status and Visibility
		status: productStatusValidator,
		isActive: v.boolean(),
		isFeatured: v.boolean(),

		// Attributes for variants (size, color, etc.)
		attributes: v.optional(
			v.array(
				v.object({
					name: v.string(),
					value: v.string(),
				})
			)
		),

		// Analytics
		viewCount: v.optional(v.int64()),
		purchaseCount: v.optional(v.int64()),

		// Organization
		shopId: v.id("vendorShops"),
		categoryIds: v.array(v.id("categories")),
	})
		.index("by_shopId", ["shopId"])
		.index("by_slug", ["slug"])
		.index("by_status", ["status"])
		.index("by_isActive", ["isActive"])
		.index("by_isFeatured", ["isFeatured"])
		.index("by_categoryIds", ["categoryIds"]),
});
