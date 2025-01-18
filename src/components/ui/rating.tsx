const Rating = ({ rating, counts }: { rating: number; counts?: number }) => {
	const [numBeforeDecimal, numAfterDecimal] = String(rating).split(".");
	const fullStars = parseInt(numBeforeDecimal);
	const hasHalfStar = parseInt(numAfterDecimal) > 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="flex items-center">
			<div className="flex items-center gap-0.5">
				{Array.from({ length: fullStars }).map((_, index) => (
					<img
						key={`full-${index}`}
						src="/assets/full-star.svg"
						alt="full star"
						className="w-4 h-4"
					/>
				))}
				{hasHalfStar && (
					<img
						src="/assets/half-star.svg"
						alt="half star"
						className="w-4 h-4"
					/>
				)}
				{Array.from({ length: emptyStars }).map((_, index) => (
					<img
						key={`empty-${index}`}
						src="/assets/empty-star.svg"
						alt="empty star"
						className="w-4 h-4"
					/>
				))}
			</div>
			{counts !== 0 && (
				<>
					<span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
					<p className="font-medium text-gray-900 dark:text-white">
						{counts} reviews
					</p>
				</>
			)}
		</div>
	);
};

export default Rating;
