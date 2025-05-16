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

        vendorDetails: v.optional(v.object({
            businessName: v.string(),
            description: v.optional(v.string()),
            verificationStatus: vendorVerificationStatusValidator,
            verificationDate: v.optional(v.number())
        }))
    }).index("by_clerkId", ["clerkId"]),
    categories: defineTable({
        name: v.string(),
        slug: v.string(),
        parentId: v.optional(v.id("categories")),
    }).index("by_slug", ["slug"]),
});
