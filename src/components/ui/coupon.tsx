import { Clipboard } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

const CouponDiscounts = {
	percent: [5, 10, 20],
	amount: [50, 100, 150, 200, 250],
};

export const Coupon = () => {
	return (
		<Card className="relative w-[350px] h-[150px] rounded-lg border-none glass bg-gradient-to-tr from-indigo-700/80 via-purple-700/80 to-pink-700/80">
			<div className="w-[80%] h-full mx-auto flex flex-col justify-center items-center gap-3">
				<div className="flex items-center gap-4">
					<img src="/phone.svg" alt="" className="w-20 h-20" />
					<div className="flex items-center gap-4 p-2 border border-white border-dashed rounded-md">
						<h3 className="text-2xl font-extrabold uppercase">
							GET40
						</h3>
						<Button
							variant="outline"
							size="icon"
							className="bg-secondary/70"
						>
							<Clipboard />
						</Button>
					</div>
				</div>
				<p className="text-center">Get 40% off on any mobile phone of any brand</p>
			</div>
			<div className="absolute left-0 w-12 h-12 -ml-6 transform -translate-y-1/2 rounded-full bg-background top-1/2"></div>
			<div className="absolute right-0 w-12 h-12 -mr-6 transform -translate-y-1/2 rounded-full bg-background top-1/2"></div>
		</Card>
	);
};
