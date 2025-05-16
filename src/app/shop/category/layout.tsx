import InfoStrip from "@/features/category-page/ui/info-strip";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen w-full mx-10">
			<InfoStrip />
			<div className="">{children}</div>
		</div>
	);
}
