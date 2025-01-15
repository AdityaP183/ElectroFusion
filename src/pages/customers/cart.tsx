import CartItem from "@/components/app/store/cart-item";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCartItems } from "@/db/api-cart";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const navigate = useNavigate();

	const { user } = fusionStore();
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["cart"],
		queryFn: () => getCartItems(user?.id as string),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	if (!isLoading && isError) {
		console.log(error);
	}

	if (!isLoading && data) {
		console.log(data);
	}

	return (
		<div className="my-6 min-h-[70vh]">
			{isLoading ? (
				<Skeleton className="w-full h-[70vh]" />
			) : isError ? (
				<div className="text-xl text-center text-red-600">
					<div className="text-xl text-center text-red-600">
						<p>
							Something went wrong while fetching cart items.
							Please try again.
						</p>
						<p>
							{error instanceof Error
								? error.message
								: "Unknown error occurred"}
						</p>
					</div>
				</div>
			) : data && data.items.length > 0 ? (
				<>
					<h1 className="text-3xl font-medium">Your Cart</h1>
					<p className="text-muted-foreground">
						You have {data.items.length} items in your cart
					</p>

					<div className="flex justify-between gap-6 m-5">
						<div className="flex-[2] flex flex-col items-end gap-4">
							{data.items &&
								data.items.map((order) => {
									const items = {
										id: order.product.id,
										productImage:
											order.product.productImage,
										productName: order.product.productName,
										stock: order.product.stock,
										originalPrice:
											order.product.originalPrice,
										quantity: order.quantity,
									};

									return (
										<CartItem
											key={order.id}
											{...items}
											refetch={refetch}
										/>
									);
								})}
						</div>
						<Card className="flex-1 bg-secondary h-fit">
							<CardHeader>
								<CardTitle className="text-2xl">
									Order Summary
								</CardTitle>
								<CardDescription className="text-green-500">
									You saved{" "}
									{formatValueWithIndianNumericPrefix(
										data.totalDiscount,
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
											data.totalPrice,
											"price"
										)}
									</p>
								</div>
								<div className="flex justify-between">
									<h4 className="font-semibold">Shipping</h4>
									<p>
										{formatValueWithIndianNumericPrefix(
											0,
											"price"
										)}
									</p>
								</div>
								<div className="flex justify-between">
									<h4 className="font-semibold">Discount</h4>
									<p className="text-green-500">
										{formatValueWithIndianNumericPrefix(
											data.totalDiscount,
											"price"
										)}
									</p>
								</div>

								<div className="mt-3 border border-t border-dashed border-muted-foreground" />

								<div className="flex justify-between">
									<h4 className="font-extrabold">Total</h4>
									<p className="font-extrabold">
										{formatValueWithIndianNumericPrefix(
											data.totalDiscountedPrice,
											"price"
										)}
									</p>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full font-semibold"
									onClick={() => navigate("/store/checkout")}
								>
									Order Now
								</Button>
							</CardFooter>
						</Card>
					</div>
				</>
			) : (
				<div className="text-xl text-center">
					<p>You have no items in your cart.</p>
				</div>
			)}
		</div>
	);
};
export default Cart;
