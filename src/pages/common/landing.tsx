import { BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Marquee, MarqueeCard } from "@/components/ui/marquee";
import { reviewsData } from "@/lib/app-data";
import {
	ArrowRight,
	CreditCard,
	Palette,
	ShoppingBasket,
	Truck,
} from "lucide-react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const features = [
	{
		Icon: Palette,
		name: "Modern, Intuitive Design",
		description:
			"Navigate effortlessly with a sleek and user-friendly interface, designed for a seamless shopping experience.",
		background: (
			<img
				src="/assets/landing/modern_ui.svg"
				className="transition-all duration-300 group-hover:scale-110 opacity-60 aspect-video"
			/>
		),
		className: "col-start-1 col-end-2 row-start-1 row-end-3",
	},
	{
		Icon: Truck,
		name: "Seamless Order Tracking",
		description:
			"Stay updated on your purchases with real-time order tracking and delivery updates.",
		background: (
			<img
				src="/assets/landing/track_order.svg"
				className="transition-all duration-300 group-hover:scale-110 opacity-60 aspect-video"
			/>
		),
		className: "col-start-2 col-end-3 row-start-1 row-end-2",
	},
	{
		Icon: CreditCard,
		name: "Secure & Easy Payments",
		description:
			"Enjoy hassle-free transactions with multiple secure payment options tailored to your needs.",
		background: (
			<img
				src="/assets/landing/payment.svg"
				className="transition-all duration-300 group-hover:scale-110 opacity-60 aspect-video"
			/>
		),
		className: "col-start-3 col-end-4 row-start-1 row-end-2",
	},
	{
		Icon: ShoppingBasket,
		name: "Personalized Shopping Experience",
		description:
			"Browse a wide range of electronics tailored to your preferences with a seamless shopping experience.",
		background: (
			<img
				src="/assets/landing/shopping.svg"
				className="transition-all duration-300 scale-90 group-hover:scale-110 opacity-60 aspect-video"
			/>
		),
		className: "col-start-2 col-end-4 row-start-2 row-end-3",
	},
];

export default function Landing() {
	const navigate = useNavigate();
	const marqueeFirstRow = useMemo(() => reviewsData.slice(0, 10), []);
	const marqueeSecondRow = useMemo(() => reviewsData.slice(10, 20), []);

	return (
		<div>
			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center gap-6 my-20 h-fit">
				<div className="flex items-center gap-3">
					<div className="flex-[2] space-y-3">
						<div className="text-7xl">
							<div className="p-1 font-extrabold rounded-md bg-primary text-primary-foreground w-fit font-ox">
								Redefining
							</div>
							<h1 className="italic font-extrabold">
								the Way You Shop
							</h1>
						</div>

						<Button
							className="group relative flex items-center justify-between h-12 text-lg rounded-full w-[180px]"
							onClick={() => toast.error("Coming Soon")}
						>
							<span>Shop Now</span>
							<div className="relative mr-1 overflow-hidden rounded-full bg-primary-foreground group-hover:bg-background h-9 w-9 group">
								<div className="absolute grid w-full h-full place-content-center">
									{/* First arrow moves to the right */}
									<ArrowRight className="w-10 h-10 transition-transform duration-200 text-primary group-hover:translate-x-6" />
								</div>
								<div className="absolute grid w-full h-full place-content-center">
									{/* Second arrow comes in from the left */}
									<ArrowRight className="w-5 h-5 transition-transform duration-200 -translate-x-6 text-primary-foreground group-hover:translate-x-0" />
								</div>
							</div>
						</Button>
					</div>
					<div className="flex justify-center flex-1">
						<img
							src="/assets/landing/hero.svg"
							alt=""
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
				<div className="text-5xl font-bold text-center">
					<p className="leading-none text-transparent whitespace-pre-wrap pointer-events-none bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 bg-clip-text">
						Experience Modern Shopping, Tailored for You.
					</p>
				</div>
			</div>

			{/* Features Section */}
			<div className="h-[40rem] flex items-center">
				<div className="grid w-full h-full grid-cols-3 gap-3 grid-row-2">
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</div>
			</div>

			{/* Become a Vendor */}
			<div className="my-20 h-fit">
				<h1 className="mb-3 text-4xl font-bold">Become a Vendor</h1>
				<p className="text-2xl text-justify text-muted-foreground">
					Take your business online and connect with thousands of
					potential customers through ElectroFusion. With a
					user-friendly platform and tailored support, growing your
					brand has never been easier.
				</p>

				<div className="flex items-center justify-between">
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-lg space-y-3">
						<li>
							<strong>Wide Customer Reach</strong> – Access a vast
							and growing marketplace for your products.
						</li>
						<li>
							<strong>Easy Product Management</strong> – List,
							update, and manage your inventory effortlessly.
						</li>
						<li>
							<strong>Secure Transactions</strong> – Enjoy safe
							and reliable payment processing.
						</li>
						<li>
							<strong>Real-Time Analytics</strong> – Gain insights
							into your sales and performance with detailed
							reports.
						</li>
						<li>
							<strong>Dedicated Support</strong> – Get
							round-the-clock assistance for any queries or
							issues.
						</li>
					</ul>

					<div className="flex items-center justify-center flex-1">
						<Button
							className="flex items-center justify-between h-12 text-lg rounded-full"
							onClick={() => navigate("/register?role=vendor")}
						>
							Continue
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
					</div>
				</div>
			</div>

			{/* Customer Reviews */}
			<div className="relative flex flex-col items-center justify-center w-full my-20 overflow-hidden rounded-lg">
				<h1 className="mb-5 text-4xl font-bold">What Customers Say</h1>
				<Marquee pauseOnHover className="[--duration:20s]">
					{marqueeFirstRow.map((review) => (
						<MarqueeCard key={review.username} {...review} />
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="[--duration:20s]">
					{marqueeSecondRow.map((review) => (
						<MarqueeCard key={review.username} {...review} />
					))}
				</Marquee>
				<div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-background"></div>
				<div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-background"></div>
			</div>
		</div>
	);
}
