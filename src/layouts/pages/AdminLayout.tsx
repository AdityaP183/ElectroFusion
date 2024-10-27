import TopBar from "@/components/app/common/dashboard/TopBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router-dom";
import SidePanel from "@/components/app/common/dashboard/SidePanel";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	return (
		<div className="block w-full h-screen gap-1 md:flex">
			<SidebarProvider defaultOpen={true} open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SidePanel />
				<Card className={`${sidebarOpen ? "w-[calc(100%-var(--sidebar-width))]" : "w-full"} h-screen rounded-none`}>
					<CardHeader className="px-3 py-3 border-b md:px-5 border-border">
                        <TopBar />
					</CardHeader>
					<CardContent className="h-[calc(100%-80px)] w-full overflow-hidden overflow-y-auto">
						<Outlet />
					</CardContent>
				</Card>
			</SidebarProvider>
		</div>
	);
};

export default AdminLayout;
