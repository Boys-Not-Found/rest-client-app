import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: boolean;
  setUser: (value: boolean) => void;
  toggleUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: false,
      setUser: (value: boolean) => set({ user: value }),
      toggleUser: () => set((state) => ({ user: !state.user })),
    }),
    { name: 'user' }
  )
);
