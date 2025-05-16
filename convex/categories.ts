import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { CategoryWithChildren } from "../src/lib/app-types";

export const getAllCategories = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("categories").collect();
	},
});

export const getCategoriesWithHierarchy = query({
	args: {},
	handler: async (ctx) => {
		const categories = await ctx.db.query("categories").collect();

		const categoryMap = new Map<Id<"categories">, CategoryWithChildren>();
		categories.forEach((category) => {
			if (!categoryMap.has(category._id)) {
				categoryMap.set(category._id, {
					...category,
					children: [],
				});
			} else {
				const existingData = categoryMap.get(category._id)!;
				categoryMap.set(category._id, {
					...category,
					children: existingData.children,
				});
			}
		});

		const rootCategories: CategoryWithChildren[] = [];
		categories.forEach((category) => {
			if (category.parentId) {
				// Add as child to parent
				if (categoryMap.has(category.parentId)) {
					categoryMap
						.get(category.parentId)!
						.children.push(categoryMap.get(category._id)!);
				}
			} else {
				// This is a root category
				rootCategories.push(categoryMap.get(category._id)!);
			}
		});

		return rootCategories;
	},
});
