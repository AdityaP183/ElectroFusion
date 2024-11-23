import { ChartConfig, DashboardDuration } from "@/types/component.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isValidDuration = (value: string): value is DashboardDuration => {
	return ["half-day", "week", "month", "year"].includes(value);
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

export const formatDiscountPriceUsingPercent = (
	discountPercent: number,
	originalPrice: number
) => {
	const discountedPrice =
		originalPrice - originalPrice * (discountPercent / 100);
	return formatValueWithIndianNumericPrefix(discountedPrice, "price");
};

export const getChartConfig = (names: string[]): ChartConfig => {
	// Check if the number of names exceeds 5
	if (names.length > 5) {
		throw new Error("The function cannot take more than 5 names.");
	}

	// Define the colors corresponding to each chart
	const colors: string[] = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
	];

	// Create the chart configuration object
	const chartConfig: ChartConfig = {};

	// Loop through the names and populate the chartConfig
	names.forEach((name, index) => {
		chartConfig[name.toLowerCase()] = {
			label: name,
			color: colors[index],
		};
	});

	return chartConfig;
};

export function formatISODate(
	isoDate: Date | string,
	type: "date" | "datetime" = "date"
) {
	const date = new Date(isoDate);

	const day = date.getDate().toString().padStart(2, "0"); // Two digits
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Two digits
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0"); // Two digits
	const ampm = hours >= 12 ? "pm" : "am";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	return type === "date"
		? date.toLocaleString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
		  })
		: `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

export const toastOptions = {
	duration: 3000,
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

export const generateRoundedPriceRanges = (maxValue: number) => {
	const ranges = [];
	const steps = [
		100, 500, 1000, 5000, 10000, 50000, 100000, 150000, 200000, 250000,
	];
	let start = 0;

	for (const step of steps) {
		if (start >= maxValue) break;

		let end = start + step;
		if (end > maxValue) end = Math.ceil(maxValue / 10) * 10;
		end = Math.round(end / 100) * 100;
		ranges.push([start, end]);
		start = end + 1;
	}

	return ranges;
};