"use client";

import ProductCard from "@/components/modules/product-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";

const querySchema = z.object({
	query: z.string().optional(),
	priceMin: z.coerce.number().optional(),
	priceMax: z.coerce.number().optional(),
	page: z.coerce.number().optional().default(1),
	limit: z.coerce.number().optional().default(12),
	sortBy: z.string().optional().default("featured"),
});

export default function CategoryPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { category } = useParams();

	const rawParams = Object.fromEntries(searchParams.entries());
	const parsedQuery = querySchema.safeParse(rawParams);
	const queryData = parsedQuery.data;

	const productsData = useQuery(api.products.getCategoryProducts, {
		categorySlug: category as string,
		query: queryData?.query,
		priceMin: queryData?.priceMin,
		priceMax: queryData?.priceMax,
		page: queryData?.page,
		limit: queryData?.limit,
	});

	const handlePageChange = useCallback(
		(newPage: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", newPage.toString());
			router.push(`?${params.toString()}`);
		},
		[router, searchParams]
	);

	if (!productsData) {
		return <div>Loading products...</div>;
	}

	if (!parsedQuery.success) {
		return <div>Invalid search parameters</div>;
	}

	const { products, pagination } = productsData;

	return (
		<div className="w-full min-h-screen overflow-y-auto">
			<div className="container mx-auto px-4">
				{products.length === 0 ? (
					<div className="text-center py-12">
						<h3 className="text-xl font-medium text-gray-900 mb-2">
							No products found
						</h3>
						<p className="text-gray-600">
							Try adjusting your filters or search terms.
						</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
						</div>

						{/* Results Info */}
						<p className="text-sm text-center text-gray-500 mt-8">
							Showing {products.length} of{" "}
							{pagination.totalProducts} products
						</p>

						{/* Pagination */}
						{pagination.totalPages > 1 && (
							<div className="flex justify-center items-center space-x-4 mt-8">
								<Button
									onClick={() =>
										handlePageChange(
											pagination.currentPage - 1
										)
									}
									disabled={!pagination.hasPrevPage}
									variant="outline"
								>
									Previous
								</Button>

								<div className="flex items-center space-x-2">
									{Array.from(
										{
											length: Math.min(
												5,
												pagination.totalPages
											),
										},
										(_, i) => {
											const pageNumber =
												Math.max(
													1,
													pagination.currentPage - 2
												) + i;
											if (
												pageNumber >
												pagination.totalPages
											)
												return null;

											return (
												<button
													key={pageNumber}
													onClick={() =>
														handlePageChange(
															pageNumber
														)
													}
													className={`px-3 py-1 rounded-md ${
														pageNumber ===
														pagination.currentPage
															? "bg-foreground text-white"
															: "bg-transparent border border-border text-foreground hover:bg-foreground/10"
													}`}
												>
													{pageNumber}
												</button>
											);
										}
									)}
								</div>

								<Button
									onClick={() =>
										handlePageChange(
											pagination.currentPage + 1
										)
									}
									disabled={!pagination.hasNextPage}
									variant="outline"
								>
									Next
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
