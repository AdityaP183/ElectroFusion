import type { productSchema } from "@/db/schemas";
import { z } from "zod";

export type ProductSchema = z.infer<typeof productSchema> & {
	productImage?: File | string;
	createdBy: string;
	id?: string | number;
};

export type ProductCardType = {
	width?: number | string;
	height?: number | string;
	borderRadius?: number | string;
	id: string;
	image: string;
	title: string;
	description?: string;
	price: number;
	isWishlist?: boolean;
	isDiscounted?: boolean;
	discountedPercent?: number;
	className?: string;
};
