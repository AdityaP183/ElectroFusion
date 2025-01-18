import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProductReview } from "@/db/api-reviews";
import fusionStore from "@/stores/userStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddReview({
	productId,
	refetch,
}: {
	productId: number;
	refetch: () => void;
}) {
	const [addReview, setAddReview] = useState({
		review: "",
		rating: 0,
	});
	const [loading, setLoading] = useState(false);
	const { user } = fusionStore();

	const handleAddReview = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		try {
			await addProductReview({
				product_id: productId,
				user_id: user?.id,
				rating: addReview.rating,
				review: addReview.review,
			});
			toast.success("Review added successfully");
			setAddReview({ review: "", rating: 0 });
			refetch();
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleAddReview}>
			<div className="flex items-center gap-4">
				<div className="flex-[2] my-4 space-y-2">
					<Label htmlFor="add-review">Add a review</Label>
					<Textarea
						id="add-review"
						value={addReview.review}
						onChange={(e) =>
							setAddReview({
								...addReview,
								review: e.target.value,
							})
						}
					/>
				</div>
				<div className="flex-1 my-4 space-y-2">
					<Label htmlFor="add-rating">Add a rating</Label>
					<Input
						id="add-rating"
						value={addReview.rating}
						type="number"
						min={1}
						max={5}
						step={0.1}
						onChange={(e) =>
							setAddReview({
								...addReview,
								rating: parseFloat(e.target.value) || 0,
							})
						}
					/>
				</div>
			</div>
			<Button
				type="submit"
				disabled={!addReview.review || !addReview.rating || loading}
			>
				Submit
			</Button>
		</form>
	);
}
