import MarqueeCard from "@/components/app/common/MarqueeCard";
import { BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { reviews } from "@/lib/app-data";
import {
	ArrowRight,
	ArrowUpRight,
	CreditCard,
	Palette,
	ShoppingBasket,
	Truck,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const features = [
	{
		Icon: Palette,
		name: "Modern, Intuitive Design",
		description:
			"Navigate effortlessly with a sleek and user-friendly interface, designed for a seamless shopping experience.",
		background: (
			<img
				// src="/assets/landing/shopping.svg"
				className="absolute top-0 bottom-0 left-0 right-0 opacity-60"
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
				// src="/assets/landing/shopping.svg"
				className="absolute top-0 bottom-0 left-0 right-0 opacity-60"
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
				// src="/assets/landing/shopping.svg"
				className="absolute top-0 bottom-0 left-0 right-0 opacity-60"
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
				className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] opacity-60 aspect-video"
			/>
		),
		className: "col-start-2 col-end-4 row-start-2 row-end-3",
	},
];

const Landing = () => {
	const navigate = useNavigate();
	const marqueeFirstRow = useMemo(() => reviews.slice(0, 10), []);
	const marqueeSecondRow = useMemo(() => reviews.slice(10, 20), []);

	return (
		<div>
			{/* Hero Section */}
			<div className="h-[60vh] flex flex-col items-center justify-center gap-6">
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
							onClick={() => navigate("/home")}
						>
							<span>Shop Now</span>
							<div className="relative mr-1 overflow-hidden rounded-full bg-primary-foreground h-9 w-9">
								<div className="absolute top-[0.6em] left-[0em] grid place-content-center transition-all w-full h-full duration-200 group-hover:-translate-y-5 group-hover:translate-x-4 ">
									<ArrowUpRight className="w-5 h-5 text-primary" />
									<ArrowUpRight className="w-5 h-5 mb-1 -translate-x-4 text-primary" />
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
					<p className="leading-none text-transparent whitespace-pre-wrap pointer-events-none bg-gradient-to-r from-cyan-400 to-indigo-600 bg-clip-text">
						Experience Modern Shopping, Tailored for You.
					</p>
				</div>
			</div>

			{/* Features Section */}
			<div className="h-[60vh] flex items-center">
				<div className="grid w-full h-full grid-cols-3 gap-3 grid-row-2">
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</div>
			</div>

			{/* Become a Vendor */}
			<div className="h-[40vh] my-20">
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
						<Button className="flex items-center justify-between h-12 text-lg rounded-full">
							Continue
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
					</div>
				</div>
			</div>

			{/* Customer Reviews */}
			<div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
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
};
export default Landing;
