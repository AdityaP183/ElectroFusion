import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Tabs } from "./Checkout";
import { Button } from "@/components/ui/button";
import { cartOrders, tempUser } from "@/lib/app-data";
import { useMemo } from "react";
import CartItem from "@/components/app/store/CartItem";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { faker } from "@faker-js/faker";

const CheckoutTab1 = ({
	setActiveTab,
}: {
	setActiveTab: (tabs: Tabs) => void;
}) => {
	const GST_RATE = import.meta.env.VITE_GST_RATE;
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

	return (
		<Card className="w-full">
			<CardHeader>
				<h1 className="text-2xl font-bold uppercase">
					Order ID: #{faker.database.mongodbObjectId()}
				</h1>
				<p className="text-lg text-muted-foreground">
					Review your order before proceeding to checkout.
				</p>
			</CardHeader>
			<CardContent className="space-y-5">
				<div>
					<div className="p-3 rounded-md bg-secondary/60">
						<h1 className="text-muted-foreground">
							Shipping Address:
						</h1>
						<h4 className="text-xl font-semibold">
							{tempUser.address?.address} |{" "}
							{tempUser.address?.state}, {tempUser.address?.city}-
							{tempUser.address?.postalCode}
						</h4>
					</div>
				</div>

				<div>
					<h4 className="mb-3 text-xl font-semibold">
						Order Summary
					</h4>
					<div className="flex-[2] flex flex-col items-end gap-4">
						{ordersInCart.map((order) => (
							<CartItem key={order.id} data={order} />
						))}
					</div>
				</div>

				<div className="space-y-3">
					<h4 className="text-xl font-semibold">Total Amount</h4>
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
						<p>{formatValueWithIndianNumericPrefix(0, "price")}</p>
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
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-end">
				<Button onClick={() => setActiveTab("tab2")}>
					Proceed to Payment
				</Button>
			</CardFooter>
		</Card>
	);
};
export default CheckoutTab1;
