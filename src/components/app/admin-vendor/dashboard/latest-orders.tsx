import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@/lib/app-data";
import { Order } from "@/lib/types/order-types";
import { formatDate, formatValueWithIndianNumericPrefix } from "@/lib/utils";

export default function LatestOrders({ data }: { data: Order[] }) {
	return (
		<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
			<CardHeader>
				<CardTitle className="text-2xl">
					Recent Orders Summary
				</CardTitle>
				<CardDescription>Latest orders from your store</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					{data && data.length === 0 && (
						<TableCaption className="">
							No Orders Found
						</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableCell>Order ID</TableCell>
							<TableCell>Ordered On</TableCell>
							<TableCell>Total Amount</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data &&
							data.length > 0 &&
							data.map((order) => {
								const amount =
									order.discounted_price === 0
										? order.total_price
										: order.discounted_price;
								return (
									<TableRow key={order.id}>
										<TableCell>{order.id}</TableCell>
										<TableCell>
											{formatDate(
												order.ordered_on,
												"datetime"
											)}
										</TableCell>
										<TableCell>
											{formatValueWithIndianNumericPrefix(
												amount,
												"price"
											)}
										</TableCell>
										<TableCell>
											<Badge
												orderStatus={
													order.status as OrderStatus
												}
												className="capitalize"
											>
												{order.status}
											</Badge>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
