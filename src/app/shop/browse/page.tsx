import ProductCard from "@/components/modules/product-card";
import { allProducts } from "@/lib/app-data";
import { z } from "zod";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
	params: Promise<{ category: string }>;
	searchParams: SearchParams;
}

const querySchema = z.object({
	type: z.string().optional(),
	query: z.string().optional(),
	priceMin: z.coerce.number().optional(),
	priceMax: z.coerce.number().optional(),
	categories: z.array(z.string()).optional(),
	page: z.coerce.number().optional().default(1),
	limit: z.coerce.number().optional().default(10),
});

export default async function Page({ params, searchParams }: Props) {
	const query = querySchema.safeParse(await searchParams);

    console.log(query, params);
	return (
		<div className="w-full min-h-screen overflow-y-auto">
			<div className="grid grid-cols-5 gap-x-10 gap-y-20">
				{/* {allProducts.map((product) => (
					<ProductCard key={product._id} product={product} />
				))} */}
				<ProductCard product={allProducts[0]} />
			</div>
		</div>
	);
}
