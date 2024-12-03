import { Button } from "@/components/ui/button";
import {
	cn,
	formatDiscountPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	Cable,
	Headphones,
	Laptop,
	MoveRight,
	Smartphone,
	Tablet,
} from "lucide-react";
import { productsData } from "@/lib/app-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import ProductCard from "@/components/app/store/ProductCard";

const bannerData = [
	{
		id: 1,
		dealType: "Today's Deal",
		dealTitle: "Best Tablets Deals of the Day",
		startingFrom: null,
		discount: 38,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-ipad.png",
	},
	{
		id: 2,
		dealType: "Black Friday Deals",
		dealTitle: "Lowest Price since release",
		startingFrom: null,
		discount: 55,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-iphone.png",
	},
	{
		id: 3,
		dealType: null,
		dealTitle: "All New Arrivals of 2024",
		startingFrom: 1599,
		discount: null,
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-watches.png",
	},
];

const categoriesData = [
	{
		id: 1,
		name: "Smartphones",
		icon: Smartphone,
	},
	{
		id: 3,
		name: "Laptops",
		icon: Laptop,
	},
	{
		id: 4,
		name: "Headphones",
		icon: Headphones,
	},
	{
		id: 2,
		name: "Tablets",
		icon: Tablet,
	},
	{
		id: 5,
		name: "Accessories",
		icon: Cable,
	},
];

const discountsData = [
	{
		id: 1,
		type: "Black Friday",
		title: "Discounts 50% On All Headphones",
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/banner-7.jpg",
		mainStyle: "col-span-4 h-[350px]",
		infoStyle: "top-[50%] -translate-y-1/2 left-[5%] w-1/2 text-start",
		showPurchaseButton: true,
	},
	{
		id: 2,
		title: "Get 30% off on Ipads",
		description: "Grab the best deals now",
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/banner-8-2.jpg",
		// infoStyle: "top-14 -translate-y-1/2 left-[50%] -translate-x-1/2 flex items-start justify-center gap-3 flex-col",
		showPurchaseButton: false,
	},
	{
		id: 3,
		type: null,
		title: "Grab Music Players Now",
		description: "Starting from ₹2,999",
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/banner-9.jpg",
		showPurchaseButton: false,
	},
	{
		id: 4,
		type: null,
		title: "Watches For Every Occasion",
		description: "Starting from ₹999",
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/banner-10.jpg",
		showPurchaseButton: false,
	},
	{
		id: 5,
		type: null,
		title: "Newest Iphone in the market",
		description: "Exclusive Offer for you",
		imageUrl:
			"https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/banner-11.jpg",
		showPurchaseButton: false,
	},
];

