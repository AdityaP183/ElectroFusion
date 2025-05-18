import { z } from "zod";

export const priceSchema = z.string().refine(
	(val) => {
		if (val === "") return true;
		const num = Number(val);
		return !isNaN(num) && num >= 0;
	},
	{ message: "Price must be a positive number or zero" }
);
