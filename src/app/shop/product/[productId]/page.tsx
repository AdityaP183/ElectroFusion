"use client";

import {
	Heart,
	Minus,
	Plus,
	RotateCcw,
	Shield,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WriteReview from "@/features/shop/components/write-review";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function ProductInfoPage() {
	const [quantity, setQuantity] = useState(1);
	const { productId } = useParams();

	const productDetails = useQuery(api.products.getProductById, {
		productSlug: productId as string,
	});

	const [isWishlisted, setIsWishlisted] = useState(
		productDetails?.isWishlisted || false
	);
	const [isInCart, setIsInCart] = useState(productDetails?.isInCart || false);

	const addToWishlist = useMutation(api.wishlist.addToWishlist);
	const addToCart = useMutation(api.cart.addToCart);
	const removeFromWishlist = useMutation(api.wishlist.removeFromWishlist);
	const removeFromCart = useMutation(api.cart.removeFromCart);

	const handleWishlistToggle = async () => {
		if (!isWishlisted) {
			setIsWishlisted(true);
			try {
				await addToWishlist({
					productId: productDetails?._id as Id<"products">,
				});
				toast.success("Product added to wishlist");
			} catch (err) {
				console.error("Failed to add to wishlist", err);
				setIsWishlisted(false);
			}
		} else {
			setIsWishlisted(false);
			try {
				await removeFromWishlist({
					productId: productDetails?._id as Id<"products">,
				});
				toast.success("Product removed from wishlist");
			} catch (err) {
				console.error("Failed to remove from wishlist", err);
				setIsWishlisted(true);
			}
		}
	};

	const handleCartToggle = async () => {
		const productId = productDetails?._id as Id<"products">;
		if (!productId) {
			toast.error("Invalid product");
			return;
		}

		if (!isInCart) {
			setIsInCart(true);
			try {
				await addToCart({ productId, quantity });
				toast.success("Product added to cart");
			} catch (err) {
				console.error("Failed to add to cart", err);
				setIsInCart(false);
				toast.error("Something went wrong while adding to cart");
			}
		} else {
			setIsInCart(false);
			try {
				await removeFromCart({ productId });
				toast.success("Product removed from cart");
			} catch (err) {
				console.error("Failed to remove from cart", err);
				setIsInCart(true);
				toast.error("Something went wrong while removing from cart");
			}
		}
	};

	useEffect(() => {
		if (productDetails && productDetails.isWishlisted) {
			setIsWishlisted(true);
		}
	}, [productDetails]);

	const product = productDetails;

	if (!product) return null;

	const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
		const count = product.reviews.filter((review) => {
			const roundedRating = Math.round(review.rating);
			return roundedRating === stars;
		}).length;
		const percentage =
			product.reviews.length > 0
				? (count / product.reviews.length) * 100
				: 0;
		return { stars, count, percentage: Math.round(percentage) };
	});

	if (productDetails === undefined) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="animate-pulse">
					<div className="grid lg:grid-cols-2 gap-8 mb-8">
						<div className="space-y-4">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="grid grid-cols-4 gap-2">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="aspect-square bg-gray-200 rounded-md"
									></div>
								))}
							</div>
						</div>
						<div className="space-y-6">
							<div className="h-8 bg-gray-200 rounded w-3/4"></div>
							<div className="h-6 bg-gray-200 rounded w-1/2"></div>
							<div className="h-10 bg-gray-200 rounded w-1/3"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (productDetails === null) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center py-12">
					<h1 className="text-2xl font-bold mb-4">
						Product Not Found
					</h1>
					<p className="text-muted-foreground">
						The product you&apos;re looking for doesn&apos;t exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-5 py-8">
			<div className="flex mb-8 gap-10">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="aspect-square relative overflow-hidden rounded-lg border w-[500px] h-[500px]">
						<Image
							src={product.image || "/placeholder.svg"}
							alt={product.name}
							fill
							className="object-cover"
						/>
						{product.isDiscountActive && (
							<Badge className="absolute top-4 left-4 bg-red-500">
								-{product.discountPercent}% OFF
							</Badge>
						)}
					</div>
				</div>

				{/* Product Details */}
				<div className="space-y-3">
					{/* Breadcrumb */}
					<div className="flex items-center space-x-2 text-sm text-muted-foreground">
						{product.categories.map((category, index: number) => (
							<span key={category.id}>
								<Badge variant="secondary">
									{category.name}
								</Badge>
								{index < product.categories.length - 1 && (
									<span className="mx-2">/</span>
								)}
							</span>
						))}
					</div>

					<div>
						<h1 className="text-3xl font-bold mb-2">
							{product.name}
						</h1>
						<div className="flex items-center space-x-4 mb-4">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-5 h-5 ${
											i <
											Math.floor(
												product.reviewStats
													.averageRating || 0
											)
												? "fill-yellow-400 text-yellow-400"
												: "text-muted-foreground"
										}`}
									/>
								))}
								<span className="ml-2 text-sm text-muted-foreground">
									{product.reviewStats.averageRating?.toFixed(
										1
									) || "0.0"}{" "}
									({product.reviewStats.totalReviews} reviews)
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								{product.purchaseCount || 0} sold
							</span>
						</div>
					</div>

					{/* Pricing */}
					<div className="space-y-2">
						<div className="flex items-center space-x-3">
							<span className="text-3xl font-bold text-primary">
								₹{product.currentPrice.toFixed(2)}
							</span>
							{product.isDiscountActive && (
								<span className="text-xl text-muted-foreground line-through">
									₹{product.originalPrice.toFixed(2)}
								</span>
							)}
						</div>
						{product.isDiscountActive && (
							<p className="text-sm text-green-600">
								You save ₹
								{(
									product.originalPrice - product.currentPrice
								).toFixed(2)}{" "}
								({product.discountPercent}% off)
							</p>
						)}
					</div>

					{/* Stock Status */}
					<div className="flex items-center space-x-2">
						<div
							className={`w-3 h-3 rounded-full ${
								product.stock > 0
									? "bg-green-500"
									: "bg-red-500"
							}`}
						/>
						<span
							className={`text-sm ${
								product.stock > 0
									? "text-green-600"
									: "text-red-600"
							}`}
						>
							{product.stock > 0
								? `${product.stock} in stock`
								: "Out of stock"}
						</span>
					</div>

					{/* Description */}
					<p className="text-muted-foreground leading-relaxed">
						{product.description}
					</p>

					{/* Quantity and Actions */}
					<div className="space-y-4">
						<div className="flex items-center space-x-4">
							<div className="flex items-center border rounded-md">
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										setQuantity(Math.max(1, quantity - 1))
									}
									disabled={quantity <= 1}
								>
									<Minus className="w-4 h-4" />
								</Button>
								<span className="px-4 py-2 min-w-[3rem] text-center">
									{quantity}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										setQuantity(
											Math.min(
												product.stock,
												quantity + 1
											)
										)
									}
									disabled={quantity >= product.stock}
								>
									<Plus className="w-4 h-4" />
								</Button>
							</div>
							<span className="text-sm text-muted-foreground">
								Max {product.stock} items
							</span>
						</div>

						<div className="flex space-x-3">
							<Button
								size="lg"
								className="w-[300px]"
								disabled={product.stock === 0}
								onClick={handleCartToggle}
								variant={isInCart ? "outline" : "default"}
							>
								{isInCart ? "Remove from Cart" : "Add to Cart"}
							</Button>

							<button
								onClick={handleWishlistToggle}
								className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
									isWishlisted
										? "border-red-500 bg-red-500/10"
										: "border-gray-600 hover:border-gray-500"
								}`}
							>
								<Heart
									className={`w-5 h-5 transition-colors ${
										isWishlisted
											? "fill-red-500 text-red-500"
											: "text-gray-400 hover:text-white"
									}`}
								/>
							</button>
						</div>
					</div>

					{/* Features */}
					<div className="w-fit grid grid-cols-3 gap-6 pt-4">
						<div className="flex items-center space-x-2 text-sm bg-secondary px-3 py-3 rounded-xl">
							<Truck className="w-5 h-5 text-muted-foreground" />
							<span>Free Shipping</span>
						</div>
						<div className="flex items-center space-x-2 text-sm bg-secondary px-3 py-3 rounded-xl">
							<Shield className="w-5 h-5 text-muted-foreground" />
							<span>2 Year Warranty</span>
						</div>
						<div className="flex items-center space-x-2 text-sm bg-secondary px-3 py-3 rounded-xl">
							<RotateCcw className="w-5 h-5 text-muted-foreground" />
							<span>30-Day Returns</span>
						</div>
					</div>
				</div>
			</div>

			{/* Vendor Information */}
			{product.vendor && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Sold by</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-4">
							<Avatar className="w-12 h-12">
								<AvatarImage
									src={
										product.vendor.shop.logo ||
										"/placeholder.svg"
									}
									alt={product.vendor.shop.name}
								/>
								<AvatarFallback>
									{product.vendor.shop.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<h3 className="font-semibold">
									{product.vendor.shop.name}
								</h3>
								<p className="text-sm text-muted-foreground">
									{product.vendor.shop.description}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									Contact: {product.vendor.contactEmail} |{" "}
									{product.vendor.contactPhone}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Reviews and Details Tabs */}
			<Tabs defaultValue="reviews" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="reviews">
						Reviews ({product.reviewStats.totalReviews})
					</TabsTrigger>
					<TabsTrigger value="details">Product Details</TabsTrigger>
					<TabsTrigger value="shipping">
						Shipping & Returns
					</TabsTrigger>
				</TabsList>

				<TabsContent value="reviews" className="space-y-6">
					{/* Rating Summary */}
					<Card>
						<CardHeader>
							<CardTitle>Customer Reviews</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="text-center">
									<div className="text-4xl font-bold mb-2">
										{product.reviewStats.averageRating?.toFixed(
											1
										) || "0.0"}
									</div>
									<div className="flex justify-center mb-2">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i <
													Math.floor(
														product.reviewStats
															.averageRating || 0
													)
														? "fill-yellow-400 text-yellow-400"
														: "text-muted-foreground"
												}`}
											/>
										))}
									</div>
									<p className="text-sm text-muted-foreground">
										Based on{" "}
										{product.reviewStats.totalReviews}{" "}
										reviews
									</p>
								</div>
								<div className="space-y-2">
									{ratingDistribution.map((rating) => (
										<div
											key={rating.stars}
											className="flex items-center space-x-2"
										>
											<span className="text-sm w-8">
												{rating.stars}★
											</span>
											<Progress
												value={rating.percentage}
												className="flex-1"
											/>
											<span className="text-sm text-muted-foreground w-8">
												{rating.count}
											</span>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="w-full flex gap-10">
						<WriteReview productId={product._id} />
						{/* Individual Reviews */}
						<div className="space-y-4 flex-1">
							{product.reviews.length > 0 ? (
								product.reviews.map((review) => (
									<Card key={review._id}>
										<CardContent className="pt-6">
											<div className="flex items-start space-x-4">
												<Avatar>
													<AvatarImage
														src={
															review.user
																?.imageUrl ||
															"/placeholder.svg"
														}
														alt={
															review.user
																? `${review.user.firstName} ${review.user.lastName}`
																: "User"
														}
													/>
													<AvatarFallback>
														{review.user
															? review.user.firstName.charAt(
																	0
															  )
															: "U"}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center space-x-2 mb-2">
														<h4 className="font-semibold">
															{review.user
																? `${review.user.firstName} ${review.user.lastName}`
																: "Anonymous"}
														</h4>
														<div className="flex">
															{[...Array(5)].map(
																(_, i) => (
																	<Star
																		key={i}
																		className={`w-4 h-4 ${
																			i <
																			review.rating
																				? "fill-yellow-400 text-yellow-400"
																				: "text-muted-foreground"
																		}`}
																	/>
																)
															)}
														</div>
														<span className="text-sm text-muted-foreground">
															{new Date(
																review._creationTime
															).toLocaleDateString()}
														</span>
													</div>
													<p className="text-muted-foreground mb-2">
														{review.comment}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))
							) : (
								<Card>
									<CardContent className="pt-6">
										<p className="text-center text-muted-foreground">
											No reviews yet. Be the first to
											review this product!
										</p>
									</CardContent>
								</Card>
							)}
						</div>{" "}
					</div>
				</TabsContent>

				<TabsContent value="details" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Product Specifications</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2">
										General
									</h4>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Product ID:
											</span>
											<span>{product._id}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												SKU:
											</span>
											<span>{product.slug}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Stock:
											</span>
											<span>{product.stock} units</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Active:
											</span>
											<span>
												{product.isActive
													? "Yes"
													: "No"}
											</span>
										</div>
									</div>
								</div>
								<div>
									<h4 className="font-semibold mb-2">
										Vendor Information
									</h4>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Store:
											</span>
											<span>
												{product.vendor?.shop.name ||
													"N/A"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Contact:
											</span>
											<span>
												{product.vendor?.contactEmail ||
													"N/A"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Phone:
											</span>
											<span>
												{product.vendor?.contactPhone ||
													"N/A"}
											</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="shipping" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Shipping Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h4 className="font-semibold mb-2">
									Delivery Options
								</h4>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span>
											Standard Shipping (5-7 business
											days):
										</span>
										<span className="font-semibold">
											Free
										</span>
									</div>
									<div className="flex justify-between">
										<span>
											Express Shipping (2-3 business
											days):
										</span>
										<span className="font-semibold">
											$9.99
										</span>
									</div>
									<div className="flex justify-between">
										<span>Next Day Delivery:</span>
										<span className="font-semibold">
											$19.99
										</span>
									</div>
								</div>
							</div>
							<Separator />
							<div>
								<h4 className="font-semibold mb-2">
									Return Policy
								</h4>
								<p className="text-sm text-muted-foreground">
									30-day return policy. Items must be in
									original condition with all packaging and
									accessories. Return shipping is free for
									defective items, otherwise customer pays
									return shipping costs.
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
