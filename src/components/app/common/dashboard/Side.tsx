import { Sidebar, SidebarHeader, SidebarInset } from "@/components/ui/sidebar";
import React from "react";

type SideProps = {
	children: React.ReactNode;
};

const Side = ({ children }: SideProps) => {
	return (
		<>
			<Sidebar
				collapsible="icon"
				className="group=[[data-collapsible=icon]]:w-350px"
			>
				<SidebarHeader>
					<h4 className="block group-data-[state=open]:hidden">
						Hello
					</h4>
					<h4>H</h4>
				</SidebarHeader>
			</Sidebar>
			<SidebarInset>{children}</SidebarInset>
		</>
	);
};
export default Side;
