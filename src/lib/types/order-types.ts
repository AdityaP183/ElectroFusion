export interface Order {
	id: string | number;
	created_at: string;
	product_id: number;
	customer_id: string;
	ordered_on: string;
	total_price: number;
	discounted_price: number;
	status: string;
}
