import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: null | { uid: string; email: string | null };
  setUser: (user: UserState['user']) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      email: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
