import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Smartphone,
	Tablet,
	Laptop,
	Monitor,
	Mouse,
	Cpu,
	Headphones,
	Computer,
} from "lucide-react";
import Link from "next/link";

const getCategoryIcon = (slug: string) => {
	const iconMap: Record<string, any> = {
		smartphones: Smartphone,
		"tablets-and-ereaders": Tablet,
		"laptops-and-computers": Laptop,
		desktops: Computer,
		monitors: Monitor,
		"computer-accessories": Mouse,
		"computer-components": Cpu,
		"headphones-and-earphones": Headphones,
	};
	return iconMap[slug] || Computer;
};

export default async function SearchByCategory() {
	const allCategories = await fetchQuery(api.categories.getOnlyParentCategory);

	return (
		<section className="w-full mx-auto py-12">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
					Search By Category
				</h2>
				<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
					Discover products across our carefully curated categories
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
				{allCategories.map((category) => (
					<CategoryCard key={category._id} category={category} />
				))}
			</div>
		</section>
	);
}

function CategoryCard({ category }: { category: any }) {
	const IconComponent = getCategoryIcon(category.slug);

	return (
		<Card className="group cursor-pointer border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
			<Link href={`/shop/category/${category.slug}`}>
				<CardContent className="px-3 py-5">
					<div className="flex flex-col items-center text-center space-y-4">
						<div className="p-2 rounded-full bg-muted group-hover:bg-foreground/5 transition-colors duration-300">
							<IconComponent className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
						</div>
						<h3 className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
							{category.name}
						</h3>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
