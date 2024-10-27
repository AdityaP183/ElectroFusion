import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { getChartConfig } from "@/lib/utils";
import { ChartWrapperProps, SalesType, UserCount } from "@/types/component.type";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Legend,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	XAxis,
} from "recharts";

const RadialGraph = ({ data }: { data: UserCount }) => {
	const totalVisitors = data.customers.value + data.vendors.value;
	const chartConfig = getChartConfig([
		data.customers.label,
		data.vendors.label,
	]);

	return (
		<ChartContainer
			config={chartConfig}
			className="w-full h-full mx-auto aspect-square max-h-[300px]"
		>
			<RadialBarChart
				data={[
					{
						name: data.label,
						customers: data.customers.value,
						vendors: data.vendors.value,
					},
				]}
				endAngle={360}
				innerRadius={80}
				outerRadius={140}
			>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
									>
										<tspan
											x={viewBox.cx}
											dy={0}
											className="text-2xl font-bold fill-foreground"
										>
											{totalVisitors.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											dy={25}
											className="fill-muted-foreground"
										>
											Visitors
										</tspan>
									</text>
								);
							}
							return null;
						}}
					/>
				</PolarRadiusAxis>
				<RadialBar
					dataKey={data.customers.label}
					fill="var(--color-customers)"
					stackId="a"
					cornerRadius={5}
					className="stroke-2 stroke-transparent"
				/>
				<RadialBar
					dataKey={data.vendors.label}
					fill="var(--color-vendors)"
					stackId="a"
					cornerRadius={5}
					className="stroke-2 stroke-transparent"
				/>
			</RadialBarChart>
		</ChartContainer>
	);
};

const BarGraph = ({data}: {data: SalesType[]}) => {
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
		mobile: {
			label: "Mobile",
			color: "hsl(var(--chart-2))",
		},
	};

	return (
		<ChartContainer config={chartConfig} className="w-full h-full mx-auto aspect-square max-h-[350px]">
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<Legend wrapperStyle={{fontSize: "16px"}}/>
				<XAxis dataKey="date" />
				<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
				<Bar
					dataKey="sales"
					fill="hsl(var(--chart-3))"
					radius={5}
                    width={5}
				/>
				<Bar
					dataKey="profit"
					fill="hsl(var(--chart-2))"
					radius={5}
				/>
			</BarChart>
		</ChartContainer>
	);
};

const ChartWrapper = ({ data, type }: ChartWrapperProps) => {
	switch (type) {
		case "radial":
			return <RadialGraph data={data} />;

		case "bar":
			return <BarGraph data={data} />;

		case "line":
			return <h1>Line Chart</h1>;

		default:
			return <h1>Unknown Chart</h1>;
	}
};


export default ChartWrapper;
