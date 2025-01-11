import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/app/common";
import { productSchema } from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import fusionStore from "@/stores/userStore";
import { categories } from "@/lib/app-data";
import useFetch from "@/hooks/use-fetch";
import { createProduct } from "@/db/api-product";
import toast from "react-hot-toast";

export default function AddProduct() {
	const { user } = fusionStore();
	const [file, setFile] = useState<{
		imgFile: File;
		img: string;
		name: string;
	} | null>(null);
	const productForm = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			productName: "",
			description: "",
			originalPrice: 0,
			isDiscounted: false,
			discountPercent: 0,
			stock: 0,
			categories: [],
		},
	});

	const formData = {
		data: {
			...productForm.getValues(),
			productImage: file?.imgFile,
			createdBy: user?.id || "",
		},
		imgName: file?.name,
	};
	const { data, loading, error, fn } = useFetch(createProduct, formData);

	const onFormSubmit = async () => {
		await fn();

		if (error) {
			toast.error(error.message);
			return;
		}

		if (!loading && !error) {
			toast.success("Product added successfully");
			console.log(data);
		}
	};

	return (
		<Card className="w-full my-3 border-none">
			<CardHeader>
				<CardTitle className="text-3xl font-extrabold">
					Add New Product
				</CardTitle>
				<CardDescription className="text-lg font-medium">
					Easily list your products on ElectroFusion and reach a wide
					customer base! Keep your inventory up-to-date and showcase
					your offerings to millions of potential buyers. Manage your
					listings seamlessly and grow your business with
					ElectroFusion!
				</CardDescription>
			</CardHeader>

			<CardContent className="flex justify-center gap-4">
				<ImageUpload file={file} setFile={setFile} />
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
										<Textarea {...field} onChange={(e) => field.onChange(e.target.value)} value={field.value}/>
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
											min={5}
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
						<FormField
							control={productForm.control}
							name="categories"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Product Categories</FormLabel>
									<MultiSelector
										onValuesChange={field.onChange}
										values={field.value}
									>
										<MultiSelectorTrigger>
											<MultiSelectorInput placeholder="Select your categories" />
										</MultiSelectorTrigger>
										<MultiSelectorContent>
											<MultiSelectorList>
												{categories.map((category) => (
													<MultiSelectorItem
														key={category}
														value={category}
													>
														{category}
													</MultiSelectorItem>
												))}
											</MultiSelectorList>
										</MultiSelectorContent>
									</MultiSelector>
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={loading}>
							{loading ? "Adding..." : "Add Product"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
