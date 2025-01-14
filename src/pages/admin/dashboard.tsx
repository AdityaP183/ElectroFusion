import {
	LatestOrders,
	OrdersGraph,
	TopRatedProducts,
} from "@/components/app/admin-vendor";
import OverviewBox from "@/components/ui/overview-box";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminDashboard } from "@/db/api-dashboard";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["admin-dashboard"],
		queryFn: () => getAdminDashboard(),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	if (!isLoading && isError) {
		console.log(error);
	}

	if (!isLoading && data) {
		console.log(data);
	}

	return (
		<div className="w-full h-full my-3 space-y-3">
			{isLoading ? (
				<Skeleton className="w-full h-[100px]" />
			) : isError ? (
				<div>
					<h1 className="text-red-500">
						Failed to load dashboard data
					</h1>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4">
					{data && (
						<>
							{data.totalRevenue && (
								<OverviewBox
									id="total-revenue"
									title="Total Revenue"
									value={data.totalRevenue}
								/>
							)}
							<OverviewBox
								id="total-orders"
								title="Total Orders"
								value={data.totalOrders}
							/>
							<OverviewBox
								id="total-products"
								title="Total Products"
								value={data.totalProducts}
							/>
						</>
					)}
				</div>
			)}

			{isLoading ? (
				<Skeleton className="w-full h-[500px]" />
			) : (
				data && (
					<div className="grid gap-3 mb-3 grid-col-1 sm:grid-cols-4">
						{/* Recent Orders Summary */}
						<LatestOrders data={data.topOrders} />

						{/* Popular Categories */}
						<TopRatedProducts data={data.topRatedProducts} />

						{/* Orders Line Graph */}
						<OrdersGraph data={data.top15Orders} />
					</div>
				)
			)}

			<br />
		</div>
	);
}
