"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import CategorySelector from "./category-selector";
import PriceRange from "./price-range";
import Searchfilter from "./search-filter";

interface Props {
	isCategory: boolean;
}

export default function CategoryFilters({ isCategory }: Props) {
	const [search, setSearch] = useQueryState("query", {
		defaultValue: "",
		shallow: false,
	});
	const [priceMin, setPriceMin] = useQueryState("priceMin", {
		defaultValue: "",
		shallow: false,
	});
	const [priceMax, setPriceMax] = useQueryState("priceMax", {
		defaultValue: "",
		shallow: false,
	});
	const [categoryValues, setCategoryValues] = useQueryState(
		"categories",
		parseAsArrayOf(parseAsString).withOptions({
			clearOnDefault: true,
		})
	);

	return (
		<Card className="flex gap-3 py-2 rounded-md w-[300px]">
			<Searchfilter search={search} setSearch={setSearch} />
			<Separator />
			<PriceRange
				priceMin={priceMin}
				setPriceMin={setPriceMin}
				priceMax={priceMax}
				setPriceMax={setPriceMax}
			/>
			{!isCategory && (
				<>
					<Separator />
					<CategorySelector
						categoryValues={categoryValues}
						setCategoryValues={setCategoryValues}
					/>
				</>
			)}
			{/* Seller */}
		</Card>
	);
}
