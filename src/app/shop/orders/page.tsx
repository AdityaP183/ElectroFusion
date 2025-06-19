"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "../../../../convex/_generated/api";

export default function OrderList() {
	const { user } = useUser();

	const orders = useQuery(api.order.listOrders);

	if (!user) {
		return (
			<p className="text-center text-gray-600">
				Please log in to see your orders.
			</p>
		);
	}

	if (!orders) {
		return (
			<p className="text-center text-gray-500">Loading your orders...</p>
		);
	}

	if (orders.length === 0) {
		return (
			<p className="text-center text-gray-500">You have no orders yet.</p>
		);
	}

	return (
		<div className="px-6 py-8 w-[calc(100%-20rem)] mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">Your Orders</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{orders.map((order) => (
					<Card
						key={order._id}
						className="shadow-md border border-border"
					>
						<CardHeader>
							<CardTitle className="text-lg">
								Order #{order._id}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p className="text-sm">
								<strong>Status:</strong> {order.orderStatus}
							</p>
							<p className="text-sm">
								<strong>Total Items:</strong>{" "}
								{order.items.length}
							</p>
							<ul className="list-disc list-inside text-sm">
								{order.items.map((item) => (
									<li key={item.productId}>
										{item.quantity} × Product #
										{item.productId.slice(-5)}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
