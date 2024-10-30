import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	categoriesData,
	dashboardOverviewData,
	ordersData,
	salesData,
	userCountData,
} from "@/lib/app-data";
import { useMemo, useState } from "react";
import OverviewBox from "../../components/app/common/dashboard/OverviewBox";
import { Categories, DashboardDuration, Orders } from "@/types/component.type";
import ChartWrapper from "../../components/app/common/ChartWrapper";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
	AdminCategoryColumns,
	AdminOrderColumns,
} from "@/lib/tableData/AdminColumns";
import { TableWrapper } from "@/components/ui/table";

const Dashboard = () => {
	const [filter, setFilter] = useState<DashboardDuration>("half-day");

	const isValidDuration = (value: string): value is DashboardDuration => {
		return ["half-day", "week", "month", "year"].includes(value);
	};

	const filteredSalesData = useMemo(() => salesData.slice(0, 12), []);

	const filteredCategoriesData = useMemo(
		() =>
			categoriesData
				.sort((a, b) => b.itemsSold - a.itemsSold)
				.slice(0, 8),
		[]
	);

	const filteredOrdersData = useMemo(
		() =>
			ordersData
				.sort((a, b) => {
					return (
						new Date(b.date).getTime() - new Date(a.date).getTime()
					);
				})
				.slice(0, 7),
		[]
	);

	const categoriesTable = useReactTable({
		data: filteredCategoriesData,
		columns: AdminCategoryColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	const ordersTable = useReactTable({
		data: filteredOrdersData,
		columns: AdminOrderColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="">
			<div className="sticky top-0 z-10 flex items-start py-2 bg-background top-filter">
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
				{Object.values(dashboardOverviewData).map((item) => (
					<OverviewBox key={item.id} {...item} duration={filter} />
				))}
			</div>

			<div className="grid grid-cols-3 grid-rows-3 my-3 gap-x-3 gap-y-4 lg:grid-cols-4">

				{/* User Separation Radial Chart */}
				<Card className="flex flex-col w-full bg-transparent border shadow-md glass dark:bg-secondary/40 border-border">
					<CardHeader className="px-6 pt-6 pb-0 text-center h-fit">
						<CardTitle className="text-xl">
							User Separation
						</CardTitle>
						<CardDescription>
							10 new users in the last{" "}
							{filter === "half-day"
								? "12 hours"
								: `last ${filter}`}
						</CardDescription>
						<div className="flex justify-center gap-3 mt-2">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 text-sm rounded-full bg-chart-1" />
								<h4>Customers</h4>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 text-sm rounded-full bg-chart-2" />
								<h4>Vendors</h4>
							</div>
						</div>
					</CardHeader>
					<CardContent className="flex-1 p-0">
						<ChartWrapper data={userCountData} type="radial" />
					</CardContent>
				</Card>

				{/* Profitable Categories Table */}
				<Card className="w-full col-span-4 bg-transparent border shadow-md glass dark:bg-secondary/40 border-border">
					<CardHeader className="h-fit">
						<CardTitle className="text-xl">
							Profitable Categories
						</CardTitle>
						<CardDescription>
							Top 7 profitable categories
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-1 w-full px-6 py-0">
						<TableWrapper<Categories>
							table={categoriesTable}
							columnsLength={AdminCategoryColumns.length}
							height={300}
						/>
					</CardContent>
				</Card>

				{/* Sales Overview */}
				<Card className="flex flex-col w-full col-span-5 row-start-2 overflow-hidden bg-transparent border shadow-md glass dark:bg-secondary/40 border-border">
					<CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
						<div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
							<CardTitle className="text-xl">
								Sales Overview
							</CardTitle>
							<CardDescription>
								Total sales and profit collected in the last{" "}
								{filter === "half-day" ? "12 hours" : filter}
							</CardDescription>
						</div>
						<div className="flex">
							<div className="p-3 bg-chart-3/60">
								<h2>Total Sales</h2>
								<h4 className="text-3xl font-bold">
									{formatValueWithIndianNumericPrefix(
										salesData.reduce(
											(prev, curr) => prev + curr.sales,
											0
										),
										"price"
									)}
								</h4>
							</div>
							<div className="p-3 bg-chart-2/60">
								<h2>Total Profit</h2>
								<h4 className="text-3xl font-bold">
									{formatValueWithIndianNumericPrefix(
										salesData.reduce(
											(prev, curr) => prev + curr.profit,
											0
										),
										"price"
									)}
								</h4>
							</div>
						</div>
					</CardHeader>
					<CardContent className="flex-1 p-0">
						<ChartWrapper data={filteredSalesData} type="bar" />
					</CardContent>
				</Card>

				{/* Recent Orders Table */}
				<Card className="w-full col-span-5 row-start-3 bg-transparent border shadow-md glass dark:bg-secondary/40 border-border">
					<CardHeader className="h-fit">
						<CardTitle className="text-xl">Recent Orders</CardTitle>
						<CardDescription>
							Recent orders from customers
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-1 w-full px-6 py-0 mb-4">
						<TableWrapper<Orders>
							table={ordersTable}
							columnsLength={AdminOrderColumns.length}
							height={300}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
