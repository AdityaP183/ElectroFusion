import TopBar from "@/components/app/common/dashboard/TopBar";
import SidePanel from "@/components/app/common/sidepanel/SidePanel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { vendorData, vendorSidebarItems } from "@/lib/app-data";
import toast from "react-hot-toast";

const VendorLayout = () => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	return (
		<div className="block w-full h-screen gap-1 md:flex">
			<SidebarProvider>
				<SidePanel
					sidebarItems={vendorSidebarItems}
					setIsLoggingOut={setIsLoggingOut}
				/>
				<SidebarInset>
					<Card className="h-screen p-0 rounded-none">
						<CardHeader className="px-3 py-3 border-b md:px-5 border-border">
							<TopBar title={vendorData.store_name} />
						</CardHeader>
						<CardContent className="h-[calc(100%-80px)] w-full overflow-hidden overflow-y-auto py-0">
							<Outlet />
						</CardContent>
					</Card>
				</SidebarInset>
			</SidebarProvider>

			{/*  Alert Dialog for logging out */}
			<AlertDialog open={isLoggingOut} onOpenChange={setIsLoggingOut}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Logout</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to log out?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => setIsLoggingOut(false)}
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								toast.success("Logged out successfully");
							}}
							className="font-extrabold"
						>
							Logout
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default VendorLayout;
