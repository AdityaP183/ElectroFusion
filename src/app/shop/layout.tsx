import Navbar from "@/features/shop/ui/navbar";

export default function ShopLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen w-full">
			<Navbar />
			<div className="mt-20">{children}</div>
		</main>
	);
}
