import { User } from "@/types/component.type";
import { create } from "zustand";

type FusionStore = {
	user: User | null;
	setUser: (user: User) => void;
};

export const fusionStore = create<FusionStore>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
