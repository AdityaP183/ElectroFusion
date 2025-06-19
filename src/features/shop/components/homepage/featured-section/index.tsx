"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import {
	ChevronLeft,
	ChevronRight,
	Heart,
	MoveRight,
	Package,
	Pause,
	Play,
	ShoppingCart,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import FeaturesLoading, { ErrorState } from "./features-loading";
import Image from "next/image";
import { Doc } from "../../../../../../convex/_generated/dataModel";

type Product = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	originalPrice: number;
	discountedPrice?: number;
	isDiscounted: boolean;
	discountPercent?: number;
	discountStartDate?: string;
	discountEndDate?: string;
	stock: number;
	image: string;
	isActive: boolean;
	isFeatured: boolean;
	viewCount?: number;
	purchaseCount?: number;
	shopId: string;
	categoryIds: string[];
	categories: (
		| (Doc<"categories"> & {
				parent?: Doc<"categories"> | null;
		  })
		| null
	)[];
};

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
		scale: 0.95,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
		scale: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
		scale: 0.95,
	}),
};

const textVariants = {
	initial: { opacity: 0, y: 30, scale: 0.95 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		y: -30,
		scale: 0.95,
		transition: { duration: 0.4 },
	},
};

const imageVariants = {
	initial: { opacity: 0, scale: 0.8, rotate: -5 },
	animate: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: {
			duration: 0.7,
			type: "spring",
			stiffness: 80,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		rotate: 5,
		transition: { duration: 0.4 },
	},
};

interface FeaturedSectionProps {
	products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [imageError, setImageError] = useState<Record<string, boolean>>({});

	const currentProduct = useMemo(() => {
		if (!products?.length) return null;
		return products[currentSlide];
	}, [products, currentSlide]);

	const primaryImage = useMemo(() => {
		if (!currentProduct?.image) return null;
		return currentProduct.image;
	}, [currentProduct]);

	const paginate = useCallback(
		(newDirection: number) => {
			if (!products?.length) return;

			setDirection(newDirection);
			setCurrentSlide((prevSlide) => {
				if (newDirection === 1) {
					return prevSlide === products.length - 1
						? 0
						: prevSlide + 1;
				} else {
					return prevSlide === 0
						? products.length - 1
						: prevSlide - 1;
				}
			});
		},
		[products]
	);

	useEffect(() => {
		if (!products?.length || products.length <= 1 || isPaused) return;

		const interval = setInterval(() => {
			paginate(1);
		}, 6000);

		return () => clearInterval(interval);
	}, [products, isPaused, currentSlide, paginate]);

	const goToSlide = useCallback(
		(index: number) => {
			if (!products?.length || index === currentSlide) return;

			setDirection(index > currentSlide ? 1 : -1);
			setCurrentSlide(index);
		},
		[currentSlide, products]
	);

	const handleImageError = useCallback((productId: string) => {
		setImageError((prev) => ({ ...prev, [productId]: true }));
	}, []);

	// Error state
	if (products === undefined) {
		return <FeaturesLoading />;
	}

	if (products === null) {
		return <ErrorState />;
	}

	if (products.length === 0 || !currentProduct) {
		return null;
	}

