import { tempUser } from "@/lib/app-data";
import Searchbar from "../Searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useIsMobile from "@/context/hooks/useIsMobile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useState } from "react";

const TopBar = () => {
	const [search, setSearch] = useState<string>("");
	const isMobile = useIsMobile();

	return (
		<div className="flex items-center justify-between w-full">
			<div className="items-center hidden gap-2 welcome lg:flex">
				<TooltipWrapper
					trigger={
						<SidebarTrigger
							className="hover:bg-transparent"
						/>
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
				<h1 className="text-2xl">
					Good to see you,{" "}
					<span className="font-medium">{tempUser.first_name}</span>
				</h1>
			</div>

			<div className="flex items-center justify-between w-full gap-6 lg:w-auto lg:justify-normal">
				{isMobile && (
					<>
						<div className="flex items-center gap-3">
							<Avatar shape="square" className="w-8 h-8">
								<AvatarImage src="/logo.svg" />
								<AvatarFallback>EF</AvatarFallback>
							</Avatar>
							<h1 className="text-lg font-bold font-exo">
								ElectroFusion
							</h1>
						</div>
						<SidebarTrigger className="hover:bg-transparent" />
					</>
				)}
				{!isMobile && <Searchbar searchValue={search} onSearchValueChange={setSearch} />}
			</div>
		</div>
	);
};

export default TopBar;
