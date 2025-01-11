import { SidePanel, Topbar } from "@/components/app/admin-vendor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { adminSidebarItems, vendorSidebarItems } from "@/lib/app-data";
import fusionStore from "@/stores/userStore";
import React, { PropsWithChildren } from "react";

interface AdminVendorLayoutProps {
	role?: "admin" | "vendor";
}

const AdminVendorLayout: React.FC<
	PropsWithChildren<AdminVendorLayoutProps>
> = ({ children }) => {
    const { user } = fusionStore();
	return (
		<div className="block w-full h-screen gap-1 md:flex">
			<SidebarProvider>
				<SidePanel sidebarItems={user?.user_metadata.role === "admin" ? adminSidebarItems : vendorSidebarItems} />
				<SidebarInset>
					<Card className="h-screen p-0 rounded-none">
						<CardHeader className="h-16 px-3 py-3 border-b md:px-5 border-border">
							<Topbar />
						</CardHeader>
						<CardContent className="h-[calc(100%-4rem)] w-full overflow-hidden overflow-y-auto py-0">
							{children}
						</CardContent>
					</Card>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
};

export default AdminVendorLayout;
