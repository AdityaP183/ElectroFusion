import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const files = formData.getAll("files") as File[];

		// Validate number of files
		if (!files || files.length < 1 || files.length > 3) {
			return NextResponse.json(
				{ error: "Upload between 1 to 3 images only" },
				{ status: 400 }
			);
		}

		// Validate each file
		for (const file of files) {
			if (!(file instanceof File) || file.size > 5_000_000) {
				return NextResponse.json(
					{ error: "Each file must be under 5MB" },
					{ status: 400 }
				);
			}
		}

		// Helper to upload single file
		const uploadToCloudinary = (file: File): Promise<UploadApiResponse> => {
			return new Promise((resolve, reject) => {
				const reader = file.stream().getReader();
				const chunks: Uint8Array[] = [];

				const read = async (): Promise<void> => {
					const { done, value } = await reader.read();
					if (done) {
						const buffer = Buffer.concat(chunks);
						cloudinary.uploader
							.upload_stream(
								{
									folder: "ElectroFusion/products",
									resource_type: "auto",
								},
								(error, result) => {
									if (error || !result) {
										reject(
											error ?? new Error("Upload failed")
										);
									} else {
										resolve(result);
									}
								}
							)
							.end(buffer);
						return;
					}
					chunks.push(value);
					await read();
				};

				read();
			});
		};

		// Upload all files
		const uploadResults = await Promise.all(
			files.map((file) => uploadToCloudinary(file))
		);

		return NextResponse.json({
			success: true,
			files: uploadResults.map((result) => ({
				url: result.secure_url,
				public_id: result.public_id,
			})),
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Something went wrong during upload" },
			{ status: 500 }
		);
	}
}
