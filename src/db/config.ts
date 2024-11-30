import { DB_API_KEY, DB_PROJECT_URL } from "@/lib/configure";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = DB_PROJECT_URL;
const supabaseKey = DB_API_KEY;
if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase credentials");
}

const dbTable = {
	users: "users",
	products: "products",
	vendors: "vendors",
	orders: "orders",
	coupons: "coupons",
	reviews: "reviews",
	categories: "categories",
	carts: "cart",
	cartItems: "cart_item",
};

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, dbTable };
