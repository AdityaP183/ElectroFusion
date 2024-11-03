import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { getChartConfig } from "@/lib/utils";
import {
	Categories,
	ChartWrapperProps,
	SalesType,
	UserCount,
} from "@/types/component.type";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Legend,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	XAxis,
	YAxis,
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

const BarGraph = ({ data }: { data: SalesType[] }) => {
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
		<ChartContainer
			config={chartConfig}
			className="w-full h-full mx-auto aspect-square max-h-[350px]"
		>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<Legend wrapperStyle={{ fontSize: "16px" }} />
				<XAxis dataKey="date" />
				<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
				<Bar
					dataKey="sales"
					fill="hsl(var(--chart-3))"
					radius={5}
					width={5}
				/>
				<Bar dataKey="profit" fill="hsl(var(--chart-2))" radius={5} />
			</BarChart>
		</ChartContainer>
	);
};

const StackedAreaGraph = ({ data }: { data: SalesType[] }) => {
	const chartConfig = {
		sales: {
			label: "Sales",
			color: "hsl(var(--chart-1))",
		},
		profit: {
			label: "Profit",
			color: "hsl(var(--chart-2))",
		},
		discount: {
			label: "Discount",
			color: "hsl(var(--chart-3))",
		},
	};

	return (
		<ChartContainer config={chartConfig} className="w-full h-full mx-auto">
			<AreaChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
					top: 12,
				}}
				stackOffset="expand"
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Area
					dataKey="discount"
					type="natural"
					fill="var(--color-discount)"
					fillOpacity={0.4}
					stroke="var(--color-discount)"
					stackId="a"
				/>
				<Area
					dataKey="profit"
					type="natural"
					fill="var(--color-profit)"
					fillOpacity={0.4}
					stroke="var(--color-profit)"
					stackId="a"
				/>
				<Area
					dataKey="sales"
					type="natural"
					fill="var(--color-sales)"
					fillOpacity={0.6}
					stroke="var(--color-sales)"
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	);
};

const VerticalBarGraph = ({ data }: { data: Categories[] }) => {
	const categoryColors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
	];

	const chartData = data.map((category, index) => ({
		category: category.name,
		sold: category.sold,
		fill: categoryColors[index % categoryColors.length],
	}));

	const chartConfig = data.reduce((acc, category, index) => {
		acc[category.name] = {
			label: category.name,
			color: categoryColors[index % categoryColors.length],
		};
		return acc;
	}, {} as Record<string, { label: string; color: string }>);

	return (
		<ChartContainer config={chartConfig}>
			<BarChart
				accessibilityLayer
				data={chartData}
				layout="vertical"
				margin={{ left: 100 }}
			>
				<YAxis
					dataKey="category"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<XAxis dataKey="sold" type="number" hide />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar dataKey="sold" layout="vertical" radius={5} />
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

		case "area":
			return <StackedAreaGraph data={data} />;

		case "vertical-bar":
			return <VerticalBarGraph data={data} />;

		default:
			return <h1>Unknown Chart</h1>;
	}
};

export default ChartWrapper;
