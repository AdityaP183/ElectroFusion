import { useUser } from "@clerk/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { query } from "../../../../../convex/_generated/server";
import { fetchQuery } from "convex/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

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
		<div>
			<div>
				<h1>Params:</h1>
				Category: {category}
			</div>

			<div>
				<h1>Query:</h1>
				Search Query: {query.data?.query ?? "null"}
				<br />
				Price Min: {query.data?.priceMin ?? "null"}
				<br />
				Price Max: {query.data?.priceMax ?? "null"}
				<br />
				Page: {query.data?.page ?? "null"}
				<br />
				Limit: {query.data?.limit ?? "null"}
			</div>
		</div>
	);
}
