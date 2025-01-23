import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/db/api-cart";
import useFetch from "@/hooks/use-fetch";
import { ProductSchema } from "@/lib/types/product-types";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartItem = ({
	productImage,
	productName,
	id,
	stock,
	originalPrice,
	refetch,
}: Partial<ProductSchema> & { refetch: () => void }) => {
	const navigate = useNavigate();

	const { loading, error, fn: removeItem } = useFetch(removeFromCart, id);

	const handleRemove = async () => {
		await removeItem();

		if (!loading && error) return toast.error(error.message);

		if (!loading && !error) {
			toast.success("Removed from cart");
			refetch();
		}
	};

	return (
		<div className="flex items-center w-full gap-4 p-4 rounded-md bg-secondary/50 glass">
			{productImage && productName && (
				<div className="h-full w-fit">
					<Avatar className="w-32 h-32" shape="square">
						<AvatarImage src={productImage as string} />
						<AvatarFallback>{productName[0]}</AvatarFallback>
					</Avatar>
				</div>
			)}
			<div className="w-full h-full flex-[3] flex flex-col">
				<div className="flex-[2] relative">
					<span className="text-xs uppercase text-muted-foreground">
						Order ID: {id}
					</span>
					<h1 className="text-2xl font-bold">{productName}</h1>
					<p className="text-sm text-muted-foreground">
						Stock: {stock}
					</p>

					<Button
						variant={"ghost"}
						size={"icon"}
						className="absolute top-0 right-0"
						onClick={handleRemove}
					>
						<X />
					</Button>
				</div>
				<div className="flex items-center justify-between flex-1 gap-2">
					<div className="flex items-end gap-6">
						<Button
							variant={"link"}
							className="p-0"
							onClick={() => navigate(`/store/product/${id}`)}
						>
							View Product
						</Button>
					</div>
					<p className="text-xl font-bold">
						{originalPrice
							? formatValueWithIndianNumericPrefix(
									originalPrice,
									"price"
							  )
							: 0}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
