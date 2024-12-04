import ChartWrapper from "@/components/app/common/ChartWrapper";
import OverviewBox from "@/components/app/common/dashboard/OverviewBox";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TableWrapper } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	categoriesData,
	customerReviews,
	ordersData,
	productsData,
	salesData,
	vendorsOverviewData,
} from "@/lib/app-data";
import {
	VendorCustomerReviewsColumns,
	VendorOrdersColumns,
	VendorProductsColumns,
} from "@/lib/tableData/VendorColumns";
import {
	formatValueWithIndianNumericPrefix,
	isValidDuration,
} from "@/lib/utils";
import {
	CustomerReview,
	DashboardDuration,
	Orders,
	Products,
} from "@/types/component.type";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const Dashboard = () => {
	const [filter, setFilter] = useState<DashboardDuration>("half-day");

	const filteredProductsData = useMemo(() => productsData.slice(0, 7), []);

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

	const filteredSalesData = useMemo(() => salesData.slice(0, 12), []);

	const filteredCategoriesData = useMemo(
		() => categoriesData.sort((a, b) => b.sold - a.sold).slice(0, 5),
		[]
	);

	const filteredCustomerReviews = useMemo(
		() =>
			customerReviews
				.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
				.slice(0, 10),
		[]
	);

	const productsTable = useReactTable({
		data: filteredProductsData,
		columns: VendorProductsColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	const ordersTable = useReactTable({
		data: filteredOrdersData,
		columns: VendorOrdersColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	const customerReviewsTable = useReactTable({
		data: filteredCustomerReviews,
		columns: VendorCustomerReviewsColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	console.log("Rendering Vendor Dashboard...");

	return (
		<div className="mb-5">
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
				<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
					<CardHeader>
						<CardTitle className="text-2xl">
							Top Selling Products
						</CardTitle>
						<CardDescription>
							Trending products in the last{" "}
							{filter === "half-day" ? "12 hours" : filter}{" "}
							duration
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TableWrapper<Products>
							table={productsTable}
							columnsLength={VendorProductsColumns.length}
						/>
					</CardContent>
				</Card>

				{/* Recent Orders Summary */}
				<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
					<CardHeader>
						<CardTitle className="text-2xl">
							Recent Orders Summary
						</CardTitle>
						<CardDescription>
							View all orders in the last{" "}
							{filter === "half-day" ? "12 hours" : filter}{" "}
							duration
						</CardDescription>
					</CardHeader>
					<CardContent className="">
						<TableWrapper<Orders>
							table={ordersTable}
							columnsLength={VendorOrdersColumns.length}
						/>
					</CardContent>
				</Card>

				{/* Line Graph - Sales, Profit and Discount */}
				<Card className="w-full col-span-4 bg-transparent glass dark:bg-secondary/40">
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
							<div className="p-3 bg-chart-1/60">
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
								<h2>Profit Collected</h2>
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
							<div className="p-3 bg-chart-3/60">
								<h2>Discount Granted</h2>
								<h4 className="text-3xl font-bold">
									{formatValueWithIndianNumericPrefix(
										salesData.reduce(
											(prev, curr) =>
												prev + curr.discount,
											0
										),
										"price"
									)}
								</h4>
							</div>
						</div>
					</CardHeader>
					<CardContent className="h-[500px] px-1">
						<ChartWrapper data={filteredSalesData} type="area" />
					</CardContent>
				</Card>

				{/* Recent Customer Reviews */}
				<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
					<CardHeader>
						<CardTitle className="text-2xl">
							Recent Customer Reviews
						</CardTitle>
						<CardDescription>
							Customer reviews in the last{" "}
							{filter === "half-day" ? "12 hours" : filter}{" "}
							duration
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TableWrapper<CustomerReview>
							table={customerReviewsTable}
							columnsLength={VendorCustomerReviewsColumns.length}
						/>
					</CardContent>
				</Card>

				{/* Popular Categories */}
				<Card className="w-full col-span-2 bg-transparent glass dark:bg-secondary/40">
					<CardHeader>
						<CardTitle className="text-2xl">
							Popular Categories
						</CardTitle>
						<CardDescription>
							Trending categories in the last{" "}
							{filter === "half-day" ? "12 hours" : filter}{" "}
							duration
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartWrapper
							data={filteredCategoriesData}
							type="vertical-bar"
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
export default Dashboard;
