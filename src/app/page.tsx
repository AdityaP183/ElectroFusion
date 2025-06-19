"use client";

import Footer from "@/components/modules/footer";
import { BentoCard } from "@/components/ui/bento-grid";
import { Marquee, MarqueeCard } from "@/components/ui/marquee";
import Navbar from "@/features/shop/ui/navbar";
import { reviewsData } from "@/lib/app-data";
import { CreditCard, Palette, ShoppingBasket, Truck } from "lucide-react";
import { useMemo } from "react";

import Image from "next/image";

const features = [
	{
		Icon: Palette,
		name: "Modern, Intuitive Design",
		description:
			"Navigate effortlessly with a sleek and user-friendly interface, designed for a seamless shopping experience.",
		background: (
			<div className="relative aspect-video w-full h-full">
				<Image
					src="/assets/landing/modern_ui.svg"
					alt="Modern UI"
					fill
					className="transition-all duration-300 group-hover:scale-110 opacity-60 object-cover"
				/>
			</div>
		),
		className: "col-start-1 col-end-2 row-start-1 row-end-3",
	},
	{
		Icon: Truck,
		name: "Seamless Order Tracking",
		description:
			"Stay updated on your purchases with real-time order tracking and delivery updates.",
		background: (
			<div className="relative aspect-video w-full h-full">
				<Image
					src="/assets/landing/track_order.svg"
					alt="Track Order"
					fill
					className="transition-all duration-300 group-hover:scale-110 opacity-60 object-cover"
				/>
			</div>
		),
		className: "col-start-2 col-end-3 row-start-1 row-end-2",
	},
	{
		Icon: CreditCard,
		name: "Secure & Easy Payments",
		description:
			"Enjoy hassle-free transactions with multiple secure payment options tailored to your needs.",
		background: (
			<div className="relative aspect-video w-full h-full">
				<Image
					src="/assets/landing/payment.svg"
					alt="Payment"
					fill
					className="transition-all duration-300 group-hover:scale-110 opacity-60 object-cover"
				/>
			</div>
		),
		className: "col-start-3 col-end-4 row-start-1 row-end-2",
	},
	{
		Icon: ShoppingBasket,
		name: "Personalized Shopping Experience",
		description:
			"Browse a wide range of electronics tailored to your preferences with a seamless shopping experience.",
		background: (
			<div className="relative aspect-video w-full h-full">
				<Image
					src="/assets/landing/shopping.svg"
					alt="Shopping"
					fill
					className="transition-all duration-300 scale-90 group-hover:scale-110 opacity-60 object-cover"
				/>
			</div>
		),
		className: "col-start-2 col-end-4 row-start-2 row-end-3",
	},
];

export default function Landing() {
	const marqueeFirstRow = useMemo(() => reviewsData.slice(0, 10), []);
	const marqueeSecondRow = useMemo(() => reviewsData.slice(10, 20), []);

	return (
		<div>
			<Navbar />

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
					</div>
					<div className="flex justify-center flex-1">
						<Image
							src="/assets/landing/hero.svg"
							alt=""
							width={470}
							height={375}
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
			<div className="h-[40rem] flex items-center mx-20">
				<div className="grid w-full h-full grid-cols-3 gap-3 grid-row-2">
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</div>
			</div>

			{/* Become a Vendor */}
			<div className="my-20 h-fit mx-20">
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
							<strong>Wide Customer Reach</strong> &ndash; Access
							a vast and growing marketplace for your products.
						</li>
						<li>
							<strong>Easy Product Management</strong> &ndash;
							List, update, and manage your inventory
							effortlessly.
						</li>
						<li>
							<strong>Secure Transactions</strong> &ndash; Enjoy
							safe and reliable payment processing.
						</li>
						<li>
							<strong>Real-Time Analytics</strong> &ndash; Gain
							insights into your sales and performance with
							detailed reports.
						</li>
						<li>
							<strong>Dedicated Support</strong> &ndash; Get
							round-the-clock assistance for any queries or
							issues.
						</li>
					</ul>
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

			<Footer />
		</div>
	);
}
