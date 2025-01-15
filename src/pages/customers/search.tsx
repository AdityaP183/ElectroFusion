import Searchbar from "@/components/app/common/searchbar";
import { ProductCard } from "@/components/app/store";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsPublic } from "@/db/api-product";
import { categories as categoriesData } from "@/lib/app-data";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Search() {
	const [searchValue, setSearchValue] = useState("");
	const [categories, setCategories] = useState("");
	const [priceRange, setPriceRange] = useState([0, 150000]);
	const [sortOrder, setSortOrder] = useState("");
	const [rating, setRating] = useState("4");

	const [filters, setFilters] = useState({
		search: "",
		categories: "",
		priceRange: [0, 150000],
		sort: "",
		rating: 0,
		count: 0,
	});

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["search-products", filters],
		queryFn: () => getProductsPublic(filters),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	const handleApplyFilters = () => {
		setFilters({
			search: searchValue || "",
			categories: categories || "",
			priceRange: priceRange || [0, 150000],
			sort: sortOrder || "",
			rating: parseInt(rating) || 0,
			count: 0,
		});
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setSearchValue(params.get("search") || "");
		setCategories(params.get("categories") || "");
		const priceRange = params.get("priceRange");
		if (priceRange) {
			const [min, max] = priceRange.split("-").map(Number);
			setPriceRange([min, max]);
		} else {
			setPriceRange([0, 150000]); // Full range
		}
		setSortOrder(params.get("sort") || "");
		setRating(params.get("rating") || "0");
	}, []);

	return (
		<div className="flex gap-3 mt-10">
			<div className="w-[250px] flex-col gap-2">
				<div className="flex items-center justify-between mb-4">
					<h3 className="mb-2 text-xl font-medium">Filters</h3>
					<Button size={"sm"} onClick={handleApplyFilters}>
						Apply
					</Button>
				</div>

				<Separator className="my-4" />

				<Searchbar
					searchValue={searchValue}
					onSearchValueChange={setSearchValue}
				/>

				<Separator className="my-4" />

				<div className="space-y-2">
					<Label>Categories</Label>
					<Select value={categories} onValueChange={setCategories}>
						<SelectTrigger>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{categoriesData.map((categoryItem) => (
								<SelectItem
									key={categoryItem}
									value={categoryItem}
									className="capitalize"
								>
									{categoryItem}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="my-4 space-y-10 ">
					<Label>Price Range</Label>
					<div className="px-5">
						<DualRangeSlider
							label={(value) => <span>&#x20B9;{value}</span>}
							value={priceRange}
							onValueChange={setPriceRange}
							min={10000}
							max={150000}
							step={1}
						/>
					</div>
				</div>

				<div className="my-4 space-y-2">
					<Label>Sort</Label>
					<RadioGroup value={sortOrder} onValueChange={setSortOrder}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="low" id="low" />
							<Label htmlFor="low">Low</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="high" id="high" />
							<Label htmlFor="high">High</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="my-4 space-y-2">
					<Label>Rating</Label>
					<RadioGroup
						value={rating}
						onValueChange={setRating}
						aria-label="Filter by rating"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="5" id="rating-5" />
							<Label htmlFor="rating-5">5 Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="4" id="rating-4" />
							<Label htmlFor="rating-4">4+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="3" id="rating-3" />
							<Label htmlFor="rating-3">3+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="2" id="rating-2" />
							<Label htmlFor="rating-2">2+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="1" id="rating-1" />
							<Label htmlFor="rating-1">1+ Stars</Label>
						</div>
					</RadioGroup>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{isLoading ? (
					<Skeleton className="w-[400px] h-[500px]" />
				) : isError ? (
					<div className="text-xl text-center text-red-600">
						<div className="text-xl text-center text-red-600">
							<p>
								Something went wrong while fetching orders.
								Please try again.
							</p>
							<p>
								{error instanceof Error
									? error.message
									: "Unknown error occurred"}
							</p>
						</div>
					</div>
				) : data && data.length > 0 ? (
					data.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							image={product.productImage}
							title={product.productName}
							description={product.description}
							price={product.originalPrice}
							isDiscounted={product.isDiscounted}
							discountedPercent={product.discountPercent}
						/>
					))
				) : (
					<p>No Product Found</p>
				)}
			</div>
		</div>
	);
}
