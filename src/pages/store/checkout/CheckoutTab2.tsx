import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Tabs } from "./Checkout";
import { Button } from "@/components/ui/button";

const CheckoutTab2 = ({
	setActiveTab,
}: {
	setActiveTab: (tabs: Tabs) => void;
}) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<h1 className="text-3xl font-bold">Payment Method</h1>
				<p className="text-sm text-muted-foreground">
					Select a payment method
				</p>
			</CardHeader>
			<CardContent></CardContent>
			<CardFooter className="flex items-center justify-between">
				<Button
					onClick={() => setActiveTab("tab1")}
					variant={"secondary"}
				>
					Go Back
				</Button>
				<Button onClick={() => setActiveTab("tab3")}>
					Place Order
				</Button>
			</CardFooter>
		</Card>
	);
};
export default CheckoutTab2;
