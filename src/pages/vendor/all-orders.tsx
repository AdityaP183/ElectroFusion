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
import { getOrders } from "@/db/api-orders";
import { OrderStatus } from "@/lib/app-data";
import { formatDate, formatValueWithIndianNumericPrefix } from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { Pen, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
	const navigate = useNavigate();
	const { user } = fusionStore();
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["orders"],
		queryFn: () => getOrders(user?.id),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	if (!isLoading && data) {
		console.log(data);
	}

	if (!isLoading && isError) console.log(error);

	return (
		<div className="py-2">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">All Orders</h1>
				<Button
					size={"icon"}
					className={`${isLoading && "animate-spin"}`}
					onClick={() => refetch()}
				>
					<RefreshCcw />
				</Button>
			</div>
			<div className="my-5">
				{isLoading ? (
					<Skeleton className="h-1/2" />
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
					<Table className="border border-secondary">
						{data && data.length === 0 && (
							<TableCaption>No Products Found</TableCaption>
						)}
						<TableHeader className="bg-secondary">
							<TableRow>
								<TableHead className="text-center">
									Order ID
								</TableHead>
								<TableHead className="">Product ID</TableHead>
								<TableHead className="text-center">
									Customer ID
								</TableHead>
								<TableHead className="text-center">
									Ordered On
								</TableHead>
								<TableHead className="text-center">
									Price
								</TableHead>
								<TableHead className="text-center">
									Discounted Price
								</TableHead>
								<TableHead className="text-center">
									Status
								</TableHead>
								<TableHead className="text-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="relative">
							{data &&
								data.length > 0 &&
								data.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="text-center">
											{order.id}
										</TableCell>
										<TableCell>
											{order.product_id}
										</TableCell>
										<TableCell className="text-center">
											{order.customer_id}
										</TableCell>
										<TableCell className="text-center">
											{formatDate(
												order.ordered_on,
												"datetime"
											)}
										</TableCell>
										<TableCell className="text-center">
											{order.total_price
												? formatValueWithIndianNumericPrefix(
														order.total_price,
														"price"
												  )
												: "N/A"}
										</TableCell>
										<TableCell className="text-center">
											{order.discounted_price === 0
												? "N/A"
												: formatValueWithIndianNumericPrefix(
														order.discounted_price,
														"price"
												  )}
										</TableCell>
										<TableCell className="text-center">
											<Badge
												orderStatus={
													order.status as OrderStatus
												}
												className="capitalize"
											>
												{order.status}
											</Badge>
										</TableCell>
										<TableCell className="text-center">
											<Button
												size={"icon"}
												onClick={() =>
													navigate(
														`/vendor/orders/manage/${order.id}`
													)
												}
											>
												<Pen />
											</Button>
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
