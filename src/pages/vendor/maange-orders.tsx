import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { getOrder, updateOrder } from "@/db/api-orders";
import useFetch from "@/hooks/use-fetch";
import { orderStatus, OrderStatus, orderSummaryHeaders } from "@/lib/app-data";
import { Order } from "@/lib/types/order-types";
import { formatDate } from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function MaangeOrders() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = fusionStore();
	const [orderStats, setOrderStats] = useState<OrderStatus | "pending">(
		"pending"
	);

	const {
		data,
		loading,
		error,
		fn: fetchOrder,
	} = useFetch(getOrder, {
		userId: user?.id,
		orderId: id,
	});

	const {
		data: updateData,
		loading: updateLoading,
		error: updateError,
		fn: updateOrderStatus,
	} = useFetch(updateOrder, {
		userId: user?.id,
		orderId: id,
		newStatus: orderStats,
	});

	useEffect(() => {
		if (user?.id && id) {
			fetchOrder();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data) {
			setOrderStats(data.status);
		}
	}, [data]);

	const handleUpdateStatus = async () => {
		if (orderStats && user?.id && id) {
			// Trigger order status update when the button is clicked
			await updateOrderStatus();
		}
		console.log(orderStats);
	};

	useEffect(() => {
		if (updateData) {
			toast.success(
				updateData.message || "Order status updated successfully"
			);
			navigate("/vendor/orders");
		} else if (updateError) {
			toast.error(updateError.message || "Failed to update order status");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateData, updateError]);

	return (
		<div className="w-full h-full p-2">
			<div>
				<Button onClick={() => navigate("/vendor/orders")}>
					<ArrowLeft />
					Back to Orders
				</Button>
			</div>

			{loading ? (
				<Skeleton className="w-1/2 mx-auto h-[400px]" />
			) : error ? (
				<p>Something went wrong</p>
			) : !data ? (
				<p>No order found with that ID</p>
			) : (
				<Card className="border-none">
					<CardHeader>
						<CardTitle className="text-3xl capitalize">
							ORDER ID: {data.id}
						</CardTitle>
						<CardDescription>Update order status</CardDescription>
					</CardHeader>
					<CardContent>
						<h4 className="mb-1 text-2xl text-center">
							Order Details
						</h4>
						<Table className="w-1/2 mx-auto border border-secondary">
							<TableBody>
								{orderSummaryHeaders.map(({ key, label }) => {
									if (key !== "id")
										return (
											<TableRow key={key}>
												<TableHead>{label}</TableHead>
												<TableCell>
													{key === "created_at"
														? formatDate(
																data[
																	key as keyof Order
																],
																"datetime"
														  )
														: data[
																key as keyof Order
														  ]}
												</TableCell>
											</TableRow>
										);
								})}
							</TableBody>
						</Table>
					</CardContent>
					<CardFooter className="flex-col w-1/2 mx-auto justify-normal items-c">
						<h4 className="mb-1 text-2xl">Update Order Status</h4>
						<div className="flex items-center gap-4">
							<Select
								defaultValue={orderStats || "pending"}
								onValueChange={(value) =>
									setOrderStats(value as OrderStatus)
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{orderStatus.map((status) => (
										<SelectItem
											key={`id-${status}`}
											value={status}
											className="capitalize"
										>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button
								onClick={handleUpdateStatus}
								disabled={updateLoading}
							>
								{updateLoading
									? "Updating..."
									: "Update Status"}
							</Button>
						</div>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
