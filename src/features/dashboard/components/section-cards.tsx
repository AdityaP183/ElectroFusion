import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { fetchQuery } from "convex/nextjs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export async function SectionCards() {
	const stats = await fetchQuery(api.dashboard.getDashboardStats);

	if (!stats) {
		return <div className="p-4 text-center">Loading...</div>;
	}

	return (
		<div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
			{/* Total Revenue */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Revenue</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						₹{stats.totalRevenue.toFixed(2)}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingUp />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Trending up this month <TrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Revenue from all sources
					</div>
				</CardFooter>
			</Card>

			{/* New Customers */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>New Customers</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{stats.newCustomers}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingUp />
							+5.2%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Customer growth <TrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						New sign-ups this month
					</div>
				</CardFooter>
			</Card>

			{/* Active Accounts */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active Accounts</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{stats.activeAccounts}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingUp />
							+3.9%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Engaged users <TrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Accounts with recent orders
					</div>
				</CardFooter>
			</Card>

			{/* Growth Rate */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Growth Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{stats.growthRate.toFixed(1)}%
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							{stats.growthRate >= 0 ? (
								<>
									<TrendingUp />+{stats.growthRate.toFixed(1)}
									%
								</>
							) : (
								<>
									<TrendingDown />
									{stats.growthRate.toFixed(1)}%
								</>
							)}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{stats.growthRate >= 0
							? "Steady performance increase"
							: "Drop in monthly growth"}{" "}
						{stats.growthRate >= 0 ? (
							<TrendingUp className="size-4" />
						) : (
							<TrendingDown className="size-4" />
						)}
					</div>
					<div className="text-muted-foreground">
						Month-over-month order growth
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
