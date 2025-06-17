import { useVendorStore } from "@/store/use-vendor";

export function useActiveShop() {
	const { shops, activeShopId, setActiveShop } = useVendorStore();

	const activeShop = shops.find((shop) => shop._id === activeShopId) || null;

	const switchShop = (shopId: string) => {
		const shopExists = shops.some((shop) => shop._id === shopId);
		if (shopExists) {
			setActiveShop(shopId);
		}
	};

	return {
		activeShop,
		activeShopId,
		allShops: shops,
		switchShop,
		hasShops: shops.length > 0,
	};
}
