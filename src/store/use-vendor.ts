// store/use-vendor.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Doc } from "../../convex/_generated/dataModel";

type VendorShopDoc = Doc<"vendorShops">;

interface VendorState {
	shops: VendorShopDoc[];
	activeShopId: string | null;
	setShops: (shops: VendorShopDoc[]) => void;
	setActiveShop: (shopId: string) => void;
	addShop: (shop: VendorShopDoc) => void;
	getActiveShop: () => VendorShopDoc | null;
	clearVendorData: () => void;
}

export const useVendorStore = create<VendorState>()(
	persist(
		(set, get) => ({
			shops: [],
			activeShopId: null,

			setShops: (shops) => {
				set((state) => {
					const activeShopId =
						state.activeShopId &&
						shops.some((shop) => shop._id === state.activeShopId)
							? state.activeShopId
							: shops.length > 0
							? shops[0]._id
							: null;

					return {
						shops,
						activeShopId,
					};
				});
			},

			setActiveShop: (shopId) => {
				set({ activeShopId: shopId });
			},

			addShop: (shop) => {
				set((state) => ({
					shops: [...state.shops, shop],
					activeShopId: shop._id,
				}));
			},

			getActiveShop: () => {
				const state = get();
				return (
					state.shops.find(
						(shop) => shop._id === state.activeShopId
					) || null
				);
			},

			clearVendorData: () => {
				set({
					shops: [],
					activeShopId: null,
				});
			},
		}),
		{
			name: "vendor-storage",
			partialize: (state) => ({
				activeShopId: state.activeShopId,
			}),
		}
	)
);
