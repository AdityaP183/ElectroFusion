import { Coupon } from "@/components/ui/coupon";
import { couponsData } from "@/lib/app-data";
import { CouponT } from "@/types/component.type";
import { useMemo } from "react";

const Coupons = () => {
	const coupons: CouponT[] = useMemo(() => couponsData, []);

	console.log(coupons);
	return (
		<div className="p-2">
			<div className="grid grid-cols-3 gap-6">
				{coupons.map((coupon) => (
					<Coupon key={coupon.id} data={coupon} />
				))}
			</div>
		</div>
	);
};
export default Coupons;
