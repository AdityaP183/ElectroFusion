"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageUp, Paperclip, Pencil, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
}

export default function ImageUploader({
	file,
	setFile,
	ratio = "square",
	width = "w-[300px]",
	height = "h-[300px]",
}: Props) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const isSquare = ratio === "square";
	const aspectClass = isSquare ? "aspect-square" : "aspect-[4/3]";

	useEffect(() => {
		if (file?.imgFile) {
			const url = URL.createObjectURL(file.imgFile);
			setPreviewUrl(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setPreviewUrl(null);
		}
	}, [file]);

	const handleFile = (selectedFile: File) => {
		const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (!allowedTypes.includes(selectedFile.type)) {
			toast.error("Please upload a valid PNG or JPEG image.");
			return;
		}
		if (selectedFile.size > maxSize) {
			toast.error("Image size should be less than 5MB.");
			return;
		}

		const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
		setFile({ imgFile: selectedFile, img: "", name: fileName });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) handleFile(selectedFile);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const selectedFile = e.dataTransfer.files[0];
		if (selectedFile) handleFile(selectedFile);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const openFilePicker = () => fileInputRef.current?.click();

	return (
		<div className="flex flex-col gap-2">
			<div
				className={`relative w-full max-w-md overflow-hidden rounded-lg border-2 border-dashed border-primary p-2 group ${aspectClass}`}
			>
				<input
					type="file"
					ref={fileInputRef}
					id="productImage"
					accept="image/png, image/jpeg"
					className="hidden"
					onChange={handleFileChange}
				/>

				{file && (
					<Button
						type="button"
						className="absolute z-10 top-2 right-2 rounded-full bg-background hover:bg-muted"
						size="icon"
						variant="ghost"
						onClick={openFilePicker}
					>
						<Pencil className="w-4 h-4" />
					</Button>
				)}

				{previewUrl ? (
					<Image
						src={previewUrl}
						alt={file?.name || "Uploaded image"}
						fill
						className="object-cover rounded-md"
						sizes="(max-width: 768px) 100vw, 400px"
					/>
				) : (
					<div
						className="flex flex-col items-center justify-center w-full h-full bg-secondary/40 text-muted-foreground cursor-pointer hover:bg-secondary transition-all"
						onClick={openFilePicker}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<ImageUp className="w-10 h-10 mb-2" strokeWidth={1.5} />
						<p>Drop your image here or click to browse</p>
					</div>
				)}
			</div>

			{file && (
				<div className="flex items-center justify-between p-2 text-sm rounded-md bg-secondary">
					<div className="flex items-center gap-2 truncate">
						<Paperclip className="w-4 h-4" />
						<span className="truncate max-w-[250px]">
							{file.name}
						</span>
					</div>
					<Trash
						className="w-4 h-4 cursor-pointer text-destructive"
						onClick={() => setFile(null)}
					/>
				</div>
			)}
		</div>
	);
}
