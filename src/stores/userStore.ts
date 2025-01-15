import { create } from "zustand";
import type { User } from "@/lib/types/user-types";
import { CartItems } from "@/lib/types/cart-types";
// import { createContext, useState } from "react";

type FusionStore = {
	user: User | null;
	setUser: (user: User | null) => void;
	userCart: CartItems[];
	setUserCart: (item: CartItems) => void;
};

export const fusionStore = create<FusionStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	userCart: [],
	setUserCart: (item: CartItems) =>
		set((state) => ({ userCart: [...state.userCart, item] })),
}));

export default fusionStore;
