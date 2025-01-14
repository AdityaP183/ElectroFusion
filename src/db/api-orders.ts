import { dbTable, supabase } from "./config";

async function getOrdersPublic(count: number = 10) {
	const { data, error } = await supabase
		.from(dbTable.orders)
		.select("*")
		.limit(count);

	if (error) throw new Error(error.message);

	return data;
}

async function getOrders(userId: string | undefined, count: number = 10) {
	if (!userId) return [];

	const { data, error } = await supabase
		.from(dbTable.orders)
		.select("*")
		.eq("vendor_id", userId)
		.limit(count);

	if (error) throw new Error(error.message);

	return data;
}

async function getOrder({
	userId,
	orderId,
}: {
	userId: string | undefined;
	orderId: string | undefined;
}) {
	if (!userId || !orderId) return [];

	const { data, error } = await supabase
		.from(dbTable.orders)
		.select("*")
		.eq("vendor_id", userId)
		.eq("id", orderId);

	if (error) throw new Error(error.message);

	if (!data) return [];
	return data[0];
}

async function updateOrder({
	userId,
	orderId,
	newStatus,
}: {
	userId: string | undefined;
	orderId: string | undefined;
	newStatus: string;
}) {
	if (!userId || !orderId)
		throw new Error("User ID and Order ID are required.");

	console.log(
		"Updating with userId",
		userId,
		"orderId",
		orderId,
		"newStatus",
		newStatus
	);

	const { data, error } = await supabase
		.from(dbTable.orders)
		.update({ status: newStatus })
		.eq("vendor_id", userId)
		.eq("id", orderId)
		.select("*");

	if (error) throw new Error(error.message);

	console.log(data);

	return { success: true, message: "Order updated successfully." };
}

export { getOrders, getOrder, updateOrder, getOrdersPublic };
