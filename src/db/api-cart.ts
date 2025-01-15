import { CartItems } from "@/lib/types/cart-types";
import { dbTable, supabase } from "./config";

async function getUserCart(userId: string) {
	if (!userId) throw new Error("User ID is required.");

	const { data, error } = await supabase
		.from(dbTable.carts)
		.select("*")
		.eq("user_id", userId)
		.limit(1);

	if (error) throw new Error(error.message);

	if (data.length !== 0) return data[0];

	const { data: createdData, error: createdError } = await supabase
		.from(dbTable.carts)
		.insert({ user_id: userId });

	if (createdError) throw new Error(createdError.message);

	return createdData ? createdData[0] : [];
}

async function getCartItems(userId: string): Promise<CartItems> {
	if (!userId) throw new Error("User ID is required.");

	try {
		const cart = await getUserCart(userId);

		if (!cart || cart.user_id !== userId)
			return {
				items: [],
				totalPrice: 0,
				totalDiscountedPrice: 0,
				totalDiscount: 0,
			};

		const { data: cartItems, error: cartItemsError } = await supabase
			.from(dbTable.cartItems)
			.select(`*, product:product_id(*), cart_id`)
			.eq("cart_id", cart.id);

		if (cartItemsError) throw new Error(cartItemsError.message);

		const totalPrice = Number(
			cartItems
				.reduce((total, item) => {
					return total + item.product.originalPrice * item.quantity;
				}, 0)
				.toFixed(2)
		);

		const totalDiscountedPrice = Number(
			cartItems
				.reduce((total, item) => {
					const discountedPrice =
						item.product.discountPercent > 0
							? Number(
									(
										item.product.originalPrice *
										(1 - item.product.discountPercent / 100)
									).toFixed(2)
							  )
							: item.product.originalPrice;
					return total + discountedPrice * item.quantity;
				}, 0)
				.toFixed(2)
		);

		const totalDiscount = Number(
			(totalPrice - totalDiscountedPrice).toFixed(2)
		);

		return {
			items: cartItems || [],
			totalPrice,
			totalDiscountedPrice,
			totalDiscount,
		};
	} catch (err) {
		console.error("Error fetching cart items:", err);
		return {
			items: [],
			totalPrice: 0,
			totalDiscountedPrice: 0,
			totalDiscount: 0,
		};
	}
}

async function addToCart(
	userId: string | undefined,
	productId: number | string,
	quantity: number
) {
	if (!userId) throw new Error("User ID is required.");

	if (!productId || !quantity)
		throw new Error("Product ID and quantity are required.");

	try {
		const cart = await getUserCart(userId);

		if (!cart || cart.user_id !== userId) return [];

		const { error, status } = await supabase
			.from(dbTable.cartItems)
			.insert({
				cart_id: cart.id,
				product_id: productId,
				quantity: quantity,
			});

		if (error) throw new Error(error.message);

		return status ?? "Added to cart";
	} catch (err) {
		console.error("Error fetching cart items:", err);
		return err;
	}
}

async function removeFromCart(productId: number | string | undefined) {
	if (!productId) throw new Error("Cart ID is required.");

	// Perform the delete operation on Supabase
	const { error, status } = await supabase
		.from(dbTable.cartItems)
		.delete()
		.eq("product_id", productId);

	// Check if there was an error with the deletion
	if (error) {
		console.error("Error removing item from cart:", error.message);
		throw new Error("Failed to remove item from cart");
	}

	// Return a success message if deletion is successful
	if (status === 204) {
		return "Item(s) removed from cart";
	} else {
		return "No items found with the provided cart ID";
	}
}

export { getUserCart, getCartItems, addToCart, removeFromCart };
