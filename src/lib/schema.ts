import { z } from "zod";

export const profileSchema = z.object({
	username: z
		.string()
		.min(5, "Username must be at least 5 characters")
		.max(20, "Username must be at most 20 characters"),
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
