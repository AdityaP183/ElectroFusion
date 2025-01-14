import { create } from "zustand";
import type { User } from "@/lib/types/user-types";
// import { createContext, useState } from "react";

type FusionStore = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const fusionStore = create<FusionStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));

export default fusionStore;
