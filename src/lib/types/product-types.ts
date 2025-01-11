import type { productSchema } from "@/db/schemas";
import { z } from "zod";

export type ProductSchema = z.infer<typeof productSchema> & { productImage?: File, createdBy: string };