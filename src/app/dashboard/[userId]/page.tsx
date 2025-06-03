interface Params {
    params: Promise<{ userId: string }>;
}

export default async function Dashboard({ params }: Params) {
    const { userId } = await params;
	return <div>User: {userId}</div>;
}
