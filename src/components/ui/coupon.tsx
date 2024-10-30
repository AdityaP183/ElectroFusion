import { CouponT } from "@/types/component.type";
import { Card } from "./card";
import { TooltipWrapper } from "./tooltip";

export const Coupon = ({ data }: { data: CouponT }) => {
	const formattedDate = new Date(data.expire_date).toLocaleDateString(
		"en-US",
		{
			year: "2-digit",
			month: "2-digit",
			day: "2-digit",
		}
	);
	return (
		<Card className="relative w-full h-[170px] rounded-lg border-none glass bg-gradient-to-tr from-secondary/90 via-primary/20 to-secondary/80 shadow-lg">
			<div className="w-[80%] h-full mx-auto flex justify-between items-center gap-3">
				<div>
					<h2 className="text-2xl">{data.discount}% OFF</h2>
					<h4>Category: {data.category}</h4>
					<p>{data.description}</p>
				</div>
				<div className="flex flex-col gap-1">
					<TooltipWrapper
						trigger={
							<h1 className="text-4xl font-bold cursor-pointer text-emerald-400">
								{data.code}
							</h1>
						}
						content={<p>Click to copy</p>}
						className="bg-green-500"
						arrowClassName="fill-green-500"
					/>
					<p className="opacity-60">Expires: {formattedDate}</p>
				</div>
			</div>
			<div className="absolute left-0 w-12 h-12 -ml-6 transform -translate-y-1/2 rounded-full bg-background top-1/2"></div>
			<div className="absolute right-0 w-12 h-12 -mr-6 transform -translate-y-1/2 rounded-full bg-background top-1/2"></div>
		</Card>
	);
};
