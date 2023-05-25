import { produce } from 'immer';
import { createStore, useStore } from 'zustand';
import { Role } from './types';
import { initialRole } from './constants';

export type StateRole = {
  role: Role;
  setRole: (value: Role) => void;
  setName: (value: string) => void;
  toggleScrope: (scope: string) => void;
  setDesc: (value: string) => void;
};

export type RoleStore = ReturnType<typeof createRoleStore>;
export const createRoleStore = (role: Role) => {
  return createStore<StateRole>((set) => ({
    role: role,
    setRole: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.role = value;
        }),
      ),
    setName: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.role.name = value;
        }),
      ),
    toggleScrope: (scope) =>
      set((state) =>
        produce(state, (draft) => {
          const idx = draft.role.scopes.indexOf(scope);
          if (idx >= 0) draft.role.scopes.splice(idx, 1);
          else draft.role.scopes.push(scope);
        }),
      ),
    setDesc: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.role.desc = value;
        }),
      ),
  }));
};

export const roleStore = createRoleStore(initialRole);
export function useRoleStore<T>(selector: (state: StateRole) => T) {
  return useStore(roleStore, selector);
}
