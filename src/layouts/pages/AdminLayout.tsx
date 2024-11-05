import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router-dom";
import { sidebarItems } from "@/lib/app-data";
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
import toast from "react-hot-toast";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidePanel, TopBar } from "@/components/app/common";

const AdminLayout = () => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	return (
		<div className="block w-full h-screen gap-1 md:flex">
			<SidebarProvider>
				<SidePanel
					sidebarItems={sidebarItems}
					setIsLoggingOut={setIsLoggingOut}
				/>
				<SidebarInset>
					<Card className="h-screen p-0 rounded-none">
						<CardHeader className="px-3 py-3 border-b md:px-5 border-border">
							<TopBar />
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

export default AdminLayout;
