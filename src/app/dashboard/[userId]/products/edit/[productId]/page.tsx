"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DateDurationPicker from "@/components/ui/date-duration-picker";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CategorySelector from "@/features/shop/components/category-filters/category-selector";
import { updateProductSchema } from "@/lib/app-schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";

interface Props {
	params:
		| {
				productId: string;
		  }
		| Promise<{
				productId: string;
		  }>;
}

export default function EditProduct({ params }: Props) {
	const resolvedParams = params instanceof Promise ? use(params) : params;
	const { productId } = resolvedParams;
	const { user } = useUser();
	const router = useRouter();

	const getProduct = useQuery(api.vendorProducts.getProductById, {
		productId: productId as Id<"products">,
	});
	const editProduct = useMutation(api.vendorProducts.updateProduct);

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [categories, setCategories] = useState<string[] | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof updateProductSchema>>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			name: "",
			slug: "",
			description: "",
			originalPrice: "",
			discountPercent: "",
			stock: "",
			isDiscounted: false,
			isActive: false,
			categoryIds: [],
			discountStartDate: "",
			discountEndDate: "",
		},
	});

	const { watch, setValue, reset, clearErrors } = form;
	const name = watch("name");
	const isDiscounted = watch("isDiscounted");

	const generateSlug = useCallback((name: string) => {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
	}, []);

	useEffect(() => {
		if (getProduct) {
			const validCategories = (getProduct.categories || []).filter(
				(cat): cat is NonNullable<typeof cat> => cat !== null
			);

			reset({
				name: getProduct.name || "",
				slug: getProduct.slug || "",
				description: getProduct.description || "",
				originalPrice: getProduct.originalPrice?.toString() || "",
				discountPercent: getProduct.discountPercent?.toString() || "",
				stock: getProduct.stock?.toString() || "",
				isDiscounted: getProduct.isDiscounted || false,
				isActive: getProduct.isActive || false,
				categoryIds: validCategories.map((cat) => cat._id),
			});

			setCategories(validCategories.map((cat) => cat._id));
		}
	}, [getProduct, reset]);

	useEffect(() => {
		if (name) {
			const slug = generateSlug(name);
			setValue("slug", slug);
		}
	}, [name, generateSlug, setValue]);

	useEffect(() => {
		if (!isDiscounted) {
			setValue("discountPercent", "");
			setValue("discountStartDate", undefined);
			setValue("discountEndDate", undefined);
			setStartDate(null);
			setEndDate(null);
			clearErrors([
				"discountPercent",
				"discountStartDate",
				"discountEndDate",
			]);
		}
	}, [isDiscounted, setValue, clearErrors]);

	useEffect(() => {
		if (isDiscounted && startDate) {
			setValue("discountStartDate", `${startDate.getTime()}`);
		}
	}, [startDate, isDiscounted, setValue]);

	useEffect(() => {
		if (isDiscounted && endDate) {
			setValue("discountEndDate", `${endDate.getTime()}`);
		}
	}, [endDate, isDiscounted, setValue]);

	useEffect(() => {
		if (categories && categories.length > 0) {
			setValue("categoryIds", categories);
		}
	}, [categories, setValue]);

	const onSubmitHandler = async (
		values: z.infer<typeof updateProductSchema>
	) => {
		const originalPrice = parseFloat(values.originalPrice);
		const stock = parseInt(values.stock, 10);
		const discountPercent = values.discountPercent
			? parseInt(values.discountPercent, 10)
			: 0;

		if (isNaN(originalPrice) || originalPrice <= 0) {
			toast.error("Please enter a valid original price.");
			return;
		}
		if (isNaN(stock) || stock < 0) {
			toast.error("Please enter a valid stock quantity.");
			return;
		}
		if (
			values.isDiscounted &&
			(isNaN(discountPercent) ||
				discountPercent < 10 ||
				discountPercent > 60)
		) {
			toast.error("Please enter a valid discount percentage (10-60%).");
			return;
		}

		if (!values.categoryIds || values.categoryIds.length === 0) {
			toast.error("Please select at least one category.");
			return;
		}

		setIsSubmitting(true);

		try {
			const updateData: Partial<Doc<"products">> = {
				name: values.name,
				slug: values.slug,
				description: values.description,
				originalPrice: originalPrice,
				stock: stock,
				isActive: values.isActive,
				categoryIds: values.categoryIds as Id<"categories">[],
			};

			if (values.isDiscounted) {
				updateData.isDiscounted = true;
				updateData.discountPercent = discountPercent;
				updateData.discountStartDate =
					values.discountStartDate || undefined;
				updateData.discountEndDate =
					values.discountEndDate || undefined;
			} else {
				updateData.isDiscounted = false;
				updateData.discountPercent = undefined;
				updateData.discountStartDate = undefined;
				updateData.discountEndDate = undefined;
			}

			await editProduct({
				productId: productId as Id<"products">,
				data: updateData,
			});

			toast.success("Product created successfully!");
			reset();
			setCategories([]);

			router.push(`/dashboard/${user?.id}/products/all`);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to create product");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p>Loading user...</p>
				</div>
			</div>
		);
	}

	if (!user && !getProduct) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="px-5 mb-5">
				<h1 className="text-2xl font-bold">Edit Product</h1>
			</div>
			<div className="p-5 flex gap-5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(
							onSubmitHandler,
							(errors) => {
								console.log("Form validation errors:", errors);
							}
						)}
						className="space-y-8 flex-1"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Enter the name of your product{" "}
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Product name"
										/>
									</FormControl>
									<FormDescription>
										This is the name customers will see for
										your product.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product URL Slug</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="product-url-slug"
										/>
									</FormControl>
									<FormDescription>
										Auto-generated from product name. Used
										in the product URL.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Describe your product{" "}
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={4}
											placeholder="Enter a detailed description of your product..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							<FormField
								control={form.control}
								name="originalPrice"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Original Price (₹){" "}
											<span className="text-red-500">
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min="0"
												step="0.01"
												placeholder="0.00"
												onChange={(e) =>
													field.onChange(
														e.target.value
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Total Stock{" "}
											<span className="text-red-500">
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={0}
												placeholder="0"
												onChange={(e) =>
													field.onChange(
														e.target.value
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="isDiscounted"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>
												Is the product on sale?
											</FormLabel>
											<FormDescription>
												Check this if the product is
												currently discounted
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>

						{isDiscounted && (
							<div className="border rounded-lg p-4 space-y-4">
								<h3 className="text-lg font-medium">
									Discount Details
								</h3>

								<FormField
									control={form.control}
									name="discountPercent"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Discount Percentage (10-60%){" "}
												<span className="text-red-500">
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													min="10"
													max="60"
													placeholder="0"
													value={field.value || ""}
													onChange={(e) =>
														field.onChange(
															e.target.value
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div>
									<h4 className="text-md font-medium mb-2">
										Discount Duration{" "}
										<span className="text-red-500">*</span>
									</h4>
									<DateDurationPicker
										startDate={startDate}
										setStartDate={setStartDate}
										endDate={endDate}
										setEndDate={setEndDate}
									/>
									{form.formState.errors
										.discountStartDate && (
										<p className="text-sm text-red-500 mt-2">
											{
												form.formState.errors
													.discountStartDate.message
											}
										</p>
									)}
								</div>
							</div>
						)}

						<CategorySelector
							categoryValues={categories}
							setCategoryValues={setCategories}
						/>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								type="submit"
								className="flex-1 sm:flex-none cursor-pointer"
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Updating Product..."
									: "Update Product"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
