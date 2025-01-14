import { LazyLoadingImage } from "@/components/app/common";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getProduct } from "@/db/api-product";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageProduct() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isError, error, isLoading } = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProduct(id as string),
		staleTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
	});

	const Field = ({ label, value }: { label: string; value: string }) => (
		<div className="w-[350px]">
			<Label>{label}</Label>
			{label === "Description" ? (
				<Textarea value={value} readOnly rows={6} />
			) : (
				<Input value={value} readOnly />
			)}
		</div>
	);

	return (
		<Card className="space-y-2 border-none">
			{isLoading ? (
				<Skeleton className="h-[100px]" />
			) : (
				<CardHeader>
					<Button
						className="w-fit"
						onClick={() => navigate("/admin/products")}
					>
						<ArrowLeft />
						Back to products
					</Button>
					<br />
					<CardTitle className="text-3xl">
						Product: {data && data.id}
					</CardTitle>
				</CardHeader>
			)}

			{isLoading ? (
				<Skeleton className="h-[400px]" />
			) : isError ? (
				<div className="text-xl text-center text-red-600">
					<div className="text-xl text-center text-red-600">
						<p>
							Something went wrong while fetching orders. Please
							try again.
						</p>
						<p>
							{error instanceof Error
								? error.message
								: "Unknown error occurred"}
						</p>
					</div>
				</div>
			) : (
				<CardContent className="flex w-1/2 gap-4 mx-auto">
					{/* Product Image */}
					<div className="relative w-[350px] h-[350px] rounded-lg border-[3px] border-primary border-dashed p-2 group">
						<LazyLoadingImage
							imgUrl={data.productImage}
							className="rounded-lg"
						/>
					</div>

					{/* Reusable Fields */}
					<div className="flex flex-col gap-4">
						<Field label="Product Name" value={data.productName} />
						<Field label="Description" value={data.description} />
						<Field
							label="Original Price"
							value={`₹${data.originalPrice}`}
						/>
						<Field label="Stock" value={data.stock} />
						<Field
							label="Categories"
							value={data.categories.join(", ")}
						/>
						<Field
							label="Created At"
							value={formatDate(data.created_at, "time")}
						/>
					</div>
				</CardContent>
			)}
		</Card>
	);
}
