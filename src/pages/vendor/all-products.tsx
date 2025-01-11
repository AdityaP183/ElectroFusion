import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getProducts } from "@/db/api-product";
import { Category } from "@/lib/app-data";
import {
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
	const navigate = useNavigate();
	const { user } = fusionStore();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(user?.id),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	if (!isLoading && isError) console.log(error);

	return (
		<div className="py-2">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">All Products</h1>
				<Button
					onClick={() =>
						navigate(`/${user?.user_metadata.role}/products/add`)
					}
				>
					<Plus />
					Add Product
				</Button>
			</div>
			<div className="my-5">
				{isLoading ? (
					<Skeleton className="h-1/2" />
				) : isError ? (
					<div className="text-xl text-center text-red-600">
						{error.message}
					</div>
				) : (
					<Table className="border border-secondary">
						{data && data.length === 0 && (
							<TableCaption className="">
								No Products Found
							</TableCaption>
						)}
						<TableHeader className="bg-secondary">
							<TableRow>
								<TableHead className="text-center">
									Product ID
								</TableHead>
								<TableHead className="">Product</TableHead>
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
											{product.productName}
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
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}
