import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";
import { Role } from "./schema";

export const getUser = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
			.unique();

		return user;
	},
});

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return null;
		}

		const clerkId = identity.subject;

		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		return user;
	},
});

async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
	return await ctx.db
		.query("users")
		.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkUserId))
		.unique();
}

// export const createOrUpdateUser = internalMutation({
// 	args: { data: v.any() as Validator<UserJSON> },
// 	handler: async (ctx, { data }) => {
// 		const user = await userByClerkUserId(ctx, data.id);

// 		if (user === null) {
// 			const userAttributes = {
// 				email: data.email_addresses[0].email_address,
// 				clerkId: data.id,
// 				firstName: data.first_name ?? "",
// 				lastName: data.last_name ?? "",
// 				imageUrl: data.image_url ?? undefined,
// 				role: "customer" as Role,
// 			};
// 			await ctx.db.insert("users", userAttributes);
// 		} else {
// 			console.log("Updating user", user);
// 			const updateAttributes = {
// 				email: data.email_addresses[0].email_address,
// 				firstName: data.first_name ?? "",
// 				lastName: data.last_name ?? "",
// 				imageUrl: data.image_url ?? undefined,
// 			};
// 			console.log("updateAttributes", updateAttributes);
// 			await ctx.db.patch(user._id, updateAttributes);
// 		}
// 	},
// });

export const createUser = internalMutation({
	args: { data: v.any() as Validator<UserJSON> },
	handler: async (ctx, { data }) => {
		const userAttributes = {
			email: data.email_addresses[0].email_address,
			clerkId: data.id,
			firstName: data.first_name ?? "",
			lastName: data.last_name ?? "",
			imageUrl: data.image_url ?? undefined,
			role: "customer" as Role,
		};

		await ctx.db.insert("users", userAttributes);
		console.log("User created successfully with role: customer");
	},
});

// Separate function for UPDATING users
export const updateUser = internalMutation({
	args: { data: v.any() as Validator<UserJSON> },
	handler: async (ctx, { data }) => {
		const user = await userByClerkUserId(ctx, data.id);
		if (!user) {
			throw new Error(`User not found for Clerk ID: ${data.id}`);
		}

		const updateAttributes = {
			email: data.email_addresses[0].email_address,
			firstName: data.first_name ?? "",
			lastName: data.last_name ?? "",
			imageUrl: data.image_url ?? undefined,
            role: user.role,
            vendorDetails: user.vendorDetails
		};

		await ctx.db.patch(user._id, updateAttributes);
		console.log("User updated successfully", user.role);
	},
});

export const deleteFromClerk = internalMutation({
	args: { clerkUserId: v.string() },
	async handler(ctx, { clerkUserId }) {
		const user = await userByClerkUserId(ctx, clerkUserId);

		if (user !== null) {
			await ctx.db.delete(user._id);
		} else {
			console.warn(
				`Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
			);
		}
	},
});
