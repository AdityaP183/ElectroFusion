import { User } from "@/types/component.type";
import { create } from "zustand";

type FusionStore = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const fusionStore = create<FusionStore>()((set) => ({
	user: null,
	setUser: (user: User | null) => set({ user }),
}));
