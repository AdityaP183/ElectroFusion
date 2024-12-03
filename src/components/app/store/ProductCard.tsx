import { Button } from "@/components/ui/button";
import { cn, formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { ProductCardType } from "@/types/component.type";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({
	image,
	title,
	price,
	isWishlist = false,
	className,
}: ProductCardType) => {
	const [isWishlisted, setIsWishlisted] = useState(isWishlist);

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
				<span className="absolute px-2 m-2 text-sm font-medium text-center rounded-full top-2 left-2 bg-primary text-secondary-foreground">
					39% OFF
				</span>
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
						<span className="text-xl font-bold text-secondary-foreground">
							{formatValueWithIndianNumericPrefix(price, "price")}
						</span>
						<span className="text-sm text-yellow-500 line-through">
							{formatValueWithIndianNumericPrefix(
								(price * 1.2).toFixed(2) as unknown as number,
								"price"
							)}
						</span>
					</p>
					<motion.button
						className="absolute text-2xl text-red-400 -translate-y-[40%] top-0 right-0"
						onClick={() => setIsWishlisted(!isWishlisted)}
						animate={{ scale: isWishlisted ? 1.2 : 1 }}
						transition={{
							type: "spring",
							stiffness: 1000,
							damping: 10,
						}}
					>
						{isWishlisted ? (
							<>
								<Heart className=" fill-red-400" />
							</>
						) : (
							<>
								<Heart />
							</>
						)}
					</motion.button>
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
