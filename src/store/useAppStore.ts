import { create } from "zustand";

/** Shared UI state can be added here as the app gains interactive features. */
type AppState = Record<string, never>;

export const useAppStore = create<AppState>(() => ({}));
