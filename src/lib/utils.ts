import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toastOptions = {
	duration: 2000,
	style: {
		background: "hsl(var(--secondary))",
		color: "hsl(var(--secondary-foreground))",
	},
	success: {
		style: {
			border: "2px solid hsl(var(--success))",
		},
		iconTheme: {
			primary: "hsl(var(--success))",
			secondary: "hsl(var(--success-foreground))",
		},
	},
	error: {
		style: {
			border: "2px solid #ff4b4b",
		},
	},
};

export const generateRandomString = () => {
	let result = "";
	const length = 20;
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
};

export const formatValueWithIndianNumericPrefix = (
	num: number,
	prefix: "value" | "price" = "value"
): string => {
	// Convert the number to a string and split into integer and decimal parts
	const [integerPart, decimalPart] = num.toString().split(".");

	const prefixVal = prefix === "price" ? "₹" : "";

	// Handle numbers less than 1,000 (no formatting needed for integer part)
	if (integerPart.length <= 3) {
		return `${prefixVal}${integerPart}${
			decimalPart ? "." + decimalPart : ""
		}`;
	}

	// For numbers between 1,000 and 99,999 (Thousands and Ten Thousands)
	if (integerPart.length <= 5) {
		return `${prefixVal}${integerPart.slice(0, -3)},${integerPart.slice(
			-3
		)}${decimalPart ? "." + decimalPart : ""}`;
	}

	// For numbers larger than 1,00,000 (Lakhs and Crores)
	const lastThree = integerPart.slice(-3);
	const otherNumbers = integerPart.slice(0, -3);
	const formattedNumber =
		otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;

	return `${prefixVal}${formattedNumber}${
		decimalPart ? "." + decimalPart : ""
	}`;
};

export const formatDiscountedPriceUsingPercent = (
	discountPercent: number,
	originalPrice: number
) => {
	const discountedPrice =
		originalPrice - originalPrice * (discountPercent / 100);
	return formatValueWithIndianNumericPrefix(discountedPrice, "price");
};
