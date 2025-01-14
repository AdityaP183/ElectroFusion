import { LazyLoadingImage } from "@/components/app/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getProduct, updateProduct } from "@/db/api-product";
import { editProductSchema } from "@/db/schemas";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data,
		loading: fetchLoading,
		error: fetchError,
		fn: fetchProduct,
	} = useFetch(getProduct, id);

	const productForm = useForm<z.infer<typeof editProductSchema>>({
		resolver: zodResolver(editProductSchema),
		defaultValues: {
			productName: "",
			description: "",
			originalPrice: 0,
			isDiscounted: false,
			discountPercent: 0,
			stock: 0,
		},
	});

	useEffect(() => {
		fetchProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data) {
			productForm.reset({
				productName: data.productName || "",
				description: data.description || "",
				originalPrice: data.originalPrice || 0,
				isDiscounted: data.isDiscounted || false,
				discountPercent: data.discountPercent || 0,
				stock: data.stock || 0,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const onFormSubmit = async () => {
		const formData = productForm.getValues();

		const changedFields = Object.keys(formData).reduce((acc, key) => {
			const dataKey = key as keyof typeof formData;
			if (formData[dataKey] !== data[dataKey]) {
				acc[key] = formData[dataKey];
			}
			return acc;
		}, {} as Record<string, unknown>);

		if (Object.keys(changedFields).length === 0) return;

		try {
			const response = await updateProduct({ id, data: changedFields });
			toast.success(response.message);
			navigate("/vendor/products");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			console.log(error);
		}
	};

	if (fetchLoading) return <Skeleton className="w-full h-full p-10" />;

	if (fetchError)
		return (
			<div className="flex items-center justify-center w-full h-full text-xl text-red-500">
				{fetchError.message}
			</div>
		);

	if (!data)
		return (
			<div className="text-xl text-red-500">Product data not found</div>
		);

	return (
		<Card className="border-none">
			<CardHeader>
				<Button
					className="w-fit"
					onClick={() => navigate("/vendor/products")}
				>
					<ArrowLeft />
					Back to products
				</Button>
				<br />
				<CardTitle className="text-3xl">Edit Product: {id}</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center gap-4">
				<div className="relative w-[350px] h-[350px] rounded-lg border-[3px] border-primary border-dashed p-2 group">
					<LazyLoadingImage
						imgUrl={data.productImage}
						className="rounded-lg"
					/>
				</div>
				<Form {...productForm}>
					<form
						onSubmit={productForm.handleSubmit(
							onFormSubmit,
							(e) => {
								console.log(e);
							}
						)}
						className="grid grid-cols-2 gap-4"
					>
						<FormField
							control={productForm.control}
							name="productName"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={productForm.control}
							name="description"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={6}
											onChange={(e) =>
												field.onChange(e.target.value)
											}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={productForm.control}
							name="originalPrice"
							render={({ field }) => (
								<FormItem className="col-span-1">
									<FormLabel>Original Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
											min={50}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={productForm.control}
							name="stock"
							render={({ field }) => (
								<FormItem className="col-span-1">
									<FormLabel>Stock</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											min={1}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={productForm.control}
							name="isDiscounted"
							render={({ field }) => (
								<FormItem className="flex items-center col-span-1 gap-4 space-y-0">
									<FormLabel>Is Discounted</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={productForm.control}
							name="discountPercent"
							render={({ field }) => (
								<FormItem className="col-span-1">
									<FormLabel>Discount Percent</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={
												productForm.getValues()
													.isDiscounted === false
											}
											{...field}
											min={0}
											max={70}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Update Product</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
