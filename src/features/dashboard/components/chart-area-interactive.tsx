"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const description = "An interactive area chart";

const chartConfig = {
	total: {
		label: "Total Sales",
		color: "var(--primary)",
	},
} satisfies ChartConfig;

export function ChartAreaInteractive() {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">(
		"7d"
	);

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange("7d");
		}
	}, [isMobile]);

	const chartData = useQuery(api.dashboard.getSalesChartData, {
		range: timeRange,
		role: "vendor",
	});

	// Handle loading and empty states
	if (chartData === undefined) {
		return (
			<Card className="@container/card">
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
					<CardDescription>Loading chart data...</CardDescription>
				</CardHeader>
				<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
					<div className="flex h-[250px] items-center justify-center">
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (chartData === null) {
		return (
			<Card className="@container/card">
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
					<CardDescription>Unable to load chart data</CardDescription>
				</CardHeader>
				<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
					<div className="flex h-[250px] items-center justify-center">
						<p className="text-muted-foreground">
							Please make sure you&apos;re logged in and have the
							proper permissions.
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (chartData.length === 0) {
		return (
			<Card className="@container/card">
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
					<CardDescription>No sales data available</CardDescription>
				</CardHeader>
				<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
					<div className="flex h-[250px] items-center justify-center">
						<p className="text-muted-foreground">
							No sales data found for the selected period.
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const processedData = chartData.map((item, index) => ({
		...item,
		date: item.date,
		total: typeof item.total === "number" ? item.total : 0,
		index,
	}));

	const totalSales = processedData.reduce((sum, item) => sum + item.total, 0);
	const nonZeroDays = processedData.filter((item) => item.total > 0).length;

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Total Sales</CardTitle>
				<CardDescription>
					<span className="hidden @[540px]/card:block">
						Total for the selected period: ${totalSales.toFixed(2)}
						{nonZeroDays > 0 && ` (${nonZeroDays} days with sales)`}
					</span>
					<span className="@[540px]/card:hidden">
						Selected period: ${totalSales.toFixed(2)}
					</span>
				</CardDescription>
				<CardAction>
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={(value) =>
							setTimeRange(value as "90d" | "30d" | "7d")
						}
						variant="outline"
						className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
					>
						<ToggleGroupItem value="7d">
							Last 7 days
						</ToggleGroupItem>
						<ToggleGroupItem value="30d">
							Last 30 days
						</ToggleGroupItem>
						<ToggleGroupItem value="90d">
							Last 3 months
						</ToggleGroupItem>
					</ToggleGroup>
					<Select
						value={timeRange}
						onValueChange={(value) =>
							setTimeRange(value as "90d" | "30d" | "7d")
						}
					>
						<SelectTrigger
							className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
							size="sm"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="90d" className="rounded-lg">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								Last 30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={processedData}>
						<defs>
							<linearGradient
								id="fillSales"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-total)"
									stopOpacity={1.0}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-total)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tickMargin={8}
							tickFormatter={(value) => `$${value}`}
							domain={[0, "dataMax + 10"]}
						/>
						<ChartTooltip
							cursor={false}
							defaultIndex={isMobile ? -1 : 10}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(
											value
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
									formatter={(value) => [
										`₹${Number(value).toFixed(
											2
										)} Total Sales`,
									]}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="total"
							type="natural"
							fill="url(#fillSales)"
							stroke="var(--color-total)"
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
