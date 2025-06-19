"use client";

import { Badge } from "@/components/ui/badge";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Product = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	originalPrice: number;
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

type ProductCardProps = {
	product: Product;
	className?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
	const [isWishlisted, setIsWishlisted] = useState(false);

	const primaryImage = product.image;
	const discountedPrice = product.isDiscounted
		? product.originalPrice * (1 - (product.discountPercent || 0) / 100)
		: product.originalPrice;

	const finalPrice = product.isDiscounted
		? discountedPrice
		: product.originalPrice;

	const handleWishlistToggle = () => setIsWishlisted(!isWishlisted);

	return (
		<div
			className={cn(
				"relative w-[300px] bg-transparent rounded-2xl shadow-2xl",
				className
			)}
		>
			{/* Image Section */}
			<div className="relative aspect-square overflow-hidden rounded-md">
				<Image
					fill
					src={primaryImage || "/fallback.png"}
					alt={product?.slug || "Product image"}
					className="w-full h-full object-cover"
				/>
				{/* Low stock */}
				{product.stock > 0 && product.stock <= 5 && (
					<div className="absolute top-1 left-1 bg-black/80 px-2 py-1 rounded-full flex items-center">
						<p className="text-xs text-orange-400">
							Only {product.stock} left in stock
						</p>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className="py-2 px-0.5 space-y-4">
				{/* Name & Categories */}
				<div className="space-y-1">
					<h3
						className="text-lg font-semibold text-white truncate"
						title={product.name}
					>
						{product.name}
					</h3>
					<div className="flex flex-wrap gap-1">
						{product.categories?.length ? (
							product.categories.map((cat) => (
								<Badge
									key={cat?._id}
									variant="outline"
									className="text-xs"
								>
									{cat?.name}
								</Badge>
							))
						) : (
							<Badge variant="secondary" className="text-xs">
								No Category
							</Badge>
						)}
					</div>
				</div>

				{/* Price */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-bold text-white">
							${finalPrice.toFixed(0)}
						</span>
						{product.isDiscounted && (
							<span className="text-lg text-gray-500 line-through">
								${product.originalPrice.toFixed(0)}
							</span>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
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

					<button
						disabled={product.stock === 0}
						className={`flex-1 h-10 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
							product.stock > 0
								? "bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02]"
								: "bg-gray-700 text-gray-500 cursor-not-allowed"
						}`}
					>
						<Plus className="w-5 h-5" />
						{product.stock > 0 ? "Add to Cart" : "Out of Stock"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
