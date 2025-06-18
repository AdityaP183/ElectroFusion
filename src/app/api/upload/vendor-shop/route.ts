import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File;

		if (!file)
			return NextResponse.json(
				{ error: "No file uploaded" },
				{ status: 400 }
			);

		if (!file || file.size > 5_000_000) {
			return NextResponse.json(
				{ error: "Invalid file" },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// upload to cloudinary
		const result = await new Promise<UploadApiResponse>(
			(resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							folder: "ElectroFusion/vendor-shops",
							resource_type: "auto",
						},
						(error, result) => {
							if (error || !result) {
								reject(
									error ??
										new Error("No result from Cloudinary")
								);
								return;
							} else resolve(result);
						}
					)
					.end(buffer);
			}
		);

		return NextResponse.json({
			success: true,
			url: result.secure_url,
			public_id: result.public_id,
		});
	} catch (error) {
		console.log("Upload error", error);
		return NextResponse.json(
			{ error: "Something went wrong while uploading" },
			{ status: 500 }
		);
	}
}
