"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { allProducts } from "@/lib/app-data";
import { Banknote, CreditCard, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Checkout() {
	const chartItems = [allProducts[0], allProducts[2], allProducts[3]];
	const subtotal = chartItems.reduce(
		(sum, item) => sum + item.originalPrice * 1,
		0
	);
	const shipping = 15.99;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	const [cardForm, setCardForm] = useState({
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardName: "",
	});

	const [billingAddress, setBillingAddress] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		zipCode: "",
		country: "",
	});

	return (
		<div className="w-full min-h-screen overflow-y-auto py-4 px-10">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Checkout</h1>
				<p>Complete your order below</p>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Left Side */}
				<div className="space-y-6 col-span-2">
					<BillingInfo
						billingAddress={billingAddress}
						setBillingAddress={setBillingAddress}
					/>
                    <PaymentMethod cardForm={cardForm} setCardForm={setCardForm}/>
				</div>

				{/* Right Side */}
				<div className="space-y-6">
					<OrderSummary
						items={chartItems}
						subtotal={subtotal}
						shipping={shipping}
						tax={tax}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}

function BillingInfo({ billingAddress, setBillingAddress }: any) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ShoppingBag className="h-5 w-5" />
					Billing Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							value={billingAddress.firstName}
							placeholder="John"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							value={billingAddress.lastName}
							placeholder="Doe"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={billingAddress.email}
						placeholder="john.doe@example.com"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="address">Address</Label>
					<Input
						id="address"
						value={billingAddress.address}
						placeholder="123 Main Street"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="city">City</Label>
						<Input
							id="city"
							value={billingAddress.city}
							placeholder="New York"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="zipCode">ZIP Code</Label>
						<Input
							id="zipCode"
							value={billingAddress.zipCode}
							placeholder="10001"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function PaymentMethod({ cardForm, setCardForm }: any) {
    const paymentMethod = "card"
	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
			</CardHeader>
			<CardContent>
				<RadioGroup
					value={"card"}
					onValueChange={(value) => console.log(value)}
				>
					<div className="flex items-center space-x-2 p-4 border rounded-lg">
						<RadioGroupItem value="card" id="card" />
						<Label
							htmlFor="card"
							className="flex items-center gap-2 cursor-pointer flex-1"
						>
							<CreditCard className="h-4 w-4" />
							Pay with Card
						</Label>
					</div>
					<div className="flex items-center space-x-2 p-4 border rounded-lg">
						<RadioGroupItem value="cash" id="cash" />
						<Label
							htmlFor="cash"
							className="flex items-center gap-2 cursor-pointer flex-1"
						>
							<Banknote className="h-4 w-4" />
							Cash on Delivery
						</Label>
					</div>
				</RadioGroup>

				{/* Card Payment Form */}
				{paymentMethod === "card" && (
					<div className="mt-6 space-y-4 p-4 rounded-lg">
						<div className="space-y-2">
							<Label htmlFor="cardName">Cardholder Name</Label>
							<Input
								id="cardName"
								value={cardForm.cardName}
								placeholder="John Doe"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cardNumber">Card Number</Label>
							<Input
								id="cardNumber"
								value={cardForm.cardNumber}
								placeholder="1234 5678 9012 3456"
								maxLength={19}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="expiryDate">Expiry Date</Label>
								<Input
									id="expiryDate"
									value={cardForm.expiryDate}
									placeholder="MM/YY"
									maxLength={5}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cvv">CVV</Label>
								<Input
									id="cvv"
									value={cardForm.cvv}
									placeholder="123"
									maxLength={4}
								/>
							</div>
						</div>
					</div>
				)}

				{/* {paymentMethod === "cash" && (
					<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
						<p className="text-green-800 text-sm">
							You'll pay in cash when your order is delivered.
							Please have the exact amount ready.
						</p>
					</div>
				)} */}
			</CardContent>
		</Card>
	);
}

interface OrderSummaryProps {
	items: typeof allProducts;
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
}
function OrderSummary({
	items: cartItems,
	subtotal,
	shipping,
	tax,
	total,
}: OrderSummaryProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{cartItems.map((item, index) => (
						<div
							key={item._id}
							className="flex items-center gap-4 pb-4 border-b last:border-b-0"
						>
							<div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
								<Image
									src={item.images[0].url}
									alt={item.name}
									width={100}
									height={100}
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-medium text-sm truncate">
									{item.name}
								</h3>
								<p className="text-gray-600 text-sm">
									${item.originalPrice.toFixed(2)} each
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0"
								>
									<Minus className="h-3 w-3" />
								</Button>
								<span className="w-8 text-center text-sm">
									{index === 0 ? 1 : index * 2}
								</span>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0"
								>
									<Plus className="h-3 w-3" />
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
								>
									<Trash2 className="h-3 w-3" />
								</Button>
							</div>
						</div>
					))}
				</div>

				<Card className="border-none outline-none">
					<CardContent className="pt-3 border-t">
						<div className="space-y-3">
							<div className="flex justify-between text-sm">
								<span>Subtotal</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Shipping</span>
								<span>${shipping.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Tax</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<Separator />
							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>
						<Button className="w-full mt-6" size="lg">
							Pay Now
						</Button>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
