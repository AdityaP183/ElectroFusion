import { z } from "zod";

export const profileSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.optional()
		.transform((value) => {
			// Only retain the password if it meets length constraints, otherwise set it to ""
			return value && value.length >= 6 && value.length <= 50
				? value
				: "";
		}),
	first_name: z.string().min(2, "First name must be at least 2 characters"),
	last_name: z.string().min(2, "Last name must be at least 2 characters"),
	address: z.string().optional(),
	phone_number: z
		.string()
		.max(10, "Phone number cannot exceed 10 digits")
		.optional(),
	role: z.string(),
	avatar: z.string().optional(),
});

export const registerSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters"),
	lastName: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email(),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be at most 50 characters"),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be at most 50 characters"),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

export const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be at most 50 characters"),
	confirmPassword: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be at most 50 characters"),
});
