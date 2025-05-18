import InfoStrip from "@/features/category-page/ui/info-strip";
import CategoryFilters from "@/features/shop/components/category-filters";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen mx-10">
			<InfoStrip />
			<div className="flex gap-3">
				<CategoryFilters isCategory />
				{children}
			</div>
		</div>
	);
}
