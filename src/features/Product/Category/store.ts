import { produce } from 'immer';
import { createStore, useStore } from 'zustand';
import { initialProductCategory } from './constants';
import { ProductCategory } from './types';

export type StateProductCategory = {
  category: ProductCategory;
  setProductCategory: (value: ProductCategory) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setSlug: (value: string) => void;
};

export type ProductCategoryStore = ReturnType<typeof createProductCategoryStore>;
export const createProductCategoryStore = (category: ProductCategory) => {
  return createStore<StateProductCategory>((set) => ({
    category,
    setProductCategory: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.category = value;
        }),
      ),
    setTitle: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.category.title = value;
        }),
      ),
    setDescription: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.category.description = value;
        }),
      ),
    setSlug: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.category.slug = value;
        }),
      ),
  }));
};

export const productCategoryStore = createProductCategoryStore(initialProductCategory);
export function useProductCategoryStore<T>(selector: (state: StateProductCategory) => T) {
  return useStore(productCategoryStore, selector);
}
