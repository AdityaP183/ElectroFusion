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

export const addProductSchema = z
	.object({
		name: z.string().min(1),
		slug: z.string().min(1),
		description: z.string().min(1),
		originalPrice: z.string(),
		isDiscounted: z.boolean(),
		discountPercent: z.string().optional(),
		discountStartDate: z.string().optional(),
		discountEndDate: z.string().optional(),
		stock: z.string(),
		image: z.string(),
		isActive: z.boolean(),
		isFeatured: z.boolean(),
		shopId: z.string().min(1),
		categoryIds: z.array(z.string()).min(1),
	})
	.refine(
		(data) => {
			if (data.isDiscounted) {
				const discountNum = data.discountPercent
					? parseInt(data.discountPercent, 10)
					: 0;
				return (
					data.discountPercent !== undefined &&
					data.discountPercent !== "" &&
					!isNaN(discountNum) &&
					discountNum >= 10 &&
					discountNum <= 60 &&
					data.discountStartDate !== undefined &&
					data.discountEndDate !== undefined &&
					data.discountStartDate < data.discountEndDate
				);
			}
			return true;
		},
		{
			message:
				"When product is discounted, discount percentage and valid date range are required",
		}
	);

export const vendorApplicationFormSchema = z.object({
	contactPhone: z
		.string()
		.regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
	contactEmail: z
		.string()
		.min(5)
		.email("Please enter a valid email address")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
			"Invalid email format"
		),
	reason: z
		.string()
		.min(20, "Please provide a more detailed reason (min. 20 characters)"),
});