	return (
		<div className="mx-4 md:mx-0 mb-8">
			<Card className="w-full h-[400px] md:h-[500px] overflow-hidden group">
				<CardContent className="p-0 h-full relative">
					<AnimatePresence
						initial={false}
						custom={direction}
						mode="wait"
					>
						<motion.div
							key={currentSlide}
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: {
									type: "spring",
									stiffness: 300,
									damping: 30,
								},
								opacity: { duration: 0.2 },
							}}
							className="absolute inset-0 flex flex-col md:flex-row items-center"
						>
							{/* Text Section */}
							<div className="flex-1 p-6 md:p-10 space-y-4 md:space-y-6">
								<motion.div
									variants={textVariants}
									className="space-y-4"
								>
									{/* Product Name */}
									<h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
										{currentProduct.name}
									</h3>

									{/* Categories */}
									{currentProduct.categories?.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{currentProduct.categories &&
												currentProduct.categories
													.length > 0 &&
												currentProduct.categories
													.slice(0, 3)
													.map((category) => {
														if (category)
															return (
																<Badge
																	key={
																		category._id
																	}
																	variant="secondary"
																	className="text-xs"
																>
																	{
																		category.name
																	}
																</Badge>
															);
													})}
											{currentProduct.categories.length >
												3 && (
												<Badge
													variant="outline"
													className="text-xs"
												>
													+
													{currentProduct.categories
														.length - 3}{" "}
													more
												</Badge>
											)}
										</div>
									)}

									{/* Description */}
									<p className="text-sm md:text-base text-muted-foreground line-clamp-2 max-w-md">
										{currentProduct.description}
									</p>

									{/* Pricing */}
									<div className="space-y-2">
										<div className="flex items-baseline gap-3 flex-wrap">
											<span className="text-2xl md:text-3xl font-bold text-green-600">
												{formatValueWithIndianNumericPrefix(
													currentProduct.discountedPrice,
													"price"
												)}
											</span>

											{currentProduct.isDiscounted && (
												<>
													<span className="text-lg md:text-xl text-muted-foreground line-through">
														{formatValueWithIndianNumericPrefix(
															currentProduct.originalPrice,
															"price"
														)}
													</span>
													<Badge className="bg-red-500 hover:bg-red-600">
														{
															currentProduct.discountPercent
														}
														% OFF
													</Badge>
												</>
											)}
										</div>
									</div>

									{/* Stats */}
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<ShoppingCart className="h-4 w-4" />
											<span>
												{formatValueWithIndianNumericPrefix(
													currentProduct.purchaseCount,
													"value"
												)}{" "}
												sold
											</span>
										</div>
									</div>

									{/* Stock Status */}
									<div className="flex items-center gap-2">
										{currentProduct.stock > 0 ? (
											<Badge
												variant="outline"
												className="text-green-600 border-green-600"
											>
												✓ In Stock (
												{currentProduct.stock}{" "}
												available)
											</Badge>
										) : (
											<Badge variant="destructive">
												✗ Out of Stock
											</Badge>
										)}
									</div>

									{/* Action Buttons */}
									<div className="flex gap-3 pt-2">
										<Button
											className="flex-1 md:flex-none md:px-8 py-6 font-bold rounded-full group transition-all duration-300 hover:scale-105"
											disabled={
												currentProduct.stock === 0
											}
										>
											{currentProduct.stock > 0
												? "View Deal"
												: "Notify Me"}
											<MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Button>

										<Button
											variant="outline"
											size="icon"
											className="h-12 w-12 rounded-full hover:scale-105 transition-all duration-300"
										>
											<Heart className="h-4 w-4" />
										</Button>
									</div>
								</motion.div>
							</div>

							{/* Image Section */}
							<div className="flex-1 p-4 md:p-6 flex items-center justify-center">
								<motion.div
									variants={imageVariants}
									className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3]"
								>
									{!imageError[currentProduct._id] &&
									primaryImage ? (
										<div className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
											<Image
												src={primaryImage}
												alt={currentProduct.name}
												className="object-contain w-full h-full"
												onError={() =>
													handleImageError(
														currentProduct._id
													)
												}
												width={600}
												height={600}
												loading="lazy"
											/>
										</div>
									) : (
										<div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
											<Package className="h-16 w-16 text-muted-foreground" />
										</div>
									)}
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation Controls */}
					{products.length > 1 && (
						<>
							{/* Previous/Next Buttons */}
							<Button
								variant="ghost"
								size="icon"
								className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background/80"
								onClick={() => paginate(-1)}
							>
								<ChevronLeft className="h-6 w-6" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background/80"
								onClick={() => paginate(1)}
							>
								<ChevronRight className="h-6 w-6" />
							</Button>

							{/* Pause/Play Button */}
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background/80"
								onClick={() => setIsPaused(!isPaused)}
							>
								{isPaused ? (
									<Play className="h-4 w-4" />
								) : (
									<Pause className="h-4 w-4" />
								)}
							</Button>

							{/* Navigation Dots */}
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
								{products.map((_, index) => (
									<Button
										key={index}
										size="sm"
										className={`w-2 h-2 p-0 rounded-full transition-all duration-300 ${
											index === currentSlide
												? "bg-primary scale-125"
												: "bg-primary/30 hover:bg-primary/50"
										}`}
										onClick={() => goToSlide(index)}
									/>
								))}
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
