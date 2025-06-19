"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function OrderPage() {
	const { user } = useUser();
	const router = useRouter();

	const cartData = useQuery(api.cart.getCartWithProducts);
	const removeFromCart = useMutation(api.cart.removeFromCart);
	const placeOrder = useMutation(api.order.placeOrder);

	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

	const [cardDetails, setCardDetails] = useState({
		cardNumber: "",
		csv: "",
		expiry: "",
	});

	const subtotal =
		cartData?.reduce(
			(sum, item) =>
				sum + (item.product?.originalPrice || 0) * item.quantity,
			0
		) || 0;

	const shipping = subtotal > 100 ? 0 : 15.99;
	const gst = subtotal * 0.18;
	const total = subtotal + shipping + gst;

	const handleRemoveItem = async (productId: Id<"products">) => {
		if (!user || !cartData) return;
		try {
			await removeFromCart({
				productId: productId,
			});
			toast.success("Product removed from cart");
		} catch (err) {
			console.error("Failed to remove from cart", err);
			toast.error("Something went wrong while removing from cart");
		}
	};

	const handlePlaceOrder = async () => {
		if (!user || !cartData?.length) {
			toast("Error No items in cart");
			return;
		}

		// Card validation
		if (paymentMethod === "card") {
			const { cardNumber, csv, expiry } = cardDetails;
			if (
				cardNumber !== "420420420" ||
				csv !== "420" ||
				expiry !== "2025"
			) {
				toast.error("Invalid card details");
				return;
			}
		}

		setIsProcessing(true);

		try {
			const items = cartData.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				price: item.product?.originalPrice || 0,
				totalPrice: (item.product?.originalPrice || 0) * item.quantity,
			}));

			await placeOrder({
				items,
			});

			toast.success(
				"Order Placed! Your order has been successfully placed."
			);
			router.push(`/shop/orders`);
		} catch (err) {
			console.error(err);
			toast.error("Order Failed Something went wrong. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	if (!user) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				Please login to view your cart.
			</div>
		);
	}

	if (!cartData) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!cartData.length) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Card className="p-6">
					<CardContent className="flex items-center justify-center flex-col">
						<p>Your cart is empty. Add some products to proceed.</p>
						<Button
							onClick={() => router.push("/shop")}
							className="mt-4"
						>
							Continue Shopping
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="w-[calc(100%-20rem)] mx-auto min-h-screen p-8">
			<h4 className="text-2xl font-bold mb-10">My Cart</h4>

			<div className="flex gap-10">
				<div className="flex-1 space-y-4">
					{cartData.map((item) => (
						<div
							key={item.productId}
							className="p-4 flex items-center gap-4 bg-secondary/50 rounded-md"
						>
							<div className="w-[120px] h-[120px] overflow-hidden rounded">
								{item.product?.image && (
									<Image
										src={item.product.image}
										alt={item.product.name}
										className="object-cover"
										width={120}
										height={120}
									/>
								)}
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-xl">
									{item.product?.name}
								</h3>
								<p className="text-lg text-gray-500">
									₹{item.product?.originalPrice.toFixed(2)}{" "}
									each
								</p>
								<div className="flex items-center gap-2 mt-2">
									<span className="px-2">
										{item.quantity}
									</span>
									<Button
										size="sm"
										variant="ghost"
										className="text-red-500"
										onClick={() =>
											handleRemoveItem(item.productId)
										}
										disabled={isProcessing}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<Card className="w-[400px] bg-transparent p-0 border-0">
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>₹{subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span>
									{shipping === 0
										? "Free"
										: `$${shipping.toFixed(2)}`}
								</span>
							</div>
							<div className="flex justify-between">
								<span>GST (18%)</span>
								<span>₹{gst.toFixed(2)}</span>
							</div>
							<hr />
							<div className="flex justify-between font-semibold">
								<span>Total</span>
								<span>₹{total.toFixed(2)}</span>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Choose Payment Method</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-sm">
							{/* Payment Method Selector */}
							<div className="space-y-2">
								<div className="flex gap-4">
									<Button
										variant={
											paymentMethod === "cash"
												? "default"
												: "outline"
										}
										onClick={() => setPaymentMethod("cash")}
									>
										Cash on Delivery
									</Button>
									<Button
										variant={
											paymentMethod === "card"
												? "default"
												: "outline"
										}
										onClick={() => setPaymentMethod("card")}
									>
										Pay with Card
									</Button>
								</div>

								{/* Card Inputs */}
								{paymentMethod === "card" && (
									<div className="space-y-2 mt-4">
										<input
											type="text"
											placeholder="Card Number"
											value={cardDetails.cardNumber}
											onChange={(e) =>
												setCardDetails({
													...cardDetails,
													cardNumber: e.target.value,
												})
											}
											className="w-full p-2 rounded border"
										/>
										<input
											type="text"
											placeholder="CSV"
											value={cardDetails.csv}
											onChange={(e) =>
												setCardDetails({
													...cardDetails,
													csv: e.target.value,
												})
											}
											className="w-full p-2 rounded border"
										/>
										<input
											type="text"
											placeholder="Expiry Year (e.g., 2025)"
											value={cardDetails.expiry}
											onChange={(e) =>
												setCardDetails({
													...cardDetails,
													expiry: e.target.value,
												})
											}
											className="w-full p-2 rounded border"
										/>
									</div>
								)}
							</div>

							<Button
								className="w-full mt-6"
								onClick={handlePlaceOrder}
								disabled={isProcessing || !paymentMethod}
							>
								{isProcessing ? (
									<Loader2 className="h-4 w-4 animate-spin mr-2" />
								) : null}
								Place Order
							</Button>
						</CardContent>
					</Card>
				</Card>
			</div>
		</div>
	);
}
