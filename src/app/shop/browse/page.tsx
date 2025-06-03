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

	return (
		<div>
			<div>
				<h1>Query:</h1>
				Browse Type: {query.data?.type ?? "null"}
				<br />
				Search Query: {query.data?.query ?? "null"}
				<br />
				Price Min: {query.data?.priceMin ?? "null"}
				<br />
				Price Max: {query.data?.priceMax ?? "null"}
				<br />
				Categories: {query.data?.categories?.join(", ") || "null"}
				<br />
				Page: {query.data?.page ?? "null"}
				<br />
				Limit: {query.data?.limit ?? "null"}
			</div>
		</div>
	);
}