const textVariants = {
	initial: { opacity: 0, y: 50 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
};

const imageVariants = {
	initial: { opacity: 0, y: -50 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	exit: { opacity: 0, y: 50, transition: { duration: 0.4 } },
};

const Home = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const dealOfDay = {
		id: "5bdd3daee2afdc94ef46aa9d",
		productName:
			"Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)",
		image: "/assets/phone.jpg",
		rating: {
			stars: 4.5,
			count: 2334,
		},
		originalPrice: 129999,
		category: ["Smartphones", "Android"],
		discountedPercent: 25,
		isDiscounted: true,
	};
	const bestSelling_Trending = productsData.slice(0, 10);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="my-6 space-y-20">
			{/* Banner Section */}
			<div className="bg-secondary/50 w-full h-[500px] rounded-[var(--radius)] glass flex items-center overflow-hidden relative">
				{/* Text Section */}
				<div className="flex items-center flex-1 h-full">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							className="flex flex-col gap-3 ml-10"
							variants={textVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							{bannerData[currentSlide].dealType && (
								<div className="px-2 py-1 font-semibold rounded-lg bg-destructive w-fit">
									{bannerData[currentSlide].dealType}
								</div>
							)}
							<h3 className="text-5xl font-extrabold">
								{bannerData[currentSlide].dealTitle}
							</h3>
							{bannerData[currentSlide].startingFrom && (
								<div className="text-xl font-semibold text-yellow-500">
									Starting From{" "}
									{formatValueWithIndianNumericPrefix(
										bannerData[currentSlide].startingFrom,
										"price"
									)}
								</div>
							)}
							{bannerData[currentSlide].discount && (
								<div className="text-xl font-semibold text-yellow-500">
									Upto {bannerData[currentSlide].discount}%
									off
								</div>
							)}
							<Button className="w-[30%] py-6 font-bold rounded-full group">
								View Deals
								<MoveRight className="ml-3 transition-all duration-300 group-hover:translate-x-1" />
							</Button>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Image Section */}
				<div className="flex items-center justify-center flex-1 h-full">
					<AnimatePresence mode="wait">
						<motion.img
							key={currentSlide}
							src={bannerData[currentSlide].imageUrl}
							alt=""
							className="object-cover h-full w-fit"
							variants={imageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						/>
					</AnimatePresence>
				</div>

				{/* Navigation Dots */}
				<div className="absolute flex gap-2 -translate-x-1/2 bottom-2 left-1/2">
					{bannerData.map((_, index) => (
						<div
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-3 h-3 rounded-full ${
								index === currentSlide
									? "bg-primary"
									: "bg-primary-foreground opacity-50"
							} cursor-pointer`}
						></div>
					))}
				</div>
			</div>

			{/* Deal of the Day */}
			<div className="flex gap-3 -translate-y-14">
				<div className="flex-1 bg-secondary/50 w-full h-[350px] rounded-[var(--radius)] glass flex items-center justify-center flex-col border-4 border-primary">
					<div className="p-2 space-y-3 text-center">
						<h2 className="text-3xl font-bold">Deal of the Day</h2>
						<p className="text-muted-foreground">
							Grab your favorite deals before they&apos;re gone
						</p>

						{/* <div className="font-mono text-4xl">{timeLeft}</div> */}
					</div>
				</div>
				<Card className="flex-[2] flex gap-3 w-full h-[350px] rounded-[var(--radius)] overflow-hidden">
					<CardHeader className="flex items-center justify-center p-2">
						<Avatar className="w-[250px] h-[300px]" shape="square">
							<AvatarImage src={dealOfDay.image} />
						</Avatar>
					</CardHeader>
					<CardContent className="flex flex-col justify-between px-0 pt-6">
						<div>
							<h2 className="text-2xl font-bold">
								{dealOfDay.productName}
							</h2>
							<Rating
								rating={dealOfDay.rating.stars}
								counts={dealOfDay.rating.count}
							/>

							<div className="flex items-center gap-3 my-4">
								<h1 className="text-4xl">
									{dealOfDay.isDiscounted
										? formatDiscountPriceUsingPercent(
												dealOfDay.discountedPercent ??
													0,
												dealOfDay.originalPrice
										  )
										: formatValueWithIndianNumericPrefix(
												dealOfDay.originalPrice,
												"price"
										  )}
								</h1>
								{dealOfDay.isDiscounted && (
									<>
										<h3 className="text-2xl text-yellow-500 line-through">
											{formatValueWithIndianNumericPrefix(
												dealOfDay.originalPrice,
												"price"
											)}
										</h3>
										<span className="text-xl font-medium">
											{dealOfDay.discountedPercent}% off
										</span>
									</>
								)}
							</div>
						</div>
						<div className="flex items-center gap-6">
							<Button
								variant="outline"
								size="lg"
								className="h-12 py-5 text-2xl font-extrabold border-2"
							>
								Add To Cart
							</Button>
							<Button
								size="lg"
								className="h-12 py-5 text-2xl font-extrabold"
							>
								Buy Now
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Category Section */}
			<div>
				<h2 className="mb-3 text-3xl font-bold text-center">
					Search Using Categories
				</h2>
				<div className="grid grid-cols-5 gap-4">
					{categoriesData.map((category) => (
						<motion.div
							key={category.id}
							className="w-full h-[100px] border-border border rounded-[var(--radius)] flex items-center justify-center gap-4 cursor-pointer"
							whileHover={{
								scale: 1.1,
								borderColor: "hsl(var(--primary))",
							}}
							transition={{
								type: "tween",
								stiffness: 900,
								damping: 10,
							}}
						>
							<category.icon className="w-7 h-7" />
							<h2 className="text-2xl font-bold">
								{category.name}
							</h2>
						</motion.div>
					))}
				</div>
			</div>

			{/* Latest Product Section */}
			<div>
				<div>
					<h2 className="ml-2 text-3xl font-bold">
						Hot Off the Shelves
					</h2>
				</div>
				<div className="flex w-full gap-4 overflow-x-auto">
					{bestSelling_Trending.map((product) => (
						<ProductCard
							key={product.id}
							image={product.image}
							title={product.productName}
							price={product.originalPrice}
							className="w-[300px] flex-none"
						/>
					))}
				</div>
			</div>

			{/* Best Selling Product Section */}
			<div>
				<div>
					<h2 className="ml-2 text-3xl font-bold">Most Loved Tech</h2>
				</div>
				<div className="flex w-full gap-4 overflow-x-auto">
					{bestSelling_Trending.map((product) => (
						<ProductCard
							key={product.id}
							image={product.image}
							title={product.productName}
							price={product.originalPrice}
							className="w-[300px] flex-none"
						/>
					))}
				</div>
			</div>

			{/* Discounts Section */}
			<div className="grid grid-cols-4 gap-4">
				{discountsData.map((discount) => (
					<div
						key={discount.id}
						className={cn(
							"w-full rounded-xl h-[380px] relative",
							discount.mainStyle
						)}
						style={{
							background: `url(${discount.imageUrl}) center / cover no-repeat`,
						}}
					>
						<div
							className={cn(
								"absolute text-background w-full top-4 left-1 text-center",
								discount.infoStyle
							)}
						>
							{discount.type && (
								<div className="px-2 py-1 text-sm font-semibold rounded-md bg-destructive text-destructive-foreground w-fit">
									{discount.type}
								</div>
							)}
							<h2
								className={`
									${discount.id === 1 ? "text-4xl" : "text-xl"} font-extrabold`}
							>
								{discount.title}
							</h2>
							{discount?.description && (
								<p className="text-lg text-muted">
									{discount.description}
								</p>
							)}

							{discount.showPurchaseButton && (
								<Button
									className="mt-10 text-xl font-bold"
									size={"lg"}
								>
									Shop Now
								</Button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default Home;
