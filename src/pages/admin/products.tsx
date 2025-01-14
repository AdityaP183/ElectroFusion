import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getProductsPublic } from "@/db/api-product";
import { Category } from "@/lib/app-data";
import {
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Eye, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Products() {
	const navigate = useNavigate();
	const { data, isError, isLoading, error, refetch } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProductsPublic(),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	return (
		<Card className="border-none">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-3xl">All Products</CardTitle>
				<Button size={"icon"} onClick={() => refetch()}>
					<RefreshCcw className={`${isLoading && "animate-spin"}`} />
				</Button>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className="h-[300px]" />
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
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">
									ID
								</TableHead>
								<TableHead className="">Product</TableHead>
								<TableHead className="text-center">
									Vendor ID
								</TableHead>
								<TableHead className="text-center">
									Stock
								</TableHead>
								<TableHead className="text-center">
									Price
								</TableHead>
								<TableHead className="text-center">
									Is Discounted
								</TableHead>
								<TableHead className="text-center">
									Discount (%)
								</TableHead>
								<TableHead className="text-center">
									Discounted Price
								</TableHead>
								<TableHead className="text-center">
									Categories
								</TableHead>
								<TableHead className="text-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="relative">
							{data &&
								data.length > 0 &&
								data.map((product) => (
									<TableRow key={product.id}>
										<TableCell className="text-center">
											{product.id}
										</TableCell>
										<TableCell>
											{product.productName.length > 50
												? product.productName.slice(
														0,
														50
												  ) + "..."
												: product.productName}
										</TableCell>
										<TableCell>
											{product.createdBy}
										</TableCell>
										<TableCell className="text-center">
											{product.stock}
										</TableCell>
										<TableCell className="text-center">
											{formatValueWithIndianNumericPrefix(
												product.originalPrice,
												"price"
											)}
										</TableCell>
										<TableCell className="flex justify-center">
											{product.isDiscounted ? (
												<Badge
													variant="outline"
													className="text-green-600 border-green-600 bg-green-600/10"
												>
													True
												</Badge>
											) : (
												<Badge
													variant="outline"
													className="text-red-600 border-red-600 bg-red-600/10"
												>
													False
												</Badge>
											)}
										</TableCell>
										<TableCell className="text-center">
											{product.discountPercent ?? "N/A"}
										</TableCell>
										<TableCell className="text-center">
											{product.isDiscounted &&
											product.discountPercent
												? formatDiscountedPriceUsingPercent(
														product.discountPercent,
														product.originalPrice
												  )
												: "N/A"}
										</TableCell>
										<TableCell className="text-center">
											{product.categories.map(
												(category: string) => (
													<Badge
														key={category}
														category={
															category as Category
														}
													>
														{category}
													</Badge>
												)
											)}
										</TableCell>
										<TableCell className="text-center">
											<Button
												size={"icon"}
												className="bg-orange-700 hover:bg-orange-500"
												onClick={() =>
													navigate(
														`/admin/products/${product.id}`
													)
												}
											>
												<Eye className="w-4 h-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
}
