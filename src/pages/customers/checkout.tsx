import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCartItems } from "@/db/api-cart";
import fusionStore from "@/stores/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { addOrder } from "@/db/api-orders";

const showConfetti = () => {
	const end = Date.now() + 2 * 1000;
	const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

	const frame = () => {
		if (Date.now() > end) return;

		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			startVelocity: 60,
			origin: { x: 0, y: 0.5 },
			colors: colors,
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			startVelocity: 60,
			origin: { x: 1, y: 0.5 },
			colors: colors,
		});

		requestAnimationFrame(frame);
	};

	frame();
};

export default function Checkout() {
	const navigate = useNavigate();
	const { user } = fusionStore();

	const { data, isLoading } = useQuery({
		queryKey: ["cart"],
		queryFn: () => getCartItems(user?.id as string),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	const { isPending, isSuccess, mutate } = useMutation({
		mutationFn: async () => {
			if (!data) return;
			const dataToSubmit = data.items.map((item) => ({
				product_id: item.product.id,
				customer_id: user?.id,
				ordered_on: new Date().toISOString(),
				total_price: item.product.originalPrice,
				discounted_price:
					item.product.originalPrice -
					item.product.originalPrice *
						(item.product.discountPercent / 100),
				vendor_id: item.product.createdBy,
			}));
			return addOrder(user?.id, dataToSubmit);
		},
		onSuccess: () => {
			showConfetti();
		},
		onError: (error) => {
			console.error("Order submission failed:", error);
		},
	});

	// Trigger the mutation when data is loaded
	useEffect(() => {
		if (data && !isPending && !isSuccess) {
			mutate();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="w-full h-[70vh] flex items-center justify-center">
			{isLoading || isPending ? (
				<div className="w-1/2 h-[250px] rounded-md animate-pulse bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
					<p className="text-3xl font-bold animate-pulse">
						Placing your orders....Please wait
					</p>
				</div>
			) : isSuccess ? (
				<Card className="w-1/2 mx-auto">
					<CardHeader>
						<CardTitle className="text-3xl font-bold">
							Order Placed Successfully 🥳
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Your order has been successfully placed. Thank you
							for shopping with us.
						</CardDescription>
					</CardHeader>
					<CardFooter className="flex items-center justify-end">
						<Button onClick={() => navigate("/store")}>
							Go to Home
						</Button>
					</CardFooter>
				</Card>
			) : (
				<Card className="w-1/2 mx-auto">
					<CardHeader>
						<CardTitle className="text-3xl font-bold text-red-500">
							"Failed to Place Order"
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							An error occurred while placing your order. Please
							try again.
						</CardDescription>
					</CardHeader>
					<CardFooter className="flex items-center justify-end">
						<Button onClick={() => navigate("/store")}>
							Go to Home
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
