"use client";

import {
	AlertCircleIcon,
	ImageIcon,
	Trash2Icon,
	UploadIcon,
	XIcon,
} from "lucide-react";

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getFilePreview = (file: {
	file: File | { type: string; name: string; url?: string };
}) => {
	const fileName =
		file.file instanceof File ? file.file.name : file.file.name;

	const renderImage = (src: string) => (
		<img
			src={src}
			alt={fileName}
			className="size-full rounded-t-[inherit] object-cover"
		/>
	);

	return (
		<div className="bg-accent flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit]">
			{file.file instanceof File ? (
				(() => {
					const previewUrl = URL.createObjectURL(file.file);
					return renderImage(previewUrl);
				})()
			) : file.file.url ? (
				renderImage(file.file.url)
			) : (
				<ImageIcon className="size-5 opacity-60" />
			)}
		</div>
	);
};

export default function MultiImageUploader({
	upladerStyle,
}: {
	upladerStyle?: string;
}) {
	const maxSizeMB = 5;
	const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
	const maxFiles = 6;
	const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps,
		},
	] = useFileUpload({
		multiple: true,
		maxFiles,
		maxSize,
	});

	return (
		<div className="flex flex-col gap-2">
			{/* Drop area */}
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={files.length > 0 || undefined}
				className={cn(
					"border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]",
					upladerStyle
				)}
			>
				<input
					{...getInputProps()}
					accept="image/png,image/jpeg,image/jpg"
					className="sr-only"
					aria-label="Upload image files (PNG, JPG only)"
				/>
				{files.length > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium">
								Images ({files.length})
							</h3>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={openFileDialog}
								>
									<UploadIcon
										className="-ms-0.5 size-3.5 opacity-60"
										aria-hidden="true"
									/>
									Add images
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={clearFiles}
								>
									<Trash2Icon
										className="-ms-0.5 size-3.5 opacity-60"
										aria-hidden="true"
									/>
									Remove all
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
							{files.map((file) => (
								<div
									key={file.id}
									className="bg-background relative flex flex-col rounded-md border"
								>
									{getFilePreview(file)}
									<Button
										onClick={() => removeFile(file.id)}
										size="icon"
										className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
										aria-label="Remove image"
									>
										<XIcon className="size-3.5" />
									</Button>
									<div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
										<p className="truncate text-[13px] font-medium">
											{file.file.name}
										</p>
										<p className="text-muted-foreground truncate text-xs">
											{formatBytes(file.file.size)}
										</p>
									</div>
								</div>
							))}
						</div>
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
							Drop your images here
						</p>
						<p className="text-muted-foreground text-xs">
							Max {maxFiles} images ∙ Up to {maxSizeMB}MB ∙ PNG,
							JPG only
						</p>
						<Button
							variant="outline"
							className="mt-4"
							onClick={openFileDialog}
						>
							<UploadIcon
								className="-ms-1 opacity-60"
								aria-hidden="true"
							/>
							Select images
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	);
}
