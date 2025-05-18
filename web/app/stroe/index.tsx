import { create } from 'zustand'

interface loadingStore {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export const useLoadingStore = create<loadingStore>((set) => ({
    isLoading: false, // Initial price value
    showLoading: () => set({ isLoading: true }),
    hideLoading: () => set({ isLoading: false }),
}));
