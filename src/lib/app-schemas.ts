import { z } from "zod";

export const priceSchema = z.string().refine(
	(val) => {
		if (val === "") return true;
		const num = Number(val);
		return !isNaN(num) && num >= 0;
	},
	{ message: "Price must be a positive number or zero" }
);

export const vendorShopSchema = z.object({
	vendorId: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string(),
	bannerImage: z.string().url(),
	logo: z.string().url(),
});
