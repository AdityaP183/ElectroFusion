"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Heart, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";

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
	isInCart?: boolean;
	isFeatured: boolean;
	isWishlisted?: boolean;
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
	showWishlist?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	className,
	showWishlist = true,
}) => {
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [isInCart, setIsInCart] = useState(product?.isInCart || false);

	const primaryImage = product.image;
	const discountedPrice = product.isDiscounted
		? product.originalPrice * (1 - (product.discountPercent || 0) / 100)
		: product.originalPrice;

	const finalPrice = product.isDiscounted
		? discountedPrice
		: product.originalPrice;

	const addToWishlist = useMutation(api.wishlist.addToWishlist);
	const addToCart = useMutation(api.cart.addToCart);
	const removeFromWishlist = useMutation(api.wishlist.removeFromWishlist);
	const removeFromCart = useMutation(api.cart.removeFromCart);

	const handleWishlistToggle = async () => {
		if (!isWishlisted) {
			setIsWishlisted(true); // optimistic update
			try {
				await addToWishlist({
					productId: product._id as Id<"products">,
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
					productId: product._id as Id<"products">,
				});
				toast.success("Product removed from wishlist");
			} catch (err) {
				console.error("Failed to remove from wishlist", err);
				setIsWishlisted(true);
			}
		}
	};

	const handleCartToggle = async () => {
		const productId = product?._id as Id<"products">;
		if (!productId) {
			toast.error("Invalid product");
			return;
		}

		if (!isInCart) {
			setIsInCart(true);
			try {
				await addToCart({ productId, quantity: 1 });
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
		if (product && product.isWishlisted) {
			setIsWishlisted(true);
		}
	}, [product]);

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
						<Link
							href={`/shop/product/${product.slug}`}
							className="text-white"
						>
							{product.name}
						</Link>
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
							₹{finalPrice.toFixed(0)}
						</span>
						{product.isDiscounted && (
							<span className="text-lg text-gray-500 line-through">
								₹{product.originalPrice.toFixed(0)}
							</span>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
					{showWishlist && (
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
					)}

					{showWishlist === false && (
						<button
							onClick={handleWishlistToggle}
							className="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 border-red-500 bg-rose-500/40"
						>
							<Trash2 className="w-5 h-5 text-white" />
						</button>
					)}

					{product.stock <= 0 ? (
						<button
							disabled
							className="flex-1 h-10 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 bg-gray-700 text-gray-500 cursor-not-allowed"
						>
							Out of Stock
						</button>
					) : (
						<button
							className={`flex-1 h-10 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
								!isInCart
									? "bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02]"
									: "bg-transparent text-white border-white border"
							}`}
							onClick={handleCartToggle}
						>
							{isInCart ? (
								"Remove from Cart"
							) : (
								<>
									<Plus className="w-5 h-5" />
									Add to Cart
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
