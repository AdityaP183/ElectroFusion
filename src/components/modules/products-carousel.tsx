"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductsCarousel() {
	return (
		<div className="w-full">
			<Carousel
				opts={{ align: "start", slidesToScroll: 3 }}
				className="w-full group"
			>
				<CarouselContent className="-ml-10">
					{Array.from({ length: 8 }).map((_, index) => (
						<CarouselItem key={index} className="pl-10 basis-auto">
							<div className="w-[250px] h-[250px]">
								<Card className="h-full">
									<CardContent className="flex aspect-square items-center justify-center p-6 h-full">
										<span className="text-3xl font-semibold">
											Product {index + 1}
										</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -left-10" />
				<CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -right-10" />
			</Carousel>
		</div>
	);
}
