import { create } from "zustand";
import { coverage } from "@/core/constents";

export const neighborhoods = coverage.flatMap((region) =>
	region.communes.map((commune) => commune.nom)
); // juste le communes

export type Neighborhood = string;

type AppState = {
	origin: Neighborhood | "";
	destination: Neighborhood | "";
	setOrigin: (origin: Neighborhood | "") => void;
	setDestination: (destination: Neighborhood | "") => void;
};

export const useAppStore = create<AppState>((set) => ({
	origin: "",
	destination: "",
	setOrigin: (origin) => set({ origin }),
	setDestination: (destination) => set({ destination }),
}));
