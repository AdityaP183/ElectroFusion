"use client";

import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

interface Props {
	categoryValues?: string[] | null;
	setCategoryValues: (values: string[] | null) => void;
}

export default function CategorySelector({
	categoryValues,
	setCategoryValues,
}: Props) {
	// Store only string values in URL params

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

	// Convert string array from URL to Option[] for the component
	const selectedOptions: Option[] = (categoryValues || []).map((value) => {
		// Find the matching option from parsedCategories
		const matchingOption = parsedCategories?.find(
			(option) => option.value === value
		);
		// Return the full Option object if found, or create a minimal one if not
		return matchingOption || { label: value, value };
	});

	// Handle change from the MultiSelector and update URL with just the values
	const handleChange = (newSelection: Option | Option[]) => {
		const options = Array.isArray(newSelection)
			? newSelection
			: [newSelection];

		// Extract just the value properties for the URL
		const newValues = options.map((option) => option.value);

		// If empty array, pass null to remove the parameter completely from the URL
		setCategoryValues(newValues.length > 0 ? newValues : null);
	};

	return (
		<div className="w-full px-2">
			<h2 className="font-semibold mb-2">Select Categories</h2>
			{categories === undefined || parsedCategories === undefined ? (
				<div className="h-[42px] w-[280px] border-1 bg-accent animate-pulse border-border rounded-md" />
			) : (
				<MultipleSelector
					value={selectedOptions}
					onChange={handleChange}
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
