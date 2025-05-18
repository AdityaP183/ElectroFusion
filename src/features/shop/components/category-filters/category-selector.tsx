"use client";

import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";

export default function CategorySelector() {
	const [values, setValues] = useState<Option[]>([]);
	const categories = useQuery(api.categories.getCategoriesWithHierarchy);

	const parsedCategories =
		categories &&
		categories.flatMap((parent) =>
			parent.children.map((child) => ({
				label: child.name,
				value: child.slug,
				group: parent.name,
			}))
		);
	console.log(values);
	return (
		<div className="w-full px-2">
			<h2 className="font-semibold mb-2">Select Categories</h2>
			{categories === undefined || parsedCategories === undefined ? (
				<div className="h-[42px] w-[280px] border-1 bg-accent animate-pulse border-border rounded-md" />
			) : (
				<MultipleSelector
					value={values}
					onChange={(value) => setValues(value)}
					defaultOptions={parsedCategories}
					placeholder="Select frameworks you like..."
					emptyIndicator={
						<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
							no results found.
						</p>
					}
					badgeClassName="bg-accent text-foreground"
					groupBy="group"
				/>
			)}
		</div>
	);
}
