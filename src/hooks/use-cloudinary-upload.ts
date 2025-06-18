import { useState } from "react";

export function useCloudinaryUpload() {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const uploadImage = async (file: File): Promise<string | null> => {
		setUploading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch("/api/upload/vendor-shop", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error || "Upload failed");

			return data.url;
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Something went wrong");
			}
			return null;
		} finally {
			setUploading(false);
		}
	};

	return {
		uploadImage,
		uploading,
		error,
	};
}
