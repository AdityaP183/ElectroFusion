import { Card } from "@/components/ui/card";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import {
	DashboardDuration,
	DashboardOverviewItem,
} from "@/types/component.type";
import {
	HandCoins,
	Package,
	PiggyBank,
	TrendingDown,
	TrendingUp,
	UsersRound,
} from "lucide-react";

const OverviewBox = ({
	id,
	title,
	value,
	comparsion,
	duration,
}: DashboardOverviewItem & { duration: DashboardDuration }) => {
	const valueType = id === "revenue" || id === "profit" ? "price" : "value";

	return (
		<Card className="flex items-center justify-start w-full gap-3 px-4 py-4">
			<div className="flex items-center gap-4">
				<div
					className={`flex items-center justify-center p-2 rounded-lg bg-opacity-40 backdrop-saturate-50 ${
						id === "users"
							? "bg-orange-800"
							: id === "products"
							? "bg-blue-800"
							: id === "revenue"
							? "bg-green-800"
							: "bg-purple-800"
					}`}
				>
					{id === "users" ? (
						<UsersRound size={26} />
					) : id === "products" ? (
						<Package size={26} />
					) : id === "revenue" ? (
						<PiggyBank size={26} />
					) : (
						<HandCoins size={26} />
					)}
				</div>
				<div className="flex items-center gap-2">
					<div>
						<h4 className="text-sm opacity-80">{title}</h4>
						<h2 className="text-3xl">
							{formatValueWithIndianNumericPrefix(
								value,
								valueType
							)}
						</h2>
					</div>
					<div className="mt-1">
						<h4
							className={`${
								comparsion.type === "increase"
									? "text-green-600"
									: "text-red-600"
							} text-xs flex items-center gap-1`}
						>
							{comparsion.type === "increase" ? (
								<TrendingUp />
							) : (
								<TrendingDown />
							)}{" "}
							{comparsion.value}%
						</h4>
						<h4 className="text-xs opacity-80">From last {duration === "half-day" ? "12 hours" : duration}</h4>
					</div>
				</div>
			</div>
		</Card>
	);
    
};

export default OverviewBox;
