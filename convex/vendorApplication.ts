import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addVendorApplication = mutation({
	args: {
		clerkId: v.string(),
		contactEmail: v.string(),
		contactPhone: v.string(),
		comment: v.string(),
	},
	handler: async (ctx, { clerkId, contactEmail, contactPhone, comment }) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();
		if (!user) {
			throw new Error("User not found");
		}

		const vendorApplication = await ctx.db.insert("vendorApplications", {
			userId: user._id,
			contactEmail,
			contactPhone,
			comment,
		});
		return vendorApplication;
	},
});
