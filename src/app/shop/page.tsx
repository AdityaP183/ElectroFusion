import BecomeASeller from "@/features/shop/components/homepage/become-a-seller";
import FeaturedSection from "@/features/shop/components/homepage/featured-section";
import SearchByCategory from "@/features/shop/components/homepage/search-by-category";

export default function Home() {
	return (
		<div className="mx-20 space-y-10">
			{/* Featured Hero Section */}
			<FeaturedSection />

			{/* Recent Order Summary */}

			{/* Search by Category */}
			<SearchByCategory />

			{/* Latest Products Carousel */}

			{/* Ad: Become a seller */}
			<BecomeASeller />

			{/* Trending Products Carousel */}
		</div>
	);
}
