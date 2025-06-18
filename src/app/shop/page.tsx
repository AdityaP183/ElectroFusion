import ProductsCarousel from "@/components/modules/products-carousel";
import BecomeASeller from "@/features/shop/components/homepage/become-a-seller";
import SearchByCategory from "@/features/shop/components/homepage/search-by-category";
import { Flame } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="mx-20 space-y-10">
			{/* Featured Hero Section */}
			{/* <FeaturedSection /> */}

			{/* Recent Order Summary */}

			{/* Search by Category */}
			<SearchByCategory />

			{/* Latest Products Carousel */}
			<section className="py-20">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 mb-10">
						<Flame className="size-8 fill-foreground/20" />
						<h2 className="text-3xl font-bold tracking-tight text-foreground">
							Latest Products
						</h2>
					</div>

					<Link
						href={`shop/browse`}
						className="text-lg text-primary hover:text-primary/80 hover:underline mb-10"
					>
						View all
					</Link>
				</div>
				<ProductsCarousel />
			</section>

			{/* Ad: Become a seller */}
			<section className="py-20">
				<BecomeASeller />
			</section>

			{/* Trending Products Carousel */}
			<section className="py-20">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 mb-10">
						<Flame className="size-8 fill-foreground/20" />
						<h2 className="text-3xl font-bold tracking-tight text-foreground">
							Trending Products
						</h2>
					</div>

					<Link
						href={`shop/browse`}
						className="text-lg text-primary hover:text-primary/80 hover:underline mb-10"
					>
						View all
					</Link>
				</div>
				<ProductsCarousel />
			</section>
		</div>
	);
}
