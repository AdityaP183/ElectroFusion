import OverviewBox from "@/components/app/common/dashboard/OverviewBox";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { salesData, vendorsOverviewData } from "@/lib/app-data";
import { isValidDuration } from "@/lib/utils";
import { DashboardDuration } from "@/types/component.type";
import { useState } from "react";

const Dashboard = () => {
	const [filter, setFilter] = useState<DashboardDuration>("half-day");

	console.log(salesData);
	return (
		<div>
			<div className="sticky top-0 z-10 flex items-start py-2 bg-background">
				<ToggleGroup
					type="single"
					value={filter}
					onValueChange={(value) => {
						if (value && isValidDuration(value)) setFilter(value);
					}}
				>
					<ToggleGroupItem value="half-day" variant={"outline"}>
						Last 12 hours
					</ToggleGroupItem>
					<ToggleGroupItem value="week" variant={"outline"}>
						Last Week
					</ToggleGroupItem>
					<ToggleGroupItem value="month" variant={"outline"}>
						Last Month
					</ToggleGroupItem>
					<ToggleGroupItem value="year" variant={"outline"}>
						Last Year
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3">
				{Object.values(vendorsOverviewData).map((item) => (
					<OverviewBox key={item.id} {...item} duration={filter} />
				))}

				{/* Top Selling Products */}
				<Card className="w-full col-span-2">Top Selling Products</Card>

				{/* Recent Orders Summary */}
				<Card className="w-full col-span-2">Recent Orders Summary</Card>

				{/* Line Graph - Sales, Profit and Discount */}
				<Card className="w-full col-span-4">
					Line Graph - Sales, Profit and Discount
				</Card>

				{/* Recent Customer Reviews */}
				<Card className="w-full col-span-4">
					Recent Customer Reviews
				</Card>
			</div>
		</div>
	);
};
export default Dashboard;
