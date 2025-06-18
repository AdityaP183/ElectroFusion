import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

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

export const getVendorApplications = query({
	args: {
		paginationOpts: paginationOptsValidator,
		sortBy: v.optional(
			v.union(v.literal("_creationTime"), v.literal("contactEmail"))
		),
		sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
	},
	handler: async (
		ctx,
		{ paginationOpts, sortBy = "_creationTime", sortOrder = "desc" }
	) => {
		const applications = await ctx.db
			.query("vendorApplications")
			.order(sortOrder === "asc" ? "asc" : "desc")
			.paginate(paginationOpts);

		const enrichedApplications = await Promise.all(
			applications.page.map(async (application) => {
				const user = await ctx.db.get(application.userId);
				return {
					...application,
					user,
				};
			})
		);

		return {
			...applications,
			page: enrichedApplications,
		};
	},
});

// Approve vendor application
export const approveVendorApplication = mutation({
	args: {
		applicationId: v.id("vendorApplications"),
	},
	handler: async (ctx, { applicationId }) => {
		// Get the application
		const application = await ctx.db.get(applicationId);
		if (!application) {
			throw new Error("Application not found");
		}

		// Check if user already has a vendor record
		const existingVendor = await ctx.db
			.query("vendors")
			.withIndex("by_userId", (q) => q.eq("userId", application.userId))
			.first();

		if (existingVendor) {
			throw new Error("User is already a vendor");
		}

		// Create vendor record
		const vendorId = await ctx.db.insert("vendors", {
			userId: application.userId,
			contactEmail: application.contactEmail,
			contactPhone: application.contactPhone,
		});

		// Update user role to vendor
		const user = await ctx.db.get(application.userId);
		if (user) {
			await ctx.db.patch(application.userId, {
				role: "vendor" as const,
			});
		}

		// Delete the application
		await ctx.db.delete(applicationId);

		return { success: true, vendorId };
	},
});

// Reject vendor application
export const rejectVendorApplication = mutation({
	args: {
		applicationId: v.id("vendorApplications"),
	},
	handler: async (ctx, { applicationId }) => {
		// Get the application to verify it exists
		const application = await ctx.db.get(applicationId);
		if (!application) {
			throw new Error("Application not found");
		}

		// Delete the application
		await ctx.db.delete(applicationId);

		return { success: true };
	},
});
