import { Searchbar } from "@/components/app/common";
import ProductCard from "@/components/app/store/ProductCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { productsData } from "@/lib/app-data";
import { generateRoundedPriceRanges } from "@/lib/utils";
import { useMemo, useState } from "react";

const SearchProducts = () => {
	const filteredProducts = useMemo(() => productsData, []);
	const minMax = filteredProducts.reduce(
		(acc, product) => {
			const price = product.originalPrice;
			if (price < acc.min) acc.min = price;
			if (price > acc.max) acc.max = price;
			return acc;
		},
		{ min: Infinity, max: -Infinity }
	);

	const [search, setSearch] = useState("");
	const priceRanges = generateRoundedPriceRanges(minMax.max);
	const [, setPriceRange] = useState<number[]>(priceRanges[0]);
	const [, setSort] = useState<"asc" | "desc">("asc");
	return (
		<div className="flex gap-3 mt-10">
			<div className="w-[250px] flex-col gap-2">
				<h3 className="mb-2 text-xl font-medium">Filters</h3>
				<Searchbar
					searchValue={search}
					onSearchValueChange={setSearch}
				/>
				<div className="my-4">
					<h3>Price Range</h3>
					<RadioGroup
						// defaultValue="0-100"
						className="my-3"
						onValueChange={(value: string) => {
							const newVal = value.split("-").map(Number);
							setPriceRange(newVal);
						}}
					>
						{priceRanges.map(([start, end], index) => {
							const value = `${start}-${end}`;
							return (
								<div
									key={index}
									className="flex items-center space-x-2"
								>
									<RadioGroupItem
										value={value}
										id={`range-${index}`}
									/>
									<Label htmlFor={`range-${index}`}>
										₹{start} - ₹{end}
									</Label>
								</div>
							);
						})}
					</RadioGroup>
				</div>
				<div>
					<h3>Sort By</h3>
					<RadioGroup
						className="my-3"
						onValueChange={(value) =>
							setSort(value as "asc" | "desc")
						}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="asc" id="asc" />
							<Label htmlFor="asc">Low to High</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="desc" id="desc" />
							<Label htmlFor="desc">High to Low</Label>
						</div>
					</RadioGroup>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{filteredProducts.map((product) => (
					<ProductCard
						key={product.id}
						image={product.image}
						title={product.productName}
						description={product.description}
						price={product.originalPrice}
					/>
				))}
			</div>
		</div>
	);
};
export default SearchProducts;
