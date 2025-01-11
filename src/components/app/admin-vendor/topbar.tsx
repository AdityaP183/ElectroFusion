import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { TooltipWrapper } from "@/components/ui/tooltip";
import fusionStore from "@/stores/userStore";
import { PanelLeft } from "lucide-react";

export default function Topbar() {
    const {toggleSidebar} = useSidebar();
	const { user } = fusionStore();
	return (
		<div className="flex items-center justify-between">
			<div className="items-center hidden gap-2 welcome lg:flex">
				<TooltipWrapper
					trigger={
						<PanelLeft className="cursor-pointer hover:bg-transparent" onClick={toggleSidebar}/>
					}
					content={
						<div className="flex items-center gap-2 p-1">
							<p>Toggle Sidebar</p>
							<h4>
								<kbd className="p-1 text-xs bg-gray-600 rounded-md">
									Ctrl
								</kbd>{" "}
								+{" "}
								<kbd className="px-2 py-1 text-xs bg-gray-600 rounded-md">
									B
								</kbd>
							</h4>
						</div>
					}
					side="right"
				/>
				<Separator className="h-6" orientation="vertical" />
				{user && (
					<h1 className="text-xl">
						Good to see you,{" "}
						<span className="font-medium font-title">
							{user.user_metadata.firstName}
						</span>
					</h1>
				)}
			</div>
			<div></div>
		</div>
	);
}
