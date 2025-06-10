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
