export interface Cart {
	id: string;
	created_at: string;
	user_id: string;
}

interface CartItem {
	id: number;
	created_at: string;
	product_id: number;
	quantity: number;
	cart_id: number;
	product: {
		id: number;
		stock: number;
		rating: string;
		createdBy: string;
		categories: string[];
		created_at: string;
		description: string;
		productName: string;
		isDiscounted: boolean;
		productImage: string;
		originalPrice: number;
		discountPercent: number;
	};
}

export interface CartItems {
	items: CartItem[];
	totalPrice: number;
	totalDiscountedPrice: number;
	totalDiscount: number;
}
