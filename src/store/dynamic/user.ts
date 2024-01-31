import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
};

const useUserStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((state) => {
        state.count += 1;
      }),
  })),
);

const { getState: getUserState } = useUserStore;
export { getUserState, useUserStore };
