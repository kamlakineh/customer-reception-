import { Language, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  user: User | null;
  language: Language;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      language: 'en',
      theme: 'light',
      setUser: (user) => set({ user }),
      setLanguage: (language) => set({ language }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'app-storage',
    }
  )
);
