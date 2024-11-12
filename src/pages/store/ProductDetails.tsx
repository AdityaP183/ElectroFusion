import { LazyLoadingImage } from "@/components/app/common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { customerReviews, productData } from "@/lib/app-data";
import {
	formatDiscountPriceUsingPercent,
	formatISODate,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import {
	Bookmark,
	ImageOff,
	RotateCcw,
	Shield,
	Truck,
	Wallet,
} from "lucide-react";

const featuresOverview = [
	{ title: "Free Delivery", icon: Truck },
	{ title: "Easy Payments", icon: Wallet },
	{ title: "7 days return", icon: RotateCcw },
	{ title: "1 Year Warranty", icon: Shield },
];

const ProductDetails = () => {
	console.log(customerReviews);
	return (
		<div className="mx-auto w-[75vw] flex flex-col gap-5">
			<div className="flex w-[90%] mx-auto h-[400px] gap-5">
				{/* Product Image */}
				<div className="w-[350px] h-full border border-border relative overflow-hidden rounded-lg ">
					<div
						className={`w-full h-full mx-auto ${
							!productData.image &&
							"flex items-center justify-center"
						}`}
					>
						{productData.image ? (
							<LazyLoadingImage imgUrl={productData.image} />
						) : (
							<ImageOff className="w-1/3 h-1/3" />
						)}
					</div>
					<Button
						variant="link"
						size="icon"
						className="absolute rounded-full top-2 right-2 bg-secondary"
					>
						<Bookmark />
					</Button>
				</div>

				{/* Product Details */}
				<div className="w-full h-full flex-[2] flex justify-between items-start flex-col space-y-2">
					<div>
						<h1 className="text-3xl font-bold">
							{productData.productName}
						</h1>
						<Rating
							rating={productData.rating.stars}
							counts={productData.rating.count}
						/>
					</div>

					<div className="flex items-center gap-3 my-4">
						<h1 className="text-4xl">
							{productData.isDiscounted
								? formatDiscountPriceUsingPercent(
										productData.discountedPercent ?? 0,
										productData.originalPrice
								  )
								: formatValueWithIndianNumericPrefix(
										productData.originalPrice,
										"price"
								  )}
						</h1>
						{productData.isDiscounted && (
							<>
								<h3 className="text-2xl text-yellow-500 line-through">
									{formatValueWithIndianNumericPrefix(
										productData.originalPrice,
										"price"
									)}
								</h3>
								<span className="text-xl font-medium">
									{productData.discountedPercent}% off
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

					{/* Features Overview */}
					<div className="w-[90%] grid grid-cols-4 gap-2 mt-6 my-2 place-content-end">
						{featuresOverview.map((item) => (
							<div
								key={item.title}
								className="flex items-center justify-center w-full border rounded-lg h-14 border-secondary-foreground bg-secondary"
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
							Warranty coverage and duration vary depending on the
							brand. Please refer to the product's specific
							warranty details or contact our support team for
							assistance.
						</span>
					</div>
				</div>
			</div>

			{/* Product Description and Brief Details */}
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Product Details</CardTitle>
				</CardHeader>
				<CardContent className="text-justify">
					{productData.description}
				</CardContent>
			</Card>

			{/* Product Reviews */}
			<Card className="border-none">
				<CardHeader>
					<CardTitle className="text-3xl">Reviews</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="w-[90%] mx-auto flex flex-col gap-10">
						{customerReviews.map((reviewItem) => (
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
												{reviewItem.customer_name[0]}
											</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="text-lg font-medium capitalize">
												{reviewItem.customer_name}
											</h4>
											<span className="text-sm text-muted-foreground">
												{formatISODate(reviewItem.date)}
											</span>
										</div>
									</div>
									<div className="space-y-1">
										<Rating rating={reviewItem.rating} />
										<p>{reviewItem.review}</p>
									</div>
								</div>
								<Separator />
							</>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default ProductDetails;
