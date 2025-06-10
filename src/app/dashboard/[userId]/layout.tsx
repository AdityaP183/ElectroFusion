import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/features/dashboard/components/sidebar/appsidebar";
import AppSidebarContentHeader from "@/features/dashboard/components/sidebar/appsidebar-content-header";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset className="h-screen overflow-y-auto">
				<AppSidebarContentHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
