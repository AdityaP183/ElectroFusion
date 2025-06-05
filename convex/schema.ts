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
});
