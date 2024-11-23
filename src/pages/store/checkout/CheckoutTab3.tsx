import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs } from "./Checkout";
import confetti from "canvas-confetti";

const CheckoutTab3 = ({
	activeTab,
	setActiveTab,
}: {
	activeTab: Tabs;
	setActiveTab: (tabs: Tabs) => void;
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setActiveTab("complete");
			handleClick();
		}, 2000);
	}, [setActiveTab]);

	const handleClick = () => {
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

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">
					{activeTab === "complete"
						? "Order Placed Successfully🥳"
						: "Placing Your Order"}
				</CardTitle>
				{activeTab === "complete" && (
					<CardDescription className="text-sm text-muted-foreground">
						Your order has been successfully placed. Thank you for
						shopping with us.
					</CardDescription>
				)}
			</CardHeader>
			<CardContent></CardContent>
			<CardFooter className="flex items-center justify-end">
				<Button
					onClick={() => navigate("/")}
					disabled={activeTab !== "complete"}
				>
					Go to Home
				</Button>
			</CardFooter>
		</Card>
	);
};
export default CheckoutTab3;
