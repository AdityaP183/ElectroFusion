import Footer from "@/components/modules/footer";
import Navbar from "@/features/shop/ui/navbar";

export default function ShopLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen w-full flex flex-col">
			<Navbar />
			<div className="flex-1 mt-20 min-h-screen">{children}</div>
			<Footer />
		</main>
	);
}
