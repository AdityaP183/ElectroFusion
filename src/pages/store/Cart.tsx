import CartItem from "@/components/app/store/CartItem";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cartOrders } from "@/lib/app-data";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const GST_RATE = import.meta.env.VITE_GST_RATE;
	const navigate = useNavigate();
	const ordersInCart = useMemo(() => cartOrders(), []);
	const totalPrice = useMemo(
		() =>
			parseFloat(
				ordersInCart
					.reduce((acc, order) => acc + order.price, 0)
					.toFixed(2)
			),
		[ordersInCart]
	);
	const totalDiscount = useMemo(
		() =>
			ordersInCart.reduce((acc, order) => acc + order.discountedPrice, 0),
		[ordersInCart]
	);
	console.log(ordersInCart);
	return (
		<div className="my-6">
			<h1 className="text-3xl font-medium">Your Cart</h1>
			<p className="text-muted-foreground">
				You have {ordersInCart.length} items in your cart
			</p>

			<div className="flex justify-between gap-6 m-5">
				<div className="flex-[2] flex flex-col items-end gap-4">
					{ordersInCart.map((order) => (
						<CartItem key={order.id} data={order} />
					))}
				</div>
				<Card className="flex-1 bg-secondary h-fit">
					<CardHeader>
						<CardTitle className="text-2xl">
							Order Summary
						</CardTitle>
						<CardDescription className="text-green-500">
							You saved{" "}
							{formatValueWithIndianNumericPrefix(
								totalDiscount,
								"price"
							)}{" "}
							in total
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<h4 className="font-semibold">Subtotal</h4>
							<p>
								{formatValueWithIndianNumericPrefix(
									totalPrice,
									"price"
								)}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">Shipping</h4>
							<p>
								{formatValueWithIndianNumericPrefix(0, "price")}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">Discount</h4>
							<p className="text-green-500">
								{formatValueWithIndianNumericPrefix(
									totalDiscount,
									"price"
								)}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">GST ({GST_RATE}%)</h4>
							<p>
								{formatValueWithIndianNumericPrefix(
									parseFloat(
										(
											totalPrice *
											(Number(GST_RATE) / 100)
										).toFixed(2)
									),
									"price"
								)}
							</p>
						</div>

						<div className="mt-3 border border-t border-dashed border-muted-foreground" />

						<div className="flex justify-between">
							<h4 className="font-extrabold">Total</h4>
							<p className="font-extrabold">
								{formatValueWithIndianNumericPrefix(
									totalPrice,
									"price"
								)}
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full font-semibold"
							onClick={() => navigate("/checkout")}
						>
							Proceed to Checkout
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};
export default Cart;
