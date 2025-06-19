"use client";

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Doc } from "../../../convex/_generated/dataModel";
import ProductCard from "./product-card";

interface Props {
	products: (Doc<"products"> & {
		categories: (
			| (Doc<"categories"> & {
					parent?: Doc<"categories"> | null;
			  })
			| null
		)[];
	})[];
}

export default function ProductsCarousel({ products }: Props) {
	if (!products || products.length === 0) return null;

	return (
		<div className="w-full">
			<Carousel
				opts={{ align: "start", slidesToScroll: 3 }}
				className="w-full group pr-1"
			>
				<CarouselContent className="ml-0 mr-0">
					{products.map((product) => (
						<div className="w-[300px] mx-5" key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</CarouselContent>
				<CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -left-10" />
				<CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -right-10" />
			</Carousel>
		</div>
	);
}
