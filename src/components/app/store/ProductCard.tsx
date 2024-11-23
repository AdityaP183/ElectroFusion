import { Button } from "@/components/ui/button";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { ProductCardType } from "@/types/component.type";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({
	image,
	title,
	price,
	isWishlist = false,
}: ProductCardType) => {
	const [isWishlisted, setIsWishlisted] = useState(isWishlist);

	return (
		<div className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden border rounded-lg shadow-md border-border bg-secondary/50 glass">
			<a
				className="relative flex mx-3 mt-3 overflow-hidden text-center bg-white h-60 rounded-xl"
				href="#"
			>
				<img
					className="object-cover mx-auto"
					src={image}
					alt="product image"
				/>
				<span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center rounded-full bg-secondary text-secondary-foreground">
					39% OFF
				</span>
			</a>
			<div className="relative px-5 pb-3 mt-4">
				<motion.button
					className="absolute top-0 pr-2 text-2xl text-red-400 right-2"
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
				<a href="#">
					<h5 className="text-xl tracking-tight text-secondary-foreground">
						{title}
					</h5>
				</a>
				<div className="flex items-center justify-between mt-2 mb-5">
					<p className="flex items-center gap-1">
						<span className="text-3xl font-bold text-secondary-foreground">
							{formatValueWithIndianNumericPrefix(price, "price")}
						</span>
						<span className="text-sm text-yellow-500 line-through">
							{formatValueWithIndianNumericPrefix(
								(price * 1.2).toFixed(2) as unknown as number,
								"price"
							)}
						</span>
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
