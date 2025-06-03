import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/features/dashboard/components/sidebar/appsidebar";
import AppSidebarContentHeader from "@/features/dashboard/components/sidebar/appsidebar-content-header";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
                <AppSidebarContentHeader/>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
