import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Tabs } from "./Checkout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Car, CreditCard } from "lucide-react";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CheckoutTab2 = ({
	setActiveTab,
}: {
	setActiveTab: (tabs: Tabs) => void;
}) => {
	const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
	const [cardForm, setCardForm] = useState({
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardOwner: "",
	});

	const handleCardFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCardForm({
			...cardForm,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<h1 className="text-3xl font-bold">Payment Method</h1>
				<p className="text-sm text-muted-foreground">
					Select a payment method
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-4">
					<div
						className={`w-3 h-3 p-2 border-2 rounded-full border-border cursor-pointer ${
							paymentMethod === "cash"
								? "bg-primary border-primary"
								: "bg-transparent hover:bg-secondary"
						}`}
						onClick={() => setPaymentMethod("cash")}
					/>
					<div
						className={`flex items-center justify-between flex-1 p-4 border-2 rounded-md cursor-pointer ${
							paymentMethod === "cash"
								? "border-primary"
								: "border-border"
						}`}
						onClick={() => setPaymentMethod("cash")}
					>
						<div className="flex items-center gap-2">
							<Car size={24} />
							<h2>Cash on Delivery</h2>
						</div>

						<p className="text-lg font-bold">
							{formatValueWithIndianNumericPrefix(
								45993.33,
								"price"
							)}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div
						className={`w-3 h-3 p-2 border-2 rounded-full border-border cursor-pointer ${
							paymentMethod === "card"
								? "bg-primary border-primary"
								: "bg-transparent hover:bg-secondary"
						}`}
						onClick={() => setPaymentMethod("card")}
					/>
					<div
						className={`flex flex-col flex-1 h-fit p-4 transition-all border-2 rounded-md cursor-pointer ${
							paymentMethod === "card"
								? "border-primary"
								: "border-border"
						}`}
						onClick={() => setPaymentMethod("card")}
					>
						<div className="flex items-center gap-2">
							<CreditCard
								size={paymentMethod === "card" ? 30 : 24}
							/>
							<h2
								className={`${
									paymentMethod === "card" &&
									"text-xl font-bold"
								}`}
							>
								Pay with Card
							</h2>
						</div>
						{paymentMethod === "card" && (
							<div className="grid grid-cols-3 gap-4 p-3">
								<div className="col-span-3 space-y-1">
									<Label htmlFor="cardNumber">
										Card Number
									</Label>
									<Input
										id="cardNumber"
										name="cardNumber"
										value={cardForm.cardNumber}
										onChange={handleCardFormChange}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="cardOwner">
										Name on Card
									</Label>
									<Input
										id="cardOwner"
										name="cardOwner"
										value={cardForm.cardOwner}
										onChange={handleCardFormChange}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="expiryDate">
										Expiry Date
									</Label>
									<Input
										id="expiryDate"
										name="expiryDate"
										value={cardForm.expiryDate}
										onChange={handleCardFormChange}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="cvv">CVV</Label>
									<Input
										id="cvv"
										name="cvv"
										value={cardForm.cvv}
										onChange={handleCardFormChange}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</CardContent>
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
