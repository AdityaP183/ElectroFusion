import { useState } from "react";
import { Star, Send, LoaderPinwheel } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export default function WriteReview({
	productId,
}: {
	productId: Id<"products">;
}) {
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const addReview = useMutation(api.review.createReview);

	const handleSubmit = async () => {
		if (rating === 0) return setError("Please select a rating");
		if (comment.trim().length < 10)
			return setError("Please write at least 10 characters");

		setIsSubmitting(true);
		setError("");

		try {
			await addReview({ productId, rating, comment });
			setRating(0);
			setComment("");
			toast.success("Review submitted successfully");
		} catch (err) {
			console.error("Failed to submit review", err);
			if (err instanceof Error) {
				const msg = err.message;
				if (msg.includes("already reviewed")) {
					setError(
						"You have already submitted a review for this product."
					);
					toast.error("You’ve already reviewed this product.");
				} else {
					setError("Failed to submit review. Please try again.");
					toast.error(
						msg || "Failed to submit review. Please try again."
					);
				}
			} else {
				setError("An unexpected error occurred.");
				toast.error("An unexpected error occurred.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleStarClick = (starRating: number) => {
		setRating(starRating);
	};

	const handleStarHover = (starRating: number) => {
		setHoveredRating(starRating);
	};

	const handleStarLeave = () => {
		setHoveredRating(0);
	};

	const displayRating = hoveredRating || rating;

	const getRatingText = (rating: number) => {
		switch (rating) {
			case 1:
				return "Poor";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Very Good";
			case 5:
				return "Excellent";
			default:
				return "Select a rating";
		}
	};

	return (
		<div className="bg-secondary/60 rounded-lg shadow-lg p-6 w-[500px] mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-bold">Write a Review</h2>
			</div>

			<div className="space-y-6">
				{/* Rating Section */}
				<div>
					<Label className="block text-sm font-medium mb-2">
						Your Rating
					</Label>
					<div className="flex items-center space-x-1 mb-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => handleStarClick(star)}
								onMouseEnter={() => handleStarHover(star)}
								onMouseLeave={handleStarLeave}
							>
								<Star
									size={28}
									className={`transition-colors ${
										star <= displayRating
											? "fill-yellow-400 text-yellow-400"
											: "text-gray-300"
									}`}
								/>
							</button>
						))}
					</div>
					<p className="text-sm text-muted-foreground">
						{getRatingText(displayRating)}
					</p>
				</div>

				{/* Comment Section */}
				<div>
					<Label
						htmlFor="comment"
						className="block text-sm font-medium mb-2"
					>
						Your Review
					</Label>
					<Textarea
						id="comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Tell others about your experience with this product..."
						rows={4}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
						disabled={isSubmitting}
					/>
					<div className="flex justify-between mt-1">
						<span className="text-xs text-gray-500">
							Minimum 10 characters
						</span>
						<span className="text-xs text-gray-500">
							{comment.length}/500
						</span>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
						{error}
					</div>
				)}

				{/* Submit Button */}
				<Button
					type="button"
					onClick={handleSubmit}
					disabled={
						isSubmitting ||
						rating === 0 ||
						comment.trim().length < 10
					}
				>
					{isSubmitting ? (
						<>
							<LoaderPinwheel
								size={16}
								className="animate-spin"
							/>
							<span>Submitting...</span>
						</>
					) : (
						<>
							<Send size={16} />
							<span>Submit Review</span>
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
