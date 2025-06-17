import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function textToSlug(text: string) {
	return text
		.split(" ")
		.map((word) => word.toLowerCase())
		.join("-");
}

export function slugToText(slug: string) {
	return slug
		.replace(/-/g, " ")
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export const formatValueWithIndianNumericPrefix = (
	num: number | null | undefined,
	prefix: "value" | "price" = "value"
): string => {
	if (!num) {
		return "";
	}
	const [integerPart, decimalPart] = num.toString().split(".");

	const prefixVal = prefix === "price" ? "₹" : "";

	if (integerPart.length <= 3) {
		return `${prefixVal}${integerPart}${
			decimalPart ? "." + decimalPart : ""
		}`;
	}

	if (integerPart.length <= 5) {
		return `${prefixVal}${integerPart.slice(0, -3)},${integerPart.slice(
			-3
		)}${decimalPart ? "." + decimalPart : ""}`;
	}

	const lastThree = integerPart.slice(-3);
	const otherNumbers = integerPart.slice(0, -3);
	const formattedNumber =
		otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;

	return `${prefixVal}${formattedNumber}${
		decimalPart ? "." + decimalPart : ""
	}`;
};
