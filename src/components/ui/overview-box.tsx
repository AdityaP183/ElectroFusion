import { Card } from "./card";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { Package, PiggyBank, ShoppingBag, Tags, Users } from "lucide-react";

export default function OverviewBox({
	id,
	title,
	value,
}: {
	id: string;
	title: string;
	value: number;
}) {
	return (
		<Card className="flex items-center justify-start w-full gap-5 px-4 py-4">
			<div
				className={`flex items-center justify-center p-2 rounded-lg bg-opacity-40 backdrop-saturate-50 ${
					id === "users-served"
						? "bg-orange-600"
						: id === "total-products"
						? "bg-blue-600"
						: id === "total-revenue"
						? "bg-green-600"
						: id === "total-categories"
						? "bg-pink-600"
						: "bg-purple-600"
				}`}
			>
				{id === "total-revenue" ? (
					<PiggyBank size={26} />
				) : id === "total-products" ? (
					<Package size={26} />
				) : id === "total-orders" ? (
					<ShoppingBag size={26} />
				) : id === "users-served" ? (
					<Users size={26} />
				) : (
					<Tags size={26} />
				)}
			</div>
			<div className="flex items-center gap-2">
				<div className="flex flex-col">
					<h4 className="text-sm opacity-80">{title}</h4>
					<h2 className="text-3xl">
						{formatValueWithIndianNumericPrefix(
							value,
							id === "total-revenue" ? "price" : "value"
						)}
					</h2>
				</div>
			</div>
		</Card>
	);
}
