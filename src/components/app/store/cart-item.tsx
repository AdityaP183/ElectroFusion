import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/lib/types/product-types";
import { formatValueWithIndianNumericPrefix } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({ data }: { data: ProductSchema }) => {
	const [selectedAmount, setSelectedAmount] = useState(1);
	const navigate = useNavigate();
	return (
		<div className="flex items-center w-full gap-4 p-4 rounded-md bg-secondary/50 glass">
			<div className="h-full w-fit">
				<Avatar className="w-32 h-32" shape="square">
					<AvatarImage src={data.productImage as string} />
					<AvatarFallback>{data.productName[0]}</AvatarFallback>
				</Avatar>
			</div>
			<div className="w-full h-full flex-[3] flex flex-col">
				<div className="flex-[2] relative">
					<span className="text-xs uppercase text-muted-foreground">
						{data.id}
					</span>
					<h1 className="text-2xl font-bold">{data.productName}</h1>
					<p className="text-sm text-muted-foreground">
						Stock: {data.stock}
					</p>

					<Button
						variant={"ghost"}
						size={"icon"}
						className="absolute top-0 right-0"
					>
						<X />
					</Button>
				</div>
				<div className="flex items-center justify-between flex-1 gap-2">
					<div className="flex items-end gap-6">
						<Button
							variant={"link"}
							className="p-0"
							onClick={() => navigate(`/products/${data.id}`)}
						>
							View Product
						</Button>
						<div className="flex items-center gap-2 px-2 border rounded-xl border-primary/30 w-fit">
							<Button
								size={"sm"}
								variant={"secondary"}
								onClick={() =>
									setSelectedAmount((prev) =>
										Math.max(prev - 1, 1)
									)
								}
								disabled={
									selectedAmount <= 1 || data.stock <= 0
								}
							>
								<svg
									className="shrink-0 size-3.5"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14"></path>
								</svg>
							</Button>
							<Input
								transparent={true}
								className="w-6 p-0 text-center border-none outline-none"
								value={selectedAmount}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									if (!isNaN(value)) {
										setSelectedAmount(
											Math.min(
												Math.max(value, 1),
												data.stock
											)
										);
									}
								}}
							/>
							<Button
								size={"sm"}
								variant={"secondary"}
								onClick={() =>
									setSelectedAmount((prev) =>
										Math.min(prev + 1, data.stock)
									)
								}
								disabled={
									data.stock <= selectedAmount ||
									data.stock <= 0
								}
							>
								<svg
									className="shrink-0 size-3.5"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14"></path>
									<path d="M12 5v14"></path>
								</svg>
							</Button>
						</div>
					</div>
					<p className="text-xl font-bold">
						{formatValueWithIndianNumericPrefix(
							data.originalPrice * selectedAmount,
							"price"
						)}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
