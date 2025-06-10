"use client";

import ImageUploader from "@/components/modules/image-uploader";
import { Button } from "@/components/ui/button";
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
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import { vendorShopSchema } from "@/lib/app-schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useVendorStore } from "@/store/use-vendor";

type UploadedFile = {
	imgFile: File;
	img: string;
	name: string;
};

export default function AddShop() {
	const { user } = useUser();
	const router = useRouter();
    const { addShop } = useVendorStore();
	const dbUser = useQuery(api.vendor.getVendorDetails, {
		clerkId: user?.id || "",
	});

	const [logoImg, setLogoImg] = useState<UploadedFile | null>(null);
	const [bannerImg, setBannerImg] = useState<UploadedFile | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof vendorShopSchema>>({
		resolver: zodResolver(vendorShopSchema),
		defaultValues: {
			vendorId: "",
			name: "",
			slug: "",
			description: "",
			bannerImage: "",
			logo: "",
		},
	});

	//* Setting the slug according to the name
	const { watch, setValue, reset } = form;
	const name = watch("name");

	const generateSlug = useCallback((name: string) => {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
	}, []);

	useEffect(() => {
		if (dbUser?._id) {
			setValue("vendorId", dbUser._id);
		}
	}, [dbUser?._id, setValue]);

	useEffect(() => {
		if (name) {
			setValue("slug", generateSlug(name));
		} else {
			setValue("slug", "");
		}
	}, [name, setValue, generateSlug]);

	useEffect(() => {
		setValue("logo", logoImg?.img || "");
	}, [logoImg, setValue]);

	useEffect(() => {
		setValue("bannerImage", bannerImg?.img || "");
	}, [bannerImg, setValue]);

	const { uploadImage, uploading, error } = useCloudinaryUpload();
	const createShop = useMutation(api.vendor.createVendorShop);

	async function onSubmit(values: z.infer<typeof vendorShopSchema>) {
		if (!dbUser?._id) {
			toast.error("Vendor information not loaded. Please try again.");
			return;
		}

		if (!logoImg?.imgFile) {
			toast.error("Please upload a shop logo.");
			return;
		}

		if (!bannerImg?.imgFile) {
			toast.error("Please upload a shop banner.");
			return;
		}

		setIsSubmitting(true);

		try {
			const [logoUrl, bannerUrl] = await Promise.all([
				uploadImage(logoImg.imgFile),
				uploadImage(bannerImg.imgFile),
			]);

			if (!logoUrl) {
				toast.error("Failed to upload logo. Please try again.");
				return;
			}

			if (!bannerUrl) {
				toast.error("Failed to upload banner. Please try again.");
				return;
			}

			const newShopId = await createShop({
				vendorId: dbUser._id as Doc<"vendors">["_id"],
				name: values.name,
				slug: values.slug,
				description: values.description,
				logo: logoUrl,
				bannerImage: bannerUrl,
			});

            const newShop: Doc<"vendorShops"> = {
				_id: newShopId,
				_creationTime: Date.now(),
				vendorId: dbUser._id as Doc<"vendors">["_id"],
				name: values.name,
				slug: values.slug,
				description: values.description,
				logo: logoUrl,
				bannerImage: bannerUrl,
			};

            addShop(newShop);

			toast.success("Shop created successfully!");

			reset();
			setLogoImg(null);
			setBannerImg(null);

			if (user?.id) {
				router.push(`/dashboard/${user.id}`);
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong while creating the shop.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (!user || !dbUser) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p>Loading vendor information...</p>
				</div>
			</div>
		);
	}

	if (dbUser.verificationStatus !== "approved") {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
					<h2 className="text-xl font-semibold text-yellow-800 mb-2">
						Verification Required
					</h2>
					<p className="text-yellow-700">
						Your vendor account needs to be approved before you can
						create a shop. Current status:{" "}
						<span className="font-medium">
							{dbUser.verificationStatus}
						</span>
					</p>
				</div>
			</div>
		);
	}

	const isFormDisabled = uploading || isSubmitting;

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="px-5 mb-5">
				<h1 className="text-2xl font-bold">Add a new shop</h1>
			</div>
			<div className="p-5 flex gap-5 flex-col">
				<div className="flex gap-10">
					<div className="space-y-1">
						<h4>
							Add Logo <span className="text-red-500">*</span>
						</h4>
						<ImageUploader
							file={logoImg}
							setFile={setLogoImg}
							ratio="square"
						/>
					</div>
					<div className="space-y-1">
						<h4>
							Add Banner <span className="text-red-500">*</span>
						</h4>
						<ImageUploader
							file={bannerImg}
							setFile={setBannerImg}
							ratio="rectangle"
							width="w-[400px]"
							height="h-[200px]"
						/>
					</div>
				</div>

				{error && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-red-800 text-sm">
							Upload Error: {error}
						</p>
					</div>
				)}

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 flex-1"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Enter the name of your shop
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isFormDisabled}
										/>
									</FormControl>
									<FormDescription>
										This is the name of your shop which the
										customer will see.
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
									<FormLabel>Shop URL</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value}
											readOnly
											disabled
										/>
									</FormControl>
									<FormDescription>
										This is the URL of your shop
										(auto-generated from the name).
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
										Description{" "}
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											disabled={isFormDisabled}
											placeholder="Describe your shop and what you sell..."
											rows={4}
										/>
									</FormControl>
									<FormDescription>
										Tell customers about your shop and the
										products you offer.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full sm:w-auto cursor-pointer"
							disabled={isFormDisabled}
						>
							{isSubmitting ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Creating Shop...
								</>
							) : uploading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Uploading Images...
								</>
							) : (
								"Create Shop"
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
