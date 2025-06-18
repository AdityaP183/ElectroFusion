"use client";

import ImageUploader from "@/components/modules/image-uploader";
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
import { addProductSchema } from "@/lib/app-schemas";
import { UploadedFile } from "@/lib/app-types";
import { useVendorStore } from "@/store/use-vendor";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../../../convex/_generated/api";
import CategorySelector from "@/features/shop/components/category-filters/category-selector";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default function AddProduct() {
	const { user } = useUser();
	const router = useRouter();
	const { activeShopId } = useVendorStore();
	const dbUser = useQuery(api.vendor.getVendorDetails, {
		clerkId: user?.id || "",
	});

	const [productImg, setProductImg] = useState<UploadedFile | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [categories, setCategories] = useState<string[] | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof addProductSchema>>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			shopId: activeShopId || "",
			name: "",
			slug: "",
			description: "",
			originalPrice: "",
			discountPercent: "",
			stock: "",
			isDiscounted: false,
			isActive: true,
			isFeatured: false,
			image: "",
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
		if (name) {
			const slug = generateSlug(name);
			setValue("slug", slug);
		}
	}, [name, generateSlug, setValue]);

	useEffect(() => {
		if (activeShopId) {
			setValue("shopId", activeShopId);
		}
	}, [activeShopId, setValue]);

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

	useEffect(() => {
		setValue("image", productImg?.img || "");
	}, [productImg, setValue]);

	const { uploadImage } = useCloudinaryUpload();
	const createShop = useMutation(api.vendorProducts.createProduct);

	const onSubmitHandler = async (
		values: z.infer<typeof addProductSchema>
	) => {
		if (!productImg?.imgFile) {
			toast.error("Please upload a product image.");
			return;
		}

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

		setIsSubmitting(true);

		try {
			const productImgUrl = await uploadImage(productImg.imgFile);

			if (!productImgUrl) {
				toast.error(
					"Failed to upload product image. Please try again."
				);
				return;
			}

			const product = await createShop({
				...values,
				shopId: activeShopId as Id<"vendorShops">,
				categoryIds: categories as Id<"categories">[],
				image: productImgUrl,
				originalPrice,
				stock,
				discountPercent,
			});

			toast.success("Product created successfully!");
			reset();
			setCategories([]);

			if (product) {
				router.push(`/dashboard/${user?.id}/products/all`);
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to create product");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user || !dbUser) {
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
				<h1 className="text-2xl font-bold">Add a new product</h1>
			</div>
			<div className="p-5 flex gap-5">
				<div className="flex-shrink-0">
					<ImageUploader
						file={productImg}
						setFile={setProductImg}
						ratio="square"
						width="w-[300px]"
						height="h-[300px]"
					/>
					{form.formState.errors.image && (
						<p className="text-sm text-red-500 mt-2">
							{form.formState.errors.image.message}
						</p>
					)}
				</div>
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

						{/* TODO: Add category selection component */}
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
									? "Creating Product..."
									: "Create Product"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
