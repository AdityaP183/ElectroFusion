import { LazyLoadingImage } from "@/components/app/common";
import { AddReview } from "@/components/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { addToCart } from "@/db/api-cart";
import { getProduct } from "@/db/api-product";
import { getProductReviews } from "@/db/api-reviews";
import { featuresOverview } from "@/lib/app-data";
import {
	formatDate,
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductInfo() {
	const { id } = useParams();
	const { user } = fusionStore();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProduct(id as string),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	const {
		data: reviewsData,
		isLoading: isLoadingReviews,
		isError: isErrorReviews,
		error: reviewsError,
		refetch,
	} = useQuery({
		queryKey: ["reviews", id],
		queryFn: () => getProductReviews(id as string),
		refetchOnWindowFocus: false,
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["add-product", data?.productName],
		mutationFn: () => addToCart(user?.id, data.id, 1),
		onSuccess: () => {
			toast.success("Added to Cart");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleBuyNow = () => {
		try {
			mutate();
			navigate("/store/cart");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col gap-5">
			{/* Error */}
			{isError && (
				<div className="flex items-center justify-center w-full h-[400px]">
					<Card className="border-red-600">
						<CardHeader>
							<CardTitle>Error</CardTitle>
						</CardHeader>
						<CardContent>{error && error.message}</CardContent>
					</Card>
				</div>
			)}

			<div className="flex w-[90%] mx-auto h-[400px] gap-5">
				{/* Product Image */}
				{isLoading ? (
					<Skeleton className="w-full h-full" />
				) : (
					data && (
						<div className="w-[350px] h-full border border-border relative overflow-hidden rounded-lg ">
							<div
								className={`w-full h-full mx-auto ${
									!data.productImage &&
									"flex items-center justify-center"
								}`}
							>
								{data.productImage ? (
									<LazyLoadingImage
										imgUrl={data.productImage}
									/>
								) : (
									<ImageOff className="w-1/3 h-1/3" />
								)}
							</div>
						</div>
					)
				)}

				{/* Product Details */}
				{isLoading ? (
					<Skeleton className="w-full h-full flex-[2]" />
				) : (
					data && (
						<div className="w-full h-full flex-[2] flex justify-between items-start flex-col space-y-2">
							<div>
								<h1 className="text-3xl font-bold">
									{data.productName}
								</h1>
								<Rating
									rating={
										data.rating
											? parseFloat(data.rating)
											: 0
									}
									counts={0}
								/>
							</div>

							<div className="flex items-center gap-3 my-4">
								<h1 className="text-4xl">
									{data.isDiscounted
										? formatDiscountedPriceUsingPercent(
												data.discountPercent ?? 0,
												data.originalPrice
										  )
										: formatValueWithIndianNumericPrefix(
												data.originalPrice,
												"price"
										  )}
								</h1>
								{data.isDiscounted && (
									<>
										<h3 className="text-2xl text-yellow-500 line-through">
											{formatValueWithIndianNumericPrefix(
												data.originalPrice,
												"price"
											)}
										</h3>
										<span className="text-xl font-medium">
											{data.discountPercent}% off
										</span>
									</>
								)}
							</div>

							{/* CTA Buttons */}
							<div className="flex items-center gap-6">
								<Button
									variant="outline"
									size="lg"
									className="h-12 py-5 text-2xl font-extrabold border-2"
									disabled={isPending}
									onClick={() => mutate()}
								>
									Add To Cart
								</Button>
								<Button
									size="lg"
									className="h-12 py-5 text-2xl font-extrabold"
									disabled={isPending}
									onClick={handleBuyNow}
								>
									Buy Now
								</Button>
							</div>

							{/* Features Overview */}
							<div className="w-[90%] grid grid-cols-4 gap-2 mt-6 my-2 place-content-end">
								{featuresOverview.map((item, index) => (
									<div
										key={`${item.title}-${index}`}
										className="flex items-center justify-center w-full border rounded-lg h-14 border-secondary-foreground/60 bg-secondary/60"
									>
										<div className="flex items-center gap-3">
											<item.icon className="w-6 h-6" />
											<h4 className="text-lg font-semibold">
												{item.title}
											</h4>
										</div>
									</div>
								))}
								<span className="col-span-4 row-start-2 italic">
									Warranty coverage and duration vary
									depending on the brand. Please refer to the
									product's specific warranty details or
									contact our support team for assistance.
								</span>
							</div>
						</div>
					)
				)}
			</div>

			{/* Product Description and Brief Details */}
			{isLoading ? (
				<Skeleton className="w-full h-[400px]" />
			) : (
				data && (
					<Card>
						<CardHeader>
							<CardTitle className="text-3xl">
								Product Details
							</CardTitle>
						</CardHeader>
						<CardContent className="text-justify">
							{data.description}
						</CardContent>
					</Card>
				)
			)}

			{/* Product Reviews */}
			<Card className="border-none">
				<CardHeader>
					<CardTitle className="text-3xl">Reviews</CardTitle>
					<Card className="flex flex-col gap-4 p-4 my-5 bg-secondary/20">
						<h3>Write a Review</h3>
						{data && (
							<AddReview productId={data.id} refetch={refetch} />
						)}
					</Card>
				</CardHeader>
				{isLoadingReviews ? (
					<Skeleton className="w-full h-[400px]" />
				) : isErrorReviews ? (
					<CardContent>
						<span className="text-red-500">
							{reviewsError.message}
						</span>
					</CardContent>
				) : (
					reviewsData && (
						<CardContent>
							<div className="w-[90%] mx-auto flex flex-col gap-10">
								{reviewsData.map((reviewItem) => (
									<>
										<div
											key={reviewItem.id}
											className="flex flex-col items-start gap-4"
										>
											<div className="flex items-center gap-3">
												<Avatar>
													<AvatarImage
														src={reviewItem.avatar}
													/>
													<AvatarFallback>
														{reviewItem.firstname
															? reviewItem
																	.firstname[0]
															: "A"}
													</AvatarFallback>
												</Avatar>
												<div>
													<h4 className="text-lg font-medium capitalize">
														{reviewItem.firstname}
													</h4>
													<span className="text-sm text-muted-foreground">
														{formatDate(
															reviewItem.reviewed_on,
															"date"
														)}
													</span>
												</div>
											</div>
											<div className="space-y-1">
												<Rating
													rating={reviewItem.rating}
													counts={0}
												/>
												<p>{reviewItem.review}</p>
											</div>
										</div>
										<Separator />
									</>
								))}
							</div>
						</CardContent>
					)
				)}
			</Card>
		</div>
	);
}
