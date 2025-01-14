import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export default function OrdersGraph({
	data,
}: {
	data: {
		id: number;
		ordered_on: string;
		amount: number;
	}[];
}) {
	const chartData = data.map((order) => ({
		date: formatDate(order.ordered_on, "date-short"), // Format date as "MM/DD"
		amount: order.amount,
	}));

	const chartConfig = {
		amount: {
			label: "Amount",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	console.log(chartData);

	return (
		<Card className="w-full col-span-4 bg-transparent glass dark:bg-secondary/40">
			<CardHeader className="flex flex-col items-stretch p-0 space-y-0 overflow-hidden border-b sm:flex-row">
				<div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
					<CardTitle className="text-2xl">Orders Overview</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="h-[350px] px-1">
				<ChartContainer config={chartConfig} className="w-full h-full">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="amount"
							type="natural"
							stroke="var(--color-amount)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
