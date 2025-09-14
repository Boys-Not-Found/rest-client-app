import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VariablesState {
  variables: { key: string; value: string }[];
  addVariable: (key: string, value: string) => void;
  removeVariable: (key: string) => void;
  clearVariables: () => void;
}

export const useVariablesStore = create<VariablesState>()(
  persist(
    (set) => ({
      variables: [],
      addVariable: (key, value) =>
        set((state) => ({
          variables: [...state.variables, { key, value }],
        })),
      removeVariable: (key) =>
        set((state) => ({
          variables: state.variables.filter((v) => v.key !== key),
        })),
      clearVariables: () => set({ variables: [] }),
    }),
    {
      name: 'variables-storage',
    }
  )
);
