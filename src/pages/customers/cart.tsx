import CartItem from "@/components/app/store/cart-item";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const data = [
	{
		id: 11,
		created_at: "2025-01-12T13:33:59.113538+00:00",
		productName: "Fujifilm Instax Mini 12 Instant Camera-Blue",
		rating: "3.2",
		originalPrice: 9599,
		isDiscounted: false,
		discountPercent: 0,
		stock: 5,
		description:
			" If you are looking for an instant camera to capture your favourite moments, then this Fujifilm Instax Mini 12 is ideal for you. It comes with a pull-out selfie lens so that you can click beautiful selfies and great close-up shots. Moreover, you can capture and print your pictures on high-quality mini-films that are as big as a credit card. Furthermore, you can customize the shutter button to suit your style. ",
		productImage:
			"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/ilYvVNEDWN9blp78RKI7_61erc7ly+ZL._SX679_",
		categories: ["Cameras"],
		createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
	},
	{
		id: 10,
		created_at: "2025-01-12T13:14:49.797002+00:00",
		productName:
			"JBL Quantum 910 Wireless Over Ear Gaming Headset with Mic and ANC",
		rating: "3.8",
		originalPrice: 24500,
		isDiscounted: true,
		discountPercent: 12,
		stock: 12,
		description:
			"Get the professional edge with JBL QuantumSPHERE 360 on PC. This 3D-audio positioning, powered by JBL QuantumENGINE and head-tracking technology, provides next-gen accuracy and a fixed, independent soundscape for improved gaming instincts. Also equipped with DTS Headphone X: v2.0\nGet the competitive advantage with JBL QuantumSPATIAL 360 on consoles. Utilize integrated head-tracking technology for extra accuracy and acoustic presence, giving you the edge to win the game\nExperience epic gaming with JBL QuantumSOUND Signature. From footsteps to explosions, our Hi-Res certified 50mm neodymium drivers create an immersive and competitive advantage with a realistic soundscape designed by JBL audiologists ",
		productImage:
			"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/lrO0eZTmSb5wBAwGZKuA_8a3f0367e54b904dc61e890339fc8a89",
		categories: ["Headphones"],
		createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
	},
];

const Cart = () => {
	const GST_RATE = import.meta.env.VITE_GST_RATE;
	const navigate = useNavigate();
	const ordersInCart = useMemo(() => data.slice(0, 4), []);
	const totalPrice = useMemo(
		() =>
			parseFloat(
				ordersInCart
					.reduce((acc, order) => acc + order.originalPrice, 0)
					.toFixed(2)
			),
		[ordersInCart]
	);
	const totalDiscount = 3000;

	console.log(ordersInCart);
	return (
		<div className="my-6 min-h-[70vh]">
			<h1 className="text-3xl font-medium">Your Cart</h1>
			<p className="text-muted-foreground">
				You have {ordersInCart.length} items in your cart
			</p>

			<div className="flex justify-between gap-6 m-5">
				<div className="flex-[2] flex flex-col items-end gap-4">
					{ordersInCart.map((order) => (
						<CartItem key={order.id} data={order} />
					))}
				</div>
				<Card className="flex-1 bg-secondary h-fit">
					<CardHeader>
						<CardTitle className="text-2xl">
							Order Summary
						</CardTitle>
						<CardDescription className="text-green-500">
							You saved{" "}
							{formatValueWithIndianNumericPrefix(
								totalDiscount,
								"price"
							)}{" "}
							in total
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<h4 className="font-semibold">Subtotal</h4>
							<p>
								{formatValueWithIndianNumericPrefix(
									totalPrice,
									"price"
								)}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">Shipping</h4>
							<p>
								{formatValueWithIndianNumericPrefix(0, "price")}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">Discount</h4>
							<p className="text-green-500">
								{formatValueWithIndianNumericPrefix(
									totalDiscount,
									"price"
								)}
							</p>
						</div>
						<div className="flex justify-between">
							<h4 className="font-semibold">GST ({GST_RATE}%)</h4>
							<p>
								{formatValueWithIndianNumericPrefix(
									parseFloat(
										(
											totalPrice *
											(Number(GST_RATE) / 100)
										).toFixed(2)
									),
									"price"
								)}
							</p>
						</div>

						<div className="mt-3 border border-t border-dashed border-muted-foreground" />

						<div className="flex justify-between">
							<h4 className="font-extrabold">Total</h4>
							<p className="font-extrabold">
								{formatValueWithIndianNumericPrefix(
									totalPrice,
									"price"
								)}
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full font-semibold"
							onClick={() => navigate("/checkout")}
						>
							Proceed to Checkout
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};
export default Cart;
