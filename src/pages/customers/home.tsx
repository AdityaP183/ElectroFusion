import { ProductCard } from "@/components/app/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsPublic } from "@/db/api-product";
import { categories, homepageBannerData } from "@/lib/app-data";
import {
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Home() {
	const navigate = useNavigate();
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

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["home-products"],
		queryFn: () => getProductsPublic({ count: 5 }),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(
				(prevSlide) => (prevSlide + 1) % homepageBannerData.length
			);
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
							{homepageBannerData[currentSlide].dealType && (
								<div className="px-2 py-1 font-semibold rounded-lg bg-destructive w-fit">
									{homepageBannerData[currentSlide].dealType}
								</div>
							)}
							<h3 className="text-5xl font-extrabold">
								{homepageBannerData[currentSlide].dealTitle}
							</h3>
							{homepageBannerData[currentSlide].startingFrom && (
								<div className="text-xl font-semibold text-yellow-500">
									Starting From{" "}
									{formatValueWithIndianNumericPrefix(
										homepageBannerData[currentSlide]
											.startingFrom,
										"price"
									)}
								</div>
							)}
							{homepageBannerData[currentSlide].discount && (
								<div className="text-xl font-semibold text-yellow-500">
									Upto{" "}
									{homepageBannerData[currentSlide].discount}%
									off
								</div>
							)}
							<Button
								className="w-[30%] py-6 font-bold rounded-full group"
								onClick={() => navigate("/store/search")}
							>
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
							src={homepageBannerData[currentSlide].imageUrl}
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
					{homepageBannerData.map((_, index) => (
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
			<div className="flex gap-3">
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
										? formatDiscountedPriceUsingPercent(
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
										<h3 className="text-2xl text-gray-500 line-through">
											{formatValueWithIndianNumericPrefix(
												dealOfDay.originalPrice,
												"price"
											)}
										</h3>
										<span className="text-xl font-medium text-yellow-500">
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

			{/* Hot Products */}
			{isLoading ? (
				<Skeleton className="w-full h-[400px]" />
			) : isError ? (
				<div className="text-xl text-center text-red-600">
					<div className="text-xl text-center text-red-600">
						<p>
							Something went wrong while fetching orders. Please
							try again.
						</p>
						<p>
							{error instanceof Error
								? error.message
								: "Unknown error occurred"}
						</p>
					</div>
				</div>
			) : (
				data && (
					<div>
						<h2 className="mb-5 text-3xl font-bold text-center">
							Lastest Products
						</h2>
						<div className="grid grid-cols-5 gap-4">
							{data.map((product) => (
								<ProductCard
									key={product.id}
									id={product.id}
									image={product.productImage}
									title={product.productName}
									description={product.description}
									price={product.originalPrice}
									isDiscounted={product.isDiscounted}
									discountedPercent={product.discountPercent}
								/>
							))}
						</div>
					</div>
				)
			)}

			{/* Category Section */}
			<div>
				<h2 className="mb-5 text-3xl font-bold text-center">
					Search Using Categories
				</h2>
				<div className="grid grid-cols-5 gap-4">
					{categories.map((category) => (
						<motion.div
							key={category}
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
							onClick={() =>
								navigate(`/store/search?category=${category}`)
							}
						>
							<h2 className="text-2xl font-bold capitalize">
								{category}
							</h2>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
