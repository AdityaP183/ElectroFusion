"use client";

import { api } from "../../../../convex/_generated/api";
import ProductCard from "@/components/modules/product-card";
import Link from "next/link";
import { useQuery } from "convex/react";

export default function WishlistsPage() {
	const allWishlistItems = useQuery(api.wishlist.getAllWishlistProducts);

	return (
		<div className="w-[calc(100%-10rem)] mx-auto">
			<div>
				<h1 className="text-3xl font-bold my-5">My Wishlists</h1>
			</div>
			{!allWishlistItems && (
				<div>
					<h2>No Items in wishlist</h2>
					<Link href="/shop">Add Items</Link>
				</div>
			)}
			<div className="grid grid-cols-5 gap-6">
				{allWishlistItems &&
					allWishlistItems.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							showWishlist={false}
						/>
					))}
			</div>
		</div>
	);
}
