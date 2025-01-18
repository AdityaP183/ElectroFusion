import { dbTable, supabase } from "./config";

async function getProductReviews(productId: string) {
	const { data, error } = await supabase
		.from("reviews_with_users")
		.select("*")
		.eq("product_id", productId);
	if (error) throw new Error(error.message);
	return data;
}

async function addProductReview({
	product_id,
	user_id,
	rating,
	review,
}: {
	product_id: number;
	user_id: string | undefined;
	rating: number;
	review: string;
}) {
	if (!user_id) throw new Error("User ID is required.");
	if (!rating || !review) throw new Error("Rating and review are required.");

	const { error } = await supabase
		.from(dbTable.reviews)
		.insert({ product_id, user_id, rating, review });

	if (error) throw new Error(error.message);
}

export { getProductReviews, addProductReview };
