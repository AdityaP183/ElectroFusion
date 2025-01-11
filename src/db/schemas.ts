import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
	.object({
		fullName: z.string().min(3, "Name must be at least 3 characters"),
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z
			.string()
			.min(6, "Password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const productSchema = z.object({
	productName: z
		.string()
		.min(3, "Product name must be at least 3 characters"),
	description: z.string().min(3, "Description must be at least 3 characters"),
	originalPrice: z.number().min(1, "Price cannot be less than 1"),
	isDiscounted: z.boolean(),
	discountPercent: z
		.number()
		.min(1, "Discount percent cannot be less than 1"),
	stock: z.number().min(1, "Stock cannot be less than 1"),
	categories: z.array(
		z.string().min(3, "Category must be at least 3 characters")
	),
});

export const updateUserSchema = z.object({
	firstName: z.string().min(3, "First Name must be at least 3 characters"),
	lastName: z.string().min(3, "Last Name must be at least 3 characters"),
});
