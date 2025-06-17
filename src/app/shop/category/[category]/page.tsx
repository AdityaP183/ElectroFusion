import { useUser } from "@clerk/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { query } from "../../../../../convex/_generated/server";
import { fetchQuery } from "convex/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { allProducts } from "@/lib/app-data";
import ProductCard from "@/components/modules/product-card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
	params: Promise<{ category: string }>;
	searchParams: SearchParams;
}

const querySchema = z.object({
	query: z.string().optional(),
	priceMin: z.coerce.number().optional(),
	priceMax: z.coerce.number().optional(),
	page: z.coerce.number().optional().default(1),
	limit: z.coerce.number().optional().default(10),
});

export default async function Page({ params, searchParams }: Props) {
	const { category } = await params;
	const query = querySchema.safeParse(await searchParams);

	return (
		<div className="w-full min-h-screen overflow-y-auto">
			<div className="grid grid-cols-5 gap-x-10 gap-y-20">
				{allProducts.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
