import type { ProductSchema } from "@/lib/types/product-types";
import { dbTable, supabase, supabaseUrl } from "./config";
import { generateRandomString } from "@/lib/utils";

interface CreateProductProps {
	data: ProductSchema;
	imgName?: string;
}

async function createProduct({ data, imgName = "" }: CreateProductProps) {
	const productToInsert = { ...data, productImage: "" };

	// Uploading Image
	if (data.productImage) {
		const fileName = `${generateRandomString() + "_" + imgName}`;
		const { data: productImage, error } = await supabase.storage
			.from(dbTable.productImage)
			.upload(fileName, data.productImage);

		if (error) throw new Error(error.message);

		productToInsert.productImage = `${supabaseUrl}/storage/v1/object/public/${productImage.fullPath}`;
	}

	// Inserting Product
	const { data: product, error } = await supabase
		.from(dbTable.products)
		.insert(productToInsert);

	if (error) throw new Error(error.message);

	return product;
}

async function getProducts(userId: string | undefined, count: number = 10) {
	if (!userId) return [];

	const { data, error } = await supabase
		.from(dbTable.products)
		.select("*")
		.eq("createdBy", userId)
		.order("created_at", { ascending: false })
		.limit(count);

	if (error) throw new Error(error.message);

	return data;
}

async function getProduct(id: string) {
	const { data, error } = await supabase
		.from(dbTable.products)
		.select("*")
		.eq("id", id);

	if (error) throw new Error(error.message);

	if (data.length === 0) return {};
	return data[0];
}

async function updateProduct({
	id,
	data,
}: {
	id: string | undefined;
	data: Partial<Pick<ProductSchema, keyof ProductSchema>>;
}) {
	if (!id) throw new Error("Product ID is required.");
	const { error } = await supabase
		.from(dbTable.products)
		.update(data)
		.eq("id", id);

	if (error) throw new Error(error.message);

	return { success: true, message: "Product updated successfully" };
}

async function deleteProduct(id: string) {
	const { error } = await supabase
		.from(dbTable.products)
		.delete()
		.eq("id", id);

	if (error) throw new Error(error.message);

	return { success: true, message: "Product deleted successfully" };
}

async function getProductsPublic() {
	const { data, error } = await supabase
		.from(dbTable.products)
		.select("*")
		.order("created_at", { ascending: false });

	if (error) throw new Error(error.message);

	return data;
}

export {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	getProductsPublic,
};
