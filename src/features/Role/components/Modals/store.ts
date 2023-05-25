import { createStore, useStore } from 'zustand';
import { produce } from 'immer';
import { Role } from '../../types';

type DeleteRoleState = {
  isShow: boolean;
  role?: Role;
  toggleShow(): void;
  setRole(role: Role): void;
};
export const deleteRoleStore = createStore<DeleteRoleState>()((set) => ({
  isShow: false,
  toggleShow: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.isShow = !draft.isShow;
      }),
    ),
  setRole: (role) => {
    set((state) =>
      produce(state, (draft) => {
        draft.role = role;
      }),
    );
  },
}));

export function useDeleteRoleStore<T>(selector: (state: DeleteRoleState) => T) {
  return useStore(deleteRoleStore, selector);
}
