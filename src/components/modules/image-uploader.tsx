"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";

type UploadedFile = {
	imgFile: File;
	img: string;
	name: string;
};

interface Props {
	file: UploadedFile | null;
	setFile: (file: UploadedFile | null) => void;
	ratio?: "square" | "rectangle";
	width?: string;
	height?: string;
	fill?: "contain" | "cover";
}

export default function ImageUploader({
	setFile,
	ratio,
	width,
	height,
	fill = "cover",
}: Props) {
	const maxSizeMB = 2;
	const maxSize = maxSizeMB * 1024 * 1024;
	const [
		{ files, isDragging },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		accept: "image/svg+xml,image/png,image/jpeg,image/jpg",
		maxSize,
	});

	useEffect(() => {
		if (files.length > 0) {
			const uploadedFile = files[0];
			if (uploadedFile.file instanceof File) {
				setFile({
					imgFile: uploadedFile.file,
					img: uploadedFile.preview || "",
					name: uploadedFile.file.name,
				});
			}
		} else {
			setFile(null);
		}
	}, [files, setFile]);

	const previewUrl = files[0]?.preview || null;

	return (
		<div className="flex flex-col gap-2">
			<div className="relative">
				<div
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					data-dragging={isDragging || undefined}
					className={cn(
						"w-[250px] h-[250px] border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]",
						width,
						height,
						ratio ? "aspect-square" : "aspect-video"
					)}
				>
					<input
						{...getInputProps()}
						className="sr-only"
						aria-label="Upload image file"
					/>
					{previewUrl ? (
						<div className="absolute inset-0 flex items-center justify-center">
							<Image
								src={previewUrl}
								alt={files[0]?.file?.name || "Uploaded image"}
								fill
								className={cn(
									"mx-auto max-h-full rounded",
									fill === "contain"
										? "object-contain"
										: "object-cover"
								)}
							/>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
							<div
								className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
								aria-hidden="true"
							>
								<ImageIcon className="size-4 opacity-60" />
							</div>
							<p className="mb-1.5 text-sm font-medium">
								Drop your image here
							</p>
							<p className="text-muted-foreground text-xs">
								SVG, PNG, JPG (max. {maxSizeMB}MB)
							</p>
							<Button
								variant="outline"
								className="mt-4"
								onClick={openFileDialog}
							>
								<UploadIcon
									className="-ms-1 size-4 opacity-60"
									aria-hidden="true"
								/>
								Select image
							</Button>
						</div>
					)}
				</div>

				{previewUrl && (
					<div className="absolute top-4 right-4">
						<button
							type="button"
							className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
							onClick={() => removeFile(files[0]?.id)}
							aria-label="Remove image"
						>
							<XIcon className="size-4" aria-hidden="true" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
