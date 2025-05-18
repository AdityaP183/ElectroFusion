"use client";

import { Input } from "@/components/ui/input";
import { priceSchema } from "@/lib/app-schemas";
import { useEffect } from "react";

interface Props {
	priceMin: string;
	priceMax: string;
	setPriceMin: React.Dispatch<React.SetStateAction<string>>;
	setPriceMax: React.Dispatch<React.SetStateAction<string>>;
}

export default function PriceRange({
	priceMin,
	priceMax,
	setPriceMin,
	setPriceMax,
}: Props) {
	useEffect(() => {
		if (priceMin === undefined) {
			setPriceMin("");
		}
		if (priceMax === undefined) {
			setPriceMax("");
		}
	}, []);

	const handleCorrectPriceChange = (
		value: string,
		setter: React.Dispatch<React.SetStateAction<string>>
	) => {
		const sanitizedValue = value.replace(/[^0-9.]/g, "");

		const parts = sanitizedValue.split(".");
		const formattedValue =
			parts.length > 1
				? `${parts[0]}.${parts.slice(1).join("")}`
				: sanitizedValue;

		const result = priceSchema.safeParse(formattedValue);

		if (result.success) {
			setter(formattedValue);
		} else {
			setter("");
		}
	};

	return (
		<div className="px-2">
			<h2 className="font-semibold mb-1">Price</h2>
			<div className="space-y-2">
				<div className="flex items-center gap-1 justify-between">
					Min:
					<div className="relative">
						<Input
							className="peer ps-6"
							placeholder="0.00"
							value={priceMin}
							onChange={(e) =>
								handleCorrectPriceChange(
									e.target.value,
									setPriceMin
								)
							}
						/>
						<span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
							₹
						</span>
					</div>
				</div>
				<div className="flex items-center gap-1 justify-between">
					Max:
					<div className="relative">
						<Input
							className="peer ps-6"
							placeholder="0.00"
							value={priceMax}
							onChange={(e) =>
								handleCorrectPriceChange(
									e.target.value,
									setPriceMax
								)
							}
						/>
						<span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
							₹
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
