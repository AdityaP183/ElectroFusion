import { Button } from "@/components/ui/button";
import { ProductCardType } from "@/lib/types/product-types";
import {
	cn,
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";

const ProductCard = ({
	image,
	title,
	price,
	isDiscounted = false,
	discountedPercent = 0,
	className,
}: ProductCardType) => {
	return (
		<div
			className={cn(
				"relative flex flex-col w-full max-w-xs m-4 overflow-hidden border rounded-lg shadow-md border-border bg-secondary/50 glass",
				className
			)}
		>
			<a
				className="flex mx-3 mt-3 overflow-hidden text-center bg-white h-60 rounded-xl"
				href="#"
			>
				<img
					className="object-cover mx-auto"
					src={image}
					alt="product image"
				/>
				{isDiscounted && (
					<span className="absolute px-2 m-2 text-sm font-medium text-center rounded-full top-2 left-2 bg-primary text-secondary-foreground">
						{discountedPercent}% OFF
					</span>
				)}
			</a>
			<div className="px-3 pb-3 mt-4">
				<a href="#">
					<h5
						className="text-xl tracking-tight truncate text-secondary-foreground"
						title={title}
					>
						{title}
					</h5>
				</a>
				<div className="relative flex items-center justify-between mt-2 mb-5">
					<p className="flex items-center gap-1">
						{isDiscounted ? (
							<>
								<span className="text-xl font-bold text-secondary-foreground">
									{formatDiscountedPriceUsingPercent(
										discountedPercent,
										price
									)}
								</span>
								<span className="text-sm text-yellow-500 line-through">
									{formatValueWithIndianNumericPrefix(
										price,
										"price"
									)}
								</span>
							</>
						) : (
							<span className="text-xl font-bold text-secondary-foreground">
								{formatValueWithIndianNumericPrefix(
									price,
									"price"
								)}
							</span>
						)}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant={"outline"} className="flex-1 py-1">
						Add to cart
					</Button>
					<Button className="flex-1 text-xl font-bold">
						Buy Now
					</Button>
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
