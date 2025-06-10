import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

interface Params {
	params: Promise<{ userId: string }>;
}

export default async function Dashboard({ params }: Params) {
	const { userId } = await params;
	const user = await fetchQuery(api.users.getUser, { userId });

	return (
		<div>
			User: {userId} <br /> DB: {JSON.stringify(user)}
		</div>
	);
}
