import { LazyLoadingImage } from "@/components/app/common";
import { Button } from "@/components/ui/button";
import { ImageUp, Paperclip, Pencil, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ImageUpload({
	file,
	setFile,
}: {
	file: { imgFile: File; img: string; name: string; } | null;
	setFile: (file: { imgFile: File; img: string; name: string;} | null) => void;
}) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFile = (selectedFile: File) => {
		const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
		if (allowedTypes.includes(selectedFile.type)) {
			const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
			const url = URL.createObjectURL(selectedFile);
			setFile({ imgFile: selectedFile, img: url, name: fileName });
			return () => URL.revokeObjectURL(url);
		} else {
			toast.error("Please upload a valid image file.");
		}
	};

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
            handleFile(selectedFile);
		}
	}

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const selectedFile = event.dataTransfer.files[0];
		if (selectedFile) {
            handleFile(selectedFile);
		}
	}

	function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function openFilePicker() {
		fileInputRef.current?.click();
	}

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(file.img);
            }
        }
    }, [file])

	return (
		<div className="flex flex-col gap-1">
			<div className="relative w-[350px] h-[350px] rounded-lg border-[3px] border-primary border-dashed p-2 group">
				<input
					type="file"
					ref={fileInputRef}
					name="productImage"
					id="productImage"
					className="absolute top-0 bottom-0 left-0 right-0 hidden"
					onChange={handleFileChange}
				/>

				{file && (
					<Button
						className="absolute top-0 right-0 z-10 rounded-full hover:bg-destructive"
						size={"icon"}
						variant={"destructive"}
						onClick={openFilePicker}
					>
						<Pencil className="w-4 h-4" />
					</Button>
				)}

				{file ? (
					<LazyLoadingImage
						imgUrl={file.img || ""}
						className="object-cover w-full h-full rounded-md"
					/>
				) : (
					<div
						className="w-full h-full bg-secondary/50 [&_svg]:size-14 hover:bg-secondary"
						onClick={openFilePicker}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<div className="flex flex-col items-center justify-center w-full h-full gap-3">
							<ImageUp strokeWidth={1.5} />
							<h2>Drop your image here, or Browse</h2>
						</div>
					</div>
				)}
			</div>
			{file && (
				<div className="flex items-center justify-between px-1 py-2 mt-3 rounded-lg bg-secondary/50">
					<div className="flex items-center text-sm">
						<Paperclip className="w-4 h-4 mr-1" />
						{file.name}
					</div>
					<Trash
						className="w-4 h-4 cursor-pointer text-destructive-foreground"
						onClick={() => setFile(null)}
					/>
				</div>
			)}
		</div>
	);
}
