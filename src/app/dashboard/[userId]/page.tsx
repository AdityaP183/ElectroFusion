import { ChartAreaInteractive } from "@/features/dashboard/components/chart-area-interactive";
import DataTable from "@/features/dashboard/components/data-table";
import { SectionCards } from "@/features/dashboard/components/section-cards";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export default async function Dashboard() {
	const user = await currentUser();
	const dbUser = await fetchQuery(api.users.getUser, {
		userId: user?.id || "",
	});

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SectionCards />
					{dbUser?.role !== "admin" && (
						<div className="px-4 lg:px-6">
							<ChartAreaInteractive />
						</div>
					)}
					<DataTable />
				</div>
			</div>
		</div>
	);
}
