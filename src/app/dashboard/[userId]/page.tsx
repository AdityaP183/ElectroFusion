import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { SectionCards } from "@/features/dashboard/components/section-cards";
import { ChartAreaInteractive } from "@/features/dashboard/components/chart-area-interactive";
import DataTable from "@/features/dashboard/components/data-table";

interface Params {
	params: Promise<{ userId: string }>;
}

export default async function Dashboard({ params }: Params) {
	const { userId } = await params;
	const user = await fetchQuery(api.users.getUser, { userId });

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SectionCards />
					<div className="px-4 lg:px-6">
						<ChartAreaInteractive />
					</div>
					<DataTable />
				</div>
			</div>
		</div>
	);
}
