import Footer from "@/components/modules/footer";
import HeroSection from "@/features/landing-page/ui/hero-section";
import Navbar from "@/features/shop/ui/navbar";

export default function Page() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div>
                {/* Hero Section */}
                <HeroSection/>
                {/* Feature Sections */}
                {/* Become a Seller */}
                {/* Customer Reviews */}
            </div>
            <Footer />
		</div>
	);
}
