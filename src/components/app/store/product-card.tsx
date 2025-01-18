import { Button } from "@/components/ui/button";
import { addToCart } from "@/db/api-cart";
import { ProductCardType } from "@/lib/types/product-types";
import {
	cn,
	formatDiscountedPriceUsingPercent,
	formatValueWithIndianNumericPrefix,
} from "@/lib/utils";
import fusionStore from "@/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({
	id,
	image,
	title,
	price,
	isDiscounted = false,
	discountedPercent = 0,
	className,
}: ProductCardType) => {
	const navigate = useNavigate();
	const { user } = fusionStore();
	const { isPending, mutate } = useMutation({
		mutationKey: ["add-product", title],
		mutationFn: () => addToCart(user?.id, id, 1),
		onSuccess: () => {
			toast.success("Added to Cart");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleBuyNow = async () => {
		try {
			await mutate();
			navigate("/store/cart");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={cn(
				"relative flex flex-col w-full h-fit max-w-xs m-4 overflow-hidden border rounded-lg shadow-md border-border bg-secondary/50 glass",
				className
			)}
		>
			<Link
				className="flex mx-3 mt-3 overflow-hidden text-center bg-white h-60 rounded-xl"
				to={`/store/product/${id}`}
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
			</Link>
			<div className="px-3 pb-3 mt-4">
				<Link to={`/store/product/${id}`}>
					<h5
						className="text-xl tracking-tight truncate text-secondary-foreground"
						title={title}
					>
						{title}
					</h5>
				</Link>
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
					<Button
						variant={"outline"}
						className="flex-1 py-1"
						disabled={isPending}
						onClick={() => mutate()}
					>
						Add to cart
					</Button>
					<Button
						className="flex-1 text-xl font-bold"
						disabled={isPending}
						onClick={handleBuyNow}
					>
						Buy Now
					</Button>
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
